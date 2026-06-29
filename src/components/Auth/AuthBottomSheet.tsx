import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { RADIUS, SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import VerifyOTP from "./VerifyOTP";

export default function AuthBottomSheet() {
    const { height, width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const { authScreen, isAuthSheetVisible, closeAuthSheet } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    const sheetHeight = Math.min(height * 0.9, 820);
    const translateY = useRef(new Animated.Value(height)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isAuthSheetVisible) {
            setIsMounted(true);
            translateY.setValue(sheetHeight);

            requestAnimationFrame(() => {
                Animated.parallel([
                    Animated.spring(translateY, {
                        toValue: 0,
                        damping: 24,
                        stiffness: 210,
                        mass: 0.9,
                        useNativeDriver: true,
                    }),
                    Animated.timing(backdropOpacity, {
                        toValue: 1,
                        duration: 240,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
            return;
        }

        if (!isMounted) return;

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: sheetHeight,
                duration: 230,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 190,
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished) setIsMounted(false);
        });
    }, [
        backdropOpacity,
        isAuthSheetVisible,
        isMounted,
        sheetHeight,
        translateY,
    ]);

    const renderScreen = () => {
        switch (authScreen) {
            case "login":
                return <Login />;
            case "register":
                return <Register />;
            case "forgot-password":
                return <ForgotPassword />;
            case "verify-otp":
                return <VerifyOTP />;
            case "reset-password":
                return <ResetPassword />;
        }
    };

    return (
        <Modal
            visible={isMounted}
            transparent
            animationType="none"
            statusBarTranslucent
            navigationBarTranslucent
            onRequestClose={closeAuthSheet}
        >
            <View style={styles.wrapper}>
                <Animated.View
                    style={[styles.backdrop, { opacity: backdropOpacity }]}
                >
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={closeAuthSheet}
                        accessibilityRole="button"
                        accessibilityLabel="Close authentication"
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.sheet,
                        {
                            height: sheetHeight,
                            width: Math.min(width, 640),
                            paddingBottom: Math.max(insets.bottom, SPACING.lg),
                            transform: [{ translateY }],
                        },
                    ]}
                >
                    <BlurView
                        intensity={Platform.OS === "android" ? 35 : 70}
                        tint="systemChromeMaterialDark"
                        experimentalBlurMethod={
                            Platform.OS === "android"
                                ? "dimezisBlurView"
                                : undefined
                        }
                        style={StyleSheet.absoluteFill}
                    />
                    <LinearGradient
                        colors={GRADIENTS.sheet}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.redGlow} />
                    <View style={styles.topHighlight} />

                    <View style={styles.chrome}>
                        <View style={styles.handle} />
                        <Pressable
                            onPress={closeAuthSheet}
                            style={({ pressed }) => [
                                styles.closeButton,
                                pressed && styles.closePressed,
                            ]}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Close"
                        >
                            <X size={18} color={COLORS.textSecondary} />
                        </Pressable>
                    </View>

                    <View style={styles.content}>{renderScreen()}</View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.scrim,
    },
    sheet: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: COLORS.glassBorder,
        shadowColor: COLORS.black,
        shadowOpacity: 0.7,
        shadowRadius: 28,
        shadowOffset: { width: 0, height: -12 },
        elevation: 28,
    },
    redGlow: {
        position: "absolute",
        width: 260,
        height: 180,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primary,
        opacity: 0.08,
        top: -110,
        right: -50,
        transform: [{ rotate: "-12deg" }],
    },
    topHighlight: {
        position: "absolute",
        top: 0,
        left: 28,
        right: 28,
        height: 1,
        backgroundColor: COLORS.glassHighlight,
    },
    chrome: {
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    handle: {
        width: 42,
        height: 4,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.glassHighlight,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: SPACING.lg,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    closePressed: {
        opacity: 0.6,
        transform: [{ scale: 0.94 }],
    },
    content: {
        flex: 1,
        width: "100%",
        maxWidth: 520,
        alignSelf: "center",
        paddingHorizontal: SPACING.xl,
    },
});
