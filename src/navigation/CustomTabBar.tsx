import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Image,
    Animated,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { House, Radio, CalendarDays, Newspaper, CircleUserRound, Play, Pause, Mic } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDevice } from "../utils/device";
import { useAudio } from "../providers/AudioProvider";

const ICONS: Record<string, any> = {
    Main: House,
    Podcast: Radio,
    // Package: CalendarDays,
    Rjs: Mic,
    News: Newspaper,
    Profile: CircleUserRound,
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { isTablet } = useDevice();
    const { isPlaying, isLoading, nowPlaying, pause, play } = useAudio();

    const isOnHome = state.routes[state.index]?.name === "Main";
    const hasMedia = nowPlaying !== null && !isOnHome;

    return (
        <View style={[styles.wrapper, { bottom: Math.max(insets.bottom + 8, 20) }]}>
            {/* Mini Player Bar */}
            {hasMedia && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.miniPlayer}
                    onPress={() => {
                        if (isPlaying) {
                            pause();
                        } else {
                            play(nowPlaying);
                        }
                    }}
                >
                    {nowPlaying.artwork ? (
                        <Image source={{ uri: nowPlaying.artwork }} style={styles.miniArtwork} />
                    ) : (
                        <View style={[styles.miniArtwork, styles.miniArtworkFallback]}>
                            <Radio size={14} color="rgba(255,255,255,0.5)" />
                        </View>
                    )}

                    <View style={styles.miniInfo}>
                        <View style={styles.miniLiveBadge}>
                            <View style={styles.miniLiveDot} />
                            <Text style={styles.miniLiveText}>LIVE</Text>
                        </View>
                        <Text style={styles.miniTitle} numberOfLines={1}>{nowPlaying.title}</Text>
                    </View>

                    <View style={[styles.miniPlayBtn, isPlaying && styles.miniPlayBtnActive]}>
                        {isLoading
                            ? <View style={styles.loadingDot} />
                            : isPlaying
                                ? <Pause size={14} color="#fff" fill="#fff" />
                                : <Play size={14} color="#E41E26" fill="#E41E26" />
                        }
                    </View>
                </TouchableOpacity>
            )}

            {/* Tab Bar */}
            <View style={styles.bar}>
                {state.routes.map((route, index) => {
                    const focused = state.index === index;
                    const isHome = route.name === "Main";
                    const Icon = ICONS[route.name];

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    if (isHome) {
                        return (
                            <View key={route.key} style={styles.homeWrapper}>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={onPress}
                                    style={[styles.homeBtn, focused && styles.homeBtnActive]}
                                >
                                    <Icon
                                        size={isTablet ? 28 : 24}
                                        color="#fff"
                                        strokeWidth={2.2}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.label, styles.homeLabel, { opacity: focused ? 1 : 0.5 }]}>
                                    Home
                                </Text>
                            </View>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            activeOpacity={0.75}
                            style={styles.item}
                            onPress={onPress}
                        >
                            <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
                                <Icon
                                    size={isTablet ? 26 : 24}
                                    color={focused ? "#fff" : "rgba(255,255,255,0.88)"}
                                    strokeWidth={focused ? 2.2 : 1.7}
                                />
                            </View>
                            <Text style={[
                                styles.label,
                                { color: focused ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)" },
                            ]}>
                                {route.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        left: 20,
        right: 20,
        alignItems: "center",
        gap: 10,
    },

    // Mini player
    miniPlayer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "rgba(18,18,20,0.95)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.45,
                shadowRadius: 16,
            },
            android: { elevation: 16 },
        }),
    },

    miniArtwork: {
        width: 42,
        height: 42,
        borderRadius: 10,
    },

    miniArtworkFallback: {
        backgroundColor: "rgba(255,255,255,0.06)",
        alignItems: "center",
        justifyContent: "center",
    },

    miniInfo: {
        flex: 1,
        gap: 3,
    },

    miniLiveBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    miniLiveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#E41E26",
    },

    miniLiveText: {
        color: "#E41E26",
        fontSize: 10,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    miniTitle: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "InclusiveSans",
        fontWeight: "700",
    },

    miniPlayBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
    },

    miniPlayBtnActive: {
        backgroundColor: "rgba(228,30,38,0.15)",
        borderColor: "rgba(228,30,38,0.3)",
    },

    loadingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.4)",
    },

    bar: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(14, 14, 16, 0.9)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
        paddingHorizontal: 12,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.5,
                shadowRadius: 24,
            },
            android: { elevation: 20 },
        }),
    },

    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 10,
        gap: 3,
    },

    iconWrap: {
        width: 40,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },

    iconWrapFocused: {
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.09)",

    },

    dot: {
        position: "absolute",
        bottom: -2,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E41E26",
    },

    label: {
        fontSize: 12,
        fontFamily: "InclusiveSans",
        fontWeight: "600",
    },

    // Home center raised button
    homeWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 8,
        gap: 4,
        marginTop: -22,
    },

    homeBtn: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#1a1a1c",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.1)",
        ...Platform.select({
            ios: {
                shadowColor: "#E41E26",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.0,
                shadowRadius: 12,
            },
            android: { elevation: 8 },
        }),
    },

    homeBtnActive: {
        backgroundColor: "#E41E26",
        borderColor: "#E41E26",
        ...Platform.select({
            ios: {
                shadowOpacity: 0.55,
            },
        }),
    },

    homeLabel: {
        color: "rgba(255,255,255,0.85)",
    },
});
