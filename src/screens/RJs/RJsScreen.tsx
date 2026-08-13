import React, { useMemo, useRef, useState } from "react";
import {
    Dimensions,
    RefreshControl,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../components/Text/AppText";
import RJCard from "./components/RJCard";
import RJSkeleton from "./components/RJSkeleton";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";

// import { RJ } from "../../types/rj";
import { useRJs } from "../../hooks/useRjs";

const { width, height } = Dimensions.get("window");

export default function RJsScreen() {
    const { data, isLoading, refetch, isRefetching } = useRJs();

    const rjs = useMemo(() => data?.data ?? [], [data]);

    const [activeIndex, setActiveIndex] = useState(0);

    const CARD_WIDTH = width;

    const CARD_HEIGHT = height;
    if (isLoading) {
        return (
            <LinearGradient
                colors={GRADIENTS.screen}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <AppText
                            variant="small"
                            weight="700"
                            color={COLORS.primaryBright}
                            style={styles.eyebrow}
                        >
                            Meet The Voices
                        </AppText>

                        <AppText
                            variant="display"
                            weight="700"
                            style={styles.title}
                        >
                            Radio Jockeys
                        </AppText>

                        <AppText
                            color={COLORS.textSecondary}
                            style={styles.description}
                        >
                            Discover the passionate voices behind Thaalam Radio. Each presenter brings a unique style, energy and personally to every show.
                        </AppText>
                    </View>

                    <Carousel
                        loop
                        width={CARD_WIDTH}
                        height={CARD_HEIGHT}
                        data={[1, 2, 3]}
                        scrollAnimationDuration={900}
                        style={{
                            width,
                            alignSelf: "center",
                        }}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.92,
                            parallaxScrollingOffset: 70,
                            parallaxAdjacentItemScale: 0.82,
                        }}
                        renderItem={() => <RJSkeleton />}
                    />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    if (!rjs.length) {
        return (
            <LinearGradient
                colors={GRADIENTS.screen}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.empty}>
                        <AppText
                            variant="heading"
                            weight="700"
                            align="center"
                        >
                            No Radio Jockeys
                        </AppText>

                        <AppText
                            align="center"
                            color={COLORS.textSecondary}
                            style={{
                                marginTop: 10,
                            }}
                        >
                            There are no RJ profiles available at the moment.
                        </AppText>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={GRADIENTS.screen}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.glow} />

                <View style={styles.header}>
                    <AppText
                        variant="small"
                        weight="700"
                        color={COLORS.primaryBright}
                        style={styles.eyebrow}
                    >
                        Meet The Voices
                    </AppText>

                    <AppText
                        variant="display"
                        weight="700"
                        style={styles.title}
                    >
                        Radio Jockeys
                    </AppText>

                    <AppText
                        color={COLORS.textSecondary}
                        style={styles.description}
                    >
                        Discover the passionate voices behind Thaalam Radio. Each presenter brings a unique style, energy and personally to every show.
                    </AppText>
                </View>

                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    tintColor={COLORS.primary}
                />
                <Carousel
                    loop={false}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    data={rjs}
                    pagingEnabled
                    snapEnabled
                    mode="parallax"
                    style={{
                        width,
                        alignSelf: "center",
                    }}
                    scrollAnimationDuration={700}
                    modeConfig={{
                        parallaxScrollingScale: 0.92,
                        parallaxScrollingOffset: 70,
                        parallaxAdjacentItemScale: 0.84,
                    }}
                    onSnapToItem={(index) => {
                        setActiveIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <RJCard rj={item} />
                    )}
                />



            </SafeAreaView>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
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

    scrollContent: {
        paddingBottom: 50,
    },

    header: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
        marginBottom: 10,
    },

    eyebrow: {
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 8,
    },

    title: {
        letterSpacing: -1,
        marginBottom: 14,
    },

    description: {
        lineHeight: 24,
        fontSize: 15,
        opacity: 0.8,
        maxWidth: 380,
    },

    carouselContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 2,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: "rgba(255,255,255,0.25)",
    },

    activeDot: {
        width: 28,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },

    emptyTitle: {
        marginTop: 16,
    },

    emptyDescription: {
        marginTop: 10,
        textAlign: "center",
        lineHeight: 22,
        opacity: 0.75,
    },

    skeletonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});