import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinktreeLogo } from "@/components/LinktreeLogo";
import { Button } from "@/components/Button";
import { useApp } from "@/context/AppContext";

export default function UsernameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useApp();
  const [username, setUsername] = useState("mallipurapuravi"); // Default from screenshot

  const handleContinue = () => {
    signIn();
    router.replace("/onboarding");
  };

  return (

    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <LinktreeLogo size={24} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Linktree!</Text>
        <Text style={styles.subtitle}>
          Choose your Linktree username.{"\n"}You can always change it later.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>linktr.ee/</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.disclaimer}>
          By continuing, you agree to receive offers, news and updates from Linktree
        </Text>

        <Button
          title="Continue"
          variant="outline" // The screenshot shows a white button with black border or just a plain white button
          style={styles.continueBtn}
          onPress={handleContinue}
        />


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 60,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    marginBottom: 48,
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: "100%",
    borderWidth: 2,
    borderColor: "#000000", // Focused state from screenshot
  },
  prefix: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 4,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#000000",
  },
  disclaimer: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 48,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  continueBtn: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
});
