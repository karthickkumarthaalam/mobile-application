import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { PodcastIcon, Search, TriangleAlert, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useInfinitePodcastBrowseFeed, useInfinitePodcasts } from "../../hooks/usePodcasts";
import { Podcast, PodcastCategoryBrowse } from "../../types/podcast";
import { useTheme, useThemedStyles } from "../../providers/ThemeProvider";
import PodcastCard from "./components/PodcastCard";
import PodcastCategoryRow from "./components/PodcastCategoryRow";

type PodcastScreenItem =
    | { type: "podcast"; podcast: Podcast; }
    | { type: "category"; category: PodcastCategoryBrowse; };

export default function PodcastScreen() {
    const styles = useThemedStyles(createStyles);
    const { isDark } = useTheme();
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    const isSearching = Boolean(debouncedSearch);
    const isSearchMode = isSearchFocused || isSearching;
    const searchParams = useMemo(() => ({
        limit: 10,
        search: debouncedSearch,
    }), [debouncedSearch]);
    const browseQuery = useInfinitePodcastBrowseFeed(!isSearchMode);
    const searchQuery = useInfinitePodcasts(searchParams, isSearching);

    const searchPodcasts = searchQuery.data?.pages.flatMap((page) => page.data) ?? [];
    const browsePages = browseQuery.data?.pages ?? [];
    const categories = browsePages
        .flatMap((page) => page.categories)
        .filter((category) => category.podcasts.length > 0);
    const latestPodcasts = browsePages[0]?.latestPodcasts ?? [];
    const activeQuery = isSearchMode ? searchQuery : browseQuery;

    const openPodcast = (podcast: Podcast) => {
        navigation.getParent()?.navigate("PodcastDetails", { id: podcast.id });
    };

    const listHeader = (
        <View>
            {!isSearchMode ? (
                <>
                    <LinearGradient
                        colors={["#7F1D1D", "#DC2626"]}
                        style={styles.hero}
                    >
                        <View style={styles.heroGlow} />
                        <View style={styles.heroIcon}>
                            <PodcastIcon size={30} color={COLORS.white} strokeWidth={1.6} />
                        </View>
                        <View style={styles.heroBadge}>
                            <View style={styles.liveDot} />
                            <AppText
                                variant="small"
                                weight="500"
                                color={COLORS.white}
                                style={styles.heroEyebrow}
                            >
                                THAALAM PODCASTS
                            </AppText>
                        </View>
                        <AppText variant="heading" weight="700" style={styles.heroTitle}>
                            Stories worth{"\n"}listening to.
                        </AppText>
                        <AppText
                            variant="caption"
                            color="rgba(255,255,255,0.8)"
                            style={styles.heroDescription}
                        >
                            Tamil voices, thoughtful conversations, and fresh perspectives from our community.
                        </AppText>
                    </LinearGradient>

                    {latestPodcasts.length > 0 && (
                        <View style={styles.latestSection}>
                            <View style={styles.sectionHeading}>
                                <View>
                                    <AppText variant="subHeading" weight="700">
                                        Latest episodes
                                    </AppText>
                                    <AppText
                                        variant="small"
                                        color={COLORS.textSecondary}
                                        style={styles.sectionSubtitle}
                                    >
                                        Freshly added to Thaalam
                                    </AppText>
                                </View>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.carousel}
                            >
                                {latestPodcasts.map((podcast) => (
                                    <PodcastCard
                                        key={podcast.id}
                                        podcast={podcast}
                                        onPress={openPodcast}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <View style={styles.collectionHeading}>
                        <View style={styles.collectionAccent} />
                        <View style={styles.collectionCopy}>
                            <AppText
                                variant="small"
                                weight="700"
                                color={COLORS.primaryBright}
                                style={styles.eyebrow}
                            >
                                FIND YOUR NEXT LISTEN
                            </AppText>
                            <AppText variant="subHeading" weight="700">
                                Explore collections
                            </AppText>
                            <AppText
                                variant="small"
                                color={COLORS.textSecondary}
                                style={styles.collectionDescription}
                            >
                                Browse episodes grouped by the stories and topics you love.
                            </AppText>
                        </View>
                    </View>
                </>
            ) : null}

            <SearchInput
                value={search}
                onChangeText={setSearch}
                styles={styles}
                showCancel={isSearchMode}
                onFocus={() => setIsSearchFocused(true)}
                onCancel={() => {
                    setSearch("");
                    setDebouncedSearch("");
                    setIsSearchFocused(false);
                }}
            />

        </View>
    );

    const listItems: PodcastScreenItem[] = isSearching
        ? searchPodcasts.map((podcast) => ({ type: "podcast", podcast }))
        : isSearchMode
            ? []
            : categories.map((category) => ({ type: "category", category }));
    const renderItem: ListRenderItem<PodcastScreenItem> = ({ item }) =>
        item.type === "podcast"
            ? <PodcastCard podcast={item.podcast} onPress={openPodcast} layout="row" />
            : <PodcastCategoryRow category={item.category} onPodcastPress={openPodcast} />;

    const listEmpty = (
        <View style={styles.emptyState}>
            {activeQuery.isError ? (
                <>
                    <TriangleAlert size={25} color={COLORS.error} />
                    <AppText variant="body" weight="600" style={styles.emptyTitle}>
                        Podcasts couldn’t be loaded
                    </AppText>
                    <AppText
                        variant="small"
                        color={COLORS.textSecondary}
                        style={styles.emptyMessage}
                    >
                        Check your connection and try again.
                    </AppText>
                    <Pressable
                        onPress={() => void activeQuery.refetch()}
                        style={styles.retryButton}
                        accessibilityRole="button"
                    >
                        <AppText variant="small" weight="700" color={COLORS.white}>
                            Try again
                        </AppText>
                    </Pressable>
                </>
            ) : activeQuery.isFetching ? (
                <ActivityIndicator color={COLORS.primaryBright} />
            ) : (
                <View style={styles.emptyCard}>
                    <View style={styles.emptyIcon}>
                        {isSearchMode
                            ? <Search size={25} color={COLORS.primaryBright} strokeWidth={1.8} />
                            : <PodcastIcon size={27} color={COLORS.primaryBright} strokeWidth={1.7} />}
                    </View>

                    <AppText variant="subHeading" weight="700" align="center" style={styles.emptyTitle}>
                        {isSearching
                            ? "No episodes found"
                            : isSearchMode
                                ? "Find a story to listen to"
                                : "New collections are on the way"}
                    </AppText>
                    <AppText
                        variant="small"
                        color={COLORS.textSecondary}
                        align="center"
                        style={styles.emptyMessage}
                    >
                        {isSearching
                            ? `We couldn't find anything for “${debouncedSearch}”. Try another title, host, or topic.`
                            : isSearchMode
                                ? "Search by episode title, host, or topic to find your next favourite."
                                : "Check back soon for fresh conversations and stories from Thaalam."}
                    </AppText>
                    {isSearching && (
                        <Pressable
                            onPress={() => {
                                setSearch("");
                                setDebouncedSearch("");
                            }}
                            style={styles.emptyAction}
                            accessibilityRole="button"
                        >
                            <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                                Clear search
                            </AppText>
                        </Pressable>
                    )}
                </View>
            )}
        </View>
    );

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
                <FlatList
                    data={listItems}
                    keyExtractor={(item) => item.type === "podcast"
                        ? `podcast-${item.podcast.id}`
                        : `category-${item.category.id}`}
                    renderItem={renderItem}
                    ListHeaderComponent={listHeader}
                    ListEmptyComponent={listEmpty}
                    ListFooterComponent={activeQuery.isFetchingNextPage ? (
                        <ActivityIndicator color={COLORS.primaryBright} style={styles.footerLoader} />
                    ) : null}
                    onEndReached={() => {
                        if (activeQuery.hasNextPage && !activeQuery.isFetchingNextPage) {
                            void activeQuery.fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.4}
                    refreshing={activeQuery.isRefetching && !activeQuery.isFetchingNextPage}
                    onRefresh={() => void activeQuery.refetch()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.content,
                        isSearchMode && styles.searchContent,
                    ]}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

function SearchInput({
    value,
    onChangeText,
    styles,
    showCancel,
    onFocus,
    onCancel,
}: {
    value: string;
    onChangeText: (value: string) => void;
    styles: ReturnType<typeof createStyles>;
    showCancel: boolean;
    onFocus: () => void;
    onCancel: () => void;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={styles.searchRow}>
            <View
                style={[
                    styles.searchContainer,
                    isFocused && styles.searchContainerFocused,
                ]}
            >
                <Search
                    size={19}
                    color={isFocused ? COLORS.primaryBright : COLORS.textSecondary}
                    strokeWidth={2}
                />
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus();
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="What do you want to hear?"
                    placeholderTextColor={COLORS.textSecondary}
                    accessibilityLabel="Search podcasts"
                    autoCorrect={false}
                    returnKeyType="search"
                    style={styles.searchInput}
                />
                {value.length > 0 && (
                    <Pressable
                        onPress={() => onChangeText("")}
                        accessibilityRole="button"
                        accessibilityLabel="Clear podcast search"
                        hitSlop={8}
                        style={styles.clearSearchButton}
                    >
                        <X size={15} color={COLORS.textSecondary} strokeWidth={2.2} />
                    </Pressable>
                )}
            </View>
            {showCancel && (
                <Pressable
                    onPress={() => {
                        inputRef.current?.blur();
                        onCancel();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel podcast search"
                    hitSlop={8}
                >
                    <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                        Cancel
                    </AppText>
                </Pressable>
            )}
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    gradient: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    content: {
        paddingHorizontal: SPACING.xl,
        paddingBottom: 130,
    },

    searchContent: {
        paddingTop: SPACING.xxl,
    },

    hero: {
        minHeight: 230,
        marginHorizontal: -SPACING.xl,
        padding: SPACING.xl,
        borderRadius: RADIUS.md,
        overflow: "hidden",
        justifyContent: "flex-end",
        backgroundColor: COLORS.primaryDark,
    },

    heroGlow: {
        position: "absolute",
        width: 220,
        height: 220,
        top: -92,
        right: -44,
        borderRadius: 110,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },

    heroIcon: {
        position: "absolute",
        right: SPACING.xl,
        top: SPACING.xl,
        width: 58,
        height: 58,
        borderRadius: RADIUS.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.14)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.22)",
    },

    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.pill,
        backgroundColor: "rgba(255,255,255,0.14)",
    },

    heroEyebrow: {
        marginLeft: SPACING.sm,
        letterSpacing: 1.1,
    },

    liveDot: {
        width: 7,
        height: 7,
        borderRadius: RADIUS.pill,
        backgroundColor: "#FFCF66",
    },

    heroTitle: {
        marginTop: SPACING.lg,
        color: COLORS.white,
        lineHeight: 24,
        maxWidth: 270,
    },

    heroDescription: {
        marginTop: SPACING.md,
        lineHeight: 21,
        maxWidth: 300,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        minHeight: 50,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },

    searchContainerFocused: {
        borderColor: COLORS.primaryBorder,
        backgroundColor: COLORS.surface,
    },

    clearSearchButton: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },

    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        color: COLORS.text,
        padding: 0,
        fontSize: 14,
        minHeight: 46,
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginTop: SPACING.xl,
    },

    latestSection: {
        marginTop: SPACING.xxl,
    },

    searchResultsHeading: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: SPACING.lg,
        marginBottom: SPACING.lg,
    },

    resultsTitleBlock: {
        flex: 1,
        marginRight: SPACING.md,
    },

    resultsEyebrowRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.xs,
    },

    resultsEyebrowLine: {
        width: 18,
        height: 2,
        marginRight: SPACING.sm,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primary,
    },

    resultsEyebrow: {
        letterSpacing: 1.3,
    },

    resultsTitle: {
        letterSpacing: -0.5,
    },

    resultsQuery: {
        marginTop: SPACING.xxs,
    },

    resultsCount: {
        minWidth: 68,
        alignItems: "center",
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
    },

    sectionHeading: {
        marginBottom: SPACING.md,
    },

    eyebrow: {
        letterSpacing: 1.2,
        marginBottom: SPACING.xs,
    },

    sectionSubtitle: {
        marginTop: SPACING.xxs,
    },

    carousel: {
        gap: SPACING.md,
        paddingRight: SPACING.xl,
    },

    collectionHeading: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: SPACING.xxxl,
        marginBottom: SPACING.sm,
    },

    collectionAccent: {
        width: 4,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primary,
        marginRight: SPACING.md,
    },

    collectionCopy: {
        flex: 1,
    },

    collectionDescription: {
        marginTop: SPACING.xs,
    },

    emptyState: {
        paddingTop: SPACING.md,
    },

    emptyCard: {
        alignItems: "center",
        marginTop: SPACING.sm,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.xxl,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.surface,
    },

    emptyIcon: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primarySoft,
        marginBottom: SPACING.lg,
    },

    emptyEyebrowRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.xs,
    },

    emptyEyebrowLine: {
        width: 16,
        height: 2,
        marginRight: SPACING.xs,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primary,
    },

    emptyEyebrow: {
        letterSpacing: 1.2,
    },

    emptyTitle: {
        marginTop: SPACING.xs,
    },

    emptyMessage: {
        maxWidth: 280,
        marginTop: SPACING.sm,
        lineHeight: 20,
    },

    emptyAction: {
        marginTop: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.pill,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
        backgroundColor: COLORS.primarySoft,
    },

    retryButton: {
        marginTop: SPACING.lg,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
    },

    footerLoader: {
        marginVertical: SPACING.lg,
    },
});
