import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function LinktreeLogo({
  size = 24,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: size, color }]}>arkio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
});
