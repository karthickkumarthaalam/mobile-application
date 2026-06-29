import { LinearGradient } from "expo-linear-gradient";
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

import { useDevice } from "../../utils/device";

const SecondOnboarding = () => {
    const { width, height } = useWindowDimensions();

    const { isTablet } = useDevice();

    return (
        <LinearGradient
            colors={["#160C05", "#0A0A0E", "#050505", "#120704"]}
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
                    {/* Radio Image */}
                    <Image
                        source={require("../../assets/images/onboarding/radio.png")}
                        resizeMode="contain"
                        style={[
                            styles.radio,
                            {
                                width: isTablet ? 520 : 360,
                                height: isTablet ? 520 : 360,
                                top: isTablet ? 30 : 160,
                                left: isTablet ? 50 : -20,
                            },
                        ]}
                    />

                    {/* Content */}
                    <View
                        style={[
                            {
                                position: "absolute",
                                left: isTablet ? 40 : 24,
                                bottom: isTablet ? 180 : height * 0.18,
                                zIndex: 100,
                            },
                        ]}
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
                            Tune In.
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
                            Stay
                        </Text>

                        <Text
                            style={[
                                styles.highlight,
                                {
                                    fontSize: isTablet ? 60 : 46,
                                    lineHeight: isTablet ? 66 : 52,
                                },
                            ]}
                        >
                            Connected.
                        </Text>

                        <Text
                            style={[
                                styles.description,
                                {
                                    fontSize: isTablet ? 22 : 17,
                                    lineHeight: isTablet ? 34 : 28,
                                    marginTop: isTablet ? 30 : 20,
                                },
                            ]}
                        >
                            Listen live to your favourite{"\n"}
                            shows anytime, anywhere.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SecondOnboarding;

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

    radio: {
        position: "absolute",
        alignSelf: "center",
    },

    content: {
        position: "absolute",
        bottom: 120,
        width: "100%",
    },

    title: {
        color: "#FFFFFF",
        fontFamily: "InclusiveSans",
    },

    highlight: {
        color: "#f39e1f",
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    description: {
        color: "rgba(255,255,255,0.68)",
        fontFamily: "InclusiveSans",
    },
});
