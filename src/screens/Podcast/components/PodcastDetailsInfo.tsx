import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarDays, Globe2, Headphones } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";
import { Podcast } from "../../../types/podcast";

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, "").trim();

export default function PodcastDetailsInfo({ podcast }: { podcast: Podcast; }) {
    const styles = useThemedStyles(createStyles);

    const description = podcast.description ? stripHtml(podcast.description) : "";

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.headingIcon}>
                    <Headphones size={17} color={COLORS.primaryBright} />
                </View>
                <AppText variant="subHeading" weight="700">About this episode</AppText>
            </View>
            {description ? (
                <AppText variant="small" color={COLORS.textSecondary} style={styles.description}>
                    {description}
                </AppText>
            ) : (
                <AppText color={COLORS.textMuted} style={styles.description}>
                    Settle in and enjoy this episode from Thaalam Podcasts.
                </AppText>
            )}

        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        marginTop: SPACING.xxl,
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING.xl,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.glassBorder
    },

    heading: {
        flexDirection: "row",
        alignItems: "center",
    },
    headingIcon: {
        width: 34,
        height: 34,
        marginRight: SPACING.sm,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
    },
    description: {
        lineHeight: 23,
        marginTop: SPACING.md,
    },

});
