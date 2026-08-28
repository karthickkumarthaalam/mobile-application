import React, { useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import { Heart, Pause, Play, Share2 } from "lucide-react-native";

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
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remaining}`;
};

export default function PodcastAudioControls({
    duration, likes, isPlaying, isLoading, hasAudio, position, trackDuration, onPress, onSeek,
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
                    {isLoading ? <ActivityIndicator color={COLORS.controlIcon} /> : isPlaying
                        ? <Pause size={26} color={COLORS.controlIcon} fill={COLORS.controlIcon} />
                        : <Play size={26} color={COLORS.controlIcon} fill={COLORS.controlIcon} />}
                </Pressable>

                <View style={styles.sideControl}>
                    <Share2 size={21} color={COLORS.textSecondary} />
                </View>
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: { paddingTop: SPACING.xl, paddingHorizontal: SPACING.xl },
    progressTouchTarget: { height: 20, justifyContent: "center" },
    progressTrack: { height: 4, borderRadius: 2, backgroundColor: COLORS.glassStrong },
    progressFill: { height: 4, borderRadius: 2, backgroundColor: COLORS.text },
    progressDot: { position: "absolute", top: -4, width: 12, height: 12, marginLeft: -6, borderRadius: 6, backgroundColor: COLORS.text },
    timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: SPACING.xs },
    time: { color: COLORS.textMuted, fontSize: 11 },
    controls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.xl, paddingTop: 26 },
    sideControl: { width: 40, alignItems: "center", justifyContent: "center" },
    playButton: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white },
    playButtonPressed: { opacity: 0.65 },
    likes: { color: COLORS.textMuted, fontSize: 11, marginTop: SPACING.xxs },
});
