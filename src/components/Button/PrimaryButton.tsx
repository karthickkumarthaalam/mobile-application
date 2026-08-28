import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../Text/AppText";
import { COLORS } from "../../constants/colors";
import { GRADIENTS } from "../../constants/colors";
import { RADIUS } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";

type ButtonVariant =
    | "primary"
    | "glass"
    | "danger"
    | "success"
    | "outline"
    | "ghost";

type ButtonSize =
    | "sm"
    | "md"
    | "lg";

interface PrimaryButtonProps extends PressableProps {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const BUTTON_HEIGHT: Record<ButtonSize, number> = {
    sm: 44,
    md: 52,
    lg: 58,
};

const FONT_SIZE: Record<ButtonSize, number> = {
    sm: 14,
    md: 16,
    lg: 18,
};

export default function PrimaryButton({
    title,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = true,
    leftIcon,
    rightIcon,
    style,
    ...props
}: PrimaryButtonProps) {
    const styles = useThemedStyles(createStyles);
    const buttonStyle: ViewStyle[] = [
        styles.button,
        styles[variant],
        {
            height: BUTTON_HEIGHT[size],
        },
    ];

    if (fullWidth) {
        buttonStyle.push(styles.fullWidth);
    }

    return (
        <Pressable
            {...props}
            disabled={disabled || loading}
            style={(state) => [
                ...buttonStyle,
                state.pressed && styles.pressed,
                (disabled || loading) && styles.disabled,
                StyleSheet.flatten(
                    typeof style === "function" ? style(state) : style
                ),
            ]}
        >
            {variant === "primary" && (
                <LinearGradient
                    colors={GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
            )}
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator color={COLORS.white} />
                ) : (
                    <>
                        {leftIcon}
                        <AppText
                            variant="body"
                            weight="700"
                            color={COLORS.white}
                            style={{ fontSize: FONT_SIZE[size] }}
                        >
                            {title}
                        </AppText>
                        {rightIcon}
                    </>
                )}
            </View>
        </Pressable>
    );
}

const createStyles = () => StyleSheet.create({
    button: {
        borderRadius: RADIUS.lg,

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 20,

        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },

    fullWidth: {
        width: "100%",
    },

    primary: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.28,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 7 },
        elevation: 8,
    },

    glass: {
        backgroundColor: COLORS.glass,

        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },

    success: {
        backgroundColor: COLORS.success,
    },

    danger: {
        backgroundColor: COLORS.error,
    },

    outline: {
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
    },

    ghost: {
        backgroundColor: "transparent",
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
    },

    pressed: {
        opacity: 0.86,
        transform: [{ scale: 0.985 }],
    },

    disabled: {
        opacity: 0.45,
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
});
