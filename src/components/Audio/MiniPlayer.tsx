import React from "react";
import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Pause, Play, Radio } from "lucide-react-native";

import { useAudio } from "../../providers/AudioProvider";
import { COLORS } from "../../constants/colors";
import { useThemedStyles } from "../../providers/ThemeProvider";

interface MiniPlayerProps {
    onPress?: () => void;
}

export default function MiniPlayer({ onPress }: MiniPlayerProps) {
    const styles = useThemedStyles(createStyles);
    const { nowPlaying, isPlaying, isLoading, toggle } = useAudio();

    if (!nowPlaying) return null;

    return (
        <View style={styles.container}>
            <Pressable accessibilityRole="button" onPress={onPress} style={styles.content}>
                {nowPlaying.artwork ? (
                    <Image source={{ uri: nowPlaying.artwork }} style={styles.artwork} />
                ) : (
                    <View style={[styles.artwork, styles.artworkFallback]}>
                        <Radio size={18} color={COLORS.textSecondary} />
                    </View>
                )}

                <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.title}>{nowPlaying.title}</Text>
                    <Text numberOfLines={1} style={styles.subtitle}>{nowPlaying.type === "radio" ? "LIVE RADIO" : nowPlaying.subtitle}</Text>
                </View>
            </Pressable>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={isPlaying ? "Pause" : "Play"}
                disabled={isLoading}
                onPress={() => toggle(nowPlaying)}
                style={styles.playButton}
            >
                {isLoading ? <ActivityIndicator size="small" color={COLORS.text} /> : isPlaying
                    ? <Pause size={18} color={COLORS.text} fill={COLORS.text} />
                    : <Play size={18} color={COLORS.text} fill={COLORS.text} />}
            </Pressable>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        width: "100%", flexDirection: "row", alignItems: "center", gap: 12,
        backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.glassBorder,
        borderRadius: 20, paddingHorizontal: 12, paddingVertical: 10,
        ...Platform.select({
            ios: { shadowColor: COLORS.glassShadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 16 },
            android: { elevation: 16 },
        }),
    },
    content: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
    artwork: { width: 42, height: 42, borderRadius: 10, backgroundColor: COLORS.glass },
    artworkFallback: { alignItems: "center", justifyContent: "center" },
    info: { flex: 1, gap: 3 },
    title: { color: COLORS.text, fontSize: 13, fontFamily: "InclusiveSans", fontWeight: "700" },
    subtitle: { color: COLORS.textMuted, fontSize: 11, fontFamily: "InclusiveSans" },
    playButton: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.glass },
});
