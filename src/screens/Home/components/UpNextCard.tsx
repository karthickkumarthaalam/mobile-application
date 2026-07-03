import React from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Clock3 } from "lucide-react-native";

interface UpNextCardProps {
    image: string;
    programName: string;
    startTime: string;
    minutesLeft: number;
}

const UpNextCard = ({ image, programName, startTime, minutesLeft }: UpNextCardProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionAccent} />
                <Text style={styles.sectionTitle}>Up Next</Text>
            </View>

            <View style={styles.card}>
                {/* <Image source={{ uri: image }} style={styles.image} /> */}

                <View style={styles.info}>
                    <View style={styles.tagRow}>
                        <Clock3 size={11} color="rgba(255,255,255,0.35)" />
                        <Text style={styles.tag}>In {minutesLeft} min · {startTime}</Text>
                    </View>
                    <Text numberOfLines={2} style={styles.programName}>
                        {programName}
                    </Text>
                </View>

                <View style={styles.arrow}>
                    <Text style={styles.arrowText}>›</Text>
                </View>
            </View>
        </View>
    );
};

export default UpNextCard;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 28,
        paddingHorizontal: 20,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
    },

    sectionAccent: {
        width: 3,
        height: 16,
        borderRadius: 2,
        backgroundColor: "#E41E26",
    },

    sectionTitle: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
            },
            android: { elevation: 6 },
        }),
    },

    image: {
        width: 68,
        height: 68,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.06)",
    },

    info: {
        flex: 1,
        gap: 6,
    },

    tagRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    tag: {
        color: "rgba(255,255,255,0.35)",
        fontSize: 11,
        fontFamily: "InclusiveSans",
    },

    programName: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        lineHeight: 21,
    },

    arrow: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.07)",
        alignItems: "center",
        justifyContent: "center",
    },

    arrowText: {
        color: "rgba(255,255,255,0.4)",
        fontSize: 18,
        lineHeight: 22,
    },
});
