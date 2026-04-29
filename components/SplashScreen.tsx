import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  withDelay, 
  Easing,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const progress = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // 1. Draw the logo lines
    progress.value = withTiming(1, { 
      duration: 1200, 
      easing: Easing.bezier(0.4, 0, 0.2, 1) 
    });

    // 2. Fade in the text
    textOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));

    // 3. Final animation and finish
    setTimeout(() => {
      scale.value = withTiming(1.1, { duration: 600 });
      textOpacity.value = withTiming(0, { duration: 400 });
      progress.value = withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          onFinish();
        }
      });
    }, 2500);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [400, 0]),
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: interpolate(textOpacity.value, [0, 1], [15, 0]) }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Svg width={140} height={140} viewBox="0 0 140 140">
          {/* Geometric Sharp 'a' Logo - Vector Lines with No Rounded Corners */}
          <AnimatedPath
            // A sharp, architectural 'A' structure
            d="M30,100 L30,40 L110,40 L110,100 M110,70 L70,70 L70,100 M70,40 L70,70"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="butt" // Sharp edges
            strokeLinejoin="miter" // Sharp corners
            fill="none"
            strokeDasharray="400"
            animatedProps={animatedProps}
          />
        </Svg>
        <Animated.View style={textStyle}>
          <Text style={styles.appName}>arkio</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Dark Blue Background
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    marginTop: 20,
    color: "white",
    textTransform: "uppercase",
  },
});
