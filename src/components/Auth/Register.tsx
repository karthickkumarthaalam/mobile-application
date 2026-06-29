import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";

export default function Register() {
    const { openAuthSheet } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    return (
        <AuthLayout
            eyebrow="Join the rhythm"
            title="Create your account"
            subtitle="A few details and your Thaalam experience is ready."
            backTo="login"
        >
            <AppTextInput
                label="Full name"
                placeholder="Your name"
                autoComplete="name"
                value={name}
                onChangeText={setName}
            />
            <AppTextInput
                label="Email address"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />
            <AppTextInput
                label="Phone number"
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
            <PrimaryButton title="Create account" size="lg" />

            <View style={styles.footer}>
                <AppText color={COLORS.textSecondary}>
                    Already a member?
                </AppText>
                <TouchableOpacity onPress={() => openAuthSheet("login")}>
                    <AppText weight="700">Sign in</AppText>
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
