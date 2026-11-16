import React from "react";
import { Mic } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";

export default function RJsFeatureScreen() {
    return (
        <FeatureScreen
            icon={Mic}
            eyebrow="Thaalam voices"
            title="RJs"
            description="Our RJ profiles will be back soon. Stay tuned for more from the voices behind Thaalam Radio."
        />
    );
}
