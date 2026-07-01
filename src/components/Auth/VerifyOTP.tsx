import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";
import { clearOTPContext, getOTPContext, OTPFlow } from "../../utils/storage";
import { useNotification } from "../../providers/NotificationProvider";
import { resentOTP, verifyOTP } from "../../api/auth.api";

export default function VerifyOTP() {
    const { openAuthSheet } = useAuth();

    const { showSuccess, showError } = useNotification();

    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [flow, setFlow] = useState<OTPFlow | null>(null);

    useEffect(() => {
        const loadEmail = async () => {
            const context = await getOTPContext();

            if (context) {
                setEmail(context.email);
                setFlow(context.flow);
            }
        };

        loadEmail();
    }, []);

    const handleResendOTP = async () => {
        if (!email) {
            showError(
                "Resend Failed",
                "Unable to find your email address."
            );
            return;
        }

        try {
            await resentOTP({
                email,
            });

            showSuccess(
                "OTP Sent",
                "A new verification code has been sent to your email."
            );
        } catch (error) {
            showError(
                "Resend Failed",
                "Unable to send a new verification code."
            );
        }
    };

    const handleVerify = async () => {
        if (!code.trim()) {
            showError(
                "OTP Required",
                "Please enter the verification code."
            );
            return;
        }

        if (code.trim().length !== 6) {
            showError(
                "Invalid OTP",
                "Verification code must contain 6 digits."
            );
            return;
        }

        if (!email) {
            showError(
                "Verification Failed",
                "Unable to find your email address."
            );
            return;
        }

        try {
            setLoading(true);

            await verifyOTP({
                email,
                otp: code.trim(),
            });

            showSuccess(
                "Verification Successful",
                "Your account has been verified successfully."
            );

            if (flow === "REGISTER") {
                await clearOTPContext();
                openAuthSheet("login");
            } else if (flow === "RESET_PASSWORD") {
                openAuthSheet("reset-password");
            }
        } catch (error) {
            showError(
                "Verification Failed",
                "Please enter the correct verification code."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Verify identity"
            title="Check your inbox"
            subtitle="Enter the 6-digit verification code we sent to your email."
            backTo={
                flow === "REGISTER"
                    ? "login"
                    : "forgot-password"
            }
        >
            <AppTextInput
                label="Verification code"
                placeholder="000000"
                keyboardType="number-pad"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChangeText={setCode}
                style={styles.code}
            />

            <PrimaryButton
                title="Verify Code"
                size="lg"
                loading={loading}
                onPress={handleVerify}
            />

            <TouchableOpacity
                style={styles.resend}
                onPress={handleResendOTP}
            >
                <AppText
                    variant="caption"
                    weight="600"
                    color={COLORS.primaryBright}
                >
                    Didn't receive it? Send again
                </AppText>
            </TouchableOpacity>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    code: {
        fontSize: 22,
        letterSpacing: 8,
    },
    resend: {
        alignSelf: "center",
        marginTop: SPACING.xl,
    },
});
