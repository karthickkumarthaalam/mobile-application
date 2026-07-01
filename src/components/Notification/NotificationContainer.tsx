import { useEffect, useRef } from "react";
import { useNotification } from "../../providers/NotificationProvider";
import { Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SPACING } from "../../constants/spacing";
import Notification from "./Notification";

export default function NotificationContainer() {
    const { notification } = useNotification();

    const translateY = useRef(new Animated.Value(-120)).current;
    const opacity = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if (notification) {
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 6
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -120,
                    duration: 180,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [notification]);

    if (!notification) {
        return null;
    }


    return (
        <SafeAreaView
            pointerEvents="box-none"
            style={styles.safeArea}
        >
            <Animated.View
                pointerEvents="box-none"
                style={[
                    styles.container,
                    {
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                <Notification notification={notification} />
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999,
    },

    container: {
        marginHorizontal: SPACING.lg,
        marginTop: SPACING.sm
    }
});