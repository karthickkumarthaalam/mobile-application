import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Check, ShieldCheck, HandHeart, ArrowLeft } from "lucide-react-native";
import { Linking } from "react-native";
import ProfileCard from "../Profile/components/ProfileCard";
import AppTextInput from "../../components/Input/AppTextInput";
import AppSelect from "../../components/Input/AppSelect";
import PrimaryButton from "../../components/Button/PrimaryButton";
import AppText from "../../components/Text/AppText";

import { SPACING } from "../../constants/spacing";
import { COLORS } from "../../constants/colors";

import countries from "../../assets/json/countries.json";

import { CreateDonationRequest } from "../../types/donation";
import { createDonation } from "../../api/donation.api";

import { useNavigation } from "@react-navigation/native";
import { useNotification } from "../../providers/NotificationProvider";
import { useThemedStyles } from "../../providers/ThemeProvider";


const PRESET_AMOUNTS = [10, 25, 50];


export default function DonationScreen() {
    const styles = useThemedStyles(createStyles);

    const navigation = useNavigation();

    const [selectedAmount, setSelectedAmount] =
        useState<number | null>(null);

    const [customAmount, setCustomAmount] =
        useState("");

    const [frequency, setFrequency] =
        useState<"one_time" | "monthly">("one_time");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState(false);

    const [showCustomInput, setShowCustomInput] = useState(false);

    const { showError } = useNotification();


    const countryItems = useMemo(
        () =>
            countries.map((c: any) => ({
                label: c.name,
                value: c.name,
            })),
        []
    );


    /*
    |--------------------------------------------------------------------------
    | Final Amount
    |--------------------------------------------------------------------------
    */

    const finalAmount = useMemo(() => {

        if (selectedAmount !== null) {
            return selectedAmount;
        }

        const value = Number(customAmount);

        if (
            Number.isFinite(value) &&
            value > 0
        ) {
            return value;
        }

        return 0;

    }, [selectedAmount, customAmount]);


    /*
    |--------------------------------------------------------------------------
    | Amount Selection
    |--------------------------------------------------------------------------
    */

    const handlePresetAmount = (amount: number) => {

        setSelectedAmount(amount);
        setCustomAmount("");
        setShowCustomInput(false);

    };


    const handleCustomAmount = () => {

        setSelectedAmount(null);
        setShowCustomInput(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        const validations = [
            { condition: !finalAmount || finalAmount <= 0, title: "Amount required", message: "Please choose a contribution amount." },
            { condition: !name.trim(), title: "Name required", message: "Please enter your name." },
            { condition: !email.trim(), title: "Email required", message: "Please enter your email address." },
            { condition: !phone.trim(), title: "Phone required", message: "Please enter your phone number." },
            { condition: !country.trim(), title: "Country required", message: "Please select your country." },
        ];

        const validation = validations.find((v) => v.condition);

        if (validation) {
            showError(validation.title, validation.message);
            return;
        }


        const payload: CreateDonationRequest = {

            donor_name: name.trim(),

            email: email.trim(),

            phone: phone.trim(),

            country,

            amount: finalAmount,

            currency: "CHF",

            frequency,

            source: "mobile",

            /*
             * Replace these later with your
             * mobile deep-link callback URLs.
             */
            success_url:
                "thaalam://donation/success",

            cancel_url:
                "thaalam://donation/failure",
        };


        try {

            setLoading(true);

            const result =
                await createDonation(payload);


            if (
                !result ||
                !result.success ||
                !result.data?.checkout_url
            ) {

                throw new Error(
                    result?.message ||
                    "Unable to start donation checkout."
                );

            }


            await Linking.openURL(
                result.data.checkout_url
            );

        } catch (err: any) {

            showError(
                "Donation failed",
                err?.message ||
                "Unable to start donation checkout. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.backRow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <ArrowLeft size={20} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            {/* ---------------------------------------------------------------- */}
            {/* Hero */}
            {/* ---------------------------------------------------------------- */}

            <View style={styles.hero}>

                <View style={styles.heroIcon}>

                    <HandHeart
                        size={28}
                        color={COLORS.primary}
                    />

                </View>


                <AppText
                    variant="subHeading"
                    style={styles.heroTitle}
                >
                    From One Heart to Another
                </AppText>


                <AppText
                    variant="body"
                    style={styles.heroDescription}
                >
                    Every heartbeat of kindness helps us
                    preserve Tamil voices, celebrate our
                    culture, and bring our community
                    together.
                </AppText>

            </View>


            {/* ---------------------------------------------------------------- */}
            {/* Contribution */}
            {/* ---------------------------------------------------------------- */}

            <ProfileCard
                title="Choose your contribution"
                subtitle="Every contribution makes a difference."
                delay={80}
            >

                {/* Amount Cards */}

                <View style={styles.amountGrid}>

                    {PRESET_AMOUNTS.map((value) => {

                        const selected =
                            selectedAmount === value;

                        return (
                            <TouchableOpacity
                                key={value}
                                activeOpacity={0.8}
                                onPress={() =>
                                    handlePresetAmount(value)
                                }
                                style={[
                                    styles.amountCard,
                                    selected &&
                                    styles.amountCardSelected,
                                ]}
                            >

                                {selected && (
                                    <View
                                        style={styles.checkBadge}
                                    >
                                        <Check
                                            size={11}
                                            color="#fff"
                                        />
                                    </View>
                                )}


                                <AppText
                                    style={[
                                        styles.currency,
                                        selected ? styles.selectedText : undefined,
                                    ]}
                                >
                                    CHF
                                </AppText>


                                <AppText
                                    style={[
                                        styles.amount,
                                        selected ? styles.selectedText : undefined,
                                    ]}
                                >
                                    {value}
                                </AppText>

                            </TouchableOpacity>
                        );
                    })}


                    {/* Custom */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleCustomAmount}
                        style={[
                            styles.amountCard,
                            selectedAmount === null &&
                            customAmount.length > 0 &&
                            styles.amountCardSelected,
                        ]}
                    >

                        <AppText
                            style={styles.customSymbol}
                        >
                            +
                        </AppText>

                        <AppText
                            style={[
                                styles.customText,
                                showCustomInput && selectedAmount === null ? styles.selectedText : undefined,
                            ]}
                        >
                            Custom
                        </AppText>

                    </TouchableOpacity>

                </View>


                {/* Custom Amount */}

                {showCustomInput && selectedAmount === null && (
                    <View style={styles.customAmountWrapper}>

                        <AppTextInput
                            label="Custom Amount (CHF)"
                            value={customAmount}
                            onChangeText={setCustomAmount}
                            keyboardType="decimal-pad"
                            placeholder="Enter amount"
                        />

                    </View>
                )}


                {/* Frequency */}

                <View style={styles.frequencyWrapper}>

                    <AppText
                        style={styles.frequencyLabel}
                    >
                        How would you like to support?
                    </AppText>


                    <View style={styles.frequencyRow}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                setFrequency("one_time")
                            }
                            style={[
                                styles.frequencyButton,
                                frequency === "one_time" &&
                                styles.frequencyButtonSelected,
                            ]}
                        >

                            <AppText
                                style={[
                                    styles.frequencyText,
                                    frequency === "one_time" ? styles.frequencyTextSelected : undefined,
                                ]}
                            >
                                One-Time
                            </AppText>

                        </TouchableOpacity>


                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                setFrequency("monthly")
                            }
                            style={[
                                styles.frequencyButton,
                                frequency === "monthly" &&
                                styles.frequencyButtonSelected,
                            ]}
                        >

                            <AppText
                                style={[
                                    styles.frequencyText,
                                    frequency === "monthly" ? styles.frequencyTextSelected : undefined,
                                ]}
                            >
                                Monthly
                            </AppText>

                        </TouchableOpacity>

                    </View>

                </View>

            </ProfileCard>


            {/* ---------------------------------------------------------------- */}
            {/* Donor Details */}
            {/* ---------------------------------------------------------------- */}

            <ProfileCard
                title="Your Details"
                subtitle="We will send your receipt to this email."
                delay={160}
            >

                <AppTextInput
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                    placeholder="Your full name"
                />


                <AppTextInput
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="you@example.com"
                />


                <AppTextInput
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+41 79 123 45 67"
                />


                <AppSelect
                    label="Country"
                    items={countryItems}
                    value={country}
                    onChange={setCountry}
                    searchable
                />

            </ProfileCard>


            {/* ---------------------------------------------------------------- */}
            {/* Continue */}
            {/* ---------------------------------------------------------------- */}

            <View style={styles.footer}>

                <PrimaryButton
                    title="Continue the Journey"
                    size="lg"
                    loading={loading}
                    onPress={handleSubmit}
                />


                <View style={styles.secureRow}>

                    <ShieldCheck
                        size={14}
                        color={COLORS.textMuted}
                    />

                    <AppText
                        style={styles.secureText}
                    >
                        Secure payments powered by Stripe
                    </AppText>

                </View>

            </View>

        </ScrollView>
    );
}


const createStyles = () => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingBottom: SPACING.xxxl,
    },

    backRow: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.sm,
    },

    backButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },


    /*
    |--------------------------------------------------------------------------
    | Hero
    |--------------------------------------------------------------------------
    */

    hero: {
        alignItems: "center",
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xl,
    },

    heroIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEF2F2",
        marginBottom: SPACING.md,
    },

    heroTitle: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "800",
        color: COLORS.text,
    },

    heroDescription: {
        marginTop: SPACING.sm,
        textAlign: "center",
        fontSize: 14,
        lineHeight: 21,
        color: COLORS.textMuted,
    },


    /*
    |--------------------------------------------------------------------------
    | Amount
    |--------------------------------------------------------------------------
    */

    amountGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: SPACING.sm,
    },

    amountCard: {
        width: "48.5%",
        minHeight: 96,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    amountCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: "#FEF2F2",
        color: COLORS.primary
    },

    checkBadge: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
    },

    currency: {
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.2,
        color: COLORS.textMuted,
    },

    amount: {
        marginTop: 3,
        fontSize: 25,
        fontWeight: "800",
        color: COLORS.text,
    },

    selectedText: {
        color: COLORS.primary,
    },

    customSymbol: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: "400",
        color: COLORS.primary,
    },

    customText: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.text,
    },

    customAmountWrapper: {
        marginTop: SPACING.md,
    },


    /*
    |--------------------------------------------------------------------------
    | Frequency
    |--------------------------------------------------------------------------
    */

    frequencyWrapper: {
        marginTop: SPACING.xl,
    },

    frequencyLabel: {
        marginBottom: SPACING.sm,
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.text,
    },

    frequencyRow: {
        flexDirection: "row",
        gap: SPACING.sm,
    },

    frequencyButton: {
        flex: 1,
        minHeight: 46,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },

    frequencyButtonSelected: {
        borderColor: COLORS.primary,
        backgroundColor: "#FEF2F2",
    },

    frequencyText: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
    },

    frequencyTextSelected: {
        color: COLORS.primary,
        fontWeight: "700",
    },


    /*
    |--------------------------------------------------------------------------
    | Footer
    |--------------------------------------------------------------------------
    */

    footer: {
        marginTop: SPACING.xxl,
        paddingHorizontal: SPACING.xl,
    },

    secureRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        marginTop: SPACING.md,
    },

    secureText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

});
