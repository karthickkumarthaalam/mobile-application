import React, { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Headphones, RefreshCw } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { getPodcastBrowseFeed } from "../../../api/podcast.api";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";
import {
    Podcast,
    PodcastCategoryBrowse,
    PodcastPagination,
} from "../../../types/podcast";
import PodcastCard from "./PodcastCard";

interface PodcastCategoryRowProps {
    category: PodcastCategoryBrowse;
    onPodcastPress: (podcast: Podcast) => void;
}

export default function PodcastCategoryRow({
    category,
    onPodcastPress,
}: PodcastCategoryRowProps) {
    const styles = useThemedStyles(createStyles);
    const [podcasts, setPodcasts] = useState(category.podcasts);
    const [pagination, setPagination] = useState<PodcastPagination>(category.pagination);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadError, setLoadError] = useState("");
    const loadingRef = useRef(false);

    const hasMore = typeof pagination.hasNextPage === "boolean"
        ? pagination.hasNextPage
        : pagination.currentPage < pagination.totalPages;

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoadingMore(true);
        setLoadError("");
        try {
            const result = await getPodcastBrowseFeed({
                categoryId: category.id,
                page: pagination.currentPage + 1,
                limit: pagination.perPage,
            });
            setPodcasts((current) => {
                const seenIds = new Set(current.map((podcast) => podcast.id));
                return [
                    ...current,
                    ...result.podcasts.filter((podcast) => !seenIds.has(podcast.id)),
                ];
            });
            setPagination(result.pagination);
        } catch (error) {
            setLoadError(
                error instanceof Error ? error.message : "Unable to load more episodes.",
            );
        } finally {
            loadingRef.current = false;
            setLoadingMore(false);
        }
    }, [category.id, hasMore, pagination.currentPage, pagination.perPage]);

    const handleScroll = useCallback((event: {
        nativeEvent: {
            contentOffset: { x: number };
            contentSize: { width: number };
            layoutMeasurement: { width: number };
        };
    }) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        if (contentOffset.x + layoutMeasurement.width >= contentSize.width - 100) {
            void loadMore();
        }
    }, [loadMore]);

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.headingText}>
                    <AppText variant="subHeading" weight="700" numberOfLines={1}>
                        {category.name || "Untitled collection"}
                    </AppText>
                    <AppText
                        variant="small"
                        color={COLORS.textSecondary}
                        numberOfLines={2}
                        style={styles.description}
                    >
                        {category.description || `${pagination.totalRecords} episodes`}
                    </AppText>
                </View>
                <View style={styles.episodeCount}>
                    <Headphones size={13} color={COLORS.primaryBright} />
                    <AppText
                        variant="small"
                        weight="700"
                        color={COLORS.primaryBright}
                        style={styles.episodeCountText}
                    >
                        {pagination.totalRecords}
                    </AppText>
                </View>
            </View>

            {podcasts.length > 0 ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carousel}
                    onScroll={handleScroll}
                    scrollEventThrottle={300}
                    accessibilityLabel={`${category.name} podcast episodes`}
                >
                    {podcasts.map((podcast) => (
                        <PodcastCard
                            key={podcast.id}
                            podcast={podcast}
                            onPress={onPodcastPress}
                        />
                    ))}
                    {loadingMore && (
                        <View style={styles.loadingMore}>
                            <ActivityIndicator color={COLORS.primaryBright} />
                        </View>
                    )}
                </ScrollView>
            ) : (
                <AppText variant="small" color={COLORS.textSecondary} style={styles.empty}>
                    No episodes in this collection yet.
                </AppText>
            )}

            {!!loadError && (
                <View style={styles.errorRow}>
                    <AppText variant="small" color={COLORS.error} style={styles.errorText}>
                        {loadError}
                    </AppText>
                    <Pressable
                        onPress={() => void loadMore()}
                        accessibilityRole="button"
                        accessibilityLabel={`Retry loading ${category.name} episodes`}
                        hitSlop={8}
                    >
                        <RefreshCw size={17} color={COLORS.primaryBright} />
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        marginTop: SPACING.xxl,
    },

    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.md,
    },

    headingText: {
        flex: 1,
        marginRight: SPACING.md,
    },

    description: {
        marginTop: SPACING.xs,
    },

    episodeCount: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: 20,
        backgroundColor: COLORS.primarySoft,
    },

    episodeCountText: {
        marginLeft: SPACING.xs,
    },

    carousel: {
        gap: SPACING.md,
        paddingRight: SPACING.xl,
    },

    loadingMore: {
        width: 44,
        alignItems: "center",
        justifyContent: "center",
    },

    empty: {
        paddingVertical: SPACING.lg,
    },

    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.sm,
    },

    errorText: {
        flex: 1,
        marginRight: SPACING.sm,
    },
});
