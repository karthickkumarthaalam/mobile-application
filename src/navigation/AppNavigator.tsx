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
import EditProfileScreen from "../screens/Profile/EditProfileScreen";

const Stack = createNativeStackNavigator();
const navigationTheme: Theme = {
    ...DarkTheme,
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

export default function AppNavigator() {
    return (
        <NavigationContainer theme={navigationTheme}>
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
