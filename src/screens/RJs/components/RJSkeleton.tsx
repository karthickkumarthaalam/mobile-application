import { StyleSheet, View } from "react-native";
import SkeletonBlock from "../../Home/components/SkeletonBlock";
import { useThemedStyles } from "../../../providers/ThemeProvider";

export default function RJSkeleton() {
    const styles = useThemedStyles(createStyles);
    return (
        <View style={styles.card}>

            <SkeletonBlock
                width="100%"
                height={240}
                borderRadius={20}
            />

            <View style={styles.content} >
                <SkeletonBlock
                    width={90}
                    height={22}
                    borderRadius={12}
                />

                {/* Name */}
                <SkeletonBlock
                    width="60%"
                    height={26}
                    borderRadius={8}
                />

                {/* Description */}
                <SkeletonBlock
                    width="100%"
                    height={14}
                    borderRadius={8}
                />

                <SkeletonBlock
                    width="85%"
                    height={14}
                    borderRadius={8}
                />

                {/* Show Chips */}
                <View style={styles.chips}>
                    <View style={styles.chip}>
                        <SkeletonBlock
                            width="100%"
                            height={58}
                            borderRadius={14}
                        />
                    </View>

                    <View style={styles.chip}>
                        <SkeletonBlock
                            width="100%"
                            height={58}
                            borderRadius={14}
                        />
                    </View>
                </View>


            </View>

        </View>
    );
}

const createStyles = () => StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginTop: 20
    },

    content: {
        marginTop: 18,
        gap: 14
    },

    chips: {
        flexDirection: "row",
        gap: 12,
        marginTop: 6
    },

    chip: {
        flex: 1
    }
});
