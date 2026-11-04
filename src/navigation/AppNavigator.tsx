import React from "react";
import {
    DarkTheme,
    NavigationContainer,
    Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import TabNavigator from "./TabNavigator";
import OfflineScreen from "../screens/Offline/OfflineScreen";
import { COLORS } from "../constants/colors";
import { useTheme } from "../providers/ThemeProvider";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import DonationScreen from "../screens/Donation/DonationScreen";
import DonationSuccessScreen from "../screens/Donation/DonationSuccessScreen";
import DonationFailureScreen from "../screens/Donation/DonationFailureScreen";
import PodcastDetailsScreen from "../screens/Podcast/PodcastDetailsScreen";
import AboutScreen from "../screens/About/AboutScreen";
import PrivacyPolicyScreen from "../screens/Privacy/PrivacyPolicyScreen";
import TermsScreen from "../screens/Terms/TermsScreen";
import ContactScreen from "../screens/Contact/ContactScreen";

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ["thaalam://"],
    config: {
        screens: {
            DonationSuccess: "donation/success",
            DonationFailure: "donation/failure",
        },
    },
};

export default function AppNavigator() {
    const { isDark } = useTheme();
    const navigationTheme: Theme = {
        ...DarkTheme,
        dark: isDark,
        colors: {
            ...DarkTheme.colors,
            primary: COLORS.primary,
            background: COLORS.background,
            card: COLORS.backgroundSecondary,
            text: COLORS.text,
            border: COLORS.glassBorder,
            notification: COLORS.primary,
        },
    };

    return (
        <NavigationContainer theme={navigationTheme} linking={linking}>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: COLORS.background,
                    },
                    animation: "fade",
                }}
            >
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="Offline"
                    component={OfflineScreen}
                />

                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                />

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />

                <Stack.Screen
                    name="Donation"
                    component={DonationScreen}
                />

                <Stack.Screen
                    name="DonationSuccess"
                    component={DonationSuccessScreen}
                />

                <Stack.Screen
                    name="DonationFailure"
                    component={DonationFailureScreen}
                />

                <Stack.Screen
                    name="PodcastDetails"
                    component={PodcastDetailsScreen}
                />

                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                />

                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                />

                <Stack.Screen
                    name="Terms"
                    component={TermsScreen}
                />

                <Stack.Screen
                    name="Contact"
                    component={ContactScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
