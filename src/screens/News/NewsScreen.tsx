import React from "react";
import { Newspaper } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";

export default function NewsScreen() {
    return (
        <FeatureScreen
            icon={Newspaper}
            eyebrow="Thaalam updates"
            title="News"
            description="Fresh stories from the Tamil community will appear here."
        />
    );
}
