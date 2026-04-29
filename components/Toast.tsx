import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";

export function Toast() {
  const { toast } = useApp();
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: toast ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [toast, opacity]);

  if (!toast) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        { bottom: insets.bottom + 100, opacity },
      ]}
    >
      <Text style={styles.text}>{toast}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "rgba(14,14,14,0.92)",
    borderRadius: 999,
    maxWidth: "80%",
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    textAlign: "center",
  },
});
