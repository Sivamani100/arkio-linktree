import React, { useEffect } from "react";
import Svg, { Path, G } from "react-native-svg";
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withRepeat, 
  withTiming, 
  Easing,
  cancelAnimation
} from "react-native-reanimated";

interface AsteriskLogoProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

const AnimatedG = Animated.createAnimatedComponent(G);

export function AsteriskLogo({ size = 120, color = "black", animated = false }: AsteriskLogoProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1, // Infinite
        false
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = 0;
    }
  }, [animated]);

  // Use animatedProps for SVG attributes to avoid CSSStyleDeclaration issues on web
  const animatedProps = useAnimatedProps(() => ({
    transform: `rotate(${rotation.value}, 50, 42)`,
  }));



  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G>
        {/* Trunk - Thick vertical block at bottom - NOT rotated */}
        <Path
          d="M50 78 L50 98"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="butt"
        />
        
        {/* Asterisk Arms (8 arms meeting at center 50, 42) - Rotated if animated */}
        <AnimatedG animatedProps={animated ? animatedProps : undefined}>
          {/* Vertical arm */}
          <Path d="M50 10 L50 74" stroke={color} strokeWidth="12" strokeLinecap="butt" />
          {/* Horizontal arm */}
          <Path d="M18 42 L82 42" stroke={color} strokeWidth="12" strokeLinecap="butt" />
          {/* Diagonal 1 */}
          <Path d="M28 20 L72 64" stroke={color} strokeWidth="12" strokeLinecap="butt" />
          {/* Diagonal 2 */}
          <Path d="M72 20 L28 64" stroke={color} strokeWidth="12" strokeLinecap="butt" />
        </AnimatedG>
      </G>
    </Svg>
  );
}


