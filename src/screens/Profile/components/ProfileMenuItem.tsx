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
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface ProfileMenuItemProps {
    icon: LucideIcon;
    title: string;
    value?: string;
    destructive?: boolean;
    onPress?: () => void;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    isFirst?: boolean;
}

export default function ProfileMenuItem({
    icon: Icon,
    title,
    value,
    destructive,
    onPress,
    switchValue,
    onSwitchChange,
    isFirst = false,
}: ProfileMenuItemProps) {
    const styles = useThemedStyles(createStyles);
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.container, isFirst && styles.containerFirst]}
            onPress={onPress}
        >
            <View style={styles.left}>
                <View >
                    <Icon
                        size={20}
                        color={
                            destructive
                                ? COLORS.error
                                : COLORS.primary
                        } />
                </View>

                <AppText weight="600" color={
                    destructive
                        ? COLORS.error
                        : COLORS.textSecondary
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

const createStyles = () => StyleSheet.create({
    container: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLORS.glassBorder,
    },
    containerFirst: {
        borderTopWidth: 0,
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
});
