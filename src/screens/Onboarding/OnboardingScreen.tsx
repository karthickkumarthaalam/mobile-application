import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ImageBackground,
} from "react-native";

import { useDevice } from "../../utils/device";
import AppText from "../../components/Text/AppText";
import { setOnboardingCompleted } from "../../utils/storage";
import { COLORS } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen({ navigation }: any) {
    const { isTablet } = useDevice();
    const { height } = useWindowDimensions();

    const handleSkip = async () => {
        await setOnboardingCompleted();
        navigation.replace("Home");
    };

    return (
        <ImageBackground
            source={require("../../assets/images/ob.webp")}
            resizeMode="cover"
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSkip}
                    style={[
                        styles.skip,
                        {
                            top: isTablet ? 70 : 60,
                            right: isTablet ? 36 : 24,
                            paddingHorizontal: isTablet ? 22 : 16,
                            paddingVertical: isTablet ? 10 : 8,
                        },
                    ]}
                >
                    <AppText
                        variant="body"
                        weight="600"
                        style={[
                            styles.skipText,
                            {
                                fontSize: isTablet ? 20 : 16,
                            },
                        ]}
                    >
                        Next
                    </AppText>
                </TouchableOpacity>

                <View
                    style={[
                        styles.contentContainer,
                        {
                            left: isTablet ? 40 : 24,
                            right: isTablet ? 40 : 24,
                            bottom: height * 0.18,
                        }
                    ]}
                >
                    <View style={styles.subtitleWrapper}>
                        <View style={styles.accentLine} />
                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    fontSize: isTablet ? 18 : 14,
                                },
                            ]}
                        >
                            WELCOME TO
                        </Text>
                        <View style={styles.accentLine} />
                    </View>

                    <Text
                        style={[
                            styles.live,
                            styles.headingPrimary,
                            {
                                fontSize: isTablet ? 48 : 36,
                                lineHeight: isTablet ? 56 : 42,
                            },
                        ]}
                    >
                        தாளம்
                    </Text>

                    <Text
                        style={[
                            styles.live,
                            styles.headingSecondary,
                            {
                                fontSize: isTablet ? 44 : 32,
                                lineHeight: isTablet ? 52 : 38,
                                marginTop: 4,
                            },
                        ]}
                    >
                        இது தமிழின்
                    </Text>

                    <Text
                        style={[
                            styles.live,
                            styles.headingMain,
                            {
                                fontSize: isTablet ? 64 : 48,
                                lineHeight: isTablet ? 76 : 56,
                                marginTop: 2,
                            },
                        ]}
                    >
                        அடையாளம்
                    </Text>

                    <View style={styles.descriptionWrapper}>
                        <View style={styles.descriptionIcon} />
                        <Text
                            style={[
                                styles.description,
                                {
                                    fontSize: isTablet ? 22 : 17,
                                    lineHeight: isTablet ? 34 : 26,
                                    color: "rgba(255,255,255,0.85)",
                                    maxWidth: isTablet ? 480 : 300,
                                },
                            ]}
                        >
                            சுவிட்சர்லாந்தின் உத்தியோகபூர்வ{"\n"}
                            தமிழ் வானொலி நிலையம்
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.primaryBtn}
                    onPress={handleSkip}
                >
                    <Text style={styles.primaryBtnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skip: {
        position: "absolute",
        zIndex: 999,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    skipText: {
        color: COLORS.background,
    },
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        position: "absolute",
        zIndex: 100,
    },

    subtitleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 12,
    },

    accentLine: {
        flex: 1,
        height: 1,
        backgroundColor: "rgba(228, 30, 38, 0.4)",
        maxWidth: 40,
    },

    subtitle: {
        color: "rgba(228, 30, 38, 0.8)",
        fontFamily: "InclusiveSans",
        fontWeight: "600",
        letterSpacing: 3,
        textTransform: "uppercase",
    },

    live: {
        color: "#e2e1dd",
        fontFamily: "InclusiveSans",
        fontWeight: "900",
    },

    headingPrimary: {
        textShadowColor: "rgba(228, 30, 38, 0.15)",
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 20,
    },

    headingSecondary: {
        opacity: 0.9,
        textShadowColor: "rgba(228, 30, 38, 0.1)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 15,
    },

    headingMain: {
        textShadowColor: "rgba(228, 30, 38, 0.2)",
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 25,
        letterSpacing: 1,
    },


    descriptionWrapper: {
        marginTop: 32,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },

    descriptionIcon: {
        width: 3,
        height: 40,
        backgroundColor: "#E41E26",
        borderRadius: 999,
        opacity: 0.6,
        marginTop: 2,
    },

    description: {
        color: "rgba(255,255,255,0.78)",
        fontFamily: "InclusiveSans",
        fontSize: 17,
        lineHeight: 28,
        letterSpacing: 0.25,
        flex: 1,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 40,
        left: 24,
        right: 24,
    },
    primaryBtn: {
        backgroundColor: COLORS.backgroundDeep,
        paddingVertical: 16,
        borderRadius: 48,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryBtnText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "InclusiveSans",
    }
});