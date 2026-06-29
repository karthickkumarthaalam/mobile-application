import React from "react";
import {
    Text,
    TextProps,
    TextStyle,
    StyleSheet,
} from "react-native";

import { COLORS } from "../../constants/colors";
import {
    FONT_FAMILY,
    FONT_SIZE,
    LINE_HEIGHT,
} from "../../constants/typography";

type Variant =
    | "display"
    | "title"
    | "heading"
    | "subHeading"
    | "body"
    | "caption"
    | "small";

interface AppTextProps extends TextProps {
    children?: React.ReactNode;
    variant?: Variant;
    color?: string;
    align?: TextStyle["textAlign"];
    weight?: "400" | "500" | "600" | "700";
    style?: TextStyle | TextStyle[];
}

const FONT_BY_WEIGHT = {
    "400": FONT_FAMILY.regular,
    "500": FONT_FAMILY.medium,
    "600": FONT_FAMILY.semibold,
    "700": FONT_FAMILY.bold,
};

export default function AppText({
    children,
    variant = "body",
    color = COLORS.text,
    align = "left",
    weight = "400",
    style,
    ...props
}: AppTextProps) {
    return (
        <Text
            {...props}
            style={[
                styles.text,
                {
                    fontSize: FONT_SIZE[variant],
                    lineHeight: LINE_HEIGHT[variant],
                    color,
                    textAlign: align,
                    fontFamily: FONT_BY_WEIGHT[weight],
                },
                style,
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        includeFontPadding: false,
    },
});
