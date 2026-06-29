import React from "react";
import { CalendarDays } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";

export default function PackageScreen() {
    return (
        <FeatureScreen
            icon={CalendarDays}
            eyebrow="Live together"
            title="Events"
            description="Concerts, community gatherings and ticket access will live here."
        />
    );
}
