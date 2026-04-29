import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "iconsax-react-nativejs";
import React from "react";
import { StyleSheet, View } from "react-native";

import { getAvatar } from "@/utils/avatars";

const AVATAR_MASK = require("@/assets/images/avatar-mask.png");

export function Avatar({
  id,
  size = 56,
  ringColor,
  selected = false,
}: {
  id: string;
  size?: number;
  ringColor?: string;
  selected?: boolean;
}) {
  const preset = getAvatar(id);
  const ringWidth = selected ? 2 : 0;
  const ringSize = size + ringWidth * 4;

  const inner = (() => {
    if (id === "mask-blue") {
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#1D4ED8",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={AVATAR_MASK}
            style={{ width: size * 0.95, height: size * 0.95 }}
            contentFit="contain"
          />
        </View>
      );
    }

    if (id === "default") {
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#E5E5E5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={size * 0.55} color="#9CA3AF" variant="Linear" />
        </View>
      );
    }

    return (
      <LinearGradient
        colors={preset.colors}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  })();

  return (
    <View
      style={[
        styles.container,
        {
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: ringWidth,
          borderColor: ringColor ?? "#0E0E0E",
        },
      ]}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
