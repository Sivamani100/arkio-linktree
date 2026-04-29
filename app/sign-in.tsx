import { useRouter } from "expo-router";
import React from "react";
import { Image as RNImage, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { LinktreeLogo } from "@/components/LinktreeLogo";
import { useApp } from "@/context/AppContext";

export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useApp();

  const onSignUp = () => {
    signIn();
    router.replace("/onboarding");
  };

  const onLogIn = () => {
    signIn();
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.logoRow, { marginTop: insets.top + 24 }]}>
        <LinktreeLogo size={32} color="white" />
      </View>

      <View style={styles.heroWrap}>
        <View style={styles.heroCardLeft}>
          <View style={styles.thumbBox}>
            <RNImage
              source={{ uri: "https://images.unsplash.com/photo-1474978528675-4a50a450883e?w=600" }}
              style={styles.thumbImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.thumbCaption}>Organic Olive Oil</Text>
          <Text style={styles.thumbPrice}>$18</Text>
        </View>

        <View style={styles.heroCardCenter}>
          <View style={styles.heroPortrait}>
            <RNImage
              source={{ uri: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800" }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.heroName}>Alba Cucina</Text>
          <Text style={styles.heroBio}>Home interiors and food enthusiast</Text>
          <View style={styles.heroSocials}>
            <View style={styles.heroSocialDot} />
            <View style={styles.heroSocialDot} />
            <View style={styles.heroSocialDot} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>CONNECT{"\n"}YOUR CONTENT</Text>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 24 }]}>
        <Button
          title="Sign up"
          variant="primary"
          onPress={onSignUp}
          style={{ backgroundColor: "#FFFFFF" }}
          textStyle={{ color: "#0E0E0E" }}
        />
        <Pressable onPress={onLogIn} style={styles.loginBtn}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Dark Blue
  },
  logoRow: {
    alignItems: "center",
    marginBottom: 8,
  },
  heroWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  heroCardLeft: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    width: 120,
    transform: [{ translateY: 30 }],
    // No rounded corners
  },
  thumbBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    // No rounded corners
  },
  thumbImage: { width: "100%", height: "100%" },
  thumbCaption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 8,
  },
  thumbPrice: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginTop: 2,
  },
  heroCardCenter: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    width: 180,
    alignItems: "center",
    // No rounded corners
  },
  heroPortrait: {
    width: "100%",
    aspectRatio: 1,
    // No rounded corners
  },
  heroName: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#FFFFFF",
    marginTop: 10,
    letterSpacing: 0.5,
  },
  heroBio: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 2,
  },
  heroSocials: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  heroSocialDot: {
    width: 20,
    height: 4,
    backgroundColor: "#FFFFFF",
    // No rounded corners
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
    fontSize: 34,
    textAlign: "center",
    lineHeight: 40,
    marginTop: 12,
    letterSpacing: 2,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  loginBtn: {
    paddingVertical: 12,
    alignItems: "center",
  },
  loginText: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
});
