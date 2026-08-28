import { ReactNode } from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import Animated, {
    FadeInDown,
} from "react-native-reanimated";

import AppText from "../../../components/Text/AppText";

import { COLORS } from "../../../constants/colors";
import {
    RADIUS,
    SPACING,
} from "../../../constants/spacing";

interface ProfileCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    delay?: number;
}

export default function ProfileCard({
    title,
    subtitle,
    children,
    delay = 0,
}: ProfileCardProps) {
    return (
        <Animated.View
            entering={FadeInDown
                .delay(delay)
                .springify()}
            style={[
                styles.container,
                { backgroundColor: COLORS.surface, borderColor: COLORS.glassBorder, shadowColor: COLORS.black },
            ]}
        >
            <View style={[styles.header, { borderBottomColor: COLORS.glassBorder }]}>
                <AppText
                    variant="subHeading"
                    weight="700"
                >
                    {title}
                </AppText>

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

            <View style={styles.content}>
                {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginHorizontal: SPACING.xl,
        marginBottom: SPACING.xl,

        backgroundColor: COLORS.surface,

        borderRadius: RADIUS.xl,

        borderWidth: 1,
        borderColor: COLORS.glassBorder,

        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 2,
    },

    header: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.md,

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.glassBorder,
    },

    subtitle: {
        marginTop: 4,
    },

    content: {
        padding: SPACING.lg,
        gap: SPACING.lg,
    },

});
