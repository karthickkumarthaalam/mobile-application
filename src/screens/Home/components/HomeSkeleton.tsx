import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SkeletonBlock from "./SkeletonBlock";
import { COLORS, GRADIENTS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

const { width: SCREEN_W } = Dimensions.get("window");

export default function HomeSkeleton() {
    const styles = useThemedStyles(createStyles);
    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <SkeletonBlock width={20} height={20} borderRadius={10} />
                        <SkeletonBlock width={112} height={11} borderRadius={6} />
                        <SkeletonBlock width={20} height={20} borderRadius={10} />
                    </View>

                    <View style={styles.artworkWrap}>
                        <SkeletonBlock width={SCREEN_W - 88} height={SCREEN_W - 88} borderRadius={RADIUS.xl} />
                    </View>

                    <View style={styles.info}>
                        <SkeletonBlock width="52%" height={24} borderRadius={8} />
                        <SkeletonBlock width="30%" height={14} borderRadius={7} />
                    </View>

                    <View style={styles.player}>
                        <SkeletonBlock width="100%" height={4} borderRadius={2} />
                        <View style={styles.timeRow}>
                            <SkeletonBlock width={36} height={10} borderRadius={5} />
                            <SkeletonBlock width={64} height={10} borderRadius={5} />
                            <SkeletonBlock width={36} height={10} borderRadius={5} />
                        </View>
                        <View style={styles.controls}>
                            <SkeletonBlock width={22} height={22} borderRadius={11} />
                            <SkeletonBlock width={64} height={64} borderRadius={32} />
                            <SkeletonBlock width={22} height={22} borderRadius={11} />
                        </View>
                    </View>

                    <View style={styles.radioToggle}>
                        <SkeletonBlock width="100%" height={38} borderRadius={RADIUS.md} />
                    </View>

                    <View style={styles.section}>
                        <SkeletonBlock width={76} height={16} borderRadius={8} />
                        <View style={styles.upNextCard}>
                            <View style={{ flex: 1, gap: SPACING.sm }}>
                                <SkeletonBlock width="46%" height={11} borderRadius={6} />
                                <SkeletonBlock width="78%" height={17} borderRadius={8} />
                            </View>
                            <SkeletonBlock width={28} height={28} borderRadius={14} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    content: {
        paddingBottom: 120,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
    },

    artworkWrap: {
        alignItems: "center",
        paddingTop: 28,
    },

    info: {
        alignItems: "center",
        gap: SPACING.sm,
        paddingTop: SPACING.xl,
    },

    player: {
        paddingTop: SPACING.xl,
        paddingHorizontal: SPACING.xl,
    },

    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: SPACING.sm,
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        paddingTop: 26,
    },

    radioToggle: {
        marginTop: 26,
        marginHorizontal: SPACING.xl,
    },

    section: {
        marginTop: SPACING.xxl,
        paddingHorizontal: SPACING.xl,
        gap: SPACING.md,
    },

    upNextCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: SPACING.md,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: SPACING.md,
    },
});
