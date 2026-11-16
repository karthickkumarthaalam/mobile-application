import React, { useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import { Heart, Pause, Play, Share2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface PodcastAudioControlsProps {
    duration: string | number;
    likes?: number;
    isPlaying: boolean;
    isLoading: boolean;
    hasAudio: boolean;
    position: number;
    trackDuration: number;
    onPress: () => void;
    onSeek: (seconds: number) => void;
    onShare: () => void;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remaining}`;
};

export default function PodcastAudioControls({
    duration, likes, isPlaying, isLoading, hasAudio, position, trackDuration, onPress, onSeek, onShare
}: PodcastAudioControlsProps) {
    const [trackWidth, setTrackWidth] = useState(0);
    const progress = trackDuration > 0 ? Math.min(1, Math.max(0, position / trackDuration)) : 0;

    const styles = useThemedStyles(createStyles);

    const handleTrackLayout = (event: LayoutChangeEvent) => setTrackWidth(event.nativeEvent.layout.width);
    const handleSeek = (locationX: number) => {
        if (!hasAudio || trackDuration <= 0 || trackWidth <= 0) return;
        onSeek(Math.max(0, Math.min(1, locationX / trackWidth)) * trackDuration);
    };

    return (
        <View style={styles.container}>
            <Pressable
                accessibilityRole="adjustable"
                accessibilityLabel="Podcast progress"
                onLayout={handleTrackLayout}
                onPress={(event) => handleSeek(event.nativeEvent.locationX)}
                style={styles.progressTouchTarget}
            >
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    {trackDuration > 0 && <View style={[styles.progressDot, { left: `${progress * 100}%` }]} />}
                </View>
            </Pressable>
            <View style={styles.timeRow}>
                <AppText style={styles.time}>{formatTime(position)}</AppText>
                <AppText style={styles.time}>{trackDuration > 0 ? formatTime(trackDuration) : duration}</AppText>
            </View>

            <View style={styles.controls}>
                <View style={styles.sideControl}>
                    <Heart size={22} color={COLORS.textSecondary} />
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={isPlaying ? "Pause podcast" : "Play podcast"}
                    disabled={!hasAudio || isLoading}
                    onPress={onPress}
                    style={({ pressed }) => [styles.playButton, (pressed || !hasAudio) && styles.playButtonPressed]}
                >
                    <LinearGradient
                        colors={[COLORS.primaryBright, COLORS.primaryDark]}
                        style={styles.playButtonGradient}
                    >
                        {isLoading ? <ActivityIndicator color={COLORS.white} /> : isPlaying
                            ? <Pause size={26} color={COLORS.white} fill={COLORS.white} />
                            : <Play size={26} color={COLORS.white} fill={COLORS.white} />}
                    </LinearGradient>
                </Pressable>

                <Pressable accessibilityRole="button" accessibilityLabel="Share" onPress={onShare} hitSlop={8}>
                    <Share2 size={20} color={COLORS.textSecondary} />
                </Pressable>
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: { paddingTop: SPACING.xl, paddingHorizontal: SPACING.xl },
    unavailable: { marginBottom: SPACING.md, textAlign: "center" },
    progressTouchTarget: { height: 20, justifyContent: "center" },
    progressTrack: { height: 5, borderRadius: 3, backgroundColor: COLORS.glassStrong },
    progressFill: { height: 5, borderRadius: 3, backgroundColor: COLORS.primaryBright },
    progressDot: { position: "absolute", top: -3, width: 11, height: 11, marginLeft: -5, borderRadius: 6, backgroundColor: COLORS.primaryBright, borderWidth: 2, borderColor: COLORS.background },
    timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: SPACING.xs },
    time: { color: COLORS.textMuted, fontSize: 11 },
    controls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl },
    sideControl: { width: 40, alignItems: "center", justifyContent: "center" },
    likeCount: { marginTop: SPACING.xxs, fontSize: 10 },
    playButton: { width: 68, height: 68, borderRadius: 34, overflow: "hidden", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary },
    playButtonGradient: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },
    playButtonPressed: { opacity: 0.76, transform: [{ scale: 0.96 }] },
});
