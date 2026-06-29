import React, { useState } from "react";

import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import { useAuth } from "../../providers/AuthProvider";
import AuthLayout from "./AuthLayout";

export default function ResetPassword() {
    const { openAuthSheet } = useAuth();
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    return (
        <AuthLayout
            eyebrow="Secure your account"
            title="Choose a new password"
            subtitle="Use at least 8 characters and avoid a password you’ve used before."
            backTo="verify-otp"
        >
            <AppTextInput
                label="New password"
                placeholder="Enter a new password"
                secure
                autoComplete="new-password"
                value={password}
                onChangeText={setPassword}
            />
            <AppTextInput
                label="Confirm password"
                placeholder="Enter it once more"
                secure
                autoComplete="new-password"
                value={confirmation}
                onChangeText={setConfirmation}
            />
            <PrimaryButton
                title="Update password"
                size="lg"
                onPress={() => openAuthSheet("login")}
            />
        </AuthLayout>
    );
}
