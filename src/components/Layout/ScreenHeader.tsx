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

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.backButton}
                    onPress={handleBack}
                >
                    <ArrowLeft
                        size={22}
                        color={COLORS.text}
                    />
                </TouchableOpacity>

                {rightComponent ?? (
                    <View style={styles.placeholder} />
                )}
            </View>

            <View style={styles.content}>
                {Icon && (
                    <View style={styles.iconContainer}>
                        <Icon
                            size={20}
                            color={COLORS.primaryBright}
                        />
                    </View>
                )}

                <AppText
                    variant="heading"
                    weight="700"
                    style={styles.title}
                >
                    {title}
                </AppText>

                {!!subtitle && (
                    <AppText
                        color={COLORS.textSecondary}
                        style={styles.subtitle}
                    >
                        {subtitle}
                    </AppText>
                )}
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.xxl,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: COLORS.surface,

        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },

    placeholder: {
        width: 42,
    },

    content: {
        marginTop: SPACING.xl,
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,

        justifyContent: "center",
        alignItems: "center",

        marginBottom: SPACING.lg,

        backgroundColor: COLORS.primarySoft,
    },

    title: {
        marginBottom: SPACING.xs,
    },

    subtitle: {
        lineHeight: 22,
        maxWidth: 320,
    },
});
