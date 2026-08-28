import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, DimensionValue } from "react-native";

import { COLORS } from "../../../constants/colors";
import { useTheme } from "../../../providers/ThemeProvider";

interface Props {
    width: DimensionValue;
    height: number;
    borderRadius?: number;
    style?: ViewStyle;
}

export default function SkeletonBlock({
    width,
    height,
    borderRadius = 12,
    style,
}: Props) {
    const { isDark } = useTheme();
    const opacity = useRef(new Animated.Value(isDark ? 0.45 : 0.25)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: isDark ? 0.85 : 0.55,
                    duration: 850,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: isDark ? 0.45 : 0.25,
                    duration: 850,
                    useNativeDriver: true,
                }),
            ]),
        );

        animation.start();
        return () => animation.stop();
    }, [isDark]);

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    opacity,
                    backgroundColor: COLORS.glassStrong,
                },
                style,
            ]}
        />
    );
}
