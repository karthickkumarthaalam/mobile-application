import React from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { Play, Clock3 } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";

import { COLORS } from "../../../constants/colors";
import { SPACING, RADIUS } from "../../../constants/spacing";

import { Podcast } from "../../../types/podcast";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface FeaturedPodcastProps {
    podcast: Podcast;
    onPress: (podcast: Podcast) => void;
}

export default function FeaturedPodcast({
    podcast,
    onPress,
}: FeaturedPodcastProps) {
    const styles = useThemedStyles(createStyles);

    return (
        <Pressable
            onPress={() => onPress(podcast)}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
        >
            <ImageBackground
                source={{ uri: podcast.image_url }}
                imageStyle={styles.image}
                style={styles.banner}
            >
                <View style={styles.overlay} />


            </ImageBackground>

            <View style={styles.content}>
                <AppText
                    numberOfLines={2}
                    variant="subHeading"
                    weight="700"
                >
                    {podcast.title}
                </AppText>

                {!!podcast.description && (
                    <AppText
                        numberOfLines={2}
                        color={COLORS.textSecondary}
                        style={styles.description}
                    >
                        {podcast.description.replace(/<[^>]+>/g, "")}
                    </AppText>
                )}

                <View style={styles.footer}>
                    <Clock3
                        size={14}
                        color={COLORS.textSecondary}
                    />

                    <AppText
                        color={COLORS.textSecondary}
                        style={styles.duration}
                    >
                        {podcast.duration} min
                    </AppText>
                </View>
            </View>
        </Pressable>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        marginTop: SPACING.md,
    },

    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },

    banner: {
        height: 220,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        borderRadius: RADIUS.xl,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: RADIUS.xl,
    },

    playButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.35)",
    },

    content: {
        marginTop: SPACING.md,
    },

    description: {
        marginTop: SPACING.xs,
        lineHeight: 20,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.md,
    },

    duration: {
        marginLeft: SPACING.xs,
    },
});
