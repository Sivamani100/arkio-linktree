import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AsteriskLogo } from "./AsteriskLogo";

import colors from "@/constants/colors";

export function LinktreeLogo({
  size = 24,
  color = colors.brand.black,
  showText = true,
}: {
  size?: number;
  color?: string;
  showText?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: size, color }]}>Linktree</Text>
      <AsteriskLogo size={size * 1.2} color={colors.brand.green} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
  },
});

