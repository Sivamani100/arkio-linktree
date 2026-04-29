import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";

export function SectionCard({
  children,
  style,
  padding = 16,
  background,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  background?: string;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: background ?? colors.card,
          padding,
          borderRadius: colors.radius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
});
