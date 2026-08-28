import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Animated,
} from "react-native";
import { CheckCircle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import AppText from "../../components/Text/AppText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { COLORS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";


export default function DonationSuccessScreen() {

    const navigation = useNavigation();

    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                tension: 60,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>

            <Animated.View
                style={[
                    styles.card,
                    { opacity, transform: [{ scale }] },
                ]}
            >

                <View style={styles.iconWrapper}>
                    <CheckCircle
                        size={56}
                        color={COLORS.success}
                        strokeWidth={1.5}
                    />
                </View>

                <AppText
                    variant="heading"
                    weight="700"
                    align="center"
                    style={styles.title}
                >
                    Thank You!
                </AppText>

                <AppText
                    variant="body"
                    align="center"
                    color={COLORS.textSecondary}
                    style={styles.message}
                >
                    Your donation was received successfully.
                    Every contribution helps us preserve Tamil
                    voices and celebrate our culture.
                </AppText>

                <View style={styles.divider} />

                <AppText
                    variant="caption"
                    align="center"
                    color={COLORS.textMuted}
                    style={styles.receipt}
                >
                    A receipt has been sent to your email address.
                </AppText>

            </Animated.View>

            <View style={styles.actions}>

                <PrimaryButton
                    title="Back to Home"
                    size="lg"
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Home" as never }],
                        })
                    }
                />

                <PrimaryButton
                    title="Donate Again"
                    variant="glass"
                    size="lg"
                    style={styles.secondaryBtn}
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Donation" as never }],
                        })
                    }
                />

            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        paddingHorizontal: SPACING.xl,
    },

    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: SPACING.xxl,
        alignItems: "center",
    },

    iconWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "rgba(50,213,131,0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.xl,
    },

    title: {
        marginBottom: SPACING.md,
    },

    message: {
        lineHeight: 22,
    },

    divider: {
        width: "100%",
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.glassBorder,
        marginVertical: SPACING.xl,
    },

    receipt: {
        lineHeight: 18,
    },

    actions: {
        marginTop: SPACING.xxl,
        gap: SPACING.md,
    },

    secondaryBtn: {
        marginTop: 0,
    },

});
