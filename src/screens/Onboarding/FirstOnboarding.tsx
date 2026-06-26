import React from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useDevice } from "../../utils/device";

const FirstOnboarding = () => {
    const { width, height } = useWindowDimensions();
    const { isTablet } = useDevice();

    return (
        <LinearGradient
            colors={["#070017", "#050505", "#050505", "#120104"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <StatusBar barStyle="light-content" />

            <SafeAreaView style={styles.safeArea}>
                <View
                    style={[
                        styles.container,
                        {
                            maxWidth: isTablet ? 700 : "100%",
                        },
                    ]}
                >
                    {/* Red Glow */}
                    <View
                        style={[
                            styles.redGlow,
                            {
                                width: isTablet ? 380 : 260,
                                height: isTablet ? 380 : 260,
                                borderRadius: isTablet ? 190 : 130,
                                right: isTablet ? 20 : -20,
                                top: isTablet ? 120 : 80,
                            },
                        ]}
                    />

                    {/* Mic */}
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

                    {/* Text */}
                    <View
                        style={{
                            position: "absolute",
                            left: isTablet ? 40 : 24,
                            bottom: isTablet ? 180 : height * 0.18,
                            zIndex: 100,
                        }}
                    >
                        <Text
                            style={[
                                styles.title,
                                {
                                    fontSize: isTablet ? 54 : 40,
                                    lineHeight: isTablet ? 60 : 46,
                                },
                            ]}
                        >
                            Feel.
                        </Text>

                        <Text
                            style={[
                                styles.title,
                                {
                                    fontSize: isTablet ? 54 : 40,
                                    lineHeight: isTablet ? 60 : 46,
                                },
                            ]}
                        >
                            The Rhythm.
                        </Text>

                        <Text
                            style={[
                                styles.live,
                                {
                                    fontSize: isTablet ? 62 : 50,
                                    lineHeight: isTablet ? 68 : 56,
                                },
                            ]}
                        >
                            Live.
                        </Text>

                        <Text
                            style={[
                                styles.description,
                                {
                                    marginTop: isTablet ? 34 : 24,
                                    fontSize: isTablet ? 22 : 17,
                                    lineHeight: isTablet ? 34 : 28,
                                },
                            ]}
                        >
                            Your voice. Your music.
                            {"\n"}
                            Your station.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default FirstOnboarding;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        overflow: "hidden",
    },

    redGlow: {
        position: "absolute",
        backgroundColor: "#E41E26",
        opacity: 0.12,
    },

    title: {
        color: "#FFFFFF",
        fontFamily: "InclusiveSans",
        fontWeight: "400",
    },

    live: {
        color: "#E41E26",
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    description: {
        color: "#BDBDBD",
        fontFamily: "InclusiveSans",
    },
});