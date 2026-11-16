import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { ArrowLeft, CalendarDays, Mic, Mic2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { Podcast } from "../../../types/podcast";
import { useThemedStyles } from "../../../providers/ThemeProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ARTWORK_SIZE = SCREEN_WIDTH - SPACING.xl * 2;

interface PodcastDetailsHeroProps {
    podcast: Podcast;
    onBack: () => void;
}

export default function PodcastDetailsHero({ podcast, onBack }: PodcastDetailsHeroProps) {
    const styles = useThemedStyles(createStyles);
    const [imageFailed, setImageFailed] = useState(false);
    useEffect(() => setImageFailed(false), [podcast.image_url]);

    const date = podcast.date ? new Date(podcast.date) : null;
    const publishedDate = date && !Number.isNaN(date.getTime())
        ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date)
        : undefined;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={8}>
                    <ArrowLeft size={21} color={COLORS.text} />
                </Pressable>

                <View style={styles.brand}>
                    <AppText style={styles.eyebrow}>NOW PLAYING FROM</AppText>
                    <AppText variant="small" weight="700" style={styles.brandTitle}>THAALAM PODCASTS</AppText>
                </View>

                <View style={styles.headerBalance} />
            </View>

            <View style={styles.artworkWrap}>
                <View style={styles.artwork}>
                    {podcast.image_url && !imageFailed ? (
                        <Image
                            source={{ uri: podcast.image_url }}
                            onError={() => setImageFailed(true)}
                            style={styles.artworkImage}
                        />
                    ) : (
                        <LinearGradient colors={GRADIENTS.primary} style={styles.fallbackArtwork}>
                            <View style={styles.fallbackGlow} />
                            <Mic2 size={76} color={COLORS.white} strokeWidth={1.35} />
                            <AppText variant="small" weight="700" color={COLORS.white} style={styles.fallbackLabel}>
                                THAALAM PODCASTS
                            </AppText>
                        </LinearGradient>
                    )}
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.32)"]}
                        style={styles.artworkShade}
                    />
                </View>
            </View>

            <View style={styles.info}>
                <View style={styles.titleBlock}>
                    <AppText variant="body" weight="700" numberOfLines={3} style={styles.title}>
                        {podcast.title || "Untitled podcast"}
                    </AppText>


                    <View style={styles.metadata}>
                        {!!podcast.rjname && (
                            <View style={styles.metadataItem}>
                                <Mic size={15} color={COLORS.primaryText} />
                                <AppText variant="caption" color={COLORS.primaryText} style={styles.metadataText}>
                                    {podcast.rjname}
                                </AppText>
                            </View>
                        )}
                        {!!publishedDate && (
                            <View style={styles.metadataItem}>
                                <CalendarDays size={15} color={COLORS.primaryText} />
                                <AppText variant="caption" color={COLORS.primaryText} style={styles.metadataText}>
                                    {publishedDate}
                                </AppText>
                            </View>
                        )}
                    </View>
                </View>
                {!!podcast.category?.name && (
                    <View style={styles.categoryBadge}>
                        <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                            {podcast.category.name}
                        </AppText>
                    </View>
                )}
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        paddingTop: SPACING.sm,
    },
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg,
    },
    brand: { alignItems: "center" },
    eyebrow: { color: COLORS.textMuted, fontSize: 9, letterSpacing: 1.5, marginBottom: 2 },
    brandTitle: { color: COLORS.text, letterSpacing: 1.1 },
    headerBalance: { width: 22 },
    artworkWrap: { alignItems: "center", paddingTop: SPACING.xl },
    artwork: {
        width: ARTWORK_SIZE,
        height: ARTWORK_SIZE,
        borderRadius: RADIUS.md,
        overflow: "hidden",
        backgroundColor: COLORS.surfaceElevated,
        shadowColor: COLORS.glassShadow,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.22,
        shadowRadius: 18,
        elevation: 8,
    },
    artworkImage: { width: "100%", height: "100%" },
    fallbackArtwork: { flex: 1, alignItems: "center", justifyContent: "center" },
    fallbackGlow: {
        position: "absolute",
        width: 240,
        height: 240,
        top: -110,
        right: -85,
        borderRadius: 120,
        backgroundColor: "rgba(255,255,255,0.13)",
    },
    fallbackLabel: { marginTop: SPACING.lg, letterSpacing: 2 },
    artworkShade: { ...StyleSheet.absoluteFillObject },
    info: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
    },
    titleBlock: { flex: 1, marginRight: SPACING.md },
    title: { lineHeight: 32 },
    categoryBadge: {
        maxWidth: 120,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primarySoft,
    },
    metadata: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.md,
        marginTop: SPACING.md,

    },
    metadataItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    metadataText: {
        marginLeft: SPACING.xs,
        fontSize: 13,
    },
});
