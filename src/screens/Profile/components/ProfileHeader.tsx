
import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LogIn, ChevronRight, Radio } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
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
    const { isTablet } = useDevice();
    const { isDark } = useTheme();


    return (
        <LinearGradient
            colors={
                isDark
                    ? ["#171717", "#111111"]
                    : ["#FFFFFF", "#F9F9FB"]
            }
            style={[
                styles.container,
                {
                    paddingTop: isTablet ? 64 : 48,
                    paddingHorizontal: isTablet ? 48 : SPACING.xl,
                    paddingBottom: isTablet ? 36 : 28,
                },
            ]}
        >
            <Animated.View
                entering={FadeInDown.duration(450)}
                style={[
                    styles.content,
                    {
                        maxWidth: isTablet ? 1000 : "100%",
                    },
                ]}
            >
                {/* Top section */}
                <View style={styles.topRow}>
                    <View
                        style={[
                            styles.logoContainer,
                            {
                                backgroundColor: COLORS.secondaryBackground,
                                borderColor: COLORS.borderColor,
                                width: isTablet ? 68 : 58,
                                height: isTablet ? 68 : 58,
                            },
                        ]}
                    >
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            resizeMode="contain"
                            style={{
                                width: isTablet ? 43 : 36,
                                height: isTablet ? 43 : 36,
                            }}
                        />
                    </View>

                    <View style={styles.brandInfo}>
                        <AppText
                            weight="700"
                            color={COLORS.primaryText}
                            style={{ fontSize: isTablet ? 17 : 15 }}
                        >
                            Thaalam
                        </AppText>

                        <View style={styles.brandSubtitle}>
                            <Radio
                                size={12}
                                color={COLORS.primaryBright}
                            />
                            <AppText
                                color={COLORS.mutedText}
                                style={{ fontSize: 11 }}
                            >
                                Your Tamil audio companion
                            </AppText>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor: isDark
                                    ? "rgba(34,197,94,0.10)"
                                    : "rgba(34,197,94,0.08)",
                            },
                        ]}
                    >
                        <View style={styles.statusDot} />
                        <AppText
                            color="#22A06B"
                            weight="600"
                            style={{ fontSize: 10 }}
                        >
                            {isLoggedIn ? "MEMBER" : "WELCOME"}
                        </AppText>
                    </View>
                </View>

                {/* Divider */}
                <View
                    style={[
                        styles.divider,
                        { backgroundColor: COLORS.borderColor },
                    ]}
                />

                {/* Profile content */}
                {isLoggedIn ? (
                    <View style={styles.profileContent}>
                        <AppText
                            color={COLORS.primaryBright}
                            weight="700"
                            style={styles.eyebrow}
                        >
                            YOUR ACCOUNT
                        </AppText>

                        <AppText
                            color={COLORS.primaryText}
                            weight="700"
                            style={[
                                styles.heading,
                                {
                                    fontSize: isTablet ? 30 : 25,
                                    lineHeight: isTablet ? 40 : 33,
                                },
                            ]}
                        >
                            Hello, {name?.trim() || "Listener"}
                        </AppText>

                        {!!email && (
                            <AppText
                                color={COLORS.mutedText}
                                style={styles.email}
                            >
                                {email}
                            </AppText>
                        )}

                        <AppText
                            color={COLORS.mutedText}
                            style={[
                                styles.description,
                                {
                                    maxWidth: isTablet ? 560 : 310,
                                    fontSize: isTablet ? 15 : 13,
                                    lineHeight: isTablet ? 24 : 21,
                                },
                            ]}
                        >
                            Your favourite Tamil radio, podcasts and
                            exclusive programs are all in one place.
                        </AppText>
                    </View>
                ) : (
                    <View style={styles.profileContent}>
                        <AppText
                            color={COLORS.primaryBright}
                            weight="700"
                            style={styles.eyebrow}
                        >
                            LISTEN • CONNECT • DISCOVER
                        </AppText>

                        <AppText
                            color={COLORS.primaryText}
                            weight="700"
                            style={[
                                styles.heading,
                                {
                                    fontSize: isTablet ? 30 : 25,
                                    lineHeight: isTablet ? 40 : 33,
                                },
                            ]}
                        >
                            Welcome to Thaalam
                        </AppText>

                        <AppText
                            color={COLORS.mutedText}
                            style={[
                                styles.description,
                                {
                                    maxWidth: isTablet ? 600 : 310,
                                    fontSize: isTablet ? 15 : 13,
                                    lineHeight: isTablet ? 24 : 21,
                                },
                            ]}
                        >
                            Sign in to manage your profile, explore
                            programs and stay connected with the
                            Thaalam community.
                        </AppText>

                        <Pressable
                            onPress={onLogin}
                            style={({ pressed }) => [
                                styles.loginButton,
                                {
                                    backgroundColor: pressed
                                        ? "#B91C1C"
                                        : COLORS.primary,
                                    transform: [{ scale: pressed ? 0.98 : 1 }],
                                },
                            ]}
                        >
                            <View style={styles.loginButtonContent}>
                                <View style={styles.loginIcon}>
                                    <LogIn
                                        size={19}
                                        color="#FFFFFF"
                                        strokeWidth={2.3}
                                    />
                                </View>

                                <View style={styles.loginButtonText}>
                                    <AppText
                                        color="#FFFFFF"
                                        weight="700"
                                        style={styles.loginText}
                                    >
                                        Sign in to Thaalam
                                    </AppText>

                                    <AppText
                                        color="#FFFFFF"
                                        style={styles.loginSubtext}
                                    >
                                        Access your personal account
                                    </AppText>
                                </View>
                            </View>

                            <ChevronRight
                                size={21}
                                color="#FFFFFF"
                                strokeWidth={2}
                            />
                        </Pressable>
                    </View>
                )}
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: "hidden",
    },

    content: {
        width: "100%",
        alignSelf: "center",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
        borderWidth: 1,
    },

    brandInfo: {
        flex: 1,
        marginLeft: 14,
    },

    brandSubtitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 4,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 10,
        backgroundColor: "#22A06B",
    },

    divider: {
        height: 1,
        marginTop: 24,
        marginBottom: 24,
    },

    profileContent: {
        alignItems: "flex-start",
    },

    eyebrow: {
        fontSize: 10,
        letterSpacing: 1.2,
    },

    heading: {
        marginTop: 7,
    },

    email: {
        fontSize: 13,
        marginTop: 5,
    },

    description: {
        marginTop: 12,
    },

    loginButton: {
        width: "100%",
        maxWidth: 340,
        minHeight: 66,
        borderRadius: 15,
        paddingHorizontal: 17,
        paddingVertical: 11,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 22,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },

    loginButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
    },

    loginIcon: {
        width: 39,
        height: 39,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.16)",
    },

    loginButtonText: {
        gap: 3,
    },

    loginText: {
        fontSize: 14,
    },

    loginSubtext: {
        fontSize: 10,
        opacity: 0.8,
    },
});
