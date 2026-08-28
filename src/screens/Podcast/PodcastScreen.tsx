import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import AppText from "../../components/Text/AppText";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useInfinitePodcasts } from "../../hooks/usePodcasts";
import FeaturedPodcast from "./components/FeaturedPodcast";
import PodcastSkeleton from "./components/PodcastSkeleton";
import PodcastCard from "./components/PodcastCard";
import { useThemedStyles } from "../../providers/ThemeProvider";

export default function PodcastScreen() {
    const styles = useThemedStyles(createStyles);
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const queryParams = useMemo(() => ({
        limit: 10,
        search: debouncedSearch,
    }), [debouncedSearch]);

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isRefetching,
        isFetching,
    } = useInfinitePodcasts(queryParams);

    if (isLoading && !debouncedSearch) {
        return <PodcastSkeleton />;
    }

    if (isError) {
        return (
            <AppText>
                Failed to load podcasts
            </AppText>
        );
    }

    const podcasts = data?.pages.flatMap((page) => page.data) ?? [];
    const isSearching = Boolean(debouncedSearch);
    const featuredPodcast = isSearching ? undefined : podcasts[0];
    const listedPodcasts = featuredPodcast ? podcasts.slice(1) : podcasts;

    const header = (
        <>
            <View>
                <AppText
                    variant="small"
                    weight="700"
                    color={COLORS.primaryBright}
                    style={styles.eyebrow}
                >
                    Listen on demand
                </AppText>

                <AppText
                    variant="display"
                    weight="700"
                    style={styles.title}
                >
                    Podcasts
                </AppText>
            </View>

            <View style={styles.searchContainer}>
                <Search size={20} color={COLORS.textSecondary} />
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search podcasts..."
                    placeholderTextColor={COLORS.textSecondary}
                    accessibilityLabel="Search podcasts"
                    autoCorrect={false}
                    returnKeyType="search"
                    style={styles.searchInput}
                />
            </View>

            {featuredPodcast && (
                <FeaturedPodcast
                    podcast={featuredPodcast}
                    onPress={(podcast) => navigation.getParent()?.navigate(
                        "PodcastDetails",
                        { id: podcast.id },
                    )}
                />
            )}

            <View style={styles.section}>
                <AppText variant="subHeading" weight="700" color={COLORS.text}>
                    {isSearching ? "Search Results" : "Latest Podcasts"}
                </AppText>
            </View>
        </>
    );

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.glow} />

                <FlatList
                    data={listedPodcasts}
                    keyExtractor={(podcast) => String(podcast.id)}
                    renderItem={({ item }) => (
                        <PodcastCard
                            podcast={item}
                            onPress={(podcast) => navigation.getParent()?.navigate(
                                "PodcastDetails",
                                { id: podcast.id },
                            )}
                        />
                    )}
                    ListHeaderComponent={header}
                    ListEmptyComponent={(
                        <AppText color={COLORS.textSecondary} style={styles.emptyState}>
                            {isFetching
                                ? "Searching podcasts..."
                                : isSearching
                                    ? "No podcasts match your search."
                                    : "No podcasts available yet."}
                        </AppText>
                    )}
                    ListFooterComponent={isFetchingNextPage ? (
                        <ActivityIndicator color={COLORS.primaryBright} style={styles.footerLoader} />
                    ) : null}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.4}
                    refreshing={isRefetching && !isFetchingNextPage}
                    onRefresh={refetch}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.container}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () => StyleSheet.create({
    gradient: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    glow: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: COLORS.primary,
        opacity: 0.075,
        top: -110,
        right: -130,
    },

    container: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl,
        paddingBottom: 120,
    },

    eyebrow: {
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },

    title: {
        marginTop: SPACING.xs,
        letterSpacing: -0.8,
    },

    searchContainer: {
        marginTop: SPACING.xl,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },

    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        color: COLORS.text,
        padding: 0,
    },

    section: {
        marginTop: SPACING.xxl,
        marginBottom: SPACING.md,
    },

    emptyState: {
        textAlign: "center",
        marginTop: SPACING.xl,
    },

    footerLoader: {
        marginVertical: SPACING.lg,
    },

    featuredCard: {
        marginTop: SPACING.md,
        height: 220,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },

    listPlaceholder: {
        marginTop: SPACING.md,
        height: 100,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
});
