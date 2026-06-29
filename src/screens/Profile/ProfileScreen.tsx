import React from "react";
import { CircleUserRound, LogIn } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { useAuth } from "../../providers/AuthProvider";

export default function ProfileScreen() {
    const { openAuthSheet } = useAuth();

    return (
        <FeatureScreen
            icon={CircleUserRound}
            eyebrow="Your space"
            title="Profile"
            description="Sign in to keep your preferences, bookings and listening experience in sync."
        >
            <PrimaryButton
                title="Sign in"
                size="md"
                onPress={() => openAuthSheet("login")}
                leftIcon={<LogIn size={18} color="#FFFFFF" />}
                style={{ marginTop: 28, maxWidth: 280 }}
            />
        </FeatureScreen>
    );
}
