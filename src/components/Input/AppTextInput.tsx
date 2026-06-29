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

interface AppTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    secure?: boolean;
}

export default function AppTextInput({
    label,
    error,
    secure = false,
    style,
    ...props
}: AppTextInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secure);

    return (
        <View style={styles.container}>
            {label && (
                <AppText
                    variant="caption"
                    weight="600"
                    style={styles.label}
                >
                    {label}
                </AppText>
            )}

            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.focused,
                    error && styles.errorBorder,
                ]}
            >
                <TextInput
                    {...props}
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.textMuted}
                    secureTextEntry={hidePassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor={COLORS.primary}
                />

                {secure && (
                    <Pressable
                        onPress={() => setHidePassword((current) => !current)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={
                            hidePassword ? "Show password" : "Hide password"
                        }
                        style={styles.secureToggle}
                    >
                        {hidePassword ? (
                            <EyeOff
                                size={20}
                                color={COLORS.textSecondary}
                            />
                        ) : (
                            <Eye
                                size={20}
                                color={COLORS.textSecondary}
                            />
                        )}
                    </Pressable>
                )}
            </View>

            {error ? (
                <AppText
                    variant="small"
                    color={COLORS.error}
                    style={styles.error}
                >
                    {error}
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },

    label: {
        marginBottom: SPACING.sm,
        color: COLORS.textSecondary,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.inputBackground,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        minHeight: 56,
    },

    focused: {
        borderColor: COLORS.inputFocus,
        backgroundColor: COLORS.glassStrong,
    },

    errorBorder: {
        borderColor: COLORS.error,
    },

    input: {
        flex: 1,
        color: COLORS.text,
        fontFamily: FONT_FAMILY.regular,
        fontSize: 16,
        paddingVertical: 16,
    },

    secureToggle: {
        width: 40,
        height: 40,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    error: {
        marginTop: 6,
    },
});
