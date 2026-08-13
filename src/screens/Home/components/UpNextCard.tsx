import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Clock3 } from "lucide-react-native";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";

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
                        <Clock3 size={11} color={COLORS.textMuted} />
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
        paddingHorizontal: SPACING.xl,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },

    sectionAccent: {
        width: 3,
        height: 16,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        backgroundColor: COLORS.glass,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
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
        color: COLORS.textMuted,
        fontSize: 11,
        fontFamily: "InclusiveSans",
    },

    programName: {
        color: COLORS.text,
        fontSize: 15,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        lineHeight: 21,
    },

    arrow: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.glassStrong,
        alignItems: "center",
        justifyContent: "center",
    },

    arrowText: {
        color: COLORS.textSecondary,
        fontSize: 18,
        lineHeight: 22,
    },
});
