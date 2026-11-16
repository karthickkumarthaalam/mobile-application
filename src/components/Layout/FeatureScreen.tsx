
import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { LucideIcon } from "lucide-react-native";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import AppText from "../Text/AppText";
import { useThemedStyles } from "../../providers/ThemeProvider";

interface FeatureScreenProps {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function FeatureScreen({
    icon: Icon,
    eyebrow,
    title,
    description,
    children,
}: FeatureScreenProps) {
    const styles = useThemedStyles(createStyles);

    return (
        <LinearGradient
            colors={GRADIENTS.screen}
            style={styles.gradient}
        >
            <SafeAreaView
                style={styles.safeArea}
                edges={["top", "bottom"]}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
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
                                    {eyebrow}
                                </AppText>
                            </View>

                            <AppText
                                variant="title"
                                weight="700"
                                style={styles.title}
                            >
                                {title}
                            </AppText>
                        </View>

                        {/* Feature visual */}
                        <View style={styles.visualSection}>
                            <View style={styles.visual}>
                                <View style={styles.outerRing} />
                                <View style={styles.middleRing} />

                                <View style={styles.iconContainer}>
                                    <Icon
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
                                    MADE FOR YOUR RHYTHM
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
                                Something worth exploring.
                            </AppText>

                            <AppText
                                color={COLORS.textSecondary}
                                align="center"
                                style={styles.description}
                            >
                                {description}
                            </AppText>
                        </View>

                        {/* Optional actions or additional content */}
                        {children && (
                            <View style={styles.children}>
                                {children}
                            </View>
                        )}
                    </View>
                </ScrollView>
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

        scrollContent: {
            flexGrow: 1,
        },

        content: {
            flexGrow: 1,
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
            top: 35,
            right: 32,
            width: 11,
            height: 11,
            borderRadius: 6,
            backgroundColor: COLORS.primary,
        },

        decorDotSmall: {
            position: "absolute",
            bottom: 42,
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

        // Child content
        children: {
            width: "100%",
            marginTop: SPACING.xxl,
        },
    });
