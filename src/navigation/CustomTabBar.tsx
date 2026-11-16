
import React, { useEffect, useRef } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    Mic,
    Newspaper,
    CircleUserRound,
    type LucideIcon,
    RadioReceiver,
    Headphones,
    BookHeadphones,
    MicAudioLines,
    BookOpenText,
} from "lucide-react-native";

import { useTheme } from "../providers/ThemeProvider";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";

// ─── Tab Configuration ────────────────────────────────────────────────────────

const TABS: Record<string, { icon: LucideIcon; label: string; }> = {
    Main: { icon: RadioReceiver, label: "Home" },
    Podcast: { icon: BookHeadphones, label: "Podcasts" },
    Rjs: { icon: MicAudioLines, label: "RJs" },
    News: { icon: BookOpenText, label: "News" },
    Profile: { icon: CircleUserRound, label: "Profile" },
};

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

export default function CustomTabBar({
    state,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    useTheme();

    return (
        <View style={styles.wrapper}>


            <View
                style={[
                    styles.bar,
                    {
                        backgroundColor: COLORS.surface,
                        borderTopColor: COLORS.glassBorder,
                        paddingBottom: Math.max(insets.bottom, 10),
                    },
                ]}
            >
                {state.routes.map((route, index) => {
                    const focused = state.index === index;
                    const tab = TABS[route.name];

                    if (!tab) return null;

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

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TabItem
                            key={route.key}
                            icon={tab.icon}
                            label={tab.label}
                            focused={focused}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })}
            </View>
        </View>
    );
}

// ─── Tab Item ─────────────────────────────────────────────────────────────────

interface TabItemProps {
    icon: LucideIcon;
    label: string;
    focused: boolean;
    onPress: () => void;
    onLongPress: () => void;
}

function TabItem({
    icon: Icon,
    label,
    focused,
    onPress,
    onLongPress,
}: TabItemProps) {
    const iconScale = useRef(
        new Animated.Value(focused ? 1 : 0.94)
    ).current;

    const indicatorOpacity = useRef(
        new Animated.Value(focused ? 1 : 0)
    ).current;

    const indicatorScale = useRef(
        new Animated.Value(focused ? 1 : 0.5)
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(iconScale, {
                toValue: focused ? 1 : 0.94,
                tension: 150,
                friction: 12,
                useNativeDriver: true,
            }),

            Animated.timing(indicatorOpacity, {
                toValue: focused ? 1 : 0,
                duration: 180,
                useNativeDriver: true,
            }),

            Animated.spring(indicatorScale, {
                toValue: focused ? 1 : 0.5,
                tension: 150,
                friction: 12,
                useNativeDriver: true,
            }),
        ]).start();
    }, [focused, iconScale, indicatorOpacity, indicatorScale]);

    const activeColor = COLORS.primary;
    const inactiveColor = COLORS.textMuted;

    const iconColor = focused ? activeColor : inactiveColor;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: focused }}
            style={styles.tabItem}
        >
            {/* Active Indicator */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.activeIndicator,
                    {
                        backgroundColor: COLORS.primary,
                        opacity: indicatorOpacity,
                        transform: [{ scaleX: indicatorScale }],
                    },
                ]}
            />

            {/* Icon */}
            <Animated.View
                style={[
                    styles.iconWrap,
                    {
                        transform: [{ scale: iconScale }],
                    },
                ]}
            >
                <Icon
                    size={22}
                    color={iconColor}
                    strokeWidth={focused ? 2.3 : 1.7}
                />
            </Animated.View>

            {/* Label */}
            <Animated.Text
                numberOfLines={1}
                style={[
                    styles.label,
                    {
                        color: iconColor,
                        fontWeight: focused ? "700" : "500",
                        opacity: focused ? 1 : 0.75,
                    },
                ]}
            >
                {label}
            </Animated.Text>
        </TouchableOpacity>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        backgroundColor: COLORS.surface,
    },

    bar: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
    },

    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        gap: 5,
        paddingHorizontal: 2,
        paddingTop: 7,
        paddingBottom: 3,
        minHeight: 53,
    },

    activeIndicator: {
        position: "absolute",
        top: 0,
        width: 20,
        height: 2.5,
    },

    iconWrap: {
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        fontSize: 11,
        fontFamily: "InclusiveSans",
        letterSpacing: 0.15,
        textAlign: "center",
    },

    miniPlayerWrap: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        backgroundColor: COLORS.surface,
    },
});
