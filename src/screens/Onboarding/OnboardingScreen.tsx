import React, { useRef, useState } from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";



import { useDevice } from "../../utils/device";
import PrimaryButton from "../../components/Button/PrimaryButton";
import AppText from "../../components/Text/AppText";
import { setOnboardingCompleted } from "../../utils/storage";
import { ArrowRight } from "lucide-react-native";
import { COLORS } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen({ navigation }: any) {
    const { isTablet } = useDevice();
    const { width, height } = useWindowDimensions();


    const handleGetStarted = async () => {
        await setOnboardingCompleted();
        navigation.replace("Home");
    };

    const handleSkip = async () => {
        await setOnboardingCompleted();
        navigation.replace("Home");
    };

    return (
        <LinearGradient
            colors={["#070017", "#050505", "#2e0909", "#120104"]}
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

                <Image
                    source={require("../../assets/images/onboarding/mic.png")}
                    resizeMode="contain"
                    style={{
                        position: "absolute",
                        right: isTablet ? -30 : -width * 0.08,
                        bottom: isTablet ? -60 : -30,
                        width: isTablet ? 520 : width * 0.95,
                        height: isTablet ? 900 : height * 0.95,
                        zIndex: 10,
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        left: isTablet ? 40 : 24,
                        right: isTablet ? 40 : 24,
                        bottom: height * 0.18,
                        zIndex: 100,
                    }}
                >
                    <Image
                        source={require("../../assets/images/logo.png")}
                        resizeMode="contain"
                        style={{
                            width: isTablet ? 220 : 170,
                            height: isTablet ? 80 : 60,
                            marginBottom: 12,
                            marginLeft: -36,
                        }}
                    />
                    <Text
                        style={[
                            styles.live,
                            {
                                marginTop: 8,
                                fontSize: isTablet ? 44 : 32,
                                lineHeight: isTablet ? 52 : 38,
                            },
                        ]}
                    >
                        இது தமிழின்
                    </Text>

                    <Text
                        style={[
                            styles.live,
                            {
                                marginTop: 4,
                                fontSize: isTablet ? 60 : 48,
                                lineHeight: isTablet ? 76 : 58,
                            },
                        ]}
                    >
                        அடையாளம்
                    </Text>

                    <View style={styles.divider} />

                    <Text
                        style={[
                            styles.description,
                            {
                                fontSize: isTablet ? 22 : 17,
                                lineHeight: isTablet ? 34 : 28,
                                color: "rgba(255,255,255,0.75)",
                                maxWidth: isTablet ? 480 : 300,
                            },
                        ]}
                    >
                        சுவிட்சர்லாந்தின் உத்தியோகபூர்வ{"\n"}
                        தமிழ் வானொலி நிலையம்
                    </Text>
                </View>


            </SafeAreaView>
            <View style={styles.bottomContainer}>
                <PrimaryButton
                    title={"Get Started"}
                    size="lg"
                    onPress={handleSkip}
                    rightIcon={
                        <ArrowRight
                            size={20}
                            color={COLORS.white}
                            strokeWidth={2.5}
                        />
                    }
                />
            </View>

        </LinearGradient>
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
        color: COLORS.text,
    },

    safeArea: {
        flex: 1
    },

    redGlow: {
        position: "absolute",
        backgroundColor: "#E41E26",
        opacity: 0.12,
    },

    live: {
        color: "#e2e1dd",
        fontFamily: "InclusiveSans",
        fontWeight: "900",
    },

    description: {
        color: "rgba(255,255,255,0.78)",
        fontFamily: "InclusiveSans",
        fontSize: 17,
        lineHeight: 28,
        letterSpacing: 0.25,
    },

    divider: {
        width: 64,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#E41E26",
        marginTop: 28,
        marginBottom: 24,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 40,
        left: 24,
        right: 24,
    },
});
