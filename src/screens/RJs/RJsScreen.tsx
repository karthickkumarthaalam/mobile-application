
import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import {
    ArrowDown,
    ArrowRight,
    Headphones,
    Mic2,
    Radio,
    Users,
} from "lucide-react-native";

import AppText from "../../components/Text/AppText";

import RJCard from "./components/RJCard";
import RJSkeleton from "./components/RJSkeleton";

import {
    COLORS,
    GRADIENTS,
} from "../../constants/colors";

import {
    RADIUS,
    SPACING,
} from "../../constants/spacing";

import { useRJs } from "../../hooks/useRjs";
import { useThemedStyles } from "../../providers/ThemeProvider";

import type { RJ } from "../../types/rj";

// =============================================
// Helpers
// =============================================

const getRJImage = (image?: string) => {
    if (!image) return null;

    return `https://api.thaalam.ch/api/${image.replace(/\\/g, "/")}`;
};

// =============================================
// Main screen
// =============================================

export default function RJsScreen() {
    const styles = useThemedStyles(createStyles);

    const {
        data,
        isLoading,
        refetch,
        isRefetching,
        isError,
    } = useRJs();

    const rjs = useMemo(
        () => data?.data ?? [],
        [data]
    );

    const [activeIndex, setActiveIndex] = useState(0);

    const selectorRef = useRef<FlatList<RJ>>(null);

    const selectedIndex = Math.min(
        activeIndex,
        Math.max(rjs.length - 1, 0)
    );

    const activeRJ = rjs[selectedIndex];

    const handleSelectRJ = useCallback((index: number) => {
        setActiveIndex(index);

        selectorRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    }, []);

    const handleRefresh = useCallback(() => {
        setActiveIndex(0);
        refetch();
    }, [refetch]);

    const handleRetry = useCallback(() => {
        refetch();
    }, [refetch]);

    const handleScrollToPresenters = useCallback(() => {
        selectorRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
        });
    }, []);

    // -----------------------------------------
    // Loading state
    // -----------------------------------------

    if (isLoading && !data) {
        return (
            <LinearGradient
                colors={GRADIENTS.screen}
                style={styles.gradient}
            >
                <SafeAreaView
                    style={styles.safeArea}
                    edges={["top"]}
                >
                    <View style={styles.loadingScreen}>
                        <Masthead styles={styles} />

                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                            />

                            <AppText
                                variant="small"
                                color={COLORS.textSecondary}
                            >
                                Discovering the voices of Thaalam
                            </AppText>
                        </View>

                        <RJSkeleton />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    // -----------------------------------------
    // Error state
    // -----------------------------------------

    if (isError && !data) {
        return (
            <LinearGradient
                colors={GRADIENTS.screen}
                style={styles.gradient}
            >
                <SafeAreaView
                    style={styles.safeArea}
                    edges={["top"]}
                >
                    <Masthead styles={styles} />

                    <EmptyState
                        styles={styles}
                        icon="radio"
                        title="We're off the air"
                        description="We couldn't retrieve the presenter profiles right now. Please try again in a moment."
                        actionLabel="Retry"
                        onAction={handleRetry}
                    />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    // -----------------------------------------
    // Empty state
    // -----------------------------------------

    if (!rjs.length) {
        return (
            <LinearGradient
                colors={GRADIENTS.screen}
                style={styles.gradient}
            >
                <SafeAreaView
                    style={styles.safeArea}
                    edges={["top"]}
                >
                    <Masthead styles={styles} />

                    <EmptyState
                        styles={styles}
                        icon="users"
                        title="Voices coming soon"
                        description="We're getting our presenters ready. Check back soon to discover the people behind your favourite programmes."
                    />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    // -----------------------------------------
    // Presenter thumbnail
    // -----------------------------------------

    const renderPresenter = ({
        item,
        index,
    }: {
        item: RJ;
        index: number;
    }) => {
        const isActive = index === selectedIndex;
        const imageUri = getRJImage(item.image);

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectRJ(index)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`View ${item.name}'s profile`}
                style={[
                    styles.presenterItem,
                    isActive && styles.presenterItemActive,
                ]}
            >
                <View
                    style={[
                        styles.thumbnailFrame,
                        isActive && styles.thumbnailFrameActive,
                    ]}
                >
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.thumbnailImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.thumbnailFallback}>
                            <Mic2
                                size={20}
                                color={COLORS.textMuted}
                            />
                        </View>
                    )}

                    {isActive && (
                        <View style={styles.thumbnailActiveMark}>
                            <View style={styles.thumbnailActiveDot} />
                        </View>
                    )}
                </View>

                <AppText
                    numberOfLines={1}
                    weight={isActive ? "700" : "500"}
                    color={
                        isActive
                            ? COLORS.text
                            : COLORS.textSecondary
                    }
                    style={styles.presenterName}
                >
                    {item.name}
                </AppText>

                <AppText
                    variant="caption"
                    color={isActive ? COLORS.gold : COLORS.textMuted}
                    style={styles.presenterNumber}
                >
                    PRESENTER {String(index + 1).padStart(2, "0")}
                </AppText>
            </TouchableOpacity>
        );
    };

    // -----------------------------------------
    // Main UI
    // -----------------------------------------

    const listHeader = (
        <View style={styles.scrollContent}>
            <LinearGradient
                style={styles.hero}
                colors={["#8A5A00", "#D4A72C", "#f1ce5a"]}>
                <View style={styles.heroGlow} />
                <View style={styles.heroIcon}>
                    <Radio size={30} color={COLORS.black} strokeWidth={1.6} />
                </View>
                <View style={styles.heroBadge}>
                    <View style={styles.liveDot} />
                    <AppText
                        variant="small"
                        weight="500"
                        color={COLORS.black}
                        style={styles.heroEyebrow}
                    >
                        THAALAM PRESENTERS
                    </AppText>
                </View>
                <AppText variant="heading" weight="700" style={styles.heroTitle}>
                    Meet the voices{"\n"}behind Thaalam.
                </AppText>
                <AppText
                    variant="caption"
                    color={COLORS.black}
                    style={styles.heroDescription}
                >
                    Get to know the presenters behind your favourite stories, music, and conversations.
                </AppText>
            </LinearGradient>

            <View style={styles.gallerySection}>
                <View style={styles.galleryHeading}>
                    <View style={styles.galleryHeadingText}>
                        <AppText
                            variant="small"
                            weight="700"
                            color={COLORS.gold}
                            style={styles.sectionEyebrow}
                        >
                            EXPLORE OUR PEOPLE
                        </AppText>
                        <AppText
                            variant="subHeading"
                            weight="700"
                            style={styles.galleryTitle}
                        >
                            Meet the presenters
                        </AppText>
                    </View>
                    <View style={styles.galleryCount}>
                        <Users size={15} color={COLORS.gold} />
                        <AppText
                            variant="small"
                            color={COLORS.text}
                            weight="600"
                        >
                            {rjs.length}
                        </AppText>
                    </View>
                </View>
                <FlatList
                    ref={selectorRef}
                    data={rjs}
                    horizontal
                    keyExtractor={(item, index) => String(item.id ?? index)}
                    renderItem={renderPresenter}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.galleryList}
                    ItemSeparatorComponent={() => (
                        <View style={styles.gallerySeparator} />
                    )}
                    getItemLayout={(_, index) => ({
                        length: 116,
                        offset: 116 * index,
                        index,
                    })}
                    onScrollToIndexFailed={({ index }) => {
                        selectorRef.current?.scrollToOffset({
                            offset: Math.max(0, index * 116),
                            animated: true,
                        });
                    }}
                    initialNumToRender={6}
                    maxToRenderPerBatch={6}
                    windowSize={5}
                />
            </View>

            <View style={styles.featuredSection}>
                <View style={styles.featuredHeading}>
                    <View>
                        <AppText
                            variant="small"
                            weight="700"
                            color={COLORS.gold}
                            style={styles.sectionEyebrow}
                        >
                            THE VOICE OF THAALAM
                        </AppText>
                        <AppText
                            variant="subHeading"
                            weight="700"
                            style={styles.featuredTitle}
                        >
                            In the spotlight
                        </AppText>
                    </View>

                    <View style={styles.profileCounter}>
                        <AppText
                            weight="700"
                            color={COLORS.text}
                            style={styles.counterNumber}
                        >
                            {String(selectedIndex + 1).padStart(2, "0")}
                        </AppText>
                        <View style={styles.counterDivider} />
                        <AppText
                            weight="600"
                            color={COLORS.textMuted}
                            style={styles.counterTotal}
                        >
                            {String(rjs.length).padStart(2, "0")}
                        </AppText>
                    </View>
                </View>
                <RJCard rj={activeRJ} />
            </View>

            <View style={styles.signature}>
                <View style={styles.signatureLine} />
                <View style={styles.signatureContent}>
                    <Headphones size={18} color={COLORS.gold} />
                    <AppText
                        variant="small"
                        weight="700"
                        style={styles.signatureText}
                    >
                        EVERY VOICE. ONE THAALAM.
                    </AppText>
                </View>
                <View style={styles.signatureLine} />
            </View>
        </View >
    );

    return (
        <LinearGradient
            colors={GRADIENTS.screen}
            style={styles.gradient}
        >
            <SafeAreaView
                style={styles.safeArea}
                edges={["left", "right"]}
            >
                <FlatList
                    data={[]}
                    renderItem={null}
                    ListHeaderComponent={listHeader}
                    showsVerticalScrollIndicator={false}
                    refreshing={isRefetching}
                    onRefresh={handleRefresh}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

// =============================================
// Masthead
// =============================================

function Masthead({
    styles,
}: {
    styles: ReturnType<typeof createStyles>;
}) {
    return (
        <View style={styles.masthead}>

            <AppText
                variant="small"
                weight="700"
                color={COLORS.primary}
                style={styles.mastheadEyebrow}
            >
                BEHIND EVERY GREAT SOUND
            </AppText>

            <AppText
                variant="title"
                weight="700"
                style={styles.mastheadTitle}
            >
                The voices{"\n"}you connect with.
            </AppText>

            <View style={styles.mastheadBottom}>
                <AppText
                    color={COLORS.textSecondary}
                    style={styles.mastheadDescription}
                >
                    Meet the people who bring stories, music
                    and conversations to life.
                </AppText>

                <View style={styles.mastheadAccent} />
            </View>
        </View>
    );
}

// =============================================
// Empty state
// =============================================

function EmptyState({
    styles,
    icon,
    title,
    description,
    actionLabel,
    onAction,
}: {
    styles: ReturnType<typeof createStyles>;
    icon: "radio" | "users";
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}) {
    const Icon = icon === "radio" ? Radio : Users;

    return (
        <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
                <Icon
                    size={30}
                    color={COLORS.primary}
                    strokeWidth={1.6}
                />
            </View>

            <AppText
                variant="heading"
                weight="700"
                align="center"
                style={styles.emptyTitle}
            >
                {title}
            </AppText>

            <AppText
                color={COLORS.textSecondary}
                align="center"
                style={styles.emptyDescription}
            >
                {description}
            </AppText>

            {actionLabel && onAction && (
                <TouchableOpacity
                    onPress={onAction}
                    activeOpacity={0.8}
                    style={styles.retryButton}
                >
                    <AppText
                        weight="700"
                        color={COLORS.primaryText}
                    >
                        {actionLabel}
                    </AppText>

                    <ArrowRight
                        size={16}
                        color={COLORS.primaryText}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

// =============================================
// Styles
// =============================================

const createStyles = () =>
    StyleSheet.create({
        gradient: {
            flex: 1,
        },

        safeArea: {
            flex: 1,
        },

        hero: {
            minHeight: 230,
            padding: SPACING.xl,
            borderRadius: RADIUS.md,
            overflow: "hidden",
            justifyContent: "flex-end",
            backgroundColor: COLORS.primaryDark,
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
        heroTitle: {
            marginTop: SPACING.lg,
            color: COLORS.black,
            lineHeight: 24,
            maxWidth: 270,
        },

        heroDescription: {
            marginTop: SPACING.md,
            lineHeight: 21,
            maxWidth: 300,
        },

        scrollContent: {
            paddingBottom: SPACING.xxxl,
        },

        // Masthead
        masthead: {
            paddingHorizontal: SPACING.xl,
            paddingTop: SPACING.lg,
            paddingBottom: SPACING.xl,
        },

        brandRow: {
            flexDirection: "row",
            alignItems: "center",
        },

        brandMark: {
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: COLORS.primarySoft,
            borderWidth: 1,
            borderColor: COLORS.primaryBorder,
            alignItems: "center",
            justifyContent: "center",
        },

        brandText: {
            marginLeft: SPACING.sm,
            gap: 1,
        },

        brandName: {
            fontSize: 12,
            letterSpacing: 1.6,
        },

        brandCaption: {
            fontSize: 8,
            letterSpacing: 1.1,
        },

        brandSpacer: {
            flex: 1,
        },

        brandStatus: {
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
        },

        brandStatusDot: {
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: COLORS.primary,
        },

        mastheadRule: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: COLORS.glassBorder,
            marginTop: SPACING.lg,
            marginBottom: SPACING.xl,
        },

        mastheadEyebrow: {
            fontSize: 9,
            letterSpacing: 2,
        },

        mastheadTitle: {
            letterSpacing: -1.3,
            marginTop: SPACING.md,
        },

        mastheadBottom: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.lg,
            marginTop: SPACING.md,
        },

        mastheadDescription: {
            flex: 1,
            maxWidth: 285,
            fontSize: 13,
            lineHeight: 21,
        },

        mastheadAccent: {
            width: 34,
            height: 3,
            borderRadius: 2,
            backgroundColor: COLORS.primary,
        },

        // Featured
        featuredSection: {
            marginTop: SPACING.sm,
        },

        featuredHeading: {
            paddingHorizontal: SPACING.xl,
            marginBottom: SPACING.lg,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
        },

        sectionEyebrow: {
            fontSize: 9,
            letterSpacing: 1.5,
        },

        featuredTitle: {
            marginTop: 5,
            letterSpacing: -0.4,
        },

        profileCounter: {
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            paddingBottom: 3,
        },

        counterNumber: {
            fontSize: 15,
            fontVariant: ["tabular-nums"],
        },

        counterDivider: {
            width: 1,
            height: 13,
            backgroundColor: COLORS.glassBorder,
        },

        counterTotal: {
            fontSize: 12,
            fontVariant: ["tabular-nums"],
        },

        // Presenter gallery
        gallerySection: {
            marginTop: SPACING.xxl,
        },

        galleryHeading: {
            paddingHorizontal: SPACING.xl,
            marginBottom: SPACING.lg,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
        },

        galleryHeadingText: {
            gap: 5,
        },

        galleryTitle: {
            fontSize: 21,
            letterSpacing: -0.5,
        },

        galleryCount: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingBottom: 3,
        },

        galleryList: {
            paddingHorizontal: SPACING.xl,
            paddingBottom: SPACING.xs,
        },

        gallerySeparator: {
            width: 12,
        },

        presenterItem: {
            width: 104,
            alignItems: "flex-start",
        },

        presenterItemActive: {
            opacity: 1,
        },

        thumbnailFrame: {
            width: 104,
            height: 112,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.glassBorder,
        },

        thumbnailFrameActive: {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: COLORS.gold,
        },

        thumbnailImage: {
            width: "100%",
            height: "100%",
        },

        thumbnailFallback: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primarySoft,
        },

        thumbnailActiveMark: {
            position: "absolute",
            right: 7,
            bottom: 7,
            width: 14,
            height: 14,
            borderRadius: 9,
            backgroundColor: COLORS.gold,
            alignItems: "center",
            justifyContent: "center",
        },

        thumbnailActiveDot: {
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
        },

        presenterName: {
            fontSize: 12,
            marginTop: SPACING.sm,
            width: "100%",
        },

        presenterNumber: {
            fontSize: 8,
            letterSpacing: 1,
            marginTop: 4,
        },

        galleryHint: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginHorizontal: SPACING.xl,
            marginTop: SPACING.lg,
        },

        // Signature
        signature: {
            marginHorizontal: SPACING.xl,
            marginTop: SPACING.xxxl,
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.md,
        },

        signatureLine: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: COLORS.glassBorder,
        },

        signatureContent: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
        },

        signatureText: {
            fontSize: 9,
            letterSpacing: 1.2,
        },

        // Loading
        loadingScreen: {
            flex: 1,
        },

        loadingIndicator: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.sm,
            marginBottom: SPACING.xl,
        },

        // Empty
        emptyState: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: SPACING.xl,
        },

        emptyIcon: {
            width: 76,
            height: 76,
            borderRadius: 38,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primarySoft,
            borderWidth: 1,
            borderColor: COLORS.primaryBorder,
            marginBottom: SPACING.xl,
        },

        emptyTitle: {
            fontSize: 21,
        },

        emptyDescription: {
            maxWidth: 310,
            marginTop: SPACING.sm,
            fontSize: 13,
            lineHeight: 22,
        },

        retryButton: {
            height: 46,
            marginTop: SPACING.xl,
            paddingHorizontal: SPACING.xl,
            borderRadius: 24,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.sm,
        },
    });
