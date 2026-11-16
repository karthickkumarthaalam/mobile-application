
import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    Pressable,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import AppText from "../Text/AppText";
import { COLORS } from "../../constants/colors";
import { FONT_FAMILY } from "../../constants/typography";
import { RADIUS, SPACING } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";

interface AppTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    secure?: boolean;
}

export default function AppTextInput({
    label,
    error,
    secure = false,
    secureTextEntry,
    style,
    onFocus,
    onBlur,
    editable = true,
    ...props
}: AppTextInputProps) {
    const styles = useThemedStyles(createStyles);

    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secure);

    const hasError = Boolean(error);

    const handleFocus: TextInputProps["onFocus"] = (event) => {
        setIsFocused(true);
        onFocus?.(event);
    };

    const handleBlur: TextInputProps["onBlur"] = (event) => {
        setIsFocused(false);
        onBlur?.(event);
    };

    return (
        <View style={styles.container}>
            {label ? (
                <View style={styles.labelRow}>
                    <AppText variant="caption" style={styles.label}>
                        {label}
                    </AppText>

                    {hasError && (
                        <AppText
                            variant="small"
                            color={COLORS.error}
                            style={styles.errorLabel}
                        >
                            Required
                        </AppText>
                    )}
                </View>
            ) : null}

            <View
                style={[
                    styles.inputWrapper,
                    isFocused && !hasError && styles.focused,
                    hasError && styles.invalid,
                    !editable && styles.disabled,
                ]}
            >
                <TextInput
                    {...props}
                    editable={editable}
                    secureTextEntry={
                        secure ? hidePassword : secureTextEntry
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={COLORS.textMuted}
                    selectionColor={COLORS.primary}
                    cursorColor={COLORS.primary}
                    underlineColorAndroid="transparent"
                    style={[
                        styles.input,
                        style,
                    ]}
                />

                {secure && (
                    <Pressable
                        onPress={() =>
                            setHidePassword((current) => !current)
                        }
                        disabled={!editable}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel={
                            hidePassword ? "Show password" : "Hide password"
                        }
                        style={styles.passwordToggle}
                    >
                        {hidePassword ? (
                            <EyeOff
                                size={18}
                                color={COLORS.textSecondary}
                                strokeWidth={1.8}
                            />
                        ) : (
                            <Eye
                                size={18}
                                color={COLORS.textSecondary}
                                strokeWidth={1.8}
                            />
                        )}
                    </Pressable>
                )}
            </View>

            {error ? (
                <View style={styles.errorContainer}>
                    <View style={styles.errorDot} />
                    <AppText
                        variant="small"
                        color={COLORS.error}
                        style={styles.errorText}
                    >
                        {error}
                    </AppText>
                </View>
            ) : null}
        </View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            marginBottom: SPACING.md,
        },

        labelRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
        },

        label: {
            color: COLORS.text,
            fontFamily: FONT_FAMILY.medium,
            fontSize: 12,
            letterSpacing: 0.1,
        },

        errorLabel: {
            fontSize: 10,
        },

        inputWrapper: {
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.backgroundSecondary,
            borderWidth: 1,
            borderColor: COLORS.inputBorder,
            borderRadius: RADIUS.sm,
            paddingLeft: 13,
            paddingRight: 5,
        },

        focused: {
            borderColor: COLORS.inputFocus,
        },

        invalid: {
            borderColor: COLORS.error,
        },

        disabled: {
            opacity: 0.5,
        },

        input: {
            flex: 1,
            minWidth: 0,
            height: "100%",
            paddingVertical: 0,
            paddingHorizontal: 0,
            color: COLORS.text,
            fontFamily: FONT_FAMILY.regular,
            fontSize: 14,
            includeFontPadding: false,
        },

        passwordToggle: {
            width: 36,
            height: 42,
            alignItems: "center",
            justifyContent: "center",
        },

        errorContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            gap: 6,
        },

        errorDot: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: COLORS.error,
        },

        errorText: {
            fontSize: 11,
        },
    });
