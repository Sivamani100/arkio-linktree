import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { 
  useSharedValue, 
  withTiming, 
  Easing,
  useAnimatedStyle,
  interpolateColor
} from "react-native-reanimated";
import { AsteriskLogo } from "./AsteriskLogo";

import colors from "@/constants/colors";

const { width, height } = Dimensions.get("window");

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const progress = useSharedValue(0); // 0: Green stage, 1: White stage
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Initial logo pop-in (Green stage)
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.back(1.5)) 
    });

    // 2. Transition to White stage after 1.8s
    setTimeout(() => {
      progress.value = withTiming(1, { duration: 600 });
    }, 1800);

    // 3. Finish after White stage (another 1.2s)
    setTimeout(() => {
      onFinish();
    }, 3000);
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.brand.green, colors.brand.white]
    );
    return { backgroundColor };
  });

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={logoStyle}>
        <AsteriskLogo size={120} color={colors.brand.black} />
      </Animated.View>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
