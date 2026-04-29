import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { ArrowRight2 } from "iconsax-react-nativejs";
import { StackHeader } from "@/components/Header";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export const SOCIAL_LOGOS = [
  {
    id: "instagram",
    name: "Instagram",
    iconName: "instagram",
    color: "#E1306C",
    scheme: Platform.OS === "ios" ? "instagram://" : "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end",
    webUrl: "https://instagram.com",
  },
  {
    id: "tiktok",
    name: "TikTok",
    iconName: "tiktok",
    color: "#000000",
    scheme: "snssdk1128://",
    webUrl: "https://tiktok.com",
  },
  {
    id: "youtube",
    name: "YouTube",
    iconName: "youtube",
    color: "#FF0000",
    scheme: "vnd.youtube://",
    webUrl: "https://youtube.com",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    iconName: "whatsapp",
    color: "#25D366",
    scheme: "whatsapp://",
    webUrl: "https://web.whatsapp.com",
  },
  {
    id: "discord",
    name: "Discord",
    iconName: "discord",
    color: "#5865F2",
    scheme: "discord://",
    webUrl: "https://discord.com",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    iconName: "pinterest",
    color: "#E60023",
    scheme: "pinterest://",
    webUrl: "https://pinterest.com",
  },
  {
    id: "facebook",
    name: "Facebook",
    iconName: "facebook",
    color: "#1877F2",
    scheme: "fb://",
    webUrl: "https://facebook.com",
  },
  {
    id: "x",
    name: "X (Twitter)",
    iconName: "twitter",
    color: "#000000",
    scheme: "twitter://",
    webUrl: "https://twitter.com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    iconName: "linkedin",
    color: "#0A66C2",
    scheme: "linkedin://",
    webUrl: "https://linkedin.com",
  },
  {
    id: "spotify",
    name: "Spotify",
    iconName: "spotify",
    color: "#1DB954",
    scheme: "spotify://",
    webUrl: "https://spotify.com",
  },
];

export default function AddToBioScreen() {
  const colors = useColors();
  const { profile, showToast } = useApp();

  const handleOpenApp = async (platform: typeof SOCIAL_LOGOS[0]) => {
    const linktreeUrl = `https://linktr.ee/${profile.username}`;
    
    // Copy to clipboard first so they can paste it easily
    try {
      await Clipboard.setStringAsync(linktreeUrl);
    } catch {
      // ignore
    }
    
    showToast(`Copied! Opening ${platform.name}...`);

    try {
      const canOpen = await Linking.canOpenURL(platform.scheme);
      if (canOpen) {
        await Linking.openURL(platform.scheme);
      } else {
        await Linking.openURL(platform.webUrl);
      }
    } catch {
      // Fallback if both fail
      try {
        await Linking.openURL(platform.webUrl);
      } catch {
        showToast(`Could not open ${platform.name}`);
      }
    }
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Add to bio" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Where do you want to add your Linktree?
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Select a platform to open the app directly. Your Linktree URL will be copied to your clipboard automatically.
        </Text>

        <View style={[styles.listWrap, { borderColor: colors.border, backgroundColor: colors.card }]}>
          {SOCIAL_LOGOS.map((platform, index) => (
            <Pressable
              key={platform.id}
              onPress={() => handleOpenApp(platform)}
              style={[
                styles.itemRow,
                { borderBottomColor: colors.border },
                index === SOCIAL_LOGOS.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <FontAwesome5 name={platform.iconName as any} size={28} color={platform.color} style={styles.logo} />
              <Text style={[styles.itemName, { color: colors.foreground }]}>
                {platform.name}
              </Text>
              <ArrowRight2 size={18} color={colors.mutedForeground} variant="Linear" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 60,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
  },
  listWrap: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  itemName: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
});
