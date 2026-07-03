import React, { useEffect, useRef } from "react";
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { TriangleAlert } from "lucide-react-native";

import PrimaryButton from "../Button/PrimaryButton";
import AppText from "../Text/AppText";

import { COLORS } from "../../constants/colors";
import { RADIUS, SPACING } from "../../constants/spacing";

interface ConfirmationSheetProps {
    visible: boolean;
    title: string;
    description: string;

    confirmText?: string;
    cancelText?: string;

    destructive?: boolean;
    loading?: boolean;

    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationSheet({
    visible,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    destructive = false,
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmationSheetProps) {

    const translateY = useRef(
        new Animated.Value(350)
    ).current;

    const opacity = useRef(
        new Animated.Value(0)
    ).current;

    useEffect(() => {

        if (visible) {

            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }),

                Animated.spring(translateY, {
                    toValue: 0,
                    friction: 9,
                    tension: 90,
                    useNativeDriver: true,
                }),
            ]).start();

        } else {

            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),

                Animated.timing(translateY, {
                    toValue: 350,
                    duration: 220,
                    useNativeDriver: true,
                }),
            ]).start();

        }

    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onCancel}
        >
            <View style={styles.root}>

                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            opacity,
                        },
                    ]}
                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={onCancel}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.sheet,
                        {
                            transform: [
                                {
                                    translateY,
                                },
                            ],
                        },
                    ]}
                >

                    <View
                        style={styles.handle}
                    />

                    <View
                        style={[
                            styles.iconContainer,
                            destructive &&
                            styles.iconDanger,
                        ]}
                    >
                        <TriangleAlert
                            size={30}
                            color={
                                destructive
                                    ? COLORS.error
                                    : COLORS.primaryBright
                            }
                        />
                    </View>

                    <AppText
                        variant="heading"
                        weight="700"
                        align="center"
                    >
                        {title}
                    </AppText>

                    <AppText
                        align="center"
                        color={COLORS.textSecondary}
                        style={styles.description}
                    >
                        {description}
                    </AppText>

                    <PrimaryButton
                        title={confirmText}
                        loading={loading}
                        onPress={onConfirm}
                        style={[
                            styles.button,
                            destructive && {
                                backgroundColor:
                                    COLORS.error,
                            },
                        ]}
                    />

                    <PrimaryButton
                        title={cancelText}
                        variant="outline"
                        onPress={onCancel}
                    />

                </Animated.View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        justifyContent: "flex-end",
    },

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    sheet: {

        backgroundColor: COLORS.surface,

        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,

        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xxxl,
    },

    handle: {

        width: 52,
        height: 5,

        borderRadius: 3,

        alignSelf: "center",

        marginBottom: SPACING.xl,

        backgroundColor: COLORS.glassBorder,
    },

    iconContainer: {

        width: 74,
        height: 74,

        borderRadius: 37,

        alignSelf: "center",

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: COLORS.primarySoft,

        marginBottom: SPACING.lg,
    },

    iconDanger: {
        backgroundColor: "#FEECEC",
    },

    description: {
        marginTop: SPACING.sm,
        marginBottom: SPACING.xxl,
        lineHeight: 22,
    },

    button: {
        marginBottom: SPACING.md,
    },

});