
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ArrowLeft,
    LucideIcon,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import AppText from "../Text/AppText";

import { COLORS } from "../../constants/colors";
import { useThemedStyles } from "../../providers/ThemeProvider";
import { SPACING } from "../../constants/spacing";

interface ScreenHeaderProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    onBack?: () => void;
    rightComponent?: React.ReactNode;
}

export default function ScreenHeader({
    title,
    subtitle,
    icon: Icon,
    onBack,
    rightComponent,
}: ScreenHeaderProps) {
    const styles = useThemedStyles(createStyles);
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                {/* Back Button */}
                <TouchableOpacity
                    activeOpacity={0.65}
                    style={styles.backButton}
                    onPress={handleBack}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    hitSlop={8}
                >
                    <ArrowLeft
                        size={20}
                        color={COLORS.text}
                        strokeWidth={2}
                    />
                </TouchableOpacity>

                {/* Heading */}
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        {Icon && (
                            <Icon
                                size={17}
                                color={COLORS.primary}
                                strokeWidth={2.2}
                            />
                        )}

                        <AppText
                            variant="subHeading"
                            weight="700"
                            style={styles.title}
                        >
                            {title}
                        </AppText>
                    </View>

                    {!!subtitle && (
                        <AppText
                            variant="caption"
                            color={COLORS.textSecondary}
                            style={styles.subtitle}
                        >
                            {subtitle}
                        </AppText>
                    )}
                </View>

                {/* Right Action */}
                {rightComponent && (
                    <View style={styles.rightComponent}>
                        {rightComponent}
                    </View>
                )}
            </View>

            {/* Bottom Divider */}
            <View style={styles.divider}>
                <View style={styles.accentLine} />
            </View>
        </View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            paddingHorizontal: SPACING.xl,
            paddingTop: SPACING.sm,
            paddingBottom: SPACING.md,
        },
        headerRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.md,
            minHeight: 48,
        },

        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.surface,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: COLORS.glassBorder,
        },

        content: {
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
        },

        titleRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },

        title: {
            flexShrink: 1,
            marginBottom: 0,
        },

        subtitle: {
            marginTop: 3,
            lineHeight: 17,
        },

        rightComponent: {
            alignItems: "center",
            justifyContent: "center",
        },

        divider: {
            height: 2,
            backgroundColor: COLORS.glassBorder,
            marginTop: SPACING.lg,
            borderRadius: 2,
            overflow: "hidden",
        },

        accentLine: {
            width: 42,
            height: 2,
            backgroundColor: COLORS.primary,
            borderRadius: 2,
        },
    });
