import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  useAnimatedStyle, 
  interpolateColor, 
  useSharedValue, 
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
  useAnimatedRef,
  scrollTo
} from "react-native-reanimated";
import { 
  Magicpen, 
  ShoppingBag, 
  NotificationBing, 
  Link1, 
  Eye, 
  Global, 
  UserAdd, 
  TickCircle, 
  Export,
  Brush,
  ArrowRight
} from "iconsax-react-nativejs";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const STEPS = [
  {
    id: 1,
    title: "WELCOME TO\nARKIO",
    desc: "The next generation of digital identity. Sharp, premium, and built for creators.",
    icon: <NotificationBing size={100} color="white" variant="Linear" />,
    backgroundColor: "#831843", // Dark Pink
  },
  {
    id: 2,
    title: "ONE LINK,\nINFINITE REACH",
    desc: "Bring all your content, products, and social profiles together under one powerful URL.",
    icon: <Link1 size={100} color="white" variant="Linear" />,
    backgroundColor: "#1E3A8A", // Dark Blue
  },
  {
    id: 3,
    title: "CRAFT YOUR\nAESTHETIC",
    desc: "Use our visual editor to create a profile that reflects your unique brand without limits.",
    icon: <Brush size={100} color="white" variant="Linear" />,
    backgroundColor: "#064E3B", // Dark Green
  },
  {
    id: 4,
    title: "MONETIZE YOUR\nPASSION",
    desc: "Sell products, digital downloads, and courses directly from your profile with zero friction.",
    icon: <ShoppingBag size={100} color="white" variant="Linear" />,
    backgroundColor: "#4C1D95", // Purple
  },
  {
    id: 5,
    title: "INSIGHTS THAT\nMATTER",
    desc: "Track every click and conversion with detailed visitor analytics and growth trends.",
    icon: <Eye size={100} color="white" variant="Linear" />,
    backgroundColor: "#111827", // Dark Gray
  },
  {
    id: 6,
    title: "AI-DRIVEN\nOPTIMIZATION",
    desc: "Let our smart assistant suggest the best layouts and content for maximum engagement.",
    icon: <Magicpen size={100} color="white" variant="Linear" />,
    backgroundColor: "#991B1B", // Dark Red
  },
  {
    id: 7,
    title: "CONNECT YOUR\nWORLDS",
    desc: "Seamlessly integrate with Instagram, TikTok, and YouTube in just a few taps.",
    icon: <Global size={100} color="white" variant="Linear" />,
    backgroundColor: "#1E40AF", // Bright Blue
  },
  {
    id: 8,
    title: "GROW YOUR\nAUDIENCE",
    desc: "Capture emails and build a loyal community directly from your landing page.",
    icon: <UserAdd size={100} color="white" variant="Linear" />,
    backgroundColor: "#3730A3", // Indigo
  },
  {
    id: 9,
    title: "PRIVACY BY\nDESIGN",
    desc: "Your data belongs to you. We provide enterprise-grade security for your digital assets.",
    icon: <TickCircle size={100} color="white" variant="Linear" />,
    backgroundColor: "#164E63", // Cyan
  },
  {
    id: 10,
    title: "READY TO\nLAUNCH?",
    desc: "Join thousands of creators who trust Arkio to power their online presence.",
    icon: <Export size={100} color="white" variant="Linear" />,
    backgroundColor: "#0F172A", // Navy
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();
  
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollTo(scrollRef, nextStep * width, 0, true);
    } else {
      completeOnboarding();
      router.replace("/sign-in");
    }
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const newStep = Math.round(x / width);
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
      Haptics.selectionAsync();
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      STEPS.map((_, i) => i * width),
      STEPS.map((step) => step.backgroundColor)
    );
    return { backgroundColor };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    const progressWidth = interpolate(
      scrollX.value,
      [0, (STEPS.length - 1) * width],
      [width * 0.1, width * 0.84]
    );
    return { width: progressWidth };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {STEPS.map((step, index) => (
          <View key={step.id} style={[styles.stepContainer, { paddingTop: insets.top + 60 }]}>
            <Animated.View 
              entering={FadeIn.delay(200).duration(500)}
              style={styles.iconWrap}
            >
              {step.icon}
              <View style={styles.sharpLine} />
              <View style={[styles.sharpLine, { transform: [{ rotate: "90deg" }], top: -20, left: 40 }]} />
              <View style={[styles.sharpLine, { top: 218, left: 178 }]} />
              <View style={[styles.sharpLine, { transform: [{ rotate: "90deg" }], top: 198, left: 218 }]} />
            </Animated.View>
            
            <View style={styles.textWrap}>
              <Animated.Text 
                entering={SlideInRight.delay(300).duration(500)}
                style={styles.title}
              >
                {step.title}
              </Animated.Text>
              <Animated.Text 
                entering={FadeIn.delay(500).duration(600)}
                style={styles.desc}
              >
                {step.desc}
              </Animated.Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 30 }]}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground} />
          <Animated.View style={[styles.progressBarFill, animatedProgressStyle]} />
        </View>

        <View style={styles.pagination}>
          <Text style={styles.stepText}>
            {String(currentStep + 1).padStart(2, '0')} <Text style={styles.totalText}>/ {STEPS.length}</Text>
          </Text>
        </View>

        <Pressable 
          style={styles.sharpButton}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>
            {currentStep === STEPS.length - 1 ? "GET STARTED" : "CONTINUE"}
          </Text>
          <ArrowRight size={20} color="black" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    width: width,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconWrap: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  sharpLine: {
    position: "absolute",
    width: 40,
    height: 2,
    backgroundColor: "white",
    top: -2,
    left: -2,
  },
  textWrap: {
    alignItems: "center",
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    letterSpacing: 1,
    lineHeight: 44,
  },
  desc: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 28,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 30,
  },
  progressContainer: {
    height: 4,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepText: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "white",
    letterSpacing: 2,
  },
  totalText: {
    color: "rgba(255,255,255,0.4)",
  },
  sharpButton: {
    backgroundColor: "white",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "black",
    letterSpacing: 1,
  },
});
