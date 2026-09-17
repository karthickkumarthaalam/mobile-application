import React, { useState } from "react";
import { BackHandler, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshCw } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import HomeSkeleton from "./components/HomeSkeleton";
import LiveProgramCard from "./components/LiveProgramCard";
import UpNextCard from "./components/UpNextCard";
import { useLiveProgram } from "../../hooks/useLiveProgram";
import { formatTime } from "../../utils/common";
import { useAudio } from "../../providers/AudioProvider";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { useThemedStyles } from "../../providers/ThemeProvider";

const HomeScreen = () => {
    const styles = useThemedStyles(createStyles);
    const { data, isLoading, isError, refetch } = useLiveProgram();
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

    const liveStreamUrl = "https://thaalam.out.airtime.pro/thaalam_b";

    const banner = data?.current?.program_category?.mobile_image_url || data?.current?.program_category?.image_url;
    const screenGradient = [
        data?.current?.program_category?.background_color ?? GRADIENTS.screen[0],
        GRADIENTS.screen[1],
        GRADIENTS.screen[2],
    ] as const;
    const isClassicRadio = selectedRadio === "classic";
    const activeProgramName = data?.current.program_category.category.trim() ?? "Thaalam Live";
    const activeTitle = data?.current.program_category.category ?? "Thaalam Live";
    const activeSubtitle = data?.current.show_host_name
        ? data.current.system_users.name
        : undefined;

    if (isLoading) {
        return <HomeSkeleton />;
    }
    if (isError || !data) {
        return (
            <LinearGradient colors={screenGradient} style={styles.container}>
                <SafeAreaView style={styles.safeArea} edges={["top"]}>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorTitle}>
                            Thaalam Radio is temporarily unavailable
                        </Text>

                        <Text style={styles.errorSub}>
                            We're having trouble connecting to the live broadcast.
                            Please check your internet connection and try again in a
                            moment.
                        </Text>

                        <TouchableOpacity
                            style={styles.retryBtn}
                            onPress={() => refetch()}
                            activeOpacity={0.8}
                        >
                            <RefreshCw size={16} color="#FFFFFF" />
                            <Text style={styles.retryText}>
                                Reconnect to Live Radio
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }
    return (
        <LinearGradient colors={screenGradient} style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <LiveProgramCard
                        banner={banner}
                        programName={activeProgramName}
                        hostName={activeSubtitle}
                        startTime={data.current.program_category.start_time}
                        endTime={data.current.program_category.end_time}
                        minutesLeft={data.minutesLeft}
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
                        onListen={() =>
                            toggle({
                                id: data.current.id,
                                url: liveStreamUrl,
                                title: activeTitle,
                                subtitle: activeSubtitle,
                                artwork: banner,
                                type: "radio",
                            })
                        }
                    />

                    {!isClassicRadio && (
                        <UpNextCard
                            image={data.next.program_category.image_url}
                            programName={data.next.program_category.category.trim()}
                            startTime={formatTime(data.next.program_category.start_time)}
                            minutesLeft={data.minutesLeft}
                        />
                    )}

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
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
});
