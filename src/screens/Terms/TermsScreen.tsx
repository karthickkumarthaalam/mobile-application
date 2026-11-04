import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
    ChevronLeft, FileText, CircleUserRound, Music, ShieldAlert,
    Link2, Ban, AlertTriangle, RefreshCw, Scale, Mail,
} from "lucide-react-native";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";

const SECTIONS = [
    {
        Icon: FileText,
        title: "Acceptance of Terms",
        body: "By accessing and using the Thaalam Radio Station website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.",
    },
    {
        Icon: CircleUserRound,
        title: "User Accounts",
        body: "When creating an account, you must provide accurate information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    },
    {
        Icon: Music,
        title: "Content Usage",
        body: "All audio content, text, graphics, and logos are property of Thaalam Radio Station and protected by copyright laws. Unauthorized use, reproduction, or distribution is strictly prohibited.",
    },
    {
        Icon: ShieldAlert,
        title: "User Conduct",
        body: "Users must not post offensive, defamatory, or illegal content. Thaalam reserves the right to remove any content and terminate accounts violating these terms without notice.",
    },
    {
        Icon: Link2,
        title: "Third-Party Services",
        body: "Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.",
    },
    {
        Icon: Ban,
        title: "Prohibited Activities",
        body: "You may not: attempt to hack our systems, use automated scraping tools, impersonate others, or disrupt service to other users.",
    },
    {
        Icon: AlertTriangle,
        title: "Limitation of Liability",
        body: "Thaalam Radio Station shall not be liable for any indirect, incidental, or consequential damages resulting from use of our services.",
    },
    {
        Icon: RefreshCw,
        title: "Modifications",
        body: "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms.",
    },
    {
        Icon: Scale,
        title: "Governing Law",
        body: "These terms shall be governed by and construed in accordance with the laws of Switzerland, without regard to conflict of law principles.",
    },
    {
        Icon: Mail,
        title: "Contact",
        body: "For questions regarding these Terms & Conditions, please contact us at legal@thaalamradio.com.",
    },
];

export default function TermsScreen() {
    const styles = useThemedStyles(createStyles);
    const navigation = useNavigation();

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <ChevronLeft size={22} color={COLORS.text} strokeWidth={2} />
                    </TouchableOpacity>

                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Hero */}
                    <View style={styles.hero}>
                        <View style={styles.iconRing}>
                            <FileText size={36} color={COLORS.primary} strokeWidth={1.5} />
                        </View>
                        <AppText variant="heading" weight="700" align="center" style={styles.heroTitle}>
                            Terms & Conditions
                        </AppText>
                        <AppText variant="body" align="center" color={COLORS.textSecondary} style={styles.heroSub}>
                            Please read these terms carefully before using Thaalam Radio Station's services. By using our platform, you agree to be bound by the following conditions.
                        </AppText>
                    </View>

                    {/* Sections */}
                    {SECTIONS.map(({ Icon, title, body }) => (
                        <View key={title} style={styles.sectionCard}>
                            <View style={styles.sectionIconRow}>
                                <Icon size={18} color={COLORS.primary} strokeWidth={1.8} />
                                <AppText variant="subHeading" weight="700" style={styles.sectionTitle}>
                                    {title}
                                </AppText>
                            </View>
                            <AppText variant="body" color={COLORS.textSecondary} style={styles.sectionBody}>
                                {body}
                            </AppText>
                        </View>
                    ))}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerDivider} />
                        <AppText variant="caption" align="center" color={COLORS.textMuted} style={styles.footerText}>
                            Last updated · June 15, 2023
                        </AppText>
                        <AppText variant="caption" align="center" color={COLORS.textDisabled} style={styles.footerUrl}>
                            thaalam.ch
                        </AppText>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const createStyles = () => StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        alignItems: "center",
        justifyContent: "center",
    },

    content: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: 120,
    },

    hero: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },
    iconRing: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.lg,
    },
    heroTitle: {
        marginBottom: SPACING.sm,
    },
    heroSub: {
        lineHeight: 22,
        maxWidth: 300,
    },

    sectionCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionIconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },

    sectionTitle: {
        flex: 1,
        fontSize: 15,
    },
    sectionBody: {
        lineHeight: 22,
    },

    footer: {
        alignItems: "center",
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.lg,
    },
    footerDivider: {
        width: 48,
        height: 2,
        borderRadius: 1,
        backgroundColor: COLORS.primaryBorder,
        marginBottom: SPACING.lg,
    },
    footerText: {
        lineHeight: 20,
        marginBottom: SPACING.sm,
    },
    footerUrl: {
        letterSpacing: 0.5,
    },
});
