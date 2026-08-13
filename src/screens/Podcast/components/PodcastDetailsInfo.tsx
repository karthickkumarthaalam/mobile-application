import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarDays } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { Podcast } from "../../../types/podcast";

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, "").trim();

export default function PodcastDetailsInfo({ podcast }: { podcast: Podcast; }) {
    const publishedDate = podcast.date
        ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(podcast.date))
        : undefined;

    return (
        <View style={styles.container}>
            <AppText variant="subHeading" weight="700">About this episode</AppText>
            {!!podcast.description && <AppText color={COLORS.textSecondary} style={styles.description}>{stripHtml(podcast.description)}</AppText>}

            {(publishedDate || podcast.language?.length) && (
                <View style={styles.metadata}>
                    {!!publishedDate && <View style={styles.published}><CalendarDays size={15} color={COLORS.textMuted} /><AppText color={COLORS.textMuted} style={styles.publishedText}>{publishedDate}</AppText></View>}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: SPACING.xxl, paddingHorizontal: SPACING.xl },
    description: { lineHeight: 23, marginTop: SPACING.md },
    metadata: { marginTop: SPACING.lg, gap: SPACING.md },
    published: { flexDirection: "row", alignItems: "center" },
    publishedText: { marginLeft: SPACING.xs, fontSize: 13 },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
    chip: { backgroundColor: COLORS.glass, borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.glassBorder, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
    chipText: { color: COLORS.textSecondary, fontSize: 12 },
});
