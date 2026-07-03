import React, { useState } from "react";
import { Linking, ScrollView, StyleSheet, Alert } from "react-native";
import {
    CircleUserRound,
    FileText,
    Info,
    Mail,
    ShieldCheck,
    Share2,
    Star,
    LogOut
} from "lucide-react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";

import ProfileHeader from "./components/ProfileHeader";
import ProfileMenuItem from "./components/ProfileMenuItem";
import ProfileSection from "./components/ProfileSection";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useNotification } from "../../providers/NotificationProvider";
import ConfirmationSheet from "../../components/Confirmation/ConfirmationSheet";

export default function ProfileScreen() {

    const [logoutVisible, setLogoutVisible] = useState(false);

    const {
        isAuthenticated,
        session,
        openAuthSheet,
        logout
    } = useAuth();

    const { showSuccess } = useNotification();
    const navigation = useNavigation<any>();


    const openWebsite = (url: string) => {
        Linking.openURL(url);
    };

    const confirmLogout = async () => {
        await logout();
        showSuccess(
            "Logged Out",
            "You've been signed out successfully."
        );
        setLogoutVisible(false);
    };


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <ProfileHeader
                isLoggedIn={isAuthenticated}
                name={session?.member?.name}
                email={session?.member?.email}
                onLogin={() => openAuthSheet("login")}
            />

            {isAuthenticated && (
                <ProfileSection title="Account">
                    <ProfileMenuItem
                        icon={CircleUserRound}
                        title="Edit Profile"
                        onPress={() =>
                            navigation.navigate("EditProfile")
                        }
                    />

                    <ProfileMenuItem
                        icon={LogOut}
                        title="Logout"
                        destructive
                        onPress={() => setLogoutVisible(true)}
                    />
                </ProfileSection>
            )}


            <ProfileSection title="Support">
                <ProfileMenuItem
                    icon={Info}
                    title="About Us"
                    onPress={() =>
                        openWebsite("https://thaalam.ch/about-us")
                    }
                />

                <ProfileMenuItem
                    icon={Mail}
                    title="Contact Us"
                    onPress={() =>
                        openWebsite("https://thaalam.ch/contact-us")
                    }
                />
            </ProfileSection>

            <ProfileSection title="Legal">
                <ProfileMenuItem
                    icon={ShieldCheck}
                    title="Privacy Policy"
                    onPress={() =>
                        openWebsite("https://thaalam.ch/privacy-policy")
                    }
                />

                <ProfileMenuItem
                    icon={FileText}
                    title="Terms & Conditions"
                    onPress={() =>
                        openWebsite("https://thaalam.ch/terms-conditions")
                    }
                />

            </ProfileSection>

            <ProfileSection title="App">

                <ProfileMenuItem
                    icon={Info}
                    title="Version"
                    value={Constants.expoConfig?.version ?? "1.0.0"}
                />
            </ProfileSection>
            <ConfirmationSheet
                visible={logoutVisible}
                title="Logout"
                description="Are you sure you want to sign out of your account?"
                confirmText="Logout"
                cancelText="Cancel"
                destructive
                onCancel={() => setLogoutVisible(false)}
                onConfirm={confirmLogout}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingVertical: SPACING.xl,
        paddingBottom: SPACING.xxxl,
    },
});