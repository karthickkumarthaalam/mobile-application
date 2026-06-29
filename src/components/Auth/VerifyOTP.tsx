import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useAuth } from "../../providers/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AppTextInput from "../Input/AppTextInput";
import AppText from "../Text/AppText";
import AuthLayout from "./AuthLayout";

export default function VerifyOTP() {
    const { openAuthSheet } = useAuth();
    const [code, setCode] = useState("");

    return (
        <AuthLayout
            eyebrow="Verify identity"
            title="Check your inbox"
            subtitle="Enter the 6-digit verification code we sent to your email."
            backTo="forgot-password"
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
                title="Verify code"
                size="lg"
                onPress={() => openAuthSheet("reset-password")}
            />
            <TouchableOpacity style={styles.resend}>
                <AppText
                    variant="caption"
                    weight="600"
                    color={COLORS.textSecondary}
                >
                    Didn’t receive it? Send again
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
