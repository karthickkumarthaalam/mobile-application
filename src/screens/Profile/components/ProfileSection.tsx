
import {
    ReactNode,
    Children,
    cloneElement,
    isValidElement,
} from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
}

export default function ProfileSection({
    title,
    children,
}: ProfileSectionProps) {
    const styles = useThemedStyles(createStyles);

    const items = Children.toArray(children).filter(isValidElement);

    return (
        <View style={styles.container}>
            {/* Section Title */}
            <View style={styles.titleContainer}>
                <AppText
                    variant="caption"
                    weight="700"
                    style={styles.title}
                >
                    {title.toUpperCase()}
                </AppText>
            </View>

            {/* Section Items */}
            <View style={styles.list}>
                {items.map((child, index) => (
                    <View key={index}>
                        {cloneElement(
                            child as React.ReactElement<any>,
                            { isFirst: index === 0 }
                        )}

                        {index !== items.length - 1 && (
                            <View style={styles.separator} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            marginTop: SPACING.md,
        },

        titleContainer: {
            backgroundColor: COLORS.surface,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.sm + 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: COLORS.glassBorder,
        },

        title: {
            color: COLORS.primary,
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 1,
        },

        list: {
            backgroundColor: COLORS.surface,
        },

        separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: COLORS.glassBorder,
            marginLeft: SPACING.lg + 40,
        },
    });
