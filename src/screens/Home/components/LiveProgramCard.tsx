import React, { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
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
import { Image } from "react-native";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useTheme, useThemedStyles } from "../../../providers/ThemeProvider";
import AppText from "../../../components/Text/AppText";

const formatSwissTime = (time: string): string => {
    const parts = time.split(":");
    if (parts.length < 2) return time;
    return `${parts[0].padStart(2, "0")}:${parts[1]}`;
};

const toMinutes = (time: string): number => {
    const [h, m] = time.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
};

const { width: SCREEN_W } = Dimensions.get("window");
const ARTWORK_SIZE = SCREEN_W - 88;
const SCRUBBER_DOT = 12;

interface LiveProgramCardProps {
    banner: string | undefined;
    programName: string;
    hostName?: string;
    startTime: string;
    endTime: string;
    minutesLeft: number;
    isPlaying?: boolean;
    isLoading?: boolean;
    selectedRadio?: "live" | "classic";
    isComingSoon?: boolean;
    onSelectLive?: () => void;
    onSelectClassic?: () => void;
    onListen: () => void;
    // Optional chrome — all no-ops if omitted, safe to drop in without wiring them up.
    onBack?: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
    onShare?: () => void;

}

const LiveProgramCard = ({
    banner,
    programName,
    hostName,
    startTime,
    endTime,
    minutesLeft,
    isPlaying = false,
    isLoading = false,
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
    const themeAnimation = useRef(new Animated.Value(isDark ? 1 : 0)).current;
    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    const programDuration = endMinutes > startMinutes
        ? endMinutes - startMinutes
        : endMinutes + 24 * 60 - startMinutes;
    const progress = programDuration > 0
        ? Math.max(0, Math.min(100, ((programDuration - minutesLeft) / programDuration) * 100))
        : 0;

    useEffect(() => {
        Animated.spring(themeAnimation, {
            toValue: isDark ? 1 : 0,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
        }).start();
    }, [isDark, themeAnimation]);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity activeOpacity={0.7} onPress={onBack} hitSlop={8}>
                    <ChevronLeft size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <View style={styles.brandContainer}>
                    <Text style={styles.brandLabel}>NOW PLAYING FROM</Text>
                    <Text style={styles.brandTitle}>Thaalam Broadcasting</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={[styles.themeButton]}
                    onPress={() => void toggleTheme()}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <Animated.View
                        style={styles.themeIcon}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                opacity: themeAnimation.interpolate({
                                    inputRange: [0, 0.45, 1],
                                    outputRange: [1, 0, 0],
                                }),
                                transform: [{
                                    scale: themeAnimation.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [1, 0.7, 1],
                                    }),
                                }],
                            }}
                        >
                            <MoonStar size={24} color={COLORS.black} />
                        </Animated.View>
                        <Animated.View
                            style={{
                                position: "absolute",
                                opacity: themeAnimation.interpolate({
                                    inputRange: [0, 0.55, 1],
                                    outputRange: [0, 0, 1],
                                }),
                                transform: [{
                                    scale: themeAnimation.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [1, 0.7, 1],
                                    }),
                                }],
                            }}
                        >
                            <Sun size={24} color={COLORS.white} />
                        </Animated.View>
                    </Animated.View>
                </TouchableOpacity>
            </View>

            <View style={styles.artworkWrap}>
                <ImageBackground
                    source={{ uri: banner }}
                    style={styles.artwork}
                    imageStyle={styles.artworkImage}
                >
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.45)"]}
                        style={styles.artworkShade}
                    />
                </ImageBackground>
            </View>


            <View style={styles.toggleContainer}>
                <View style={styles.toggleRow}>
                    <View
                        style={[
                            styles.toggleIndicator,
                            selectedRadio === "classic" && styles.toggleIndicatorClassic,
                        ]}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.toggleButton}
                        onPress={onSelectLive}
                    >
                        <Radio color={selectedRadio === "classic" ? COLORS.backgroundSecondary : COLORS.primary} />
                        <AppText > Live</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.toggleButton}
                        onPress={onSelectClassic}
                    >
                        <Image
                            source={require("../../../assets/images/onboarding/radio.png")}
                            style={[
                                styles.toggleLogoClassic,
                                selectedRadio === "classic" ? styles.toggleLogoActive : styles.toggleLogoInactive,
                            ]}
                            resizeMode="contain"
                        />
                        <AppText> Classic</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            {isComingSoon ? (
                <View style={styles.comingSoonSection}>
                    <View style={styles.comingSoonIcon}>
                        <RadioTowerIcon size={28} color={COLORS.primary} />
                    </View>
                    <Text style={styles.comingSoonEyebrow}>CLASSIC RADIO</Text>
                    <Text style={styles.comingSoonTitle}>Coming Soon</Text>

                </View>
            ) : (
                <>
                    <View style={styles.infoSection}>
                        <Text style={styles.programName} numberOfLines={2}>
                            {programName}
                        </Text>
                        {hostName ? <Text style={styles.hostName}>{hostName}</Text> : null}
                    </View>

                    <View style={styles.scrubberSection}>
                        <View style={styles.scrubberTrack}>
                            <View style={[styles.scrubberFill, { width: `${progress}%` }]} />
                            <View
                                style={[
                                    styles.scrubberDot,
                                    { left: `${progress}%` },
                                ]}
                            />
                        </View>
                        <View style={styles.timeRow}>
                            <Text style={styles.timeLabel}>{formatSwissTime(startTime)}</Text>
                            <Text style={styles.minutesLeft}>{minutesLeft} min left</Text>
                            <Text style={styles.timeLabel}>{formatSwissTime(endTime)}</Text>
                        </View>
                    </View>

                    <View style={styles.controlsRow}>
                        <TouchableOpacity activeOpacity={0.7} onPress={onToggleFavorite} hitSlop={8}>
                            <Heart
                                size={22}
                                color={isFavorite ? COLORS.primary : COLORS.textSecondary}
                                fill={isFavorite ? COLORS.primary : "transparent"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.playButton}
                            onPress={onListen}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color={COLORS.controlIcon} />
                            ) : isPlaying ? (
                                <Pause size={24} color={COLORS.controlIcon} fill={COLORS.controlIcon} />
                            ) : (
                                <Play size={24} color={COLORS.controlIcon} fill={COLORS.controlIcon} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={onShare} hitSlop={8}>
                            <Share2 size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default LiveProgramCard;

const createStyles = () => StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },

    glow: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 340,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
    },

    headerLabel: {
        color: COLORS.textMuted,
        fontSize: 11,
        fontFamily: "InclusiveSans",
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },

    artworkWrap: {
        alignItems: "center",
        paddingTop: 28,
        paddingHorizontal: SPACING.xl,
    },

    artwork: {
        width: ARTWORK_SIZE,
        height: ARTWORK_SIZE,
        borderRadius: RADIUS.xl,
        overflow: "hidden",
    },

    artworkImage: {
        borderRadius: RADIUS.xl,
    },

    artworkShade: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "60%",
    },

    brandContainer: {
        alignItems: "center",
    },

    brandLabel: {
        fontSize: 11,
        color: COLORS.textMuted,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontFamily: "InclusiveSans",
    },

    brandTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
        fontFamily: "InclusiveSans",
    },

    themeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    themeIcon: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    infoSection: {
        paddingTop: 22,
        paddingHorizontal: SPACING.xl,
        alignItems: "center",
    },

    programName: {
        color: COLORS.text,
        fontSize: 21,
        fontFamily: "InclusiveSans",
        fontWeight: "800",
        lineHeight: 26,
        textAlign: "center",
        marginBottom: 6,
    },

    hostName: {
        color: COLORS.textMuted,
        fontSize: 13,
        fontFamily: "InclusiveSans",
    },

    comingSoonSection: {
        alignItems: "center",
        marginTop: 28,
        marginHorizontal: SPACING.xl,
        paddingHorizontal: 28,
        paddingVertical: 30,
    },

    comingSoonIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(228, 30, 38, 0.14)",
    },

    comingSoonEyebrow: {
        marginTop: 18,
        color: COLORS.primaryBright,
        fontSize: 11,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        letterSpacing: 1.6,
    },

    comingSoonTitle: {
        color: COLORS.text,
        marginTop: 6,
        fontSize: 24,
        fontFamily: "InclusiveSans",
        fontWeight: "800",
    },

    comingSoonText: {
        marginTop: 8,
        color: COLORS.textMuted,
        fontSize: 14,
        fontFamily: "InclusiveSans",
        textAlign: "center",
        lineHeight: 21,
    },

    scrubberSection: {
        paddingTop: 24,
        paddingHorizontal: SPACING.xl,
    },

    scrubberTrack: {
        height: 4,
        backgroundColor: COLORS.glassStrong,
        borderRadius: 2,
        position: "relative",
        justifyContent: "center",
    },

    scrubberFill: {
        height: 4,
        backgroundColor: COLORS.text,
        borderRadius: 2,
    },

    scrubberDot: {
        position: "absolute",
        top: -4,
        marginLeft: -SCRUBBER_DOT / 2,
        width: SCRUBBER_DOT,
        height: SCRUBBER_DOT,
        borderRadius: SCRUBBER_DOT / 2,
        backgroundColor: COLORS.text,
    },

    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },

    timeLabel: {
        color: COLORS.textMuted,
        fontSize: 11,
        fontFamily: "InclusiveSans",
    },

    minutesLeft: {
        color: COLORS.primaryBright,
        fontSize: 11,
        fontFamily: "InclusiveSans",
        fontWeight: "600",
    },

    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        paddingTop: 26,
        paddingHorizontal: SPACING.xl,
    },

    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },

    toggleContainer: {
        marginTop: 26,
        marginHorizontal: SPACING.xl,
        backgroundColor: COLORS.glass,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: 2,
    },

    toggleRow: {
        flexDirection: "row",
        position: "relative",
    },

    toggleIndicator: {
        position: "absolute",
        top: 2,
        bottom: 2,
        left: 2,
        width: "50%",
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },

    toggleIndicatorClassic: {
        left: "50%",
    },

    toggleButton: {
        flex: 1,
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
    },

    toggleLogoThaalam: {
        width: 90,
        height: 28,
    },

    toggleLogoClassic: {
        width: 36,
        height: 36,
    },

    toggleLogoActive: {
        opacity: 1,
    },

    toggleLogoInactive: {
        opacity: 0.3,
    },
});
