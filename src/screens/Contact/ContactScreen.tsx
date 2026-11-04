import React, { useState } from "react";
import {
    ScrollView, StyleSheet, View,
    TouchableOpacity, Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
    ChevronLeft, MapPin, Phone, Mail,
    Headphones, MessageSquare, Megaphone,
} from "lucide-react-native";

import AppText from "../../components/Text/AppText";
import AppTextInput from "../../components/Input/AppTextInput";
import AppSelect from "../../components/Input/AppSelect";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { COLORS, GRADIENTS } from "../../constants/colors";
import { SPACING, RADIUS } from "../../constants/spacing";
import { useThemedStyles } from "../../providers/ThemeProvider";
import { useNotification } from "../../providers/NotificationProvider";
import { enquiry, advertise } from "../../api/contact.api";
import type { EnquiryRequest, AdvertiseRequest } from "../../types/contact";

const CONTACT_ITEMS = [
    {
        Icon: MapPin,
        label: "Address",
        lines: ["Talacker 41, Zürich"],
        onPress: () => Linking.openURL("https://maps.google.com/?q=Talacker+41+Zürich"),
    },
    {
        Icon: Phone,
        label: "Phone",
        lines: ["079 694 88 89"],
        onPress: () => Linking.openURL("tel:0796948889"),
    },
    {
        Icon: Mail,
        label: "Email",
        lines: ["info@thaalam.ch", "marketing@thaalam.ch"],
        onPress: () => Linking.openURL("mailto:info@thaalam.ch"),
    },
];

const PURPOSE_OPTIONS = [
    { label: "General Enquiry", value: "general" },
    { label: "Partnership", value: "partnership" },
    { label: "Event Collaboration", value: "event" },
    { label: "Media & Press", value: "media" },
    { label: "Other", value: "other" },
];

const ENQUIRY_EMPTY: EnquiryRequest = {
    name: "", phone: "", email: "",
    subject: "", purpose: "", message: "",
};

const ADVERTISE_EMPTY: AdvertiseRequest = {
    company_name: "", contact_person: "", email: "",
    phone: "", site_address: "", requirement: "",
};

type Tab = "enquiry" | "advertise";

export default function ContactScreen() {
    const styles = useThemedStyles(createStyles);
    const navigation = useNavigation();
    const { showSuccess, showError } = useNotification();

    const [tab, setTab] = useState<Tab>("enquiry");
    const [enquiryForm, setEnquiryForm] = useState<EnquiryRequest>(ENQUIRY_EMPTY);
    const [advertiseForm, setAdvertiseForm] = useState<AdvertiseRequest>(ADVERTISE_EMPTY);
    const [enquiryErrors, setEnquiryErrors] = useState<Partial<EnquiryRequest>>({});
    const [advertiseErrors, setAdvertiseErrors] = useState<Partial<AdvertiseRequest>>({});
    const [loading, setLoading] = useState(false);

    const setE = (key: keyof EnquiryRequest) => (val: string) => {
        setEnquiryForm(f => ({ ...f, [key]: val }));
        setEnquiryErrors(e => ({ ...e, [key]: undefined }));
    };

    const setA = (key: keyof AdvertiseRequest) => (val: string) => {
        setAdvertiseForm(f => ({ ...f, [key]: val }));
        setAdvertiseErrors(e => ({ ...e, [key]: undefined }));
    };

    const validateEnquiry = () => {
        const errs: Partial<EnquiryRequest> = {};
        if (!enquiryForm.name.trim()) errs.name = "Name is required";
        if (!enquiryForm.email.trim()) errs.email = "Email is required";
        if (!enquiryForm.phone.trim()) errs.phone = "Phone is required";
        if (!enquiryForm.subject.trim()) errs.subject = "Subject is required";
        if (!enquiryForm.purpose) errs.purpose = "Please select a purpose";
        if (!enquiryForm.message.trim()) errs.message = "Message is required";
        setEnquiryErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateAdvertise = () => {
        const errs: Partial<AdvertiseRequest> = {};
        if (!advertiseForm.company_name.trim()) errs.company_name = "Company name is required";
        if (!advertiseForm.contact_person.trim()) errs.contact_person = "Contact person is required";
        if (!advertiseForm.email.trim()) errs.email = "Email is required";
        if (!advertiseForm.phone.trim()) errs.phone = "Phone is required";
        if (!advertiseForm.requirement.trim()) errs.requirement = "Requirement is required";
        setAdvertiseErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const submitEnquiry = async () => {
        if (!validateEnquiry()) return;
        setLoading(true);
        try {
            await enquiry(enquiryForm);
            showSuccess("Enquiry Sent!", "We'll get back to you shortly.");
            setEnquiryForm(ENQUIRY_EMPTY);
            setEnquiryErrors({});
        } catch {
            showError("Submission Failed", "Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const submitAdvertise = async () => {
        if (!validateAdvertise()) return;
        setLoading(true);
        try {
            await advertise(advertiseForm);
            showSuccess("Request Sent!", "Our team will contact you soon.");
            setAdvertiseForm(ADVERTISE_EMPTY);
            setAdvertiseErrors({});
        } catch {
            showError("Submission Failed", "Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={GRADIENTS.screen} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <ChevronLeft size={22} color={COLORS.text} strokeWidth={2} />
                    </TouchableOpacity>

                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Hero */}
                    <View style={styles.hero}>
                        <View style={styles.iconRing}>
                            <Headphones size={36} color={COLORS.primary} strokeWidth={1.5} />
                        </View>
                        <AppText variant="heading" weight="700" align="center" style={styles.heroTitle}>
                            Contact Information
                        </AppText>
                        <AppText variant="body" align="center" color={COLORS.textSecondary} style={styles.heroSub}>
                            We're available to help you anytime
                        </AppText>
                    </View>

                    {/* Contact cards */}
                    {CONTACT_ITEMS.map(({ Icon, label, lines, onPress }) => (
                        <TouchableOpacity key={label} style={styles.card} onPress={onPress} activeOpacity={0.75}>
                            <Icon size={20} color={COLORS.primary} strokeWidth={1.8} />
                            <View style={styles.cardBody}>
                                <AppText variant="caption" color={COLORS.textMuted} weight="600" style={styles.cardLabel}>
                                    {label}
                                </AppText>
                                {lines.map((line) => (
                                    <AppText key={line} variant="body" weight="600" style={styles.cardLine}>
                                        {line}
                                    </AppText>
                                ))}
                            </View>
                            <ChevronLeft size={18} color={COLORS.textMuted} strokeWidth={2} style={styles.cardChevron} />
                        </TouchableOpacity>
                    ))}

                    {/* Form toggle */}
                    <View style={styles.toggleWrap}>
                        <TouchableOpacity
                            style={[styles.toggleCard, tab === "enquiry" && styles.toggleCardEnquiryActive]}
                            onPress={() => setTab("enquiry")}
                            activeOpacity={0.85}
                        >
                            {tab === "enquiry" && (
                                <LinearGradient
                                    colors={["rgba(59,130,246,0.18)", "rgba(99,102,241,0.10)"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                            )}
                            <View style={[styles.toggleIconWrap, tab === "enquiry" ? styles.toggleIconEnquiry : styles.toggleIconInactive]}>
                                <MessageSquare
                                    size={18}
                                    color={tab === "enquiry" ? "#3B82F6" : COLORS.textMuted}
                                    strokeWidth={2}
                                />
                            </View>
                            <View style={styles.toggleTextWrap}>
                                <AppText
                                    variant="body"
                                    weight="700"
                                    color={tab === "enquiry" ? "#3B82F6" : COLORS.textMuted}
                                >
                                    Enquiry
                                </AppText>
                                <AppText variant="caption" color={tab === "enquiry" ? "#3B82F6" : COLORS.textDisabled} style={styles.toggleSub}>
                                    General questions
                                </AppText>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.toggleCard, tab === "advertise" && styles.toggleCardAdvertiseActive]}
                            onPress={() => setTab("advertise")}
                            activeOpacity={0.85}
                        >
                            {tab === "advertise" && (
                                <LinearGradient
                                    colors={["rgba(249,115,22,0.18)", "rgba(234,179,8,0.10)"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                            )}
                            <View style={[styles.toggleIconWrap, tab === "advertise" ? styles.toggleIconAdvertise : styles.toggleIconInactive]}>
                                <Megaphone
                                    size={18}
                                    color={tab === "advertise" ? "#F97316" : COLORS.textMuted}
                                    strokeWidth={2}
                                />
                            </View>
                            <View style={styles.toggleTextWrap}>
                                <AppText
                                    variant="body"
                                    weight="700"
                                    color={tab === "advertise" ? "#F97316" : COLORS.textMuted}
                                >
                                    Advertise
                                </AppText>
                                <AppText variant="caption" color={tab === "advertise" ? "#F97316" : COLORS.textDisabled} style={styles.toggleSub}>
                                    Promote your brand
                                </AppText>
                            </View>

                        </TouchableOpacity>
                    </View>

                    {/* Form card */}
                    <View style={styles.formCard}>
                        {tab === "enquiry" ? (
                            <>
                                <View style={styles.formHeader}>
                                    <View style={[styles.formIconWrap, styles.formIconEnquiry]}>
                                        <MessageSquare size={18} color="#3B82F6" strokeWidth={1.8} />
                                    </View>
                                    <View>
                                        <AppText variant="subHeading" weight="700">Send an Enquiry</AppText>
                                        <AppText variant="caption" color={COLORS.textMuted}>
                                            We'll respond within 24 hours
                                        </AppText>
                                    </View>
                                </View>

                                <AppTextInput
                                    label="Full Name"
                                    placeholder="Your full name"
                                    value={enquiryForm.name}
                                    onChangeText={setE("name")}
                                    error={enquiryErrors.name}
                                    autoCapitalize="words"
                                />
                                <AppTextInput
                                    label="Email Address"
                                    placeholder="your@email.com"
                                    value={enquiryForm.email}
                                    onChangeText={setE("email")}
                                    error={enquiryErrors.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <AppTextInput
                                    label="Phone Number"
                                    placeholder="+41 79 000 00 00"
                                    value={enquiryForm.phone}
                                    onChangeText={setE("phone")}
                                    error={enquiryErrors.phone}
                                    keyboardType="phone-pad"
                                />
                                <AppTextInput
                                    label="Subject"
                                    placeholder="What is this about?"
                                    value={enquiryForm.subject}
                                    onChangeText={setE("subject")}
                                    error={enquiryErrors.subject}
                                />
                                <AppSelect
                                    label="Purpose"
                                    placeholder="Select a purpose"
                                    value={enquiryForm.purpose}
                                    items={PURPOSE_OPTIONS}
                                    onChange={setE("purpose")}
                                    error={enquiryErrors.purpose}
                                />
                                <AppTextInput
                                    label="Message"
                                    placeholder="Write your message here..."
                                    value={enquiryForm.message}
                                    onChangeText={setE("message")}
                                    error={enquiryErrors.message}
                                    multiline
                                    numberOfLines={5}
                                    style={styles.textarea}
                                />

                                <PrimaryButton
                                    title="Send Enquiry"
                                    loading={loading}
                                    onPress={submitEnquiry}
                                    size="lg"
                                />
                            </>
                        ) : (
                            <>
                                <View style={styles.formHeader}>
                                    <View style={[styles.formIconWrap, styles.formIconAdvertise]}>
                                        <Megaphone size={18} color="#F97316" strokeWidth={1.8} />
                                    </View>
                                    <View>
                                        <AppText variant="subHeading" weight="700">Advertise with Us</AppText>
                                        <AppText variant="caption" color={COLORS.textMuted}>
                                            Reach thousands of Tamil listeners
                                        </AppText>
                                    </View>
                                </View>

                                <AppTextInput
                                    label="Company Name"
                                    placeholder="Your company name"
                                    value={advertiseForm.company_name}
                                    onChangeText={setA("company_name")}
                                    error={advertiseErrors.company_name}
                                    autoCapitalize="words"
                                />
                                <AppTextInput
                                    label="Contact Person"
                                    placeholder="Full name of contact"
                                    value={advertiseForm.contact_person}
                                    onChangeText={setA("contact_person")}
                                    error={advertiseErrors.contact_person}
                                    autoCapitalize="words"
                                />
                                <AppTextInput
                                    label="Email Address"
                                    placeholder="business@email.com"
                                    value={advertiseForm.email}
                                    onChangeText={setA("email")}
                                    error={advertiseErrors.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <AppTextInput
                                    label="Phone Number"
                                    placeholder="+41 79 000 00 00"
                                    value={advertiseForm.phone}
                                    onChangeText={setA("phone")}
                                    error={advertiseErrors.phone}
                                    keyboardType="phone-pad"
                                />
                                <AppTextInput
                                    label="Website / Social Media"
                                    placeholder="https://yourwebsite.com"
                                    value={advertiseForm.site_address}
                                    onChangeText={setA("site_address")}
                                    error={advertiseErrors.site_address}
                                    keyboardType="url"
                                    autoCapitalize="none"
                                />
                                <AppTextInput
                                    label="Advertising Requirement"
                                    placeholder="Describe your advertising needs..."
                                    value={advertiseForm.requirement}
                                    onChangeText={setA("requirement")}
                                    error={advertiseErrors.requirement}
                                    multiline
                                    numberOfLines={5}
                                    style={styles.textarea}
                                />

                                <PrimaryButton
                                    title="Submit Request"
                                    loading={loading}
                                    onPress={submitAdvertise}
                                    size="lg"
                                />
                            </>
                        )}
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerDivider} />
                        <AppText variant="caption" align="center" color={COLORS.textMuted} style={styles.footerText}>
                            Thaalam Media · Zürich, Switzerland
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
    heroTitle: { marginBottom: SPACING.sm },
    heroSub: { lineHeight: 22 },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        gap: SPACING.md,
    },
    cardIconWrap: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    cardBody: { flex: 1, gap: 3 },
    cardLabel: {
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    cardLine: { fontSize: 15 },
    cardChevron: { transform: [{ rotate: "180deg" }] },

    // Toggle
    toggleWrap: {
        marginTop: SPACING.xl,
        marginBottom: SPACING.md,
        flexDirection: "row",
        gap: SPACING.sm,
    },
    toggleCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.surface,
        overflow: "hidden",
    },
    toggleCardEnquiryActive: {
        borderColor: "rgba(59,130,246,0.35)",
    },
    toggleCardAdvertiseActive: {
        borderColor: "rgba(249,115,22,0.35)",
    },
    toggleIconWrap: {
        width: 38,
        height: 38,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
    },
    toggleIconEnquiry: {
        backgroundColor: "rgba(59,130,246,0.15)",
        borderWidth: 1,
        borderColor: "rgba(59,130,246,0.3)",
    },
    toggleIconAdvertise: {
        backgroundColor: "rgba(249,115,22,0.15)",
        borderWidth: 1,
        borderColor: "rgba(249,115,22,0.3)",
    },
    toggleIconInactive: {
        backgroundColor: COLORS.glass,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    toggleTextWrap: {
        flex: 1,
    },
    toggleSub: {
        fontSize: 11,
        marginTop: 1,
    },
    toggleActiveDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#3B82F6",
        alignSelf: "flex-start",
        marginTop: 2,
    },
    toggleActiveDotOrange: {
        backgroundColor: "#F97316",
    },

    // Form
    formCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    formHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.xl,
        paddingBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.glassBorder,
    },
    formIconWrap: {
        width: 42,
        height: 42,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
    },
    formIconEnquiry: {
        backgroundColor: "rgba(59,130,246,0.15)",
        borderWidth: 1,
        borderColor: "rgba(59,130,246,0.3)",
    },
    formIconAdvertise: {
        backgroundColor: "rgba(249,115,22,0.15)",
        borderWidth: 1,
        borderColor: "rgba(249,115,22,0.3)",
    },
    textarea: {
        minHeight: 110,
        textAlignVertical: "top",
        paddingTop: SPACING.md,
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
    footerText: { lineHeight: 20, marginBottom: SPACING.sm },
    footerUrl: { letterSpacing: 0.5 },
});
