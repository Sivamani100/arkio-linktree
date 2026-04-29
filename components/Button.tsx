import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useColors } from "@/hooks/useColors";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  icon,
  fullWidth = true,
  style,
  textStyle,
  size = "md",
}: {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "sm" | "md" | "lg";
}) {
  const colors = useColors();

  const palette: Record<Variant, { bg: string; fg: string; border?: string }> = {
    primary: { bg: colors.primary, fg: colors.primaryForeground },
    secondary: { bg: colors.secondary, fg: colors.secondaryForeground },
    outline: {
      bg: "transparent",
      fg: colors.foreground,
      border: colors.border,
    },
    ghost: { bg: "transparent", fg: colors.foreground },
    dark: { bg: colors.foreground, fg: colors.background },
  };

  const sizes = {
    sm: { paddingVertical: 10, fontSize: 14, radius: 0 },
    md: { paddingVertical: 14, fontSize: 15, radius: 0 },
    lg: { paddingVertical: 16, fontSize: 16, radius: 0 },
  } as const;

  const p = palette[variant];
  const s = sizes[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: p.bg,
          borderColor: p.border ?? "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
          paddingVertical: s.paddingVertical,
          borderRadius: s.radius,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          alignSelf: fullWidth ? "stretch" : "auto",
          paddingHorizontal: fullWidth ? 20 : 22,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator color={p.fg} />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles.text,
                { color: p.fg, fontSize: s.fontSize },
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
  },
});
