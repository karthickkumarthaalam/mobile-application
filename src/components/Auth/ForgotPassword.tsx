import React, { useState } from "react";

import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import { useAuth } from "../../providers/AuthProvider";
import AuthLayout from "./AuthLayout";
import { useNotification } from "../../providers/NotificationProvider";
import { forgotPassword } from "../../api/auth.api";
import { saveOTPContext } from "../../utils/storage";

export default function ForgotPassword() {
    const { openAuthSheet } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { showSuccess, showError } = useNotification();

    const handleForgot = async () => {
        if (!email.trim()) {
            showError(
                "Email Required",
                "Please enter your email address."
            );
            return;
        }

        try {
            setLoading(true);

            await forgotPassword({
                email: email.trim(),
            });

            await saveOTPContext({
                email: email.trim(),
                flow: "RESET_PASSWORD",
            });

            showSuccess(
                "Verification Code Sent",
                "We've sent a verification code to your email address."
            );

            openAuthSheet("verify-otp");
        } catch (error) {
            showError(
                "Reset Failed",
                "Please enter the correct email address."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Account recovery"
            title="Reset your password"
            subtitle="Enter your account email and we’ll send you a verification code."
            backTo="login"
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
            <PrimaryButton
                title="Send verification code"
                size="lg"
                loading={loading}
                onPress={handleForgot}
            />
        </AuthLayout>
    );
}
