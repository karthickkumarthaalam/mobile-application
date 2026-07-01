import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";
import { login } from "../../api/auth.api";
import { useNotification } from "../../providers/NotificationProvider";

export default function Login() {
    const { openAuthSheet, login: saveSession, closeAuthSheet } = useAuth();
    const { showSuccess, showError } = useNotification();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim()) {
            showError(
                "Email Required",
                "Please enter your email address."
            );
            return;
        }

        if (!password.trim()) {
            showError(
                "Password Required",
                "Please enter your password."
            );
            return;
        }

        try {
            setIsLoading(true);

            const response = await login({
                username: email.trim(),
                password,
            });

            await saveSession(
                response.token,
                response.username,
                response.memberid
            );

            showSuccess(
                "Welcome Back",
                "You have signed in successfully."
            );
            closeAuthSheet();

        } catch (error: unknown) {
            // console.error(error);
            showError(
                "Login Failed",
                "Invalid email or password."
            );
        } finally {
            setIsLoading(false);
        }
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

            <PrimaryButton
                title="Sign in"
                size="lg"
                loading={isLoading}
                onPress={handleLogin}
            />

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
