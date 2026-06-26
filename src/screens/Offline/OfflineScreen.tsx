import React, { useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshCw, WifiOff } from "lucide-react-native";

import NetInfo from "@react-native-community/netinfo";

import { useNetwork } from "../../providers/NetworkProvider";
import { useDevice } from "../../utils/device";

export default function OfflineScreen({ navigation }: any) {
    const { isOffline } = useNetwork();
    const { isTablet } = useDevice();

    useEffect(() => {
        if (!isOffline) {
            navigation.replace("Splash");
        }
    }, [isOffline, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={[
                    styles.content,
                    isTablet && styles.tabletContent,
                ]}
            >
                <Image
                    source={require("../../assets/images/logo.png")}
                    resizeMode="contain"
                    style={[
                        styles.logo,
                        {
                            width: isTablet ? 120 : 90,
                            height: isTablet ? 120 : 90,
                        },
                    ]}
                />

                <View style={styles.glassCard}>
                    <View style={styles.iconWrapper}>
                        <WifiOff
                            size={isTablet ? 56 : 46}
                            color="#FFFFFF"
                            strokeWidth={1.8}
                        />
                    </View>

                    <Text
                        style={[
                            styles.title,
                            {
                                fontSize: isTablet ? 30 : 24,
                            },
                        ]}
                    >
                        No Internet Connection
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            {
                                fontSize: isTablet ? 17 : 15,
                            },
                        ]}
                    >
                        Stay connected to continue listening to
                        {"\n"}
                        live radio, music and programmes.
                    </Text>

                    <View style={styles.status}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>
                            Waiting for network...
                        </Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0E",
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
    },

    tabletContent: {
        width: "100%",
        maxWidth: 520,
        alignSelf: "center",
    },

    logo: {
        marginBottom: 36,
    },

    glassCard: {
        width: "100%",
        alignItems: "center",

    },

    iconWrapper: {
        width: 82,
        height: 82,

        borderRadius: 41,

        backgroundColor: "rgba(228,30,38,0.15)",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 24,

        borderWidth: 1,
        borderColor: "rgba(228,30,38,0.35)",
    },

    title: {
        color: "#FFFFFF",
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        marginTop: 16,

        color: "rgba(255,255,255,0.65)",

        textAlign: "center",

        lineHeight: 25,

        fontFamily: "InclusiveSans",
    },

    status: {
        marginTop: 26,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,0.05)",

        borderRadius: 50,

        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    statusDot: {
        width: 8,
        height: 8,

        borderRadius: 4,

        backgroundColor: "#22C55E",

        marginRight: 8,
    },

    statusText: {
        color: "#D1D5DB",
        fontSize: 13,
        fontFamily: "InclusiveSans",
    },

});