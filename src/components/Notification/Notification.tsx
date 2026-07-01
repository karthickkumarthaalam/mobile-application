import { CheckCircle2, CircleAlert, CircleX, Info } from "lucide-react-native";
import { Notification as NotificationType } from "../../providers/NotificationProvider";
import { COLORS } from "../../constants/colors";
import { StyleSheet, View } from "react-native";
import { RADIUS, SPACING } from "../../constants/spacing";
import AppText from "../Text/AppText";


interface Props {
    notification: NotificationType;
}

export default function Notification({ notification }: Props) {

    const getConfig = () => {
        switch (notification.type) {
            case "success":
                return {
                    icon: CheckCircle2,
                    color: COLORS.success
                };

            case "error":
                return {
                    icon: CircleX,
                    color: COLORS.error
                };

            case "warning":
                return {
                    icon: CircleAlert,
                    color: COLORS.warning
                };

            case "info":
            default:
                return {
                    icon: Info,
                    color: COLORS.primary,
                };
        }
    };

    const { icon: Icon, color } = getConfig();

    return (
        <View style={styles.container}>

            <View
                style={[
                    styles.indicator,
                    { backgroundColor: color }
                ]}
            />

            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: `${color}15`
                    }
                ]}
            >
                <Icon
                    size={22}
                    color={color}
                    strokeWidth={2}
                />
            </View>

            <View style={styles.content}>
                <AppText
                    variant="body"
                    weight="700"
                >
                    {notification.title}
                </AppText>

                {!!notification.message && (
                    <AppText
                        variant="caption"
                        color={COLORS.textSecondary}
                        style={styles.message}
                    >
                        {notification.message}
                    </AppText>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: RADIUS.xl,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        minHeight: 72
    },

    indicator: {
        width: 4,
        alignSelf: "stretch"
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: SPACING.md
    },

    content: {
        flex: 1,
        paddingVertical: SPACING.md,
        paddingRight: SPACING.lg
    },
    message: {
        marginTop: 2,
        lineHeight: 20
    }
});