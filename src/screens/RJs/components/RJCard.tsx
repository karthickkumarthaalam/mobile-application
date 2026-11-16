
import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Mic2, Radio, AudioLines } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { RJ } from "../../../types/rj";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface RJCardProps {
    rj: RJ;
}

const FALLBACK_IMAGE =
    "https://thaalam.ch/assets/img/logo/thalam-logo.png";

export default function RJCard({ rj }: RJCardProps) {
    const styles = useThemedStyles(createStyles);
    const [imageFailed, setImageFailed] = useState(false);

    const imageUri =
        rj.image && !imageFailed
            ? `https://api.thaalam.ch/api/${rj.image.replace(/\\/g, "/")}`
            : FALLBACK_IMAGE;

    const description =
        rj.description?.trim() ||
        `${rj.name} is one of Thaalam Radio's voices, bringing energy and passion to every show.`;

    const showCategories = Array.from(
        new Set(
            (rj.shows ?? [])
                .map((show) => show.category?.trim())
                .filter((category): category is string => Boolean(category))
        )
    ).slice(0, 3);

    return (
        <View style={styles.container}>
            {/* Editorial portrait */}
            <View style={styles.portraitContainer}>
                <ImageBackground
                    source={{ uri: imageUri }}
                    style={styles.image}
                    imageStyle={styles.imageRadius}
                    resizeMode="cover"
                    onError={() => setImageFailed(true)}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.18)",
                            "rgba(0,0,0,0.82)",
                        ]}
                        locations={[0.32, 0.64, 1]}
                        style={styles.imageGradient}
                    />

                    <View style={styles.portraitTop}>
                        <View style={styles.brandLabel}>
                            <Radio
                                size={13}
                                color="#FFFFFF"
                                strokeWidth={2}
                            />
                            <AppText
                                variant="small"
                                weight="700"
                                color="#FFFFFF"
                                style={styles.brandLabelText}
                            >
                                THAALAM ORIGINAL
                            </AppText>
                        </View>


                    </View>

                    <View style={styles.portraitContent}>
                        <AppText
                            variant="small"
                            weight="700"
                            color="#FFFFFF"
                            style={styles.portraitEyebrow}
                        >
                            THE VOICE BEHIND THE SHOW
                        </AppText>

                        <AppText
                            variant="heading"
                            weight="700"
                            color="#FFFFFF"
                            style={styles.name}
                        >
                            {rj.name}
                        </AppText>

                        <View style={styles.nameUnderline}>
                            <View style={styles.nameUnderlineAccent} />
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/* Presenter information */}
            <View style={styles.details}>
                <View style={styles.sectionHeading}>
                    <View style={styles.sectionHeadingLeft}>
                        <View style={styles.sectionIndicator} />
                        <AppText
                            variant="small"
                            weight="700"
                            color={COLORS.gold}
                            style={styles.sectionLabel}
                        >
                            MEET THE PRESENTER
                        </AppText>
                    </View>

                    <AudioLines
                        size={19}
                        color={COLORS.textMuted}
                        strokeWidth={1.6}
                    />
                </View>

                <AppText
                    color={COLORS.text}
                    style={styles.description}
                >
                    {description}
                </AppText>

                {/* Show categories */}
                {showCategories.length > 0 && (
                    <View style={styles.showSection}>
                        <AppText
                            variant="small"
                            weight="700"
                            color={COLORS.textMuted}
                            style={styles.showHeading}
                        >
                            ON THAALAM
                        </AppText>

                        <View style={styles.showTags}>
                            {showCategories.map((category) => (
                                <View
                                    key={category}
                                    style={styles.showTag}
                                >
                                    <View style={styles.tagDot} />
                                    <AppText
                                        variant="small"
                                        weight="600"
                                        color={COLORS.textSecondary}
                                    >
                                        {category}
                                    </AppText>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            width: "100%",
        },

        // Portrait
        portraitContainer: {
            marginHorizontal: SPACING.xl,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: COLORS.surface,
        },

        image: {
            width: "100%",
            aspectRatio: 0.86,
            justifyContent: "space-between",
            backgroundColor: COLORS.surface,
        },

        imageRadius: {
            borderRadius: 24,
        },

        imageGradient: {
            ...StyleSheet.absoluteFillObject,
        },

        portraitTop: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: SPACING.lg,
        },

        brandLabel: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.sm,
            borderRadius: 999,
            backgroundColor: "rgba(0,0,0,0.42)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.18)",
        },

        brandLabelText: {
            fontSize: 9,
            letterSpacing: 1.2,
        },

        micBadge: {
            width: 38,
            height: 38,
            borderRadius: 19,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.38)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
        },

        portraitContent: {
            paddingHorizontal: SPACING.xl,
            paddingBottom: SPACING.xxl,
        },

        portraitEyebrow: {
            fontSize: 9,
            letterSpacing: 2,
            opacity: 0.85,
            marginBottom: SPACING.sm,
        },

        name: {

            letterSpacing: -1.1,
            maxWidth: "100%",
        },

        nameUnderline: {
            width: 46,
            height: 3,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.35)",
            marginTop: SPACING.md,
        },

        nameUnderlineAccent: {
            width: 22,
            height: 3,
            borderRadius: 2,
            backgroundColor: COLORS.gold,
        },

        // Details
        details: {
            marginHorizontal: SPACING.xl,
            marginTop: SPACING.xl,
        },

        sectionHeading: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },

        sectionHeadingLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
        },

        sectionIndicator: {
            width: 3,
            height: 15,
            borderRadius: 2,
            backgroundColor: COLORS.gold,
        },

        sectionLabel: {
            fontSize: 10,
            letterSpacing: 1.3,
        },

        description: {
            marginTop: SPACING.md,
            fontSize: 13,
            lineHeight: 25,
            letterSpacing: 0.1,
            color: COLORS.primaryText
        },

        // Categories
        showSection: {
            marginTop: SPACING.xl,
            paddingTop: SPACING.lg,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: COLORS.glassBorder,
        },

        showHeading: {
            fontSize: 9,
            letterSpacing: 1.5,
            marginBottom: SPACING.md,
        },

        showTags: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: SPACING.sm,
        },

        showTag: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.sm,
            borderRadius: 999,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: COLORS.glassBorder,
            backgroundColor: COLORS.surface,
        },

        tagDot: {
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: COLORS.primary,
        },
    });
