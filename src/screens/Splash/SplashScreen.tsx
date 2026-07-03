import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from "react-native";

import { useDevice } from "../../utils/device";
import { isOnboardingCompleted } from "../../utils/storage";
import { useNetwork } from "../../providers/NetworkProvider";

const SplashScreen = ({ navigation }: any) => {
    const { isTablet } = useDevice();
    const { isChecking, isOffline } = useNetwork();

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),

                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 6,
                    tension: 50,
                    useNativeDriver: true,
                }),
            ]),

            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        if (isChecking) return;

        const timer = setTimeout(async () => {
            // No Internet
            if (isOffline) {
                navigation.replace("Offline");
                return;
            }

            // Internet available
            const completed = await isOnboardingCompleted();

            if (completed) {
                // navigation.replace("Onboarding");
                navigation.replace("Home");
            } else {
                navigation.replace("Onboarding");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isChecking, isOffline]);

    return (
        <LinearGradient
            colors={[
                "#000000",
                "#050505",
                "#0A0A0A",
                "#000000",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View
                    style={[
                        styles.content,
                        isTablet && styles.tabletContent,
                    ]}
                >
                    <View style={styles.logoContainer}>
                        <Animated.Image
                            source={require("../../assets/images/logo.png")}
                            resizeMode="contain"
                            style={[
                                styles.logo,
                                {
                                    width: isTablet ? 260 : 180,
                                    height: isTablet ? 260 : 180,
                                    opacity: logoOpacity,
                                    transform: [{ scale: logoScale }],
                                },
                            ]}
                        />
                    </View>
                </View>

                <Animated.View
                    style={[
                        styles.footerContainer,
                        {
                            bottom: isTablet ? 80 : 50,
                            opacity: textOpacity,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.tagline,
                            {
                                fontSize: isTablet ? 22 : 16,
                            },
                        ]}
                    >
                        தாளம்... இது தமிழின் அடையாளம்
                    </Text>

                    <Text
                        style={[
                            styles.footer,
                            {
                                fontSize: isTablet ? 18 : 13,
                            },
                        ]}
                    >
                        Radio • Events • Music • News
                    </Text>
                </Animated.View>
            </View>
        </LinearGradient>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    tabletContent: {
        width: "100%",
        maxWidth: 700,
        alignSelf: "center",
    },

    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        zIndex: 2,
    },

    tagline: {
        color: "#D1D5DB",
        marginBottom: 10,
        fontFamily: "InclusiveSans",
        fontWeight: "500",
        letterSpacing: 0.5,
    },

    footerContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
    },

    footer: {
        color: "#9CA3AF",
        fontFamily: "InclusiveSans",
        letterSpacing: 1,
    },
});