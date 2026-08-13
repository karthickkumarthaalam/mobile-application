import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "./CustomTabBar";

import HomeScreen from "../screens/Home/HomeScreen";
import NewsScreen from "../screens/News/NewsScreen";
import PodcastScreen from "../screens/Podcast/PodcastScreen";
import PackageScreen from "../screens/Package/PackageScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { COLORS } from "../constants/colors";
import RJsScreen from "../screens/RJs/RJsScreen";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
                animation: "shift",
                sceneStyle: {
                    backgroundColor: COLORS.background,
                },
                tabBarStyle: {
                    backgroundColor: "transparent",
                },
            }}
        >

            <Tab.Screen
                name="Podcast"
                component={PodcastScreen}
            />
            <Tab.Screen
                name="Rjs"
                component={RJsScreen}
            />
            <Tab.Screen
                name="Main"
                component={HomeScreen}
            />
            {/* <Tab.Screen
                name="Package"
                component={PackageScreen}
            /> */}
            <Tab.Screen
                name="News"
                component={NewsScreen}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}