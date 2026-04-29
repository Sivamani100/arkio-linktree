import { Star } from "iconsax-react-nativejs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Avatar } from "@/components/Avatar";
import { LinktreeLogo } from "@/components/LinktreeLogo";
import { useApp } from "@/context/AppContext";
import { getTheme } from "@/utils/themes";

export function PreviewCard({
  height = 240,
  showLinks = true,
}: {
  height?: number;
  showLinks?: boolean;
}) {
  const { profile, links } = useApp();
  const theme = getTheme(profile.themeId);

  const visibleLinks = links
    .filter((l) => l.enabled && !l.pending)
    .slice(0, 3);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, height, borderRadius: 24 },
      ]}
    >
      {theme.artType === "blocks" ? <BlocksArt /> : null}
      {theme.artType === "daniel" ? <DanielArt /> : null}
      {theme.artType === "luke" ? <LukeArt /> : null}
      <View style={styles.topLeft}>
        <View style={styles.miniLogo}>
          <LinktreeLogo size={18} color={theme.text} />
        </View>
      </View>

      <View style={styles.center}>
        <Avatar id={profile.avatarId} size={70} />
        <Text style={[styles.username, { color: theme.text }]}>
          @{profile.username}
        </Text>

        {showLinks && visibleLinks.length > 0 ? (
          <View style={styles.linksWrap}>
            {visibleLinks.map((l) => (
              <View
                key={l.id}
                style={[
                  styles.linkPill,
                  { backgroundColor: theme.buttonBackground },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.linkPillText, { color: theme.buttonText }]}
                >
                  {l.title}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={[styles.joinPill, { backgroundColor: theme.buttonBackground }]}
          >
            <Text style={[styles.joinText, { color: theme.buttonText }]}>
              Join {profile.username} on arkio
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function BlocksArt() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 24,
          right: 24,
          height: "32%",
          backgroundColor: "#EE3FE7",
          borderRadius: 12,
        }}
      />
    </View>
  );
}

function DanielArt() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View
        style={{
          position: "absolute",
          top: -30,
          left: -20,
          width: 140,
          height: 140,
          backgroundColor: "#3F4F38",
          borderRadius: 70,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 20,
          right: -30,
          width: 100,
          height: 100,
          backgroundColor: "#1B2640",
          borderRadius: 50,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -40,
          left: -20,
          width: 180,
          height: 180,
          backgroundColor: "#0E1E36",
          borderRadius: 90,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 80,
          height: 80,
          backgroundColor: "#C9B0AC",
          borderRadius: 8,
          transform: [{ rotate: "20deg" }],
        }}
      />
    </View>
  );
}

function LukeArt() {
  const dots = [
    { top: 15, left: 22, color: "#7B3FF2" },
    { top: 28, right: 30, color: "#FBBF24" },
    { top: 60, left: 50, color: "#EC4899" },
    { top: 80, right: 60, color: "#10B981" },
    { bottom: 55, left: 30, color: "#3B82F6" },
    { bottom: 30, right: 25, color: "#F97316" },
    { bottom: 90, right: 90, color: "#8B5CF6" },
    { top: 100, left: 25, color: "#22D3EE" },
  ];
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {dots.map((d, i) => (
        <View key={i} style={{ position: "absolute", ...d }}>
          <Star size={14} color={d.color} variant="Linear" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    padding: 16,
  },
  topLeft: {
    position: "absolute",
    top: 14,
    left: 14,
  },
  miniLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  username: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
  },
  joinPill: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    marginTop: 8,
  },
  joinText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
  linksWrap: {
    width: "85%",
    gap: 8,
    marginTop: 6,
  },
  linkPill: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  linkPillText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
});
