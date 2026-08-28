import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import SkeletonBlock from "../../Home/components/SkeletonBlock";
import { useThemedStyles } from "../../../providers/ThemeProvider";
import { COLORS } from "../../../constants/colors";

export default function PodcastSkeleton() {
    const styles = useThemedStyles(createStyles);
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Search */}
            <View style={styles.search}>
                <SkeletonBlock
                    width="100%"
                    height={54}
                    borderRadius={16}
                />
            </View>

            {/* Featured */}
            <View style={styles.section}>
                <SkeletonBlock
                    width={150}
                    height={18}
                    borderRadius={8}
                />

                <SkeletonBlock
                    width="100%"
                    height={220}
                    borderRadius={22}
                />

                <SkeletonBlock
                    width="70%"
                    height={22}
                    borderRadius={8}
                />

                <SkeletonBlock
                    width="100%"
                    height={14}
                    borderRadius={6}
                />

                <SkeletonBlock
                    width="90%"
                    height={14}
                    borderRadius={6}
                />

                <SkeletonBlock
                    width={70}
                    height={14}
                    borderRadius={6}
                />
            </View>

            {/* Latest Podcasts */}
            <View style={styles.section}>
                <SkeletonBlock
                    width={140}
                    height={18}
                    borderRadius={8}
                />

                {[1, 2, 3, 4].map((item) => (
                    <View
                        key={item}
                        style={styles.card}
                    >
                        <SkeletonBlock
                            width={90}
                            height={90}
                            borderRadius={16}
                        />

                        <View style={styles.contentArea}>
                            <SkeletonBlock
                                width="80%"
                                height={18}
                                borderRadius={8}
                            />

                            <SkeletonBlock
                                width="100%"
                                height={14}
                                borderRadius={6}
                            />

                            <SkeletonBlock
                                width="90%"
                                height={14}
                                borderRadius={6}
                            />

                            <SkeletonBlock
                                width={60}
                                height={12}
                                borderRadius={6}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingHorizontal: 22,
        paddingTop: 24,
        paddingBottom: 120,
    },

    search: {
        marginTop: 12,
    },

    section: {
        marginTop: 32,
        gap: 16,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: COLORS.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: 14,
    },

    contentArea: {
        flex: 1,
        gap: 10,
    },
});
