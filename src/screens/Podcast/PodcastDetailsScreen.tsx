import React, { useMemo } from "react";
import { PanResponder, ScrollView, StyleSheet, View } from "react-native";
import { StackActions, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { usePodcast } from "../../hooks/usePodcast";
import { useAudio } from "../../providers/AudioProvider";
import PodcastAudioControls from "./components/PodcastAudioControls";
import PodcastDetailsHero from "./components/PodcastDetailsHero";
import PodcastDetailsInfo from "./components/PodcastDetailsInfo";
import PodcastDetailsSkeleton from "./components/PodcastDetailsSkeleton";

type PodcastDetailsRouteParams = {
    PodcastDetails: { id: number; };
};

export default function PodcastDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<PodcastDetailsRouteParams, "PodcastDetails">>();
    const { data, isLoading, isError } = usePodcast(route.params.id);
    const {
        play,
        toggle,
        seek,
        isPlaying,
        isLoading: isAudioLoading,
        nowPlaying,
        position,
        duration,
    } = useAudio();
    const previousPodcast = data?.prevPodcast;
    const previousPodcastId = previousPodcast?.id;
    const nextPodcast = data?.nextPodcast;
    const nextPodcastId = nextPodcast?.id;

    const swipeResponder = useMemo(() => PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
            Math.abs(gesture.dx) > 20 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx > 70 && nextPodcast) {
                navigation.dispatch(StackActions.replace("PodcastDetails", { id: nextPodcast.id }));
                if (nextPodcast.audio_drive_file_link) {
                    void play({
                        id: nextPodcast.id,
                        url: nextPodcast.audio_drive_file_link,
                        title: nextPodcast.title,
                        subtitle: nextPodcast.rjname,
                        artwork: nextPodcast.image_url,
                        type: "podcast",
                    });
                }
            } else if (gesture.dx < -70 && previousPodcast) {
                navigation.dispatch(StackActions.replace("PodcastDetails", { id: previousPodcast.id }));
                if (previousPodcast.audio_drive_file_link) {
                    void play({
                        id: previousPodcast.id,
                        url: previousPodcast.audio_drive_file_link,
                        title: previousPodcast.title,
                        subtitle: previousPodcast.rjname,
                        artwork: previousPodcast.image_url,
                        type: "podcast",
                    });
                }
            }
        },
    }), [navigation, nextPodcast, play, previousPodcast]);

    if (isLoading) return <PodcastDetailsSkeleton />;

    if (isError || !data) {
        return (
            <SafeAreaView style={styles.center}>
                <AppText variant="subHeading">Failed to load podcast.</AppText>
            </SafeAreaView>
        );
    }

    const { podcast, reaction } = data;
    const isCurrentPodcast = nowPlaying?.url === podcast.audio_drive_file_link;

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.screen} {...swipeResponder.panHandlers}>
                    <View style={styles.glowTop} />
                    <View style={styles.glowBottom} />

                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        <PodcastDetailsHero podcast={podcast} onBack={() => navigation.goBack()} />

                        <PodcastAudioControls
                            duration={podcast.duration}
                            likes={reaction?.like}
                            hasAudio={Boolean(podcast.audio_drive_file_link)}
                            isLoading={isAudioLoading && isCurrentPodcast}
                            isPlaying={isPlaying && isCurrentPodcast}
                            position={isCurrentPodcast ? position : 0}
                            trackDuration={isCurrentPodcast ? duration : 0}
                            onPress={() => {
                                if (!podcast.audio_drive_file_link) return;
                                toggle({
                                    id: podcast.id,
                                    url: podcast.audio_drive_file_link,
                                    title: podcast.title,
                                    subtitle: podcast.rjname,
                                    artwork: podcast.image_url,
                                    type: "podcast",
                                });
                            }}
                            onSeek={(seconds) => isCurrentPodcast && seek(seconds)}
                        />

                        <PodcastDetailsInfo podcast={podcast} />
                    </ScrollView>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    screen: { flex: 1 },
    content: { paddingBottom: 120 },
    glowTop: {
        position: "absolute", width: 280, height: 280, borderRadius: 140,
        backgroundColor: COLORS.primary, opacity: 0.08, top: -110, right: -130,
    },
    glowBottom: {
        position: "absolute", width: 220, height: 220, borderRadius: 110,
        backgroundColor: COLORS.primary, opacity: 0.04, top: 300, left: -90,
    },
    center: {
        flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: SPACING.xl,
        backgroundColor: COLORS.background,
    },
    miniPlayer: {
        position: "absolute", left: SPACING.lg, right: SPACING.lg, bottom: SPACING.lg,
    },
});
