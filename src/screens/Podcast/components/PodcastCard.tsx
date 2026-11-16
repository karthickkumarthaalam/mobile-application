import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { Clock3, Mic2, PodcastIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../../components/Text/AppText";

import { COLORS } from "../../../constants/colors";
import { SPACING, RADIUS } from "../../../constants/spacing";

import { Podcast } from "../../../types/podcast";
import { useThemedStyles } from "../../../providers/ThemeProvider";

const ARTWORK_COLORS: [string, string][] = [
    ["#B91C1C", "#F97316"],
    ["#6D28D9", "#DB2777"],
    ["#0369A1", "#06B6D4"],
    ["#047857", "#84CC16"],
    ["#BE185D", "#FB7185"],
    ["#B45309", "#F59E0B"],
];

function getArtworkColors(id: number): [string, string] {
    const colorIndex = Math.abs(id) % ARTWORK_COLORS.length;
    return ARTWORK_COLORS[colorIndex];
}

interface PodcastCardProps {
    podcast: Podcast;
    onPress: (podcast: Podcast) => void;
    layout?: "tile" | "row";
}

export default function PodcastCard({
    podcast,
    onPress,
    layout = "tile",
}: PodcastCardProps) {
    const styles = useThemedStyles(createStyles);
    const [imageFailed, setImageFailed] = React.useState(false);

    return (
        <Pressable
            onPress={() => onPress(podcast)}
            style={({ pressed }) => [
                layout === "tile" ? styles.tile : styles.row,
                pressed && styles.pressed,
            ]}
        >
            <View style={layout === "tile" ? styles.tileArtwork : styles.rowArtwork}>
                {podcast.image_url && !imageFailed ? (
                    <Image
                        source={{ uri: podcast.image_url }}
                        onError={() => setImageFailed(true)}
                        style={styles.artworkImage}
                    />
                ) : (
                    <LinearGradient
                        colors={getArtworkColors(podcast.id)}
                        style={styles.artworkFallback}
                    >
                        <View style={styles.iconBadge}>
                            <PodcastIcon
                                size={layout === "tile" ? 28 : 18}
                                color={COLORS.white}
                                strokeWidth={1.7}
                            />
                        </View>
                    </LinearGradient>
                )}
            </View>

            <View style={layout === "tile" ? styles.tileContent : styles.rowContent}>
                <AppText
                    variant="small"
                    weight="700"
                    numberOfLines={2}
                    style={styles.title}
                    color={COLORS.primaryText}
                >
                    {podcast.title || "Untitled podcast"}
                </AppText>


            </View>
        </Pressable>
    );
}

const createStyles = () => StyleSheet.create({
    tile: {
        width: 120,
        padding: 5,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.glassStrong,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: SPACING.sm,
        marginBottom: SPACING.sm,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },

    pressed: {
        opacity: 0.78,
        transform: [{ scale: 0.98 }],
    },

    tileArtwork: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: RADIUS.sm,
        overflow: "hidden",
    },

    rowArtwork: {
        width: 68,
        height: 68,
        borderRadius: RADIUS.md,
        overflow: "hidden",
    },

    artworkImage: {
        width: "100%",
        height: "100%",
    },

    artworkFallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    iconBadge: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.pill,
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.32)",
    },

    tileContent: {
        marginTop: SPACING.md,
    },

    rowContent: {
        flex: 1,
        marginLeft: SPACING.md,
        justifyContent: "center",
    },

    title: {
        lineHeight: 22,
    },

    meta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.sm,
    },

    duration: {
        marginLeft: SPACING.xs,
        fontSize: 12,
    },
});
