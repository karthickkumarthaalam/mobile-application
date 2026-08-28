import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { COLORS } from "../../constants/colors";
import { RADIUS, SPACING } from "../../constants/spacing";
import { AuthScreen, useAuth } from "../../providers/AuthProvider";
import AppText from "../Text/AppText";
import { useThemedStyles } from "../../providers/ThemeProvider";

interface AuthLayoutProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    backTo?: AuthScreen;
}

export default function AuthLayout({
    eyebrow,
    title,
    subtitle,
    children,
    backTo,
}: AuthLayoutProps) {
    const styles = useThemedStyles(createStyles);
    const { openAuthSheet } = useAuth();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.headerRow}>
                    {backTo ? (
                        <Pressable
                            onPress={() => openAuthSheet(backTo)}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && styles.pressed,
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                        >
                            <ArrowLeft size={19} color={COLORS.text} />
                        </Pressable>
                    ) : (
                        <View style={styles.brandMark}>
                            <View style={styles.brandDot} />
                        </View>
                    )}

                    <AppText
                        variant="small"
                        weight="700"
                        color={COLORS.primaryBright}
                        style={styles.eyebrow}
                    >
                        {eyebrow}
                    </AppText>
                </View>

                <AppText variant="title" weight="700" style={styles.title}>
                    {title}
                </AppText>
                <AppText color={COLORS.textSecondary} style={styles.subtitle}>
                    {subtitle}
                </AppText>

                <View style={styles.form}>{children}</View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const createStyles = () => StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.xxxl,
    },
    headerRow: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    brandMark: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
    },
    brandDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    eyebrow: {
        letterSpacing: 1.4,
        textTransform: "uppercase",
    },
    title: { letterSpacing: -0.5 },
    subtitle: {
        maxWidth: 440,
        marginTop: SPACING.sm,
    },
    form: {
        width: "100%",
        marginTop: SPACING.xl,
    },
    pressed: { opacity: 0.65 },
});
