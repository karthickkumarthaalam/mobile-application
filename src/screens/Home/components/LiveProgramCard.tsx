import React from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Pause, Play } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

const formatSwissTime = (time: string): string => {
    // API returns "HH:MM:SS" — display as-is in Swiss 24h format
    const parts = time.split(":");
    if (parts.length < 2) return time;
    return `${parts[0].padStart(2, "0")}:${parts[1]}`;
};

const { width: SCREEN_W } = Dimensions.get("window");

interface LiveProgramCardProps {
    banner: string;
    programName: string;
    hostName?: string;
    startTime: string;
    endTime: string;
    minutesLeft: number;
    isPlaying?: boolean;
    isLoading?: boolean;
    onListen: () => void;
}

const LiveProgramCard = ({
    banner,
    programName,
    hostName,
    startTime,
    endTime,
    minutesLeft,
    isPlaying = false,
    isLoading = false,
    onListen,
}: LiveProgramCardProps) => {
    return (
        <View style={styles.container}>
            {/* Full bleed hero */}
            <ImageBackground
                source={{ uri: banner }}
                style={styles.hero}
            >
                <LinearGradient
                    colors={[
                        "rgba(10,10,14,0.05)",
                        "rgba(10,10,14,0.15)",
                        "rgba(10,10,14,0.82)",
                        "#0A0A0E",
                    ]}
                    locations={[0, 0.35, 0.72, 1]}
                    style={styles.gradient}
                >


                    {/* Bottom info */}

                </LinearGradient>
            </ImageBackground>

            {/* Player strip */}
            <View style={styles.playerStrip}>

                <View style={styles.heroInfo}>
                    <Text style={styles.programName} numberOfLines={2}>
                        {programName}
                    </Text>
                    {/* {hostName && (
                        <Text style={styles.hostName}>with {hostName}</Text>
                    )} */}
                </View>


                {/* Actions */}
                <View style={styles.actionsRow}>
                    <View style={styles.metaSection}>
                        <View style={styles.leftContent}>
                            <View style={styles.timeBadge}>
                                <Text style={styles.timeLabel}>
                                    {formatSwissTime(startTime)}
                                </Text>

                                <View style={styles.timeSep} />

                                <Text style={styles.timeLabel}>
                                    {formatSwissTime(endTime)}
                                </Text>
                            </View>

                            <View style={styles.liveBadge}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>
                                    LIVE • {minutesLeft} min left
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.playCircle}
                            onPress={onListen}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#E41E26" />
                            ) : isPlaying ? (
                                <Pause
                                    size={20}
                                    color="#E41E26"
                                    fill="#E41E26"
                                />
                            ) : (
                                <Play
                                    size={20}
                                    color="#E41E26"
                                    fill="#E41E26"
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LiveProgramCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0A0A0E",
    },

    hero: {
        width: SCREEN_W,
        height: SCREEN_W * 0.86,
    },

    gradient: {
        flex: 1,
        justifyContent: "flex-end",
        paddingTop: 20,
        paddingHorizontal: 22,
        paddingBottom: 28,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },


    heroInfo: {
        gap: 6,
    },

    programName: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        lineHeight: 28,
        letterSpacing: -0.3,
    },

    hostName: {
        color: "rgba(255,255,255,0.52)",
        fontSize: 14,
        fontFamily: "InclusiveSans",
    },

    // Player strip
    playerStrip: {
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 10,
        gap: 18,
    },

    leftContent: {
        gap: 10,
    },

    progressRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(255,255,255,0.07)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    timeSep: {
        width: 1,
        height: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
    },

    timeLabel: {
        color: "rgba(255,255,255,0.55)",
        fontSize: 12,
        fontFamily: "InclusiveSans",
    },

    liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#E41E26", },

    actionsRow: {
        marginTop: 12,
    },

    metaSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },

    liveBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 2,
    },

    liveText: {
        color: "#E41E26",
        fontSize: 12,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    playCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
    },

});
