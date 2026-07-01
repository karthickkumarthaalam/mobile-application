import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";
import { useNotification } from "../../providers/NotificationProvider";
import { register } from "../../api/auth.api";
import countries from "../../assets/json/countries.json";
import AppSelect from "../Input/AppSelect";
import { saveOTPContext } from "../../utils/storage";

export default function Register() {
    const { openAuthSheet } = useAuth();
    const { showSuccess, showError } = useNotification();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const selectedCountry = useMemo(
        () =>
            countries.find(
                item => item.name === country
            ),
        [country]
    );

    const states = useMemo(
        () =>
            selectedCountry?.states ?? [],
        [selectedCountry]
    );

    const selectedState = useMemo(
        () =>
            states.find(
                item => item.name === state
            ),
        [states, state]
    );

    const cities = useMemo(
        () =>
            selectedState?.cities ?? [],
        [selectedState]
    );

    const handleCountry = (value: string) => {
        setCountry(value);

        setState("");
        setCity("");
    };

    const handleState = (value: string) => {
        setState(value);

        setCity("");
    };

    const handleRegister = async () => {

        const validations = [
            {
                value: name.trim(),
                title: "Name Required",
                message: "Please enter your full name.",
            },
            {
                value: gender.trim(),
                title: "Gender Required",
                message: "Please select your gender.",
            },
            {
                value: country.trim(),
                title: "Country Required",
                message: "Please select your country.",
            },
            {
                value: state.trim(),
                title: "State Required",
                message: "Please select your state.",
            },
            {
                value: city.trim(),
                title: "City Required",
                message: "Please select your city.",
            },
            {
                value: email.trim(),
                title: "Email Required",
                message: "Please enter your email address.",
            },
            {
                value: phone.trim(),
                title: "Phone Required",
                message: "Please enter your phone number.",
            },
            {
                value: password.trim(),
                title: "Password Required",
                message: "Please enter a password.",
            },
            {
                value: address1.trim(),
                title: "Address Required",
                message: "Please enter your address.",
            },
        ];

        for (const validation of validations) {
            if (!validation.value) {
                showError(validation.title, validation.message);
                return;
            }
        }

        if (password.trim().length < 8) {
            showError(
                "Weak Password",
                "Password must contain at least 8 characters."
            );
            return;
        }

        try {
            setIsLoading(true);

            await register({
                name: name.trim(),
                gender,
                country,
                state,
                city,
                email: email.trim(),
                phone: phone.trim(),
                password,
                address1: address1.trim(),
                address2: address2.trim(),
            });

            await saveOTPContext({
                email: email.trim(),
                flow: "REGISTER"
            });

            showSuccess(
                "Registration Successful",
                "We've sent an OTP to your email."
            );

            openAuthSheet("verify-otp");
        } catch (error: unknown) {
            showError(
                "Registration Failed",
                "Unable to create your account."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Join the rhythm"
            title="Create your account"
            subtitle="A few details and your Thaalam experience is ready."
            backTo="login"
        >
            <AppTextInput
                label="Full name"
                placeholder="Your full name"
                autoComplete="name"
                value={name}
                onChangeText={setName}
            />

            <AppSelect
                label="Gender"
                placeholder="Select Gender"
                value={gender}
                items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                ]}
                onChange={setGender}
            />

            <AppSelect
                label="Country"
                placeholder="Select Country"
                value={country}
                searchable
                items={countries.map((item) => ({
                    label: item.name,
                    value: item.name,
                }))}
                onChange={handleCountry}
            />

            <AppSelect
                label="State"
                placeholder="Select State"
                value={state}
                searchable
                items={states.map((item) => ({
                    label: item.name,
                    value: item.name,
                }))}
                disabled={!country}
                onChange={handleState}
            />

            <AppSelect
                label="City"
                placeholder="Select City"
                value={city}
                searchable
                items={cities.map((item) => ({
                    label: item,
                    value: item,
                }))}
                disabled={!state}
                onChange={setCity}
            />

            <AppTextInput
                label="Email Address"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />

            <AppTextInput
                label="Phone Number"
                placeholder="+41 00 000 00 00"
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phone}
                onChangeText={setPhone}
            />

            <AppTextInput
                label="Password"
                placeholder="Create a password"
                secure
                autoComplete="new-password"
                value={password}
                onChangeText={setPassword}
            />

            <AppTextInput
                label="Address Line 1"
                placeholder="Address Line 1"
                value={address1}
                onChangeText={setAddress1}
            />

            <AppTextInput
                label="Address Line 2"
                placeholder="Address Line 2"
                value={address2}
                onChangeText={setAddress2}
            />

            <PrimaryButton
                title="Create Account"
                size="lg"
                loading={isLoading}
                onPress={handleRegister}
            />

            <View style={styles.footer}>
                <AppText color={COLORS.textSecondary}>
                    Already a member?
                </AppText>

                <TouchableOpacity
                    onPress={() => openAuthSheet("login")}
                >
                    <AppText weight="700">
                        Sign in
                    </AppText>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    footer: {
        marginTop: SPACING.xl,
        alignItems: "center",
        gap: SPACING.xs,
    },
});
