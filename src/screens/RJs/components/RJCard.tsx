import React from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Clock3, Mic2, Play, Heart, Share2 } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { RJ } from "../../../types/rj";

const { width } = Dimensions.get('window');

interface RJCardProps {
    rj: RJ;
}

export default function RJCard({ rj }: RJCardProps) {



    return (
        <View style={styles.card}>
            <ImageBackground
                source={{
                    uri: rj.image
                        ? `https://api.thaalam.ch/api/${rj.image.replace(/\\/g, "/")}`
                        : "https://thaalam.ch/assets/img/logo/thalam-logo.png",
                }}
                style={styles.image}
                imageStyle={styles.imageRadius}
            >
                <LinearGradient
                    colors={[
                        "rgba(0,0,0,0.1)",
                        "rgba(0,0,0,0.35)",
                        "rgba(0,0,0,0.7)",
                    ]}
                    style={styles.overlay}
                />

                <View style={styles.overlay} />

            </ImageBackground>

            <View style={styles.content}>
                {/* RJ Info */}
                <View style={styles.header}>
                    <View style={styles.rjInfo}>
                        <View style={styles.avatarPlaceholder}>
                            <Mic2 size={16} color={COLORS.primary} />
                        </View>
                        <View>
                            <AppText
                                variant="caption"
                                weight="700"
                                color={COLORS.primary}
                                style={styles.tag}
                            >
                                RADIO JOCKEY
                            </AppText>
                            <AppText
                                variant="heading"
                                weight="700"
                                style={styles.name}
                            >
                                {rj.name}
                            </AppText>
                        </View>
                    </View>


                </View>

                {/* Description */}
                <AppText
                    numberOfLines={2}
                    color={COLORS.textSecondary}
                    style={styles.description}
                >
                    {rj.description ||
                        `${rj.name} is one of Thaalam Radio's beloved voices, bringing energy and passion to every show.`}
                </AppText>

                {/* Shows Section */}
                {/* {!!rj.shows.length && (
                    <View style={styles.showsSection}>
                        <View style={styles.showsHeader}>
                            <AppText variant="caption" weight="600" color={COLORS.textSecondary}>
                                UPCOMING SHOWS
                            </AppText>
                            <View style={styles.showsDivider} />
                        </View>

                        <View style={styles.showsList}>
                            {rj.shows.slice(0, 2).map((show, index) => (
                                <View
                                    key={index}
                                    style={styles.showCard}
                                >
                                    <View style={styles.showIconContainer}>
                                        <LinearGradient
                                            colors={["rgba(220,38,38,0.15)", "rgba(220,38,38,0.05)"]}
                                            style={styles.showIcon}
                                        >
                                            <Clock3 size={18} color={COLORS.primary} />
                                        </LinearGradient>
                                    </View>

                                    <View style={styles.showInfo}>
                                        <AppText
                                            variant="caption"
                                            weight="700"
                                            color={COLORS.primary}
                                            style={styles.showCategory}
                                        >
                                            {show.category.toUpperCase()}
                                        </AppText>
                                        <AppText
                                            variant="body"
                                            weight="600"
                                            style={styles.showTime}
                                        >
                                            {show.startTime.slice(0, 5)} - {show.endTime.slice(0, 5)}
                                        </AppText>
                                    </View>

                                    <View style={styles.showIndicator} />
                                </View>
                            ))}
                        </View>
                    </View>
                )} */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 28,
        marginBottom: 32,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    image: {
        width: width * 0.85,
        height: width * 1.1,
        alignSelf: "center",
        // justifyContent: "space-between",
        marginTop: 24,
    },

    imageRadius: {
        borderRadius: 24,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    imageActions: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 18,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
    },
    content: {
        padding: SPACING.xl,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.lg,
        marginTop: -36,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    rjInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.text,
        alignItems: "center",
        justifyContent: "center",
    },

    tag: {
        letterSpacing: 2,
        fontSize: 10,
        marginBottom: 2,
    },
    name: {
        fontSize: 22,
        lineHeight: 28,
    },

    description: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
        opacity: 0.8,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
        marginBottom: 8,
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
    },
    showsSection: {
        gap: 16,
    },
    showsHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    showsDivider: {
        flex: 1,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    showsList: {
        gap: 12,
    },
    showCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.04)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },

    showIconContainer: {
        marginRight: 14,
    },
    showIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    showInfo: {
        flex: 1,
        gap: 2,
    },
    showCategory: {
        letterSpacing: 1,
        fontSize: 10,
    },
    showTime: {
        fontSize: 15,
        letterSpacing: 0.5,
    },
    showIndicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
        opacity: 0.3,
    },
});