import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshCw } from "lucide-react-native";

import HomeSkeleton from "./components/HomeSkeleton";
import LiveProgramCard from "./components/LiveProgramCard";
import UpNextCard from "./components/UpNextCard";
import { useLiveProgram } from "../../hooks/useLiveProgram";
import { formatTime } from "../../utils/common";
import { useAudio } from "../../providers/AudioProvider";

const HomeScreen = () => {
    const { data, isLoading, isError, refetch } = useLiveProgram();
    const { toggle, isPlaying, isLoading: audioLoading, nowPlaying } = useAudio();
    if (isLoading) {
        return (
            <View style={styles.container}>
                <HomeSkeleton />
            </View>
        );
    }
    if (isError || !data) {
        return (
            <SafeAreaView style={styles.container}>
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
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <LiveProgramCard
                    banner={data.current.program_category.image_url}
                    programName={data.current.program_category.category.trim()}
                    hostName={
                        data.current.show_host_name
                            ? data.current.system_users.name
                            : undefined
                    }
                    startTime={data.current.program_category.start_time}
                    endTime={data.current.program_category.end_time}
                    minutesLeft={data.minutesLeft}
                    isPlaying={isPlaying && nowPlaying?.url === "https://thaalam.out.airtime.pro/thaalam_b"}
                    isLoading={audioLoading}
                    onListen={() =>
                        toggle({
                            id: data.current.id,
                            url: "https://thaalam.out.airtime.pro/thaalam_b",
                            title: data.current.program_category.category,
                            subtitle: data.current.show_host_name
                                ? data.current.system_users.name
                                : undefined,
                            artwork: data.current.program_category.image_url,
                            type: "radio",
                        })
                    }
                />

                <UpNextCard
                    image={data.next.program_category.image_url}
                    programName={data.next.program_category.category.trim()}
                    startTime={formatTime(data.next.program_category.start_time)}
                    minutesLeft={data.minutesLeft}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0E",
    },

    content: {
        paddingBottom: 120,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 36,
    },

    errorTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 32,
    },

    errorSub: {
        marginTop: 14,
        color: "rgba(255,255,255,0.6)",
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

        backgroundColor: "#E41E26",

        paddingHorizontal: 26,
        paddingVertical: 14,

        borderRadius: 28,

        shadowColor: "#E41E26",
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation: 8,
    },

    retryText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "InclusiveSans",
    },
});