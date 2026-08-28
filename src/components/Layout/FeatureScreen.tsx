import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { LucideIcon } from "lucide-react-native";

import { COLORS, GRADIENTS } from "../../constants/colors";
import { RADIUS, SPACING } from "../../constants/spacing";
import AppText from "../Text/AppText";
import { useThemedStyles } from "../../providers/ThemeProvider";

interface FeatureScreenProps {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function FeatureScreen({
    icon: Icon,
    eyebrow,
    title,
    description,
    children,
}: FeatureScreenProps) {
    const styles = useThemedStyles(createStyles);
    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.glow} />
                <View style={styles.content}>
                    <AppText
                        variant="small"
                        weight="700"
                        color={COLORS.primaryBright}
                        style={styles.eyebrow}
                    >
                        {eyebrow}
                    </AppText>
                    <AppText variant="display" weight="700" style={styles.title}>
                        {title}
                    </AppText>

                    <View style={[styles.card, { backgroundColor: COLORS.glass, borderColor: COLORS.glassBorder }]}>
                        <View style={[styles.cardHighlight, { backgroundColor: COLORS.glassHighlight }]} />
                        <View style={[styles.icon, { backgroundColor: COLORS.primarySoft, borderColor: COLORS.primaryBorder }]}>
                            <Icon
                                size={28}
                                color={COLORS.primaryBright}
                                strokeWidth={1.8}
                            />
                        </View>
                        <AppText
                            variant="subHeading"
                            weight="700"
                            align="center"
                        >
                            Made for your rhythm
                        </AppText>
                        <AppText
                            color={COLORS.textSecondary}
                            align="center"
                            style={styles.description}
                        >
                            {description}
                        </AppText>
                        {children}
                    </View>
                </View>
                <View style={styles.glowBottom} />

            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () => StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    glow: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: COLORS.primary,
        opacity: 0.075,
        top: -110,
        right: -130,
    },
    glowBottom: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: COLORS.primary,
        opacity: 0.05,
        bottom: -40,
        left: -40,
        zIndex: -1,
    },
    content: {
        flex: 1,
        width: "100%",
        maxWidth: 620,
        alignSelf: "center",
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl,
        paddingBottom: 120,
    },
    eyebrow: {
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    title: {
        marginTop: SPACING.xs,
        letterSpacing: -0.8,
    },
    card: {
        flex: 1,
        minHeight: 320,
        maxHeight: 430,
        marginTop: SPACING.xxl,
        padding: SPACING.xl,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.glass,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        overflow: "hidden",
    },
    cardHighlight: {
        position: "absolute",
        top: 0,
        left: SPACING.xl,
        right: SPACING.xl,
        height: 1,
        backgroundColor: COLORS.glassHighlight,
    },
    icon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
    },
    description: {
        maxWidth: 360,
        marginTop: SPACING.sm,
    },
});
