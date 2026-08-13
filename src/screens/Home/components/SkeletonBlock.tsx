import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle, DimensionValue } from "react-native";

import { COLORS } from "../../../constants/colors";

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
    const opacity = useRef(new Animated.Value(0.45)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.85,
                    duration: 850,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.45,
                    duration: 850,
                    useNativeDriver: true,
                }),
            ]),
        );

        animation.start();
        return () => animation.stop();
    }, [opacity]);

    return (
        <Animated.View
            style={[
                styles.block,
                {
                    width,
                    height,
                    borderRadius,
                    opacity,
                },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: COLORS.glassStrong,
        overflow: "hidden",
    },
});
