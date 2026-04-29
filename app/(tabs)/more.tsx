import { ArrowRight2, Crown, User, Card, Flash, Lock, Key, Instagram, ArchiveBook, MessageText, Calendar1, Teacher, Magicpen, Colorfilter, Eye, Logout, Sun1, Moon, Mobile, TickCircle } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBottomSheet, SheetItem } from "@/components/AppBottomSheet";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { ScreenHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function MoreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    profile,
    subscription,
    appearance,
    setAppearance,
    visitorMode,
    setVisitorMode,
    signOut,
    showToast,
  } = useApp();

  const [appearanceVisible, setAppearanceVisible] = useState(false);
  const [resetPwVisible, setResetPwVisible] = useState(false);
  const [coursesVisible, setCoursesVisible] = useState(false);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader title="More" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 12,
        }}
      >
        <Pressable onPress={() => router.push("/my-info")}>
          <SectionCard padding={16}>
            <View style={styles.row}>
              <Avatar id={profile.avatarId} size={48} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: colors.foreground }]}>
                  {profile.username}
                </Text>
                <Text
                  style={[styles.email, { color: colors.mutedForeground }]}
                >
                  {profile.email}
                </Text>
              </View>
              <ArrowRight2 size={20} color={colors.mutedForeground} variant="Linear" />
            </View>
          </SectionCard>
        </Pressable>



        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Account
        </Text>

        <SectionCard padding={0}>
          <Row
            icon={<User size={20} color={colors.foreground} variant="Linear" />}
            label="My Information"
            onPress={() => router.push("/my-info")}
          />
          <Divider />
          <Row
            icon={
              <Lock size={20} color={colors.foreground} variant="Linear" />
            }
            label="Privacy"
            onPress={() => router.push("/privacy")}
          />
          <Divider />
          <Row
            icon={
              <Key size={20} color={colors.foreground} variant="Linear" />
            }
            label="Reset password"
            onPress={() => setResetPwVisible(true)}
          />
        </SectionCard>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Tools
        </Text>

        <SectionCard padding={0}>
          <Row
            icon={
              <Instagram size={20} color={colors.foreground} variant="Linear" />
            }
            label="Social accounts"
            onPress={() => router.push("/social-connect")}
          />
          <Divider />
          <Row
            icon={
              <ArchiveBook size={20} color={colors.foreground} variant="Linear" />
            }
            label="Archive"
            onPress={() => router.push("/archive")}
          />
          <Divider />
          <Row
            icon={
              <MessageText size={20} color={colors.foreground} variant="Linear" />
            }
            label="Instagram auto-reply"
            onPress={() => router.push("/instagram-auto-reply")}
          />
          <Divider />
          <Row
            icon={
              <Calendar1 size={20} color={colors.foreground} variant="Linear" />
            }
            label="Social planner"
            onPress={() => router.push("/social-planner")}
          />
          <Divider />
          <Row
            icon={
              <Teacher size={20} color={colors.foreground} variant="Linear" />
            }
            label="Sell a course"
            onPress={() => setCoursesVisible(true)}
          />
          <Divider />
          <Row
            icon={
              <Magicpen size={20} color={colors.foreground} variant="Linear" />
            }
            label="AI assistant"
            onPress={() => router.push("/ai-chat")}
          />
        </SectionCard>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          App
        </Text>

        <SectionCard padding={0}>
          <Row
            icon={
              <Colorfilter size={20} color={colors.foreground} variant="Linear" />
            }
            label="Appearance"
            trailing={
              <Text style={[styles.trailing, { color: colors.mutedForeground }]}>
                {appearance === "system"
                  ? "System"
                  : appearance === "light"
                    ? "Light"
                    : "Dark"}
              </Text>
            }
            onPress={() => setAppearanceVisible(true)}
          />
          <Divider />
          <Row
            icon={
              <Eye size={20} color={colors.foreground} variant="Linear" />
            }
            label={visitorMode ? "Switch to Creator" : "Switch to Visitor"}
            onPress={() => setVisitorMode(!visitorMode)}
          />
        </SectionCard>

        <SectionCard padding={0} style={{ marginTop: 8 }}>
          <Row
            icon={
              <Logout size={20} color={colors.destructive} variant="Linear" />
            }
            label="Log out"
            destructive
            onPress={() => {
              signOut();
              showToast("Signed out");
              router.replace("/sign-in");
            }}
          />
        </SectionCard>

        <Text style={[styles.versionText, { color: colors.mutedForeground }]}>
          arkio · v1.0.0
        </Text>
      </ScrollView>

      <AppBottomSheet
        visible={appearanceVisible}
        onClose={() => setAppearanceVisible(false)}
        title="Appearance"
      >
        {(["system", "light", "dark"] as const).map((mode) => (
          <SheetItem
            key={mode}
            label={mode.charAt(0).toUpperCase() + mode.slice(1)}
            icon={
              mode === "light" ? (
                <Sun1 size={20} color={colors.foreground} variant="Linear" />
              ) : mode === "dark" ? (
                <Moon size={20} color={colors.foreground} variant="Linear" />
              ) : (
                <Mobile size={20} color={colors.foreground} variant="Linear" />
              )
            }
            trailing={
              appearance === mode ? (
                <TickCircle size={20} color={colors.primary} variant="Linear" />
              ) : null
            }
            onPress={() => {
              setAppearance(mode);
              setAppearanceVisible(false);
            }}
          />
        ))}
      </AppBottomSheet>

      <AppBottomSheet
        visible={coursesVisible}
        onClose={() => setCoursesVisible(false)}
        title="Sell a course"
      >
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            paddingVertical: 8,
            lineHeight: 20,
          }}
        >
          Package videos and lessons into a paid course your audience can buy in
          one tap.
        </Text>
        <View style={{ marginTop: 6 }}>
          {[
            "Drag and drop course builder",
            "Sell anywhere with built-in payments",
            "Track student progress",
          ].map((label, i, arr) => (
            <View
              key={label}
              style={[
                styles.checkRow,
                i !== arr.length - 1 && {
                  borderBottomColor: colors.border,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <TickCircle size={18} color={colors.success} variant="Linear" />
              <Text style={{ color: colors.foreground, fontFamily: "Inter_500Medium", fontSize: 14 }}>
                {label}
              </Text>
            </View>
          ))}
        </View>
        <Button
          title="Start building"
          variant="dark"
          onPress={() => {
            setCoursesVisible(false);
            router.push("/add-link");
          }}
          style={{ marginTop: 16, marginBottom: 8 }}
        />
        <Button
          title="Not now"
          variant="ghost"
          onPress={() => setCoursesVisible(false)}
        />
      </AppBottomSheet>

      <AppBottomSheet
        visible={resetPwVisible}
        onClose={() => setResetPwVisible(false)}
        title="Reset password"
      >
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            paddingVertical: 12,
            lineHeight: 20,
          }}
        >
          We’ll send a password reset link to {profile.email}.
        </Text>
        <Button
          title="Send reset link"
          onPress={() => setResetPwVisible(false)}
          style={{ marginTop: 8, marginBottom: 8 }}
        />
        <Button
          title="Cancel"
          variant="ghost"
          onPress={() => setResetPwVisible(false)}
        />
      </AppBottomSheet>
    </View>
  );
}

function Row({
  icon,
  label,
  trailing,
  onPress,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.rowBtn,
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={{ width: 24, alignItems: "center" }}>{icon}</View>
      <Text
        style={[
          styles.rowLabel,
          { color: destructive ? colors.destructive : colors.foreground },
        ]}
      >
        {label}
      </Text>
      <View style={{ flex: 1 }} />
      {trailing}
      {!destructive ? (
        <View style={{ marginLeft: 8 }}>
          <ArrowRight2
            size={18}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </View>
      ) : null}
    </Pressable>
  );
}

function Divider() {
  const colors = useColors();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border,
        marginLeft: 56,
      }}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  name: { fontFamily: "Inter_700Bold", fontSize: 18 },
  email: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  sectionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 14,
    marginBottom: 4,
    paddingHorizontal: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  rowLabel: { fontFamily: "Inter_500Medium", fontSize: 15 },
  planBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  planBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  trailing: { fontFamily: "Inter_400Regular", fontSize: 14 },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 22,
  },
  proIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  proTitle: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  proSub: {
    color: "rgba(255,255,255,0.75)",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
});
