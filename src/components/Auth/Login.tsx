import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";

export default function Login() {
    const { openAuthSheet } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({ email, password });
    };

    return (
        <AuthLayout
            eyebrow="Member access"
            title="Welcome back"
            subtitle="Sign in to keep your live radio, podcasts and events together."
        >
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
                label="Password"
                placeholder="Enter your password"
                secure
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.forgot}
                onPress={() => openAuthSheet("forgot-password")}
            >
                <AppText
                    variant="caption"
                    color={COLORS.primaryBright}
                    weight="600"
                >
                    Forgot password?
                </AppText>
            </TouchableOpacity>

            <PrimaryButton title="Sign in" size="lg" onPress={handleLogin} />

            <View style={styles.footer}>
                <AppText color={COLORS.textSecondary}>New to Thaalam?</AppText>
                <TouchableOpacity onPress={() => openAuthSheet("register")}>
                    <AppText weight="700">Create account</AppText>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    forgot: {
        alignSelf: "flex-end",
        marginTop: -SPACING.sm,
        marginBottom: SPACING.xl,
    },
    footer: {
        marginTop: SPACING.xl,
        alignItems: "center",
        gap: SPACING.xs,
    },
});
