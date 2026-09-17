import React, { useCallback, useRef } from "react";
import { PanResponder, ScrollView, StyleSheet, View } from "react-native";
import { StackActions, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Share } from "react-native";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { usePodcast } from "../../hooks/usePodcast";
import { useAudio, useOnAudioFinish } from "../../providers/AudioProvider";
import PodcastAudioControls from "./components/PodcastAudioControls";
import PodcastDetailsHero from "./components/PodcastDetailsHero";
import PodcastDetailsInfo from "./components/PodcastDetailsInfo";
import PodcastDetailsSkeleton from "./components/PodcastDetailsSkeleton";
import { useThemedStyles } from "../../providers/ThemeProvider";

type PodcastDetailsRouteParams = {
    PodcastDetails: { id: number; };
};

export default function PodcastDetailsScreen() {
    const styles = useThemedStyles(createStyles);
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
    const nextPodcast = data?.nextPodcast;

    const handleShare = useCallback((podcast: NonNullable<typeof data>["podcast"]) => {
        Share.share({
            title: podcast.title,
            message: `🎙️ Listen to "${podcast.title}" on Thaalam Podcasts!\nhttps://thaalam.ch/podcasts/${podcast.slug}`,
            url: `https://thaalam.ch/podcasts/${podcast.slug}`,
        });
    }, []);

    const nextPodcastRef = useRef(nextPodcast);
    const previousPodcastRef = useRef(previousPodcast);
    const navigationRef = useRef(navigation);
    const playRef = useRef(play);
    const isCurrentPodcastRef = useRef(false);
    const isAdvancingRef = useRef(false);
    nextPodcastRef.current = nextPodcast;
    previousPodcastRef.current = previousPodcast;
    navigationRef.current = navigation;
    playRef.current = play;
    isCurrentPodcastRef.current = nowPlaying?.url === data?.podcast.audio_drive_file_link;

    // Auto-advance to next podcast when current one finishes
    useOnAudioFinish(() => {
        if (!isCurrentPodcastRef.current || isAdvancingRef.current) return;
        const next = nextPodcastRef.current;
        if (!next) return;
        const nextAudioUrl = next.audio_drive_file_link;
        if (!nextAudioUrl) return;

        isAdvancingRef.current = true;
        void (async () => {
            await playRef.current({
                id: next.id,
                url: nextAudioUrl,
                title: next.title,
                subtitle: next.rjname,
                artwork: next.image_url,
                type: "podcast",
            });
            navigationRef.current.dispatch(StackActions.replace("PodcastDetails", { id: next.id }));
        })();
    });

    const swipeResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dx) > 20 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
            onPanResponderRelease: (_, gesture) => {
                const target =
                    gesture.dx < -70 ? previousPodcastRef.current
                        : gesture.dx > 70 ? nextPodcastRef.current
                            : null;

                if (!target) return;

                navigationRef.current.dispatch(
                    StackActions.replace("PodcastDetails", { id: target.id })
                );

                if (target.audio_drive_file_link) {
                    void playRef.current({
                        id: target.id,
                        url: target.audio_drive_file_link,
                        title: target.title,
                        subtitle: target.rjname,
                        artwork: target.image_url,
                        type: "podcast",
                    });
                }
            },
        })
    ).current;

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
                        <PodcastDetailsHero
                            podcast={podcast}
                            onBack={() => navigation.goBack()}
                        />

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
                            onShare={() => handleShare(podcast)}
                        />

                        <PodcastDetailsInfo podcast={podcast} />
                    </ScrollView>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () => StyleSheet.create({
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
