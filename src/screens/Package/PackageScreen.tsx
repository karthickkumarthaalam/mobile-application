import React from "react";
import { Package } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";

export default function PackageScreen() {
    return (
        <FeatureScreen
            icon={Package}
            eyebrow="Membership"
            title="Packages"
            description="Explore Thaalam membership plans and enjoy exclusive benefits, premium content, and special member privileges."
        />
    );
}