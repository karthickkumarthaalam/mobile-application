import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from "react-native";
import { ArrowRight } from "lucide-react-native";

import { useDevice } from "../../../../utils/device";

interface Props {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;

    backgroundColor?: string;
    textColor?: string;
    showArrow?: boolean;
    arrowColor?: string;
}

const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    backgroundColor = "#E41E26",
    textColor = "#FFFFFF",
    showArrow = true,
    arrowColor = "#FFFFFF"
}: Props) => {
    const { isTablet } = useDevice();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            disabled={disabled || loading}
            onPress={onPress}
            style={[
                styles.button,
                {
                    backgroundColor,
                    height: isTablet ? 68 : 60,
                },
                disabled && styles.disabled,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={styles.content}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: textColor,
                                fontSize: isTablet ? 20 : 17,
                            },
                        ]}
                    >
                        {title}
                    </Text>

                    {showArrow && (

                        <ArrowRight
                            size={20}
                            color={arrowColor}
                            strokeWidth={2.5}
                        />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 30,
        justifyContent: "center",
        paddingHorizontal: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.18,
        shadowRadius: 20,
        elevation: 8,
    },

    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontFamily: "InclusiveSans",
        fontWeight: "700",
        letterSpacing: 0.4,
    },

    icon: {
        marginLeft: 12,
    },

    disabled: {
        opacity: 0.45,
    },
});