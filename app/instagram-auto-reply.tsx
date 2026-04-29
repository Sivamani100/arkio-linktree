import { MessageText, Link1, Instagram, TickCircle } from "iconsax-react-nativejs";
import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function InstagramAutoReplyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { instagramConnected, setInstagramConnected } = useApp();

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Instagram auto-reply" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800" }}
            style={styles.hero}
            contentFit="cover"
          />
        </View>

        <Text style={[styles.heading, { color: colors.foreground }]}>
          Reply with a link, automatically
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          When someone comments a keyword on your Instagram post, we'll DM them
          a link from your Linktree. Set it once and convert every post into
          clicks.
        </Text>

        <SectionCard padding={18}>
          <View style={styles.row}>
            <MessageText
              size={22}
              color={colors.foreground}
              variant="Linear"
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                Trigger keyword
              </Text>
              <Text style={[styles.rowSub, { color: colors.mutedForeground }]}>
                e.g. "link", "shop", "yes"
              </Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard padding={18}>
          <View style={styles.row}>
            <Link1 size={22} color={colors.foreground} variant="Linear" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                Link to send
              </Text>
              <Text style={[styles.rowSub, { color: colors.mutedForeground }]}>
                Pick any link from your Linktree
              </Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard padding={18}>
          <View style={styles.row}>
            <Instagram size={22} color={colors.foreground} variant="Linear" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                Instagram account
              </Text>
              <Text
                style={[styles.rowSub, { color: colors.mutedForeground }]}
              >
                {instagramConnected
                  ? "Connected"
                  : "Connect to enable auto-reply"}
              </Text>
            </View>
            {instagramConnected ? (
              <TickCircle size={22} color={colors.success} variant="Linear" />
            ) : null}
          </View>
        </SectionCard>

        <Button
          title={instagramConnected ? "Disconnect Instagram" : "Connect Instagram"}
          onPress={() => setInstagramConnected(!instagramConnected)}
          variant={instagramConnected ? "outline" : "primary"}
          icon={
            <Instagram
              size={16}
              color={instagramConnected ? colors.foreground : "#FFF"}
              variant="Linear"
            />
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heroWrap: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
  },
  hero: { width: "100%", height: "100%" },
  heading: { fontFamily: "Inter_700Bold", fontSize: 22 },
  sub: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: -8,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  rowTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  rowSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
});
