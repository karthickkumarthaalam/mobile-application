import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LogIn } from "lucide-react-native";
import Animated, {
    FadeInDown,
    FadeInRight,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import PrimaryButton from "../../../components/Button/PrimaryButton";
import AppText from "../../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { Image as Img } from "react-native";
import { useDevice } from "../../../utils/device";
import { useTheme } from "../../../providers/ThemeProvider";

interface ProfileHeaderProps {
    isLoggedIn: boolean;
    name?: string | null;
    email?: string;
    onLogin?: () => void;
}


export default function ProfileHeader({
    isLoggedIn,
    name,
    email,
    onLogin,
}: ProfileHeaderProps) {
    const blobScale = useSharedValue(1);
    const { isTablet } = useDevice();
    const { isDark } = useTheme();

    useEffect(() => {
        blobScale.value = withRepeat(
            withSequence(
                withTiming(1.08, {
                    duration: 5000,
                }),
                withTiming(1, {
                    duration: 5000,
                })
            ),
            -1,
            true
        );
    }, []);

    const blobStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: blobScale.value,
            },
        ],
    }));


    return (
        <LinearGradient
            colors={isDark ? ["#000000", "#111111"] : ["#F7F8FA", "#EDEEF1"]}
            style={[
                styles.container,
                {
                    paddingTop: isTablet ? 90 : 70,
                    paddingBottom: isTablet ? 44 : 36,
                    paddingHorizontal: isTablet ? 48 : SPACING.xl,
                    borderBottomLeftRadius: isTablet ? 44 : 36,
                    borderBottomRightRadius: isTablet ? 44 : 36,
                },
            ]}
        >
            <Animated.View
                style={[
                    styles.blob1,
                    blobStyle,
                    {
                        width: isTablet ? 360 : 260,
                        height: isTablet ? 360 : 260,
                        top: isTablet ? -150 : -120,
                        right: isTablet ? -120 : -80,
                    },
                ]}
            />

            <Animated.View
                style={[
                    styles.blob2,
                    blobStyle,
                    {
                        width: isTablet ? 240 : 180,
                        height: isTablet ? 240 : 180,
                        bottom: isTablet ? -90 : -60,
                        left: isTablet ? -70 : -50,
                    },
                ]}
            />

            <Animated.View
                entering={FadeInDown.springify()}
                style={[
                    styles.card,
                    {
                        maxWidth: isTablet ? 900 : "100%",
                    },
                ]}
            >

                <Img
                    source={require("../../../assets/images/logo.png")}
                    resizeMode="contain"
                    style={[
                        styles.logo,
                        {
                            width: isTablet ? 96 : 72,
                            height: isTablet ? 96 : 72,
                        },
                    ]}
                />
                <Animated.View
                    entering={FadeInRight.delay(250)}
                    style={[
                        styles.details,
                        {
                            marginLeft: isTablet ? 28 : 18,
                        },
                    ]}
                >
                    {isLoggedIn ? (
                        <>
                            <AppText
                                variant="small"
                                color={COLORS.primaryBright}
                                weight="700"
                            >
                                WELCOME BACK 👋
                            </AppText>

                            <AppText
                                variant="heading"
                                weight="700"
                                style={[
                                    styles.name,
                                    {
                                        fontSize: isTablet ? 30 : 26,
                                        lineHeight: isTablet ? 42 : 32,
                                    },
                                ]}
                            >
                                {name}
                            </AppText>

                            {!!email && (
                                <AppText
                                    color={COLORS.textSecondary}
                                >
                                    {email}
                                </AppText>
                            )}

                            <AppText
                                color={COLORS.textSecondary}
                                style={[
                                    styles.caption,
                                    {
                                        fontSize: isTablet ? 18 : 14,
                                        lineHeight: isTablet ? 30 : 20,
                                        maxWidth: isTablet ? 520 : 240,
                                    },
                                ]}
                            >
                                Enjoy uninterrupted radio,
                                podcasts and exclusive events.
                            </AppText>
                        </>
                    ) : (
                        <>
                            <AppText
                                variant="small"
                                color={COLORS.primaryBright}
                                weight="700"
                            >
                                LISTEN • CONNECT • DISCOVER
                            </AppText>

                            <AppText
                                variant="heading"
                                weight="700"
                                style={styles.name}
                            >
                                Welcome to Thaalam
                            </AppText>

                            <AppText
                                color={COLORS.textSecondary}
                                style={styles.caption}
                            >
                                Sign in to continue listening, discover new programs, manage your profile, and stay connected with the Thaalam community.
                            </AppText>
                        </>
                    )}
                </Animated.View>
            </Animated.View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
    },

    blob1: {
        position: "absolute",
        borderRadius: 999,
        backgroundColor: COLORS.primary,
        opacity: 0.08,
    },

    blob2: {
        position: "absolute",
        borderRadius: 999,
        backgroundColor: COLORS.primaryBright,
        opacity: 0.08,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
    },

    logo: {},

    details: {
        flex: 1,
    },

    initial: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.primaryBright,
    },

    name: {
        marginTop: 4,
    },

    caption: {
        marginTop: 10,
    },

});