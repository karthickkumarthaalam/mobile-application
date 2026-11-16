import React, { useState } from "react";
import { BackHandler, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshCw } from "lucide-react-native";

import HomeSkeleton from "./components/HomeSkeleton";
import LiveProgramCard from "./components/LiveProgramCard";
import SpecialShowCard from "./components/SpecialShowCard";
import TodaySchedule from "./components/TodaySchedule";
import { useLiveProgram } from "../../hooks/useLiveProgram";
import { useTodayShows } from "../../hooks/useTodayShows";
import { useCurrentSpecialShow } from "../../hooks/useCurrentSpecialShow";
import { useAudio } from "../../providers/AudioProvider";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { useThemedStyles } from "../../providers/ThemeProvider";

const getScreenGradient = (backgroundColor?: string) =>
    backgroundColor
        ? [backgroundColor, GRADIENTS.screen[1], GRADIENTS.screen[2]] as const
        : undefined;

const HomeScreen = () => {
    const styles = useThemedStyles(createStyles);
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useLiveProgram();
    const {
        data: todayShows = [],
        isLoading: todayShowsLoading,
        isError: todayShowsIsError,
        error: todayShowsError,
        refetch: refetchTodayShows,
    } = useTodayShows();
    const { data: currentSpecialShow } = useCurrentSpecialShow();
    const { toggle, stop, isPlaying, isLoading: audioLoading, nowPlaying } = useAudio();
    const [selectedRadio, setSelectedRadio] = useState<"live" | "classic">("live");

    const handleCollapse = () => {
        if (Platform.OS === "android") {
            BackHandler.exitApp();
        }
    };

    const handleShare = () => {
        Share.share({
            title: "Thaalam Radio",
            message: `Listen to ${activeProgramName} live on Thaalam Radio!\nhttps://thaalam.ch`,
            url: "https://thaalam.ch",
        });
    };

    const liveStreamUrl = data?.current?.radio_station?.radio_stream_url;

    const banner =
        data?.current?.program_category?.mobile_image_url ||
        data?.current?.program_category?.image_url;
    const screenGradient = getScreenGradient(
        data?.current?.program_category?.background_color,
    );
    const isClassicRadio = selectedRadio === "classic";
    const maintenance =
        data?.current?.radio_station?.maintenance === true ||
        data?.current?.radio_station?.maintenance === "true";
    const activeProgramName =
        currentSpecialShow?.title ??
        data?.current?.program_category?.category?.trim() ??
        "Thaalam Live";
    const activeTitle = data?.current.program_category.category ?? "Thaalam Live";
    const activeSubtitle = data?.current.show_host_name
        ? data.current.system_users.name
        : undefined;

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {maintenance ? (
                        <View style={styles.statusCard}>
                            <Text style={styles.statusEyebrow}>THAALAM RADIO</Text>
                            <Text style={styles.statusTitle}>We're tuning things up</Text>
                            <Text style={styles.statusText}>
                                Thaalam Radio is temporarily offline for maintenance.
                                Browse today's schedule while we get things ready.
                            </Text>
                        </View>
                    ) : data ? (
                        <>
                            {currentSpecialShow && !isClassicRadio ? (
                                <SpecialShowCard
                                    show={currentSpecialShow}
                                    banner={banner}
                                    fallbackStartTime={data.current.program_category.start_time}
                                    fallbackEndTime={data.current.program_category.end_time}
                                    isPlaying={isPlaying && nowPlaying?.url === liveStreamUrl}
                                    isLoading={audioLoading}
                                    canListen={Boolean(liveStreamUrl)}
                                    selectedRadio={selectedRadio}
                                    onListen={() => {
                                        if (!liveStreamUrl) return;
                                        void toggle({
                                            id: data.current.id,
                                            url: liveStreamUrl,
                                            title: currentSpecialShow.title,
                                            subtitle: currentSpecialShow.system_users?.name,
                                            artwork: currentSpecialShow.image || banner,
                                            type: "radio",
                                        });
                                    }}
                                    onSelectLive={() => setSelectedRadio("live")}
                                    onSelectClassic={() => {
                                        void stop();
                                        setSelectedRadio("classic");
                                    }}
                                    onShare={handleShare}
                                    onBack={handleCollapse}
                                />
                            ) : (
                                <LiveProgramCard
                                    banner={banner}
                                    programName={activeProgramName}
                                    hostName={activeSubtitle}
                                    screenGradient={screenGradient}
                                    startTime={data.current.program_category.start_time}
                                    endTime={data.current.program_category.end_time}
                                    isPlaying={isPlaying && nowPlaying?.url === liveStreamUrl}
                                    isLoading={audioLoading}
                                    selectedRadio={selectedRadio}
                                    isComingSoon={isClassicRadio}
                                    onBack={handleCollapse}
                                    onShare={handleShare}
                                    onSelectLive={() => setSelectedRadio("live")}
                                    onSelectClassic={() => {
                                        void stop();
                                        setSelectedRadio("classic");
                                    }}
                                    onListen={() => {
                                        if (!liveStreamUrl) return;
                                        void toggle({
                                            id: data.current.id,
                                            url: liveStreamUrl,
                                            title: activeTitle,
                                            subtitle: activeSubtitle,
                                            artwork: banner,
                                            type: "radio",
                                        });
                                    }}
                                />
                            )}
                        </>
                    ) : isError ? (
                        <View style={styles.statusCard}>
                            <Text style={styles.statusTitle}>
                                Thaalam Radio is temporarily unavailable
                            </Text>
                            <Text style={styles.statusText}>
                                {error instanceof Error
                                    ? error.message
                                    : "We're having trouble connecting to the live broadcast."}
                            </Text>
                            <TouchableOpacity
                                style={styles.retryBtn}
                                onPress={() => void refetch()}
                                activeOpacity={0.8}
                            >
                                <RefreshCw size={16} color="#FFFFFF" />
                                <Text style={styles.retryText}>Reconnect to Live Radio</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.statusCard}>
                            <Text style={styles.statusEyebrow}>CURRENTLY OFF AIR</Text>
                            <Text style={styles.statusTitle}>Between shows, the music lives on.</Text>
                            <Text style={styles.statusText}>
                                There isn't a live programme on air right now. Explore
                                today's schedule and see what's coming up on Thaalam.
                            </Text>
                        </View>
                    )}
                    <TodaySchedule
                        shows={todayShows}
                        currentProgramId={data?.current?.program_category_id}
                        isLoading={todayShowsLoading}
                        error={todayShowsIsError
                            ? todayShowsError instanceof Error
                                ? todayShowsError.message
                                : "Unable to load today's programs."
                            : undefined}
                        onRetry={() => void refetchTodayShows()}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;

const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    content: {
        paddingBottom: 120,
        backgroundColor: COLORS.surface,
    },

    glowTop: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: COLORS.primary,
        opacity: 0.08,
        top: -110,
        right: -130,
    },

    glowBottom: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: COLORS.primary,
        opacity: 0.04,
        top: 300,
        left: -90,
    },

    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 36,
    },

    errorTitle: {
        color: COLORS.text,
        fontSize: 24,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 32,
    },

    errorSub: {
        marginTop: 14,
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 24,
        textAlign: "center",
        fontFamily: "InclusiveSans",
    },

    retryBtn: {
        marginTop: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,

        backgroundColor: COLORS.primary,

        paddingHorizontal: 26,
        paddingVertical: 14,

        borderRadius: 28,

        shadowColor: COLORS.primary,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation: 8,
    },

    retryText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "InclusiveSans",
    },
    statusCard: {
        marginTop: 28,
        marginHorizontal: 24,
        padding: 24,
        alignItems: "center",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.surface,
    },
    statusEyebrow: {
        color: COLORS.primary,
        fontFamily: "InclusiveSans-Bold",
        fontSize: 10,
        letterSpacing: 1.5,
    },
    statusTitle: {
        marginTop: 8,
        color: COLORS.text,
        fontFamily: "InclusiveSans-Bold",
        fontSize: 23,
        textAlign: "center",
    },
    statusText: {
        marginTop: 10,
        color: COLORS.textSecondary,
        fontFamily: "InclusiveSans-Regular",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
    },
});
