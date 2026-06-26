import { StyleSheet, View, ViewStyle, DimensionValue } from "react-native";

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
    return (
        <View
            style={[
                styles.block,
                {
                    width,
                    height,
                    borderRadius,
                },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: "rgba(255,255,255,0.1)",
        overflow: "hidden",
    },
});