import React, { useEffect, useState } from "react";

import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import { useAuth } from "../../providers/AuthProvider";
import AuthLayout from "./AuthLayout";
import { useNotification } from "../../providers/NotificationProvider";
import { resetPassword } from "../../api/auth.api";
import {
    clearOTPContext,
    getOTPContext,
} from "../../utils/storage";

export default function ResetPassword() {
    const { openAuthSheet } = useAuth();

    const { showError, showSuccess } = useNotification();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadOTPContext = async () => {
            const context = await getOTPContext();

            if (context) {
                setEmail(context.email);
            }
        };

        loadOTPContext();
    }, []);

    const handleResetPassword = async () => {
        if (!password.trim()) {
            showError(
                "Password Required",
                "Please enter your new password."
            );
            return;
        }

        if (!confirmation.trim()) {
            showError(
                "Confirmation Required",
                "Please confirm your password."
            );
            return;
        }

        if (password !== confirmation) {
            showError(
                "Passwords Don't Match",
                "New password and confirmation password must match."
            );
            return;
        }

        if (!email) {
            showError(
                "Reset Failed",
                "Unable to identify your account."
            );
            return;
        }

        try {
            setLoading(true);

            await resetPassword({
                email,
                newPassword: password.trim(),
                confirmPassword: confirmation.trim(),
            });

            await clearOTPContext();

            showSuccess(
                "Password Updated",
                "Your password has been updated successfully."
            );

            openAuthSheet("login");
        } catch (error) {
            showError(
                "Reset Failed",
                "Unable to update your password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Secure your account"
            title="Choose a new password"
            subtitle="Use at least 8 characters and avoid a password you've used before."
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
                title="Update Password"
                size="lg"
                loading={loading}
                onPress={handleResetPassword}
            />
        </AuthLayout>
    );
}