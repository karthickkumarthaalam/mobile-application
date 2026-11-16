
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import AppText from "../../../components/Text/AppText";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface ProfileCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    delay?: number;
}

const getSectionNumber = (title: string) => {
    const value = title.toLowerCase();

    if (value.includes("personal")) return "01";
    if (value.includes("location")) return "02";
    if (value.includes("security")) return "03";
    if (value.includes("payment")) return "04";

    return "01";
};

export default function ProfileCard({
    title,
    subtitle,
    children,
    delay = 0,
}: ProfileCardProps) {
    const styles = useThemedStyles(createStyles);
    const sectionNumber = getSectionNumber(title);

    return (
        <Animated.View
            entering={FadeInDown.delay(delay).duration(450).springify()}
            style={styles.container}
        >
            {/* Section heading */}
            <View style={styles.header}>
                <View style={styles.headingRow}>
                    <AppText
                        variant="caption"
                        weight="700"
                        color={COLORS.primary}
                        style={styles.sectionNumber}
                    >
                        {sectionNumber}
                    </AppText>

                    <View style={styles.headingContent}>
                        <AppText
                            variant="body"
                            weight="700"
                            style={styles.title}
                        >
                            {title}
                        </AppText>

                        {subtitle ? (
                            <AppText
                                variant="caption"
                                color={COLORS.textSecondary}
                                style={styles.subtitle}
                            >
                                {subtitle}
                            </AppText>
                        ) : null}
                    </View>
                </View>

                <View style={styles.divider} />
            </View>

            {/* Form content */}
            <View style={styles.content}>
                {children}
            </View>
        </Animated.View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            marginHorizontal: SPACING.xl,
            marginBottom: SPACING.xxl,
        },

        header: {
            marginBottom: SPACING.lg,
        },

        headingRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            gap: SPACING.md,
            marginBottom: SPACING.lg,
        },

        sectionNumber: {
            fontSize: 12,
            letterSpacing: 1,
            marginTop: 5,
        },

        headingContent: {
            flex: 1,
        },

        title: {
            lineHeight: 27,
            letterSpacing: -0.5,
            color: COLORS.text,
        },

        subtitle: {
            marginTop: 4,
            lineHeight: 19,
        },

        divider: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: COLORS.glassBorder,
        },

        content: {
            gap: SPACING.lg,
        },
    });
