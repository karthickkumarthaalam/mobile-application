import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import SkeletonBlock from "../../Home/components/SkeletonBlock";
import { COLORS, GRADIENTS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ARTWORK_SIZE = SCREEN_WIDTH - SPACING.xl * 2;

export default function PodcastDetailsSkeleton() {
    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.glowTop} />
                <View style={styles.glowBottom} />

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <SkeletonBlock width={40} height={40} borderRadius={20} />
                        <View style={styles.headerTitle}>
                            <SkeletonBlock width={92} height={10} borderRadius={5} />
                            <SkeletonBlock width={136} height={18} borderRadius={7} />
                        </View>
                        <SkeletonBlock width={40} height={40} borderRadius={20} />
                    </View>

                    <View style={styles.artwork}>
                        <SkeletonBlock width={ARTWORK_SIZE} height={ARTWORK_SIZE} borderRadius={RADIUS.xl} />
                    </View>

                    <View style={styles.details}>
                        <SkeletonBlock width="82%" height={24} borderRadius={8} />
                        <SkeletonBlock width="56%" height={24} borderRadius={8} />
                        <SkeletonBlock width="32%" height={13} borderRadius={6} />
                    </View>

                    <View style={styles.player}>
                        <SkeletonBlock width="100%" height={4} borderRadius={2} />
                        <View style={styles.timeRow}>
                            <SkeletonBlock width={34} height={10} borderRadius={5} />
                            <SkeletonBlock width={34} height={10} borderRadius={5} />
                        </View>
                    </View>

                    <View style={styles.controls}>
                        <SkeletonBlock width={22} height={22} borderRadius={11} />
                        <SkeletonBlock width={64} height={64} borderRadius={32} />
                        <SkeletonBlock width={22} height={22} borderRadius={11} />
                    </View>

                    <View style={styles.about}>
                        <SkeletonBlock width={80} height={16} borderRadius={7} />
                        <SkeletonBlock width="100%" height={14} borderRadius={6} />
                        <SkeletonBlock width="92%" height={14} borderRadius={6} />
                        <SkeletonBlock width="68%" height={14} borderRadius={6} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { paddingBottom: 120 },
    glowTop: {
        position: "absolute", width: 280, height: 280, borderRadius: 140,
        backgroundColor: COLORS.primary, opacity: 0.08, top: -110, right: -130,
    },
    glowBottom: {
        position: "absolute", width: 220, height: 220, borderRadius: 110,
        backgroundColor: COLORS.primary, opacity: 0.04, top: 300, left: -90,
    },
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg,
    },
    headerTitle: { alignItems: "center", gap: SPACING.xs },
    artwork: { alignItems: "center", paddingTop: 28 },
    details: { alignItems: "center", gap: SPACING.sm, paddingTop: SPACING.xl },
    player: { paddingTop: SPACING.xl, paddingHorizontal: SPACING.xl },
    timeRow: { flexDirection: "row", justifyContent: "space-between", paddingTop: SPACING.sm },
    controls: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        gap: 44, paddingTop: 26,
    },
    about: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.xxl, gap: SPACING.sm },
});
