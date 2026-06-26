import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import SkeletonBlock from "./SkeletonBlock";

const { width: SCREEN_W } = Dimensions.get("window");

export default function HomeSkeleton() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero */}
            <SkeletonBlock
                width={SCREEN_W}
                height={SCREEN_W * 0.88}
                borderRadius={0}
            />

            {/* Player strip */}
            <View style={styles.strip}>
                <SkeletonBlock width="100%" height={4} borderRadius={4} />
                <View style={styles.row}>
                    <SkeletonBlock width={110} height={14} borderRadius={8} />
                    <SkeletonBlock width={130} height={46} borderRadius={50} />
                </View>
            </View>

            {/* Up next section */}
            <View style={styles.section}>
                <SkeletonBlock width={80} height={16} borderRadius={8} />
                <View style={styles.upNextCard}>
                    <SkeletonBlock width={72} height={72} borderRadius={14} />
                    <View style={{ flex: 1, gap: 8 }}>
                        <SkeletonBlock width="40%" height={12} borderRadius={6} />
                        <SkeletonBlock width="85%" height={16} borderRadius={8} />
                        <SkeletonBlock width="30%" height={12} borderRadius={6} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0E",
    },

    content: {
        paddingBottom: 120,
    },

    strip: {
        paddingHorizontal: 22,
        paddingTop: 20,
        gap: 18,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    section: {
        marginTop: 32,
        paddingHorizontal: 22,
        gap: 16,
    },

    upNextCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "#13131a",
        borderRadius: 18,
        padding: 14,
    },
});
