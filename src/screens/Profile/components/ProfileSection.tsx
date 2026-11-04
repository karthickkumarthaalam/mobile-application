import { ReactNode, Children, cloneElement, isValidElement } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
}

export default function ProfileSection({ title, children }: ProfileSectionProps) {
    const styles = useThemedStyles(createStyles);

    const items = Children.toArray(children).filter(isValidElement);

    return (
        <View style={styles.container}>
            <AppText variant="caption" weight="700" style={styles.title}>
                {title.toUpperCase()}
            </AppText>
            <View style={styles.card}>
                {items.map((child, index) =>
                    cloneElement(child as React.ReactElement<any>, { isFirst: index === 0 })
                )}
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
    title: {
        marginBottom: SPACING.sm,
        paddingHorizontal: SPACING.xs,
        color: COLORS.textMuted,
        letterSpacing: 0.8,
        fontSize: 11,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        overflow: "hidden",
    },
});
