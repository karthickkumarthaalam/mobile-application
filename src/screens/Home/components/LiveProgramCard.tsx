import React, { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
    ChevronLeft,
    Heart,
    MoonStar,
    Pause,
    Play,
    Radio,
    RadioTowerIcon,
    Share2,
    Sun,
} from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useTheme, useThemedStyles } from "../../../providers/ThemeProvider";

interface LiveProgramCardProps {
    banner: string | undefined;
    programName: string;
    hostName?: string;
    programDescription?: string;
    programLabel?: string;
    screenGradient?: readonly [string, string, string];
    startTime: string;
    endTime: string;
    isPlaying?: boolean;
    isLoading?: boolean;
    canListen?: boolean;
    isSpecialShow?: boolean;
    selectedRadio?: "live" | "classic";
    isComingSoon?: boolean;
    onSelectLive?: () => void;
    onSelectClassic?: () => void;
    onListen: () => void;
    onBack?: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
    onShare?: () => void;
}

const formatSwissTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    if (hours === undefined || minutes === undefined) return time;
    return `${hours.padStart(2, "0")}:${minutes}`;
};

const LiveProgramCard = ({
    banner,
    programName,
    hostName,
    programDescription,
    programLabel = "CURRENT PROGRAM",
    screenGradient,
    startTime,
    endTime,
    isPlaying = false,
    isLoading = false,
    canListen = true,
    isSpecialShow = false,
    selectedRadio = "live",
    isComingSoon = false,
    onSelectLive,
    onSelectClassic,
    onListen,
    onBack,
    isFavorite = false,
    onToggleFavorite,
    onShare,
}: LiveProgramCardProps) => {
    const styles = useThemedStyles(createStyles);
    const { isDark, toggleTheme } = useTheme();
    const specialPulse = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isSpecialShow) {
            specialPulse.setValue(0);
            return;
        }

        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(specialPulse, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(specialPulse, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]),
        );
        pulse.start();
        return () => pulse.stop();
    }, [isSpecialShow, specialPulse]);

    const artworkActions = onToggleFavorite || onShare ? (
        <View style={styles.artworkActions}>
            {onToggleFavorite && (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    style={styles.artworkActionButton}
                    onPress={onToggleFavorite}
                    activeOpacity={0.75}
                >
                    <Heart
                        size={18}
                        color={isFavorite ? COLORS.primaryBright : COLORS.white}
                        fill={isFavorite ? COLORS.primaryBright : "transparent"}
                    />
                </TouchableOpacity>
            )}
            {onShare && (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Share live radio"
                    style={styles.artworkActionButton}
                    onPress={onShare}
                    activeOpacity={0.75}
                >
                    <Share2 size={18} color={COLORS.white} />
                </TouchableOpacity>
            )}
        </View>
    ) : null;

    return (

        <LinearGradient
            colors={screenGradient ?? GRADIENTS.screen}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    {onBack ? (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityLabel="Back"
                            style={styles.headerButton}
                            onPress={onBack}
                            activeOpacity={0.75}
                        >
                            <ChevronLeft size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.headerButton} />
                    )}

                    <View style={styles.brand}>
                        <Text style={styles.brandEyebrow}>NOW PLAYING FROM</Text>
                        <Text style={styles.brandTitle}>Thaalam Broadcasting</Text>
                    </View>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        style={styles.headerButton}
                        onPress={() => void toggleTheme()}
                        activeOpacity={0.75}
                    >
                        {isDark ? (
                            <Sun size={19} color={COLORS.gold} />
                        ) : (
                            <MoonStar size={19} color={COLORS.textSecondary} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.radioToggle}>
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={{ selected: selectedRadio === "live" }}
                        style={styles.radioOption}
                        onPress={onSelectLive}
                        activeOpacity={0.7}
                    >
                        <View style={styles.radioOptionContent}>
                            <Radio
                                size={17}
                                color={selectedRadio === "live" ? COLORS.text : COLORS.textMuted}
                            />
                            <Text
                                style={[
                                    styles.radioOptionText,
                                    selectedRadio === "live" && styles.radioOptionTextSelected,
                                ]}
                            >
                                Live
                            </Text>
                        </View>

                        {selectedRadio === "live" && (
                            <View style={styles.selectionDot} />
                        )}
                    </TouchableOpacity>

                    <View style={styles.radioDivider} />

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={{ selected: selectedRadio === "classic" }}
                        style={styles.radioOption}
                        onPress={onSelectClassic}
                        activeOpacity={0.7}
                    >
                        <View style={styles.radioOptionContent}>
                            <RadioTowerIcon
                                size={17}
                                color={selectedRadio === "classic" ? COLORS.text : COLORS.textMuted}
                            />
                            <Text
                                style={[
                                    styles.radioOptionText,
                                    selectedRadio === "classic" && styles.radioOptionTextSelected,
                                ]}
                            >
                                Classic
                            </Text>
                        </View>

                        {selectedRadio === "classic" && (
                            <View style={styles.selectionDot} />
                        )}
                    </TouchableOpacity>
                </View>
                {isComingSoon ? (
                    <View style={styles.comingSoonCard}>
                        <View style={styles.comingSoonIcon}>
                            <RadioTowerIcon size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.comingSoonCopy}>
                            <Text style={styles.sectionEyebrow}>CLASSIC RADIO</Text>
                            <AppText variant="subHeading" weight="700" color={COLORS.text}>
                                Coming soon
                            </AppText>
                            <AppText variant="small" color={COLORS.textSecondary}>
                                We're preparing another way to listen.
                            </AppText>
                        </View>
                    </View>
                ) : (
                    <>
                        {banner ? (
                            <ImageBackground
                                source={{ uri: banner }}
                                style={styles.artwork}
                                imageStyle={styles.artworkImage}
                                resizeMode="cover"
                            >

                                <View style={styles.liveBadge}>
                                    <View style={styles.liveDot} />
                                    <Text style={styles.liveBadgeText}>ON AIR</Text>
                                </View>
                                {artworkActions}
                            </ImageBackground>
                        ) : (
                            <View style={[styles.artwork, styles.artworkFallback]}>
                                <View style={styles.liveBadge}>
                                    <View style={styles.liveDot} />
                                    <Text style={styles.liveBadgeText}>ON AIR</Text>
                                </View>
                                <View style={styles.artworkFallbackCenter}>
                                    <Radio size={42} color={COLORS.primary} />
                                    <Text style={styles.fallbackText}>Thaalam Live</Text>
                                </View>
                                {artworkActions}
                            </View>
                        )}

                        <View style={styles.programInfo}>
                            <View style={styles.programTitleBlock}>
                                <Text style={styles.sectionEyebrow}>{programLabel}</Text>
                                <AppText
                                    variant="heading"
                                    weight="700"
                                    color={COLORS.text}
                                    numberOfLines={2}
                                    style={styles.programName}
                                >
                                    {programName}
                                </AppText>
                                {hostName ? (
                                    <AppText variant="body" color={COLORS.textSecondary}>
                                        with {hostName}
                                    </AppText>
                                ) : null}
                                {programDescription ? (
                                    <AppText
                                        variant="small"
                                        color={COLORS.textSecondary}
                                        numberOfLines={3}
                                        style={styles.programDescription}
                                    >
                                        {programDescription}
                                    </AppText>
                                ) : null}
                            </View>
                            <View style={styles.playButtonWrap}>
                                {isSpecialShow && (
                                    <Animated.View
                                        pointerEvents="none"
                                        style={[
                                            styles.playButtonHalo,
                                            {
                                                opacity: specialPulse.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.5, 0],
                                                }),
                                                transform: [
                                                    {
                                                        scale: specialPulse.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [0.9, 1.55],
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                )}
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        isLoading
                                            ? "Connecting to live radio"
                                            : isPlaying
                                                ? "Pause live radio"
                                                : "Play live radio"
                                    }
                                    accessibilityState={{ disabled: isLoading || !canListen }}
                                    style={[
                                        styles.playButton,
                                        !canListen && styles.playButtonDisabled,
                                    ]}
                                    onPress={onListen}
                                    disabled={isLoading || !canListen}
                                    activeOpacity={0.85}
                                >
                                    <LinearGradient
                                        colors={GRADIENTS.primary}
                                        style={styles.playButtonGradient}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color={COLORS.white} />
                                        ) : isPlaying ? (
                                            <Pause size={23} color={COLORS.white} fill={COLORS.white} />
                                        ) : (
                                            <Play size={23} color={COLORS.white} fill={COLORS.white} />
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.schedule}>
                            <View style={styles.scheduleTimes}>
                                <Text style={styles.scheduleTime}>{formatSwissTime(startTime)}</Text>
                                <Text style={styles.scheduleTime}>{formatSwissTime(endTime)}</Text>
                            </View>
                        </View>

                    </>
                )}
            </View>
        </LinearGradient>

    );
};

export default LiveProgramCard;

const createStyles = () =>
    StyleSheet.create({
        container: {
            paddingTop: SPACING.xl,
            marginTop: SPACING.lg,
            marginHorizontal: SPACING.lg,
            paddingBottom: SPACING.lg,
            backgroundColor: "transparent",
        },
        gradient: {
            alignSelf: "stretch",
        },
        header: {
            minHeight: 68,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: SPACING.md,
        },
        headerButton: {
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RADIUS.pill,
        },
        brand: {
            alignItems: "center",
        },
        brandEyebrow: {
            color: COLORS.primaryText,
            fontFamily: "InclusiveSans-SemiBold",
            fontSize: 9,
            letterSpacing: 1.4,
        },
        brandTitle: {
            marginTop: 1,
            color: COLORS.primaryText,
            fontFamily: "InclusiveSans-SemiBold",
            fontSize: 18,
            fontWeight: "700",
        },
        radioToggle: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: SPACING.md,
            marginBottom: SPACING.lg,
            paddingVertical: 5,
            borderRadius: 12,
            backgroundColor: COLORS.glass,
            borderWidth: 1,
            borderColor: COLORS.glassBorder,
        },

        radioOption: {
            flex: 1,
            minHeight: 42,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
        },

        radioOptionContent: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },

        radioOptionText: {
            fontSize: 14,
            fontFamily: "InclusiveSans-Medium",
            color: COLORS.textMuted,
        },

        radioOptionTextSelected: {
            color: COLORS.text,
            fontFamily: "InclusiveSans-Bold",
        },

        selectionDot: {
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: COLORS.text,
            marginLeft: 1,
        },

        radioDivider: {
            width: 1,
            height: 22,
            backgroundColor: COLORS.glassBorder,
        },
        artwork: {
            aspectRatio: 1,
            marginHorizontal: 0,
            overflow: "hidden",
            justifyContent: "space-between",
            padding: SPACING.md,
            borderRadius: RADIUS.lg,
            backgroundColor: COLORS.backgroundSecondary,
        },
        artworkImage: {
            borderRadius: RADIUS.lg,
        },
        artworkFallback: {
            alignItems: "stretch",
            justifyContent: "space-between",
        },
        artworkFallbackCenter: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.sm,
        },
        fallbackText: {
            color: COLORS.textSecondary,
            fontFamily: "InclusiveSans-SemiBold",
            fontSize: 13,
        },
        artworkActions: {
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: SPACING.sm,
        },
        artworkActionButton: {
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RADIUS.pill,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.22)",
            backgroundColor: "rgba(0,0,0,0.52)",
        },
        liveBadge: {
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: RADIUS.pill,
            backgroundColor: "rgba(0,0,0,0.55)",
        },
        liveDot: {
            width: 6,
            height: 6,
            borderRadius: RADIUS.pill,
            backgroundColor: COLORS.primaryBright,
        },
        liveBadgeText: {
            color: COLORS.white,
            fontFamily: "InclusiveSans-Bold",
            fontSize: 9,
            letterSpacing: 0.8,
        },
        programInfo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: SPACING.md,
            paddingHorizontal: SPACING.lg,
            paddingTop: SPACING.lg,
        },
        programTitleBlock: {
            flex: 1,
            gap: SPACING.xs,
        },
        sectionEyebrow: {
            color: COLORS.primary,
            fontFamily: "InclusiveSans-Bold",
            fontSize: 9,
            letterSpacing: 1.1,
        },
        programName: {
            lineHeight: 28,
        },
        programDescription: {
            marginTop: SPACING.xs,
        },
        playButtonWrap: {
            width: 58,
            height: 58,
            alignItems: "center",
            justifyContent: "center",
        },
        playButtonHalo: {
            position: "absolute",
            width: 58,
            height: 58,
            borderRadius: RADIUS.pill,
            borderWidth: 2,
            borderColor: COLORS.primary,
        },
        schedule: {
            paddingHorizontal: SPACING.lg,
            paddingTop: SPACING.md,
        },
        scheduleTimes: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        scheduleTime: {
            color: COLORS.textMuted,
            fontFamily: "InclusiveSans-Medium",
            fontSize: 11,
        },
        playButton: {
            width: 58,
            height: 58,
            overflow: "hidden",
            borderRadius: RADIUS.pill,
            elevation: 3,
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
        },
        playButtonDisabled: {
            opacity: 0.55,
        },
        playButtonGradient: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        comingSoonCard: {
            minHeight: 220,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: SPACING.xl,
            gap: SPACING.md,
        },
        comingSoonIcon: {
            alignItems: "center",
            justifyContent: "center",
        },
        comingSoonCopy: {
            alignItems: "center",
            gap: SPACING.xs,
        },
    });
