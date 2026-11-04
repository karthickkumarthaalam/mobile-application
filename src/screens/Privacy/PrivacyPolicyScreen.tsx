import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Database, Cookie, ShieldCheck, UserX, Link2, RefreshCw, Mail } from "lucide-react-native";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";

const SECTIONS = [
    {
        Icon: Database,
        title: "Information We Collect",
        body: "We collect personal information when you register on our site, subscribe to our newsletter, or fill out a form. This may include your name, email address, phone number, and other contact details.",
    },
    {
        Icon: Cookie,
        title: "Cookies Usage",
        body: "Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us analyze web traffic and remember your preferences.",
    },
    {
        Icon: ShieldCheck,
        title: "Data Protection",
        body: "We implement security measures to maintain the safety of your personal information. All sensitive data is transmitted via Secure Socket Layer (SSL) technology.",
    },
    {
        Icon: UserX,
        title: "Third-Party Disclosure",
        body: "We do not sell, trade, or transfer your personally identifiable information to outside parties unless we provide users with advance notice.",
    },
    {
        Icon: Link2,
        title: "Third-Party Links",
        body: "Occasionally, we may include links to third-party products or services on our website. These third-party sites have separate privacy policies.",
    },
    {
        Icon: RefreshCw,
        title: "Policy Changes",
        body: "We may update this privacy policy periodically. Any changes will be posted on this page with an updated revision date.",
    },
    {
        Icon: Mail,
        title: "Contact Us",
        body: "If you have any questions regarding this privacy policy, please contact us at privacy@thaalamradio.com.",
    },
];

export default function PrivacyPolicyScreen() {
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
                            <ShieldCheck size={36} color={COLORS.primary} strokeWidth={1.5} />
                        </View>
                        <AppText variant="heading" weight="700" align="center" style={styles.heroTitle}>
                            Your Privacy Matters
                        </AppText>
                        <AppText variant="body" align="center" color={COLORS.textSecondary} style={styles.heroSub}>
                            At Thaalam Media, we are committed to protecting your personal information and being transparent about how we use it.
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
                            Last updated · 2024
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
    sectionIconWrap: {
        width: 34,
        height: 34,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
        alignItems: "center",
        justifyContent: "center",
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
