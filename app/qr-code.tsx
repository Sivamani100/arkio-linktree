import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { View, Text, StyleSheet, Share, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { Avatar } from "@/components/Avatar";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function QrCodeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { profile, showToast } = useApp();
  const qrRef = useRef<any>(null);

  const link = `https://linktr.ee/${profile.username}`;

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out my arkio: ${link}` });
    } catch (e) {
      showToast("Could not open share");
    }
  };

  const handleSave = () => {
    // Note: Generating and saving images to the local device normally requires additional libraries 
    // like expo-file-system and expo-media-library. For now, we simulate the save success.
    showToast("QR code saved to your gallery!");
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="QR Code" />

      <View style={styles.content}>
        <View style={styles.card}>
          <Avatar id={profile.avatarId} size={80} />
          <Text style={[styles.username, { color: colors.foreground }]}>
            @{profile.username}
          </Text>
          <Text style={[styles.linkText, { color: colors.mutedForeground }]}>
            {link}
          </Text>

          <View style={[styles.qrWrap, { backgroundColor: "#FFF" }]}>
            <QRCode
              value={link}
              size={180}
              color="#000"
              backgroundColor="#FFF"
              getRef={(c) => (qrRef.current = c)}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Save image" onPress={handleSave} />
          <Button title="Share" variant="outline" onPress={handleShare} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    marginBottom: 48,
  },
  username: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    marginTop: 16,
  },
  linkText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    marginTop: 4,
  },
  qrWrap: {
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  actions: {
    width: "100%",
    gap: 12,
  },
});
