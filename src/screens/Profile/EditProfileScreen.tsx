import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import ScreenHeader from "../../components/Layout/ScreenHeader";
import ProfileCard from "./components/ProfileCard";

import AppTextInput from "../../components/Input/AppTextInput";
import AppSelect from "../../components/Input/AppSelect";
import PrimaryButton from "../../components/Button/PrimaryButton";

import { useAuth } from "../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

import countries from "../../assets/json/countries.json";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import AppText from "../../components/Text/AppText";
import { useNotification } from "../../providers/NotificationProvider";
import { updateProfile } from "../../api/auth.api";
import { useThemedStyles } from "../../providers/ThemeProvider";

export default function EditProfileScreen() {
    const styles = useThemedStyles(createStyles);
    const { session, updateMember } = useAuth();

    const member = session.member;

    const { showError, showSuccess } = useNotification();

    const [name, setName] = useState(member?.name ?? "");
    const [gender, setGender] = useState(member?.gender ?? "");

    const [country, setCountry] = useState(member?.country ?? "");
    const [state, setState] = useState(member?.state ?? "");
    const [city, setCity] = useState(member?.city ?? "");

    const [phone, setPhone] = useState(member?.phone ?? "");

    const [address1, setAddress1] = useState(member?.address1 ?? "");
    const [address2, setAddress2] = useState(member?.address2 ?? "");

    const [zipCode, setZipCode] = useState(member?.zip_code ?? "");

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const selectedCountry = useMemo(
        () =>
            countries.find(
                item => item.name === country
            ),
        [country]
    );

    const states = useMemo(
        () => selectedCountry?.states ?? [],
        [selectedCountry]
    );

    const selectedState = useMemo(
        () =>
            states.find(
                item => item.name === state
            ),
        [states, state]
    );

    const cities = useMemo(
        () => selectedState?.cities ?? [],
        [selectedState]
    );

    const handleCountry = (value: string) => {
        setCountry(value);
        setState("");
        setCity("");
    };

    const handleState = (value: string) => {
        setState(value);
        setCity("");
    };

    const handleSave = async () => {
        // API Integration
        const validations = [
            {
                value: name.trim(),
                title: "Name Required",
                message: "Please enter your full name.",
            },
            {
                value: gender.trim(),
                title: "Gender Required",
                message: "Please select your gender.",
            },
            {
                value: country.trim(),
                title: "Country Required",
                message: "Please select your country.",
            },
            {
                value: state.trim(),
                title: "State Required",
                message: "Please select your state.",
            },
            {
                value: city.trim(),
                title: "City Required",
                message: "Please select your city.",
            },
            {
                value: phone.trim(),
                title: "Phone Required",
                message: "Please enter your phone number.",
            },
            {
                value: address1.trim(),
                title: "Address Required",
                message: "Please enter your address.",
            },
        ];

        for (const validation of validations) {
            if (!validation.value) {
                showError(validation.title, validation.message);
                return;
            }
        }

        try {
            setLoading(true);

            const response = await updateProfile(
                member!.memberId,
                {
                    name: name.trim(),
                    gender,
                    country,
                    state,
                    city,
                    phone: phone.trim(),
                    address1: address1.trim(),
                    address2: address2.trim(),
                    zip_code: zipCode.trim(),
                },
            );

            // update auth context
            await updateMember(response.member);

            showSuccess(
                "Profile Updated",
                "Your profile has been updated successfully."
            );

            navigation.goBack();

        } catch (error) {
            showError(
                "Update Failed",
                "Unable to update your profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <ScreenHeader
                title="Edit Profile"
                subtitle="Keep your profile information up to date."
            />

            <ProfileCard
                title="Personal Information"
                subtitle="Basic information about you."
                delay={100}
            >
                <AppTextInput
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                />

                <AppSelect
                    label="Gender"
                    value={gender}
                    placeholder="Select Gender"
                    items={[
                        {
                            label: "Male",
                            value: "Male",
                        },
                        {
                            label: "Female",
                            value: "Female",
                        },
                        {
                            label: "Other",
                            value: "Other",
                        },
                    ]}
                    onChange={setGender}
                />

                <AppTextInput
                    label="Phone Number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </ProfileCard>

            <ProfileCard
                title="Location"
                subtitle="Where you're located."
                delay={200}
            >
                <AppSelect
                    label="Country"
                    value={country}
                    searchable
                    placeholder="Select Country"
                    items={countries.map(item => ({
                        label: item.name,
                        value: item.name,
                    }))}
                    onChange={handleCountry}
                />

                <AppSelect
                    label="State"
                    value={state}
                    searchable
                    placeholder="Select State"
                    disabled={!country}
                    items={states.map(item => ({
                        label: item.name,
                        value: item.name,
                    }))}
                    onChange={handleState}
                />

                <AppSelect
                    label="City"
                    value={city}
                    searchable
                    placeholder="Select City"
                    disabled={!state}
                    items={cities.map(item => ({
                        label: item,
                        value: item,
                    }))}
                    onChange={setCity}
                />

                <AppTextInput
                    label="Address Line 1"
                    value={address1}
                    onChangeText={setAddress1}
                />

                <AppTextInput
                    label="Address Line 2"
                    value={address2}
                    onChangeText={setAddress2}
                />

                <AppTextInput
                    label="Zip Code"
                    value={zipCode}
                    onChangeText={setZipCode}
                />
            </ProfileCard>

            <View style={styles.footer}>
                <PrimaryButton
                    title="Save Changes"
                    size="lg"
                    loading={loading}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingBottom: SPACING.xxxl,
    },

    footer: {
        marginTop: SPACING.xxl,
        paddingHorizontal: SPACING.xl,
    },


    button: {
        marginHorizontal: SPACING.xl,
        marginTop: SPACING.lg,
    },
});
