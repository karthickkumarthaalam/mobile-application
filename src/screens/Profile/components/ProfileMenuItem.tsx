import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { ChevronRight, LucideIcon } from "lucide-react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";

interface ProfileMenuItemProps {
    icon: LucideIcon;
    title: string;
    value?: string;
    destructive?: boolean;
    onPress?: () => void;
}

export default function ProfileMenuItem({
    icon: Icon,
    title,
    value,
    destructive,
    onPress,
}: ProfileMenuItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.left}>
                <View style={styles.iconContainer}>
                    <Icon
                        size={20}
                        color={
                            destructive
                                ? COLORS.error
                                : COLORS.primaryBright
                        } />
                </View>

                <AppText weight="500" color={
                    destructive
                        ? COLORS.error
                        : COLORS.textMuted
                }>
                    {title}
                </AppText>
            </View>

            <View style={styles.right}>
                {value ? (
                    <AppText
                        variant="caption"
                        color={COLORS.textSecondary}
                    >
                        {value}
                    </AppText>
                ) : null}

                <ChevronRight
                    size={18}
                    color={COLORS.textSecondary}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.surface,

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.glassBorder,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        flex: 1,
    },

    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
    },

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primarySoft,
        justifyContent: "center",
        alignItems: "center",
    },
});