import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
}

export default function ProfileSection({
    title,
    children
}: ProfileSectionProps) {
    return (
        <View style={styles.container}>
            <AppText
                weight="700"
                color={COLORS.textSecondary}
                style={styles.title}
            >
                {title}
            </AppText>
            <View style={styles.card}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginBottom: SPACING.xl
    },
    title: {
        marginBottom: SPACING.sm,
        paddingHorizontal: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 18,
        overflow: "hidden",
        marginHorizontal: SPACING.lg,
    },
});