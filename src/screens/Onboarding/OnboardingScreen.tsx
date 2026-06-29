import React, { useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewToken,
    useWindowDimensions,
} from "react-native";

import FirstOnboarding from "./FirstOnboarding";
import SecondOnboarding from "./SecondOnboarding";
import ThirdOnboarding from "./ThirdOnboarding";

import { useDevice } from "../../utils/device";
import PrimaryButton from "../../components/Button/PrimaryButton";
import AppText from "../../components/Text/AppText";
import { setOnboardingCompleted } from "../../utils/storage";
import { ArrowRight } from "lucide-react-native";
import { COLORS } from "../../constants/colors";

const pages = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
];

export default function OnboardingScreen({ navigation }: any) {
    const { width } = useWindowDimensions();
    const { isTablet } = useDevice();

    const [currentPage, setCurrentPage] = useState(0);

    const flatListRef = useRef<FlatList>(null);

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const onViewRef = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[]; }) => {
            if (viewableItems.length > 0) {
                setCurrentPage(viewableItems[0].index ?? 0);
            }
        }
    );

    const handleNext = async () => {
        if (currentPage < pages.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentPage + 1,
                animated: true,
            });
        } else {

            await setOnboardingCompleted();
            navigation.replace("Home");
        }
    };

    const handleSkip = async () => {
        flatListRef.current?.scrollToIndex({
            index: pages.length - 1,
            animated: true,
        });
        await setOnboardingCompleted();
        navigation.replace("Home");
    };

    return (
        <View style={styles.container}>
            {/* Skip */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSkip}
                style={[
                    styles.skip,
                    {
                        top: isTablet ? 70 : 60,
                        right: isTablet ? 36 : 24,
                        paddingHorizontal: isTablet ? 22 : 16,
                        paddingVertical: isTablet ? 10 : 8,
                    },
                ]}
            >
                <AppText
                    variant="body"
                    weight="600"
                    style={[
                        styles.skipText,
                        {
                            fontSize: isTablet ? 20 : 16,
                        },
                    ]}
                >
                    Skip
                </AppText>
            </TouchableOpacity>

            {/* Pages */}
            <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={pages}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewabilityConfig}
                renderItem={({ item }) => (
                    <View style={{ width }}>
                        {item.id === "1" && <FirstOnboarding />}
                        {item.id === "2" && <SecondOnboarding />}
                        {item.id === "3" && <ThirdOnboarding />}
                    </View>
                )}
            />

            {/* Button */}
            <View style={styles.bottomContainer}>
                <PrimaryButton
                    title={
                        currentPage === pages.length - 1
                            ? "Get Started"
                            : "Next"
                    }
                    size="lg"
                    onPress={handleNext}
                    rightIcon={
                        <ArrowRight
                            size={20}
                            color={COLORS.white}
                            strokeWidth={2.5}
                        />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    skip: {
        position: "absolute",
        zIndex: 999,

        borderRadius: 24,

        backgroundColor: "rgba(255,255,255,0.08)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },

    skipText: {
        color: COLORS.text,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 40,
        left: 24,
        right: 24,
    },
});
