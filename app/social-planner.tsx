import { Add, ArrowRight2, Instagram, Twitter, Music, More } from "iconsax-react-nativejs";
import { Image } from "expo-image";
import React, { useState } from "react";
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
import { useColors } from "@/hooks/useColors";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SCHEDULED = [
  { day: 2, hour: 10, label: "Spring drop teaser", platform: "Instagram" },
  { day: 4, hour: 18, label: "Behind the scenes", platform: "TikTok" },
  { day: 6, hour: 12, label: "Weekend playlist", platform: "Twitter" },
];

export default function SocialPlannerScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<"week" | "list">("week");

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader
        title="Social Planner"
        rightContent={
          <Pressable hitSlop={10}>
            <Add size={24} color={colors.foreground} variant="Linear" />
          </Pressable>
        }
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800" }}
            style={styles.hero}
            contentFit="cover"
          />
        </View>

        <Text style={[styles.heading, { color: colors.foreground }]}>
          Plan and schedule your posts
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          Draft once, post everywhere — Instagram, TikTok, Twitter and more.
        </Text>

        <View style={styles.toggleRow}>
          {(["week", "list"] as const).map((v) => (
            <Pressable
              key={v}
              onPress={() => setView(v)}
              style={[
                styles.toggle,
                view === v && {
                  backgroundColor: colors.foreground,
                },
              ]}
            >
              <Text
                style={{
                  color: view === v ? colors.background : colors.foreground,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 13,
                }}
              >
                {v === "week" ? "Week" : "List"}
              </Text>
            </Pressable>
          ))}
        </View>

        {view === "week" ? <WeekView /> : <ListView />}

        <SectionCard padding={18}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1474978528675-4a50a450883e?w=600" }}
              style={{ width: 48, height: 48, borderRadius: 12 }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                AI caption assistant
              </Text>
              <Text style={[styles.rowSub, { color: colors.mutedForeground }]}>
                Generate on-brand captions in seconds
              </Text>
            </View>
            <ArrowRight2
              size={20}
              color={colors.mutedForeground}
              variant="Linear"
            />
          </View>
        </SectionCard>

        <Button
          title="Create new post"
          onPress={() => {}}
          icon={<Add size={16} color="#FFF" variant="Linear" />}
        />
      </ScrollView>
    </View>
  );
}

function WeekView() {
  const colors = useColors();
  return (
    <SectionCard padding={14}>
      <View style={styles.weekHeader}>
        {DAYS.map((d) => (
          <Text
            key={d}
            style={[styles.dayLabel, { color: colors.mutedForeground }]}
          >
            {d}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {DAYS.map((_, i) => {
          const post = SCHEDULED.find((s) => s.day === i);
          return (
            <View
              key={i}
              style={[
                styles.dayCell,
                { backgroundColor: post ? colors.primary + "20" : "transparent" },
              ]}
            >
              {post ? (
                <View
                  style={[styles.postChip, { backgroundColor: colors.primary }]}
                >
                  {post.platform === "Instagram" ? (
                    <Instagram size={12} color="#FFF" variant="Linear" />
                  ) : post.platform === "TikTok" ? (
                    <Music size={12} color="#FFF" variant="Linear" />
                  ) : (
                    <Twitter size={12} color="#FFF" variant="Linear" />
                  )}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </SectionCard>
  );
}

function ListView() {
  const colors = useColors();
  return (
    <SectionCard padding={0}>
      {SCHEDULED.map((p, i) => (
        <View key={i}>
          <View style={styles.listRow}>
            <View
              style={[styles.listIcon, { backgroundColor: colors.secondary }]}
            >
              {p.platform === "Instagram" ? (
                <Instagram size={18} color={colors.foreground} variant="Linear" />
              ) : p.platform === "TikTok" ? (
                <Music size={18} color={colors.foreground} variant="Linear" />
              ) : (
                <Twitter size={18} color={colors.foreground} variant="Linear" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                {p.label}
              </Text>
              <Text
                style={[styles.rowSub, { color: colors.mutedForeground }]}
              >
                {DAYS[p.day]} · {p.hour}:00 · {p.platform}
              </Text>
            </View>
            <More
              size={18}
              color={colors.mutedForeground}
              variant="Linear"
            />
          </View>
          {i < SCHEDULED.length - 1 ? (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: colors.border,
                marginLeft: 60,
              }}
            />
          ) : null}
        </View>
      ))}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heroWrap: { height: 200, borderRadius: 20, overflow: "hidden" },
  hero: { width: "100%", height: "100%" },
  heading: { fontFamily: "Inter_700Bold", fontSize: 22 },
  sub: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: -8,
  },
  toggleRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 999,
    padding: 4,
  },
  toggle: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  dayCell: {
    flex: 1,
    height: 64,
    marginHorizontal: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  postChip: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  rowSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
});
