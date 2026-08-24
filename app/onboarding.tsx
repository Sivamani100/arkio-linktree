import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Platform, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { 
  FadeInDown, 
  FadeOutUp, 
  Layout, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  FadeInRight,
  withRepeat,
  withSequence,
  withDelay,
  ZoomIn
} from "react-native-reanimated";
import { 
  UserSquare, 
  Shop, 
  Music, 
  Flash, 
  Global,
  TrendUp,
  Magicpen,
  Share,
  Brush,
  Moon,
  Sun1,
  Ghost,
  Add,
  TickCircle,
  ArrowRight
} from "iconsax-react-nativejs";
import { useApp } from "@/context/AppContext";
import colors from "@/constants/colors";
import { AsteriskLogo } from "@/components/AsteriskLogo";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AVATARS = [
  { id: "default", color: "#F3F4F6", icon: <UserSquare size={40} color="#9CA3AF" /> },
  { id: "blue", color: "#3B82F6", gradient: ["#60A5FA", "#1E40AF"] },
  { id: "green", color: "#10B981", gradient: ["#34D399", "#065F46"] },
  { id: "pink", color: "#EC4899", gradient: ["#F472B6", "#9D174D"] },
  { id: "purple", color: "#8B5CF6", gradient: ["#A78BFA", "#5B21B6"] },
  { id: "cool", color: "#000000", gradient: ["#000000", "#434343"] },
];

const THEMES = [
  { id: "air", name: "Air", bg: "#F3F4F6", card: "#FFFFFF", text: "#000000", font: "Inter_600SemiBold" },
  { id: "blocks", name: "Blocks", bg: "#7C3AED", card: "#D946EF", text: "#FFFFFF", font: "Inter_700Bold" },
  { id: "lake", name: "Lake", bg: "#111827", card: "#1F2937", text: "#FFFFFF", font: "Inter_600SemiBold" },
  { id: "mineral", name: "Mineral", bg: "#FDF4E3", card: "#FFFFFF", text: "#000000", font: "Inter_600SemiBold" },
  { id: "neon", name: "Neon", bg: "#000000", card: "#BEF264", text: "#000000", font: "Inter_800ExtraBold" },
];

const ONBOARDING_STEPS = [
  {
    id: "creator_type",
    title: "What describes you best?",
    subtitle: "Help us personalize your Linktree experience",
    options: [
      { id: "influencer", title: "Influencer / Creator", desc: "Building a personal brand", icon: <UserSquare size={24} color={colors.brand.purple} /> },
      { id: "business", title: "Small Business", desc: "Selling products or services", icon: <Shop size={24} color={colors.brand.green} /> },
      { id: "artist", title: "Artist / Musician", desc: "Sharing creative works", icon: <Music size={24} color="#E11D48" /> },
      { id: "professional", title: "Professional", desc: "Showcasing career & expertise", icon: <Global size={24} color="#3B82F6" /> },
    ],
  },
  {
    id: "goal",
    title: "What is your primary goal?",
    subtitle: "We'll suggest the best tools for you",
    options: [
      { id: "audience", title: "Grow my audience", desc: "Reach more people daily", icon: <TrendUp size={24} color={colors.brand.green} /> },
      { id: "sales", title: "Sell products", desc: "Monetize my content", icon: <Flash size={24} color="#F59E0B" /> },
      { id: "portfolio", title: "Share my portfolio", desc: "Get hired or discovered", icon: <Magicpen size={24} color="#7C3AED" /> },
      { id: "connect", title: "Connect all socials", desc: "One link for everything", icon: <Share size={24} color="#1E3A8A" /> },
    ],
  },
  {
    id: "aesthetic",
    title: "Choose your profile vibe",
    subtitle: "You can fully customize this later",
    options: [
      { id: "minimal", title: "Minimalist", desc: "Clean, simple, and elegant", icon: <Sun1 size={24} color="#000000" /> },
      { id: "bold", title: "Bold & Vibrant", desc: "Energetic and eye-catching", icon: <Brush size={24} color={colors.brand.green} /> },
      { id: "dark", title: "Sleek Dark", desc: "Modern and professional", icon: <Moon size={24} color="#7C3AED" /> },
      { id: "glass", title: "Glassmorphism", desc: "Premium frosted effect", icon: <Ghost size={24} color="#3B82F6" /> },
    ],
  },
  {
    id: "notifications",
    isSpecial: true,
  },
  {
    id: "appearance",
    isSpecial: true,
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const currentStep = ONBOARDING_STEPS[stepIndex];
  const progress = ((stepIndex + 1) / ONBOARDING_STEPS.length) * 100;

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [currentStep.id]: optionId });
  };

  const handleContinue = () => {
    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      completeOnboarding();
      router.replace("/(tabs)");
    }
  };

  if (currentStep.isSpecial) {
    if (currentStep.id === "notifications") {
      return <NotificationsStep onContinue={handleContinue} />;
    }
    if (currentStep.id === "appearance") {
      return <AppearanceStep onContinue={handleContinue} />;
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Dynamic Background Gradient (Abstract) */}
      <View style={styles.backgroundGlow} />

      {/* Header with Progress Bar */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.stepCount}>STEP {stepIndex + 1} OF {ONBOARDING_STEPS.length}</Text>
          <Text style={styles.progressText}>{Math.round(progress)}% COMPLETE</Text>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View 
            layout={Layout.springify().damping(15)}
            style={[styles.progressFill, { width: `${progress}%` }]} 
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          key={currentStep.id} 
          entering={FadeInDown.duration(800).springify()}
          exiting={FadeOutUp.duration(400)}
          style={styles.stepContent}
        >
          {/* Brand Logo with floating animation */}
          <Animated.View 
            entering={ZoomIn.duration(600)}
            style={styles.logoWrap}
          >
            <AsteriskLogo size={90} color={colors.brand.black} animated />
          </Animated.View>

          <Text style={styles.title}>{currentStep.title}</Text>
          <Text style={styles.subtitle}>{currentStep.subtitle}</Text>

          <View style={styles.optionsContainer}>
            {currentStep.options!.map((option, index) => {
              const isSelected = selections[currentStep.id] === option.id;
              return (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={isSelected}
                  onPress={() => handleSelect(option.id)}
                  index={index}
                />
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed Footer with Button Interactions */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pressable
          onPress={handleContinue}
          disabled={!selections[currentStep.id]}
          style={({ pressed }) => [
            styles.continueBtn,
            { backgroundColor: !selections[currentStep.id] ? "#F3F4F6" : colors.brand.black },
            pressed && styles.pressed
          ]}
        >
          <Text style={[styles.btnText, { color: !selections[currentStep.id] ? "#9CA3AF" : colors.brand.white }]}>
            {stepIndex === ONBOARDING_STEPS.length - 1 ? "FINISH SETUP" : "CONTINUE"}
          </Text>
          {selections[currentStep.id] && (
            <Animated.View entering={FadeInRight} style={styles.btnIcon}>
              <ArrowRight size={20} color="white" />
            </Animated.View>
          )}
        </Pressable>
        
        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
}

function NotificationsStep({ onContinue }: { onContinue: () => void }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 40) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notifTopSection}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "#BEF264" }]} />
          <Animated.View 
            entering={ZoomIn.delay(200).duration(1000)}
            style={[styles.shape, { 
              backgroundColor: "#D946EF", 
              width: SCREEN_WIDTH * 1.5, 
              height: SCREEN_WIDTH * 1.5, 
              borderRadius: SCREEN_WIDTH, 
              bottom: -SCREEN_WIDTH * 0.4, 
              left: -SCREEN_WIDTH * 0.4 
            }]} 
          />

          <View style={styles.notifOverlay}>
            <Animated.View entering={FadeInRight.delay(400).springify()} style={styles.mockNotif}>
              <View style={styles.notifIcon}>
                <AsteriskLogo size={20} color="black" />
              </View>
              <View style={styles.notifTextWrap}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>👀 Your new link is popular!</Text>
                  <Text style={styles.notifTime}>9:41 AM</Text>
                </View>
                <Text style={styles.notifDesc}>Tap here to move it to the top of your Linktree.</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(600).springify()} style={[styles.mockNotif, { marginLeft: 20 }]}>
              <View style={styles.notifIcon}>
                <AsteriskLogo size={20} color="black" />
              </View>
              <View style={styles.notifTextWrap}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>💸 Last chance for 50% off</Text>
                  <Text style={styles.notifTime}>9:41 AM</Text>
                </View>
                <Text style={styles.notifDesc}>Use coupon HELLO and pay half price for next year.</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(800).springify()} style={styles.mockNotif}>
              <View style={styles.notifIcon}>
                <AsteriskLogo size={20} color="black" />
              </View>
              <View style={styles.notifTextWrap}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>🤳 NEW: Add links to your grid</Text>
                  <Text style={styles.notifTime}>9:41 AM</Text>
                </View>
                <Text style={styles.notifDesc}>Make your Instagram posts clickable so your audience can take action.</Text>
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.notifContent}>
          <Text style={styles.notifMainTitle}>
            Want tips, updates and early-access discounts on the go?
          </Text>

          <View style={styles.notifActions}>
            <Pressable 
              onPress={onContinue}
              style={({ pressed }) => [
                styles.getNotifBtn,
                pressed && styles.pressed
              ]}
            >
              <Text style={styles.getNotifBtnText}>Get push notifications</Text>
            </Pressable>

            <Pressable onPress={onContinue} style={styles.notNowBtn}>
              <Text style={styles.notNowText}>Not now</Text>
            </Pressable>
          </View>

          <Text style={styles.notifDisclaimer}>
            If an opt-in doesn't appear after this, you can opt in via the notification settings on your device.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function AppearanceStep({ onContinue }: { onContinue: () => void }) {
  const insets = useSafeAreaInsets();
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id);

  const theme = THEMES.find(t => t.id === selectedTheme)!;
  const avatar = AVATARS.find(a => a.id === selectedAvatar)!;

  return (
    <View style={styles.container}>
      <View style={[styles.appearanceHeader, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={onContinue}>
          <Text style={styles.appearanceSkip}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 120) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Preview with floating animation */}
        <Animated.View 
          entering={ZoomIn.duration(800)}
          style={styles.previewContainer}
        >
          <View style={[styles.previewCard, { backgroundColor: theme.bg }]}>
            <View style={styles.previewCardInner}>
              <Animated.View 
                key={selectedAvatar}
                entering={ZoomIn.duration(400)}
                style={[styles.previewAvatarWrap, { backgroundColor: avatar.color }]}
              >
                {avatar.id === "default" ? (
                  <UserSquare size={60} color="#9CA3AF" />
                ) : (
                  <View style={StyleSheet.absoluteFill} />
                )}
              </Animated.View>
              <Text style={[styles.previewHandle, { color: theme.text, fontFamily: theme.font }]}>@mallipurapuravi</Text>
              
              <View style={[styles.previewLinkBtn, { backgroundColor: theme.card }]}>
                <Text style={[styles.previewLinkText, { color: theme.text, fontFamily: theme.font }]}>Join mallipurapuravi on Linktree</Text>
              </View>

              <View style={styles.previewAsterisk}>
                <AsteriskLogo size={24} color={theme.text} />
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.appearanceContent}>
          <Text style={styles.appearanceTitle}>Choose your appearance</Text>
          
          <Text style={styles.appearanceSectionTitle}>Profile image</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.avatarList}
          >
            {AVATARS.map((a, index) => (
              <Animated.View key={a.id} entering={FadeInRight.delay(index * 50)}>
                <Pressable 
                  onPress={() => setSelectedAvatar(a.id)}
                  style={[
                    styles.avatarItem, 
                    { backgroundColor: a.color },
                    selectedAvatar === a.id && styles.avatarItemSelected
                  ]}
                >
                  {a.id === "default" && <UserSquare size={24} color="#9CA3AF" />}
                  {selectedAvatar === a.id && (
                    <View style={styles.checkBadge}>
                      <TickCircle size={14} color="white" variant="Bold" />
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            ))}
            <Pressable style={styles.avatarAdd}>
              <Add size={24} color="#000000" />
            </Pressable>
          </ScrollView>

          <Text style={styles.appearanceSectionTitle}>Themes</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.themeList}
          >
            {THEMES.map((t, index) => (
              <Animated.View key={t.id} entering={FadeInRight.delay(index * 80)} style={styles.themeItemWrap}>
                <Pressable 
                  onPress={() => setSelectedTheme(t.id)}
                  style={[
                    styles.themeCard, 
                    { backgroundColor: t.bg },
                    selectedTheme === t.id && styles.themeCardSelected
                  ]}
                >
                  <Text style={[styles.themeCardAa, { color: t.text, fontFamily: t.font }]}>Aa</Text>
                  <View style={[styles.themeCardBar, { backgroundColor: t.card }]} />
                </Pressable>
                <Text style={styles.themeName}>{t.name}</Text>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={[styles.appearanceFooter, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pressable 
          onPress={onContinue}
          style={({ pressed }) => [
            styles.appearanceContinueBtn,
            pressed && styles.pressed
          ]}
        >
          <Text style={styles.appearanceContinueText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

function OptionCard({ option, isSelected, onPress, index }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: isSelected ? colors.brand.green : "#F3F4F6",
    backgroundColor: isSelected ? "#F3FBF6" : "#FFFFFF",
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(100 + index * 80).duration(800).springify()}
      style={[styles.optionCardWrap, animatedStyle]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.optionCardPressable}
      >
        <View style={styles.optionIconWrap}>
          {option.icon}
        </View>
        <View style={styles.optionTextWrap}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionDesc}>{option.desc}</Text>
        </View>
        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && <Animated.View entering={ZoomIn} style={styles.radioInner} />}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FAFAFA",
    opacity: 0.5,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stepCount: {
    fontSize: 10,
    fontFamily: "Inter_800ExtraBold",
    color: colors.brand.black,
    letterSpacing: 1.5,
  },
  progressText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.brand.green,
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  stepContent: {
    alignItems: "center",
  },
  logoWrap: {
    marginBottom: 32,
    // Add a soft glow behind the logo
    shadowColor: colors.brand.green,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_800ExtraBold",
    color: colors.brand.black,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  optionsContainer: {
    width: "100%",
    gap: 14,
  },
  optionCardWrap: {
    borderRadius: 20,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 4px 15px rgba(0,0,0,0.03)",
      }
    })
  },
  optionCardPressable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  optionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: colors.brand.black,
  },
  optionDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: colors.brand.green,
    backgroundColor: colors.brand.green,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F9FAFB",
  },
  continueBtn: {
    height: 64,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    letterSpacing: 1.5,
  },
  btnIcon: {
    position: "absolute",
    right: 24,
  },
  skipText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#9CA3AF",
    textAlign: "center",
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  
  // Notification Step Styles
  notifTopSection: {
    height: SCREEN_HEIGHT * 0.45,
    overflow: "hidden",
    position: "relative",
  },
  shape: {
    position: "absolute",
    opacity: 1,
  },
  notifOverlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 14,
  },
  mockNotif: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 20,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.brand.green,
    alignItems: "center",
    justifyContent: "center",
  },
  notifTextWrap: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: "#000000",
  },
  notifTime: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  notifDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#4B5563",
    lineHeight: 18,
  },
  notifContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  notifMainTitle: {
    fontSize: 24,
    fontFamily: "Inter_800ExtraBold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  notifActions: {
    width: "100%",
    gap: 14,
    marginBottom: 40,
  },
  getNotifBtn: {
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D946EF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D946EF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  getNotifBtnText: {
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  notNowBtn: {
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  notNowText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#000000",
  },
  notifDisclaimer: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  // Appearance Step Styles
  appearanceHeader: {
    paddingHorizontal: 24,
    alignItems: "flex-end",
  },
  appearanceSkip: {
    fontSize: 15,
    fontFamily: "Inter_800ExtraBold",
    color: "#000000",
    padding: 10,
  },
  previewContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    marginBottom: 50,
  },
  previewCard: {
    aspectRatio: 0.85,
    borderRadius: 48,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
  },
  previewCardInner: {
    alignItems: "center",
    width: "100%",
  },
  previewAvatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 5,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  previewHandle: {
    fontSize: 28,
    marginBottom: 40,
    letterSpacing: -1,
  },
  previewLinkBtn: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  previewLinkText: {
    fontSize: 15,
    letterSpacing: -0.2,
  },
  previewAsterisk: {
    opacity: 0.4,
  },
  appearanceContent: {
    paddingHorizontal: 24,
  },
  appearanceTitle: {
    fontSize: 28,
    fontFamily: "Inter_800ExtraBold",
    color: "#000000",
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  appearanceSectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    color: "#000000",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  avatarList: {
    gap: 14,
    marginBottom: 40,
    paddingRight: 24,
  },
  avatarItem: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarItemSelected: {
    borderColor: "#000000",
  },
  avatarAdd: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 3,
  },
  themeList: {
    gap: 18,
    paddingRight: 24,
  },
  themeItemWrap: {
    alignItems: "center",
    gap: 10,
  },
  themeCard: {
    width: 110,
    height: 150,
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  themeCardSelected: {
    borderColor: "#000000",
  },
  themeCardAa: {
    fontSize: 32,
  },
  themeCardBar: {
    height: 32,
    width: "100%",
    borderRadius: 6,
  },
  themeName: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: "#9CA3AF",
  },
  appearanceFooter: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F9FAFB",
  },
  appearanceContinueBtn: {
    height: 64,
    borderRadius: 32,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  appearanceContinueText: {
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});
