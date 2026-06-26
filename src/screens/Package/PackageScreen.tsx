import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PackageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Package</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    text: { fontSize: 24, fontFamily: "InclusiveSans", fontWeight: "600" },
});
