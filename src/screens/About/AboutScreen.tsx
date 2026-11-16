import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Radio, Music2, Mic2, Star, Calendar } from "lucide-react-native";

import AppText from "../../components/Text/AppText";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";
import ScreenHeader from "../../components/Layout/ScreenHeader";

const STATS = [
    { value: "20+", label: "Years of\nLegacy" },
    { value: "190+", label: "Mega\nEvents" },
    { value: "26", label: "Swiss\nCantons" },
    { value: "80%", label: "Youth\nAudience" },
];

const SECTIONS = [
    {
        Icon: Radio,
        title: "Thaalam in Switzerland",
        body: "Thaalam FM is broadcast across Switzerland using advanced Digital Audio Broadcasting (DAB) technology — the first and only Tamil radio station in the country, covering all 26 Cantons. Thaalam Swiss has sparked a music revolution, catering to the Tamil diaspora's longing for a radio station in their language for the past 40 years.",
    },
    {
        Icon: Music2,
        title: "Commitment to Music & Youth",
        body: "Thaalam places paramount importance on music, boasting a dedicated department attuned to the pulse of our listeners. Our stronghold on 80% of the youth audience distinguishes us as a leader among radio stations. Our divisions — Thaalam Creative and Thaalam News — aim to position Thaalam as a global news network, championing the current generation Tamil diaspora.",
    },
    {
        Icon: Star,
        title: "Expertise in Mega Events",
        body: "As a mega media organization, Thaalam possesses the expertise, network, team, and resources to orchestrate mega events successfully. We are the only media organization equipped to conduct these events seamlessly, solidifying our reputation as a credible and trustworthy entity.",
    },
    {
        Icon: Mic2,
        title: "AR Rahman — Zurich, October 2023",
        body: "Thaalam Media orchestrated a historic event at Zurich's Hallenstadion featuring the musical maestro AR Rahman. This back-to-back two-day extravaganza marked a milestone in Rahman's 30-year musical journey, attracting an unprecedented 18,750 enthusiastic music lovers — including an unforgettable after-party attended by more than 3,000 people.",
    },
    {
        Icon: Calendar,
        title: "Paranthu Pogiren — Colombo, March 2023",
        body: "Thaalam Media presented the mega event \"Paranthu Pogiren with Pradeep Kumar\" at Colombo's Sugathadasa Indoor Stadium. This back-to-back houseful show surpassed all previous events in the Tamil Film Industry over the last 20 years — the largest event in Sri Lanka in the past four years.",
    },
];

export default function AboutScreen() {
    const styles = useThemedStyles(createStyles);
    const navigation = useNavigation();

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>

                <ScreenHeader title="About Us" subtitle="Get to know more about us" />

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Hero */}
                    <View style={styles.hero}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <AppText variant="heading" weight="700" align="center" style={styles.heroTitle}>
                            Thaalam Media
                        </AppText>
                        <AppText variant="caption" align="center" color={COLORS.primaryText} style={styles.heroSub}>
                            A trailblazing organization with an illustrious 20-year legacy in media. Since our inception in 2002 in Sri Lanka, we have forged an extensive network in the media landscape — becoming more than just a broadcasting entity.
                        </AppText>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        {STATS.map((s) => (
                            <View key={s.label} style={styles.statCard}>
                                <AppText weight="500" color={COLORS.primary} style={styles.statValue}>
                                    {s.value}
                                </AppText>
                                <AppText variant="small" color={COLORS.textMuted} align="center" style={styles.statLabel}>
                                    {s.label}
                                </AppText>
                            </View>
                        ))}
                    </View>

                    {/* Content sections */}
                    {SECTIONS.map(({ Icon, title, body }) => (
                        <View key={title} style={styles.sectionCard}>
                            <View style={styles.sectionIconRow}>
                                <Icon size={18} color={COLORS.primary} strokeWidth={1.8} />
                                <AppText variant="subHeading" weight="700" style={styles.sectionTitle}>
                                    {title}
                                </AppText>
                            </View>
                            <AppText variant="caption" color={COLORS.primaryText} style={styles.sectionBody}>
                                {body}
                            </AppText>
                        </View>
                    ))}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerDivider} />
                        <AppText variant="caption" align="center" color={COLORS.textMuted} style={styles.footerText}>
                            Redefining the landscape of media and events — leaving an indelible mark on the hearts of our audiences worldwide.
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

    content: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: 120,
    },

    hero: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },

    logo: {
        width: 96,
        height: 96,
    },
    heroTitle: {
        marginBottom: SPACING.sm,
    },
    heroSub: {
        lineHeight: 22,
        maxWidth: 320,
    },

    statsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.sm,
        marginBottom: SPACING.lg,
    },
    statCard: {
        flex: 1,
        minWidth: "44%",
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.md,
        alignItems: "center",
    },
    statValue: {
        fontSize: 26,
        marginBottom: 2,
    },
    statLabel: {
        lineHeight: 16,
    },

    sectionCard: {
        backgroundColor: COLORS.backgroundSecondary,
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
        maxWidth: 280,
        marginBottom: SPACING.sm,
    },
    footerUrl: {
        letterSpacing: 0.5,
    },
});
