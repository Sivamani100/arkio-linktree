import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinktreeLogo } from "@/components/LinktreeLogo";
import { Button } from "@/components/Button";

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }}
    >
      <View style={styles.header}>
        <LinktreeLogo size={24} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Join Linktree</Text>
        <Text style={styles.subtitle}>Sign up for free!</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button
            title="Continue"
            variant="dark"
            style={styles.continueBtn}
            onPress={() => router.push("/username")}
          />
        </View>

        <Text style={styles.disclaimer}>
          By clicking <Text style={{ fontFamily: "Inter_700Bold" }}>Create account</Text>, you agree to Linktree's{" "}
          <Text style={styles.disclaimerLink}>privacy notice</Text>,{" "}
          <Text style={styles.disclaimerLink}>T&Cs</Text> and to receive offers, news and updates.
        </Text>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <Pressable style={styles.socialBtn}>
            <Image 
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" }} 
              style={styles.socialIcon} 
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </Pressable>
          <Pressable style={styles.socialBtn}>
            <Image 
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/0/747.png" }} 
              style={styles.socialIcon} 
            />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.push("/sign-in")}>
            <Text style={styles.footerLink}>
              Already have an account? <Text style={styles.linkText}>Log in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    gap: 12,
  },
  input: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  continueBtn: {
    borderRadius: 30,
    marginTop: 8,
    backgroundColor: "#E5E7EB", // Light gray when inactive, but let's stick to dark for now as per theme
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 18,
  },
  disclaimerLink: {
    textDecorationLine: "underline",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    marginHorizontal: 16,
    color: "#9CA3AF",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  socialButtons: {
    width: "100%",
    gap: 12,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    gap: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#000000",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerLink: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  linkText: {
    color: "#7C3AED",
    fontFamily: "Inter_600SemiBold",
  },
});
