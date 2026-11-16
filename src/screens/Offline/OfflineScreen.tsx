
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { WifiOff, RefreshCw } from "lucide-react-native";
import NetInfo from "@react-native-community/netinfo";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import AppText from "../../components/Text/AppText";
import { useThemedStyles } from "../../providers/ThemeProvider";
import { useNetwork } from "../../providers/NetworkProvider";

export default function OfflineScreen({ navigation }: any) {
    const styles = useThemedStyles(createStyles);
    const { isOffline } = useNetwork();

    const [checking, setChecking] = useState(false);

    useEffect(() => {
        if (!isOffline) {
            navigation.replace("Splash");
        }
    }, [isOffline, navigation]);

    return (
        <LinearGradient
            colors={GRADIENTS.screen}
            style={styles.gradient}
        >
            <SafeAreaView
                style={styles.safeArea}
                edges={["top", "bottom"]}
            >
                <View style={styles.content}>
                    {/* Editorial heading */}
                    <View style={styles.heading}>
                        <View style={styles.eyebrowRow}>
                            <View style={styles.eyebrowLine} />

                            <AppText
                                variant="small"
                                weight="700"
                                color={COLORS.primary}
                                style={styles.eyebrow}
                            >
                                CONNECTION STATUS
                            </AppText>
                        </View>

                        <AppText
                            variant="title"
                            weight="700"
                            style={styles.title}
                        >
                            No Internet Connection
                        </AppText>
                    </View>

                    {/* Feature visual */}
                    <View style={styles.visualSection}>
                        <View style={styles.visual}>
                            <View style={styles.outerRing} />
                            <View style={styles.middleRing} />

                            <View style={styles.iconContainer}>
                                <WifiOff
                                    size={38}
                                    color={COLORS.primary}
                                    strokeWidth={1.7}
                                />
                            </View>

                            <View style={styles.decorDot} />
                            <View style={styles.decorDotSmall} />
                        </View>

                        <View style={styles.visualCaption}>
                            <View style={styles.captionLine} />

                            <AppText
                                variant="small"
                                weight="600"
                                color={COLORS.textSecondary}
                            >
                                CONNECTION INTERRUPTED
                            </AppText>

                            <View style={styles.captionLine} />
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <AppText
                            variant="subHeading"
                            weight="700"
                            align="center"
                            style={styles.descriptionTitle}
                        >
                            Your next favourite moment is waiting.
                        </AppText>

                        <AppText
                            color={COLORS.textSecondary}
                            align="center"
                            style={styles.description}
                        >
                            Check your internet connection to continue
                            listening to live radio, music and programmes
                            on Thaalam.
                        </AppText>
                    </View>

                    {/* Network status */}
                    <View style={styles.status}>
                        <View style={styles.statusDot} />

                        <AppText
                            variant="small"
                            weight="600"
                            color={COLORS.textSecondary}
                        >
                            Waiting for network...
                        </AppText>
                    </View>


                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () =>
    StyleSheet.create({
        gradient: {
            flex: 1,
        },

        safeArea: {
            flex: 1,
        },

        content: {
            flex: 1,
            width: "100%",
            maxWidth: 620,
            alignSelf: "center",
            paddingHorizontal: SPACING.xl,
            paddingTop: SPACING.xxxl,
            paddingBottom: SPACING.xxxl,
        },

        // Heading
        heading: {
            alignItems: "flex-start",
            marginBottom: SPACING.xxl,
        },

        eyebrowRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
        },

        eyebrowLine: {
            width: 22,
            height: 2,
            borderRadius: 2,
            backgroundColor: COLORS.primary,
        },

        eyebrow: {
            letterSpacing: 1.6,
            textTransform: "uppercase",
        },

        title: {
            marginTop: SPACING.md,
            letterSpacing: -1.1,
            lineHeight: 46,
        },

        // Feature visual
        visualSection: {
            alignItems: "center",
            marginTop: SPACING.xxxl,
            marginBottom: SPACING.xxl,
        },

        visual: {
            width: 220,
            height: 220,
            alignItems: "center",
            justifyContent: "center",
        },

        outerRing: {
            position: "absolute",
            width: 210,
            height: 210,
            borderRadius: 105,
            borderWidth: 1,
            borderColor: COLORS.glassBorder,
        },

        middleRing: {
            position: "absolute",
            width: 154,
            height: 154,
            borderRadius: 77,
            borderWidth: 1,
            borderColor: COLORS.primaryBorder,
            backgroundColor: COLORS.primarySoft,
        },

        iconContainer: {
            width: 104,
            height: 104,
            borderRadius: 52,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.primaryBorder,
        },

        decorDot: {
            position: "absolute",
            top: 32,
            right: 32,
            width: 11,
            height: 11,
            borderRadius: 6,
            backgroundColor: COLORS.primary,
        },

        decorDotSmall: {
            position: "absolute",
            bottom: 40,
            left: 28,
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: COLORS.primaryBright,
            opacity: 0.7,
        },

        visualCaption: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.md,
            marginTop: SPACING.lg,
        },

        captionLine: {
            width: 24,
            height: 1,
            backgroundColor: COLORS.glassBorder,
        },

        // Description
        descriptionSection: {
            alignItems: "center",
            paddingHorizontal: SPACING.sm,
        },

        descriptionTitle: {
            letterSpacing: -0.3,
        },

        description: {
            maxWidth: 350,
            marginTop: SPACING.sm,
            lineHeight: 23,
        },

        // Network status
        status: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.sm,
            marginTop: SPACING.xxl,
        },

        statusDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: COLORS.primary,
        },

        // Retry action
        retryButton: {
            height: 48,
            minWidth: 160,
            alignSelf: "center",
            marginTop: SPACING.xl,
            paddingHorizontal: SPACING.xxl,
            borderRadius: 24,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.sm,
        },

        retryButtonDisabled: {
            opacity: 0.7,
        },

        retryText: {
            fontSize: 14,
        },
    });
