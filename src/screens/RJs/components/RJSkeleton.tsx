
import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonBlock from "../../Home/components/SkeletonBlock";
import { SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

export default function RJSkeleton() {
    const styles = useThemedStyles(createStyles);

    return (
        <View style={styles.container}>
            {/* Portrait */}
            <View style={styles.portrait}>
                <SkeletonBlock
                    width="100%"
                    height={380}
                    borderRadius={24}
                    style={styles.portraitPlaceholder}
                />

                <View style={styles.portraitContent}>
                    <SkeletonBlock
                        width={90}
                        height={12}
                        borderRadius={6}
                    />

                    <SkeletonBlock
                        width="65%"
                        height={30}
                        borderRadius={8}
                    />

                    <SkeletonBlock
                        width={38}
                        height={3}
                        borderRadius={2}
                    />
                </View>
            </View>

            {/* Description */}
            <View style={styles.details}>
                <SkeletonBlock
                    width={160}
                    height={12}
                    borderRadius={6}
                />

                <View style={styles.description}>
                    <SkeletonBlock
                        width="100%"
                        height={13}
                        borderRadius={6}
                    />

                    <SkeletonBlock
                        width="90%"
                        height={13}
                        borderRadius={6}
                    />

                    <SkeletonBlock
                        width="65%"
                        height={13}
                        borderRadius={6}
                    />
                </View>
            </View>
        </View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            width: "100%",
        },

        portrait: {
            marginHorizontal: SPACING.xl,
            position: "relative",
            aspectRatio: 0.88,
            borderRadius: 24,
            overflow: "hidden",
        },

        portraitContent: {
            position: "absolute",
            bottom: SPACING.xxl,
            left: SPACING.xl,
            right: SPACING.xl,
            gap: SPACING.md,
        },

        portraitPlaceholder: {
            height: "100%",
        },

        details: {
            marginHorizontal: SPACING.xl,
            marginTop: SPACING.lg,
            padding: SPACING.lg,
            borderRadius: 20,
        },

        description: {
            marginTop: SPACING.md,
            gap: SPACING.sm,
        },
    });
