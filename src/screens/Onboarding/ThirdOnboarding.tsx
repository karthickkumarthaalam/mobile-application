import React from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useDevice } from "../../utils/device";

const ThirdOnboarding = () => {
    const { isTablet } = useDevice();

    return (
        <LinearGradient
            colors={["#0b394e", "#0D0917", "#050505"]}
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
                    {/* Ticket */}
                    <Image
                        source={require("../../assets/images/onboarding/ticket.png")}
                        resizeMode="contain"
                        style={[
                            styles.ticket,
                            {
                                width: isTablet ? 500 : 340,
                                height: isTablet ? 500 : 340,
                            },
                        ]}
                    />

                    <View
                        style={[
                            styles.content,
                            {
                                paddingHorizontal: isTablet ? 40 : 24,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.title,
                                {
                                    fontSize: isTablet ? 54 : 40,
                                },
                            ]}
                        >
                            Experience
                        </Text>

                        <Text
                            style={[
                                styles.highlight,
                                {
                                    fontSize: isTablet ? 58 : 46,
                                },
                            ]}
                        >
                            Live Events.
                        </Text>

                        <Text
                            style={[
                                styles.description,
                                {
                                    fontSize: isTablet ? 22 : 17,
                                },
                            ]}
                        >
                            Discover concerts,{"\n"}
                            community gatherings and{"\n"}
                            book tickets instantly.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ThirdOnboarding;

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

    ticket: {
        position: "absolute",
        alignSelf: "center",
        top: 80,
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
        color: "#67dcff",
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    description: {
        color: "#D1D5DB",
        fontFamily: "InclusiveSans",
        marginTop: 24,
        lineHeight: 28,
    },
});