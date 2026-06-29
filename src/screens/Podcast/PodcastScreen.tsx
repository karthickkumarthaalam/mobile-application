import React from "react";
import { Radio } from "lucide-react-native";

import FeatureScreen from "../../components/Layout/FeatureScreen";

export default function PodcastScreen() {
    return (
        <FeatureScreen
            icon={Radio}
            eyebrow="Listen on demand"
            title="Podcasts"
            description="Interviews, conversations and favourite shows—ready whenever you are."
        />
    );
}
