import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Switch,
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
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
}

export default function ProfileMenuItem({
    icon: Icon,
    title,
    value,
    destructive,
    onPress,
    switchValue,
    onSwitchChange,
}: ProfileMenuItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.container, { backgroundColor: COLORS.surface, borderBottomColor: COLORS.glassBorder }]}
            onPress={onPress}
        >
            <View style={styles.left}>
                <View style={[styles.iconContainer, { backgroundColor: COLORS.primarySoft }]}>
                    <Icon
                        size={20}
                        color={
                            destructive
                                ? COLORS.error
                                : COLORS.primary
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
                {typeof switchValue === "boolean" ? (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: COLORS.inputBorder, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                        accessibilityLabel={`${title} toggle`}
                    />
                ) : null}
                {value ? (
                    <AppText
                        variant="caption"
                        color={COLORS.textSecondary}
                    >
                        {value}
                    </AppText>
                ) : null}

                {!value && typeof switchValue !== "boolean" && <ChevronRight
                    size={18}
                    color={COLORS.textSecondary}
                />}
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
        backgroundColor: "rgba(220,38,38,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
});
