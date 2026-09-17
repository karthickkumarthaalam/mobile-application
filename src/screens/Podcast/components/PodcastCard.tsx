import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { Clock3, Headphones } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";

import { COLORS } from "../../../constants/colors";
import { SPACING, RADIUS } from "../../../constants/spacing";

import { Podcast } from "../../../types/podcast";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface PodcastCardProps {
    podcast: Podcast;
    onPress: (podcast: Podcast) => void;
}

export default function PodcastCard({
    podcast,
    onPress,
}: PodcastCardProps) {
    const styles = useThemedStyles(createStyles);
    const DEFAULT_PODCAST = require("../../../assets/images/podcast/default-podcast.webp");

    return (
        <Pressable
            onPress={() => onPress(podcast)}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
        >
            <Image
                source={podcast.image_url ? { uri: podcast.image_url } : DEFAULT_PODCAST}
                style={styles.image}
            />

            <View style={styles.content}>
                <AppText
                    variant="caption"
                    weight="700"
                    numberOfLines={2}
                    style={styles.title}
                >
                    {podcast.title}
                </AppText>

                <View style={styles.meta}>
                    <Clock3
                        size={14}
                        color={COLORS.textSecondary}
                    />

                    <AppText
                        color={COLORS.textSecondary}
                        style={styles.duration}
                    >
                        {podcast.duration}
                    </AppText>
                </View>
            </View>
        </Pressable>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 10,
        marginTop: SPACING.md,
    },

    pressed: {
        opacity: 0.7,
    },

    image: {
        width: 72,
        height: 72,
        borderRadius: 6,
        backgroundColor: COLORS.glass,
    },

    content: {
        flex: 1,
        marginLeft: SPACING.md,
        justifyContent: "center",
    },

    title: {
        lineHeight: 22,
    },

    meta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    duration: {
        marginLeft: 6,
        fontSize: 13,
    },
});
