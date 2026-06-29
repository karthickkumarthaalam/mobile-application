import React, { useState } from "react";

import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import { useAuth } from "../../providers/AuthProvider";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
    const { openAuthSheet } = useAuth();
    const [email, setEmail] = useState("");

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
                onPress={() => openAuthSheet("verify-otp")}
            />
        </AuthLayout>
    );
}
