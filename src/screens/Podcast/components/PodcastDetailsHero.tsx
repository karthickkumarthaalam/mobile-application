import React from "react";
import { Dimensions, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { ArrowLeft, MoreHorizontal } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
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

    return (
        <>
            <View style={styles.header}>
                <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={8}>
                    <ArrowLeft size={22} color={COLORS.textSecondary} />
                </Pressable>

                <View style={styles.brand}>
                    <AppText style={styles.eyebrow}>NOW PLAYING FROM</AppText>
                    <AppText weight="700" style={styles.brandTitle}>Thaalam Podcasts</AppText>
                </View>

                <MoreHorizontal size={20} color={COLORS.textSecondary} />
            </View>

            <View style={styles.artworkWrap}>
                <ImageBackground source={{ uri: podcast.image_url }} style={styles.artwork} imageStyle={styles.artworkImage}>
                    <View style={styles.artworkShade} />
                </ImageBackground>
            </View>

            <View style={styles.info}>
                <AppText variant="subHeading" weight="700" numberOfLines={3} style={styles.title}>
                    {podcast.title}
                </AppText>
                {!!podcast.rjname && <AppText color={COLORS.textMuted}>{podcast.rjname}</AppText>}
            </View>
        </>
    );
}

const createStyles = () => StyleSheet.create({
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg,
    },
    brand: { alignItems: "center" },
    eyebrow: { color: COLORS.textMuted, fontSize: 10, letterSpacing: 1.5 },
    brandTitle: { fontSize: 18, color: COLORS.text },
    artworkWrap: { alignItems: "center", paddingTop: 28 },
    artwork: { width: ARTWORK_SIZE, height: ARTWORK_SIZE, borderRadius: RADIUS.xl, overflow: "hidden" },
    artworkImage: { borderRadius: RADIUS.xl, backgroundColor: COLORS.glass },
    artworkShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.12)" },
    info: { alignItems: "center", paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl },
    title: { textAlign: "center", lineHeight: 27, marginBottom: SPACING.xs },
});
