import { Link1, ArchiveBook, Teacher, Calendar1, Music, Play, ArrowRight2 } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp, type LinkType } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const TYPES: {
  id: LinkType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: "link",
    label: "Add link",
    description: "Add a link to your Linktree",
    icon: <Link1 size={20} color="#FFF" variant="Linear" />,
    color: "#7C3AED",
  },
  {
    id: "digital-product",
    label: "Sell a digital product",
    description: "Files, ebooks, presets and more",
    icon: <ArchiveBook size={20} color="#FFF" variant="Linear" />,
    color: "#0EA5E9",
  },
  {
    id: "course",
    label: "Sell a course",
    description: "Build and sell your courses",
    icon: <Teacher size={20} color="#FFF" variant="Linear" />,
    color: "#F59E0B",
  },
  {
    id: "bookings",
    label: "Take bookings",
    description: "Get paid for your time",
    icon: <Calendar1 size={20} color="#FFF" variant="Linear" />,
    color: "#10B981",
  },
  {
    id: "music",
    label: "Music link",
    description: "Spotify, Apple Music, SoundCloud",
    icon: <Music size={20} color="#FFF" variant="Linear" />,
    color: "#EC4899",
  },
  {
    id: "video",
    label: "Video link",
    description: "YouTube, Vimeo, TikTok",
    icon: <Play size={20} color="#FFF" variant="Linear" />,
    color: "#EF4444",
  },
];

export default function AddLinkScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addLink } = useApp();

  const [step, setStep] = useState<"choose" | "details">("choose");
  const [type, setType] = useState<LinkType>("link");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const getLabels = () => {
    switch (type) {
      case "digital-product":
        return { title: "Product Title", url: "Checkout/Product Link", button: "Create Product" };
      case "course":
        return { title: "Course Title", url: "Enrollment URL", button: "Publish Course" };
      case "bookings":
        return { title: "Service Title", url: "Calendar Link (e.g. Calendly)", button: "Set Bookings" };
      case "music":
        return { title: "Track / Album Name", url: "Streaming Link", button: "Add Music" };
      case "video":
        return { title: "Video Title", url: "Video URL", button: "Add Video" };
      default:
        return { title: "Title", url: "URL", button: "Add Link" };
    }
  };
  const labels = getLabels();

  const onSave = () => {
    if (!title.trim()) return;
    addLink({
      title: title.trim(),
      url: url.trim(),
      type,
      enabled: true,
    });
    router.back();
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title={step === "choose" ? "Add" : "New link"} />

      {step === "choose" ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 100,
            gap: 12,
          }}
        >
          <Text style={[styles.heading, { color: colors.foreground }]}>
            What would you like to add?
          </Text>
          {TYPES.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => {
                setType(t.id);
                setStep("details");
              }}
            >
              <SectionCard padding={16}>
                <View style={styles.row}>
                  <View
                    style={[styles.typeIcon, { backgroundColor: t.color }]}
                  >
                    {t.icon}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.rowTitle, { color: colors.foreground }]}
                    >
                      {t.label}
                    </Text>
                    <Text
                      style={[styles.rowSub, { color: colors.mutedForeground }]}
                    >
                      {t.description}
                    </Text>
                  </View>
                  <ArrowRight2
                    size={20}
                    color={colors.mutedForeground}
                    variant="Linear"
                  />
                </View>
              </SectionCard>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: insets.bottom + 100,
              gap: 14,
            }}
          >
            <SectionCard padding={0}>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.mutedForeground }]}>
                  {labels.title}
                </Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder={`My ${type}`}
                  placeholderTextColor={colors.mutedForeground}
                  style={[styles.input, { color: colors.foreground }]}
                />
              </View>
              <View
                style={{
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: colors.border,
                }}
              />

              {type === "digital-product" && (
                <>
                  <View style={styles.field}>
                    <Text style={[styles.label, { color: colors.mutedForeground }]}>
                      Price (USD)
                    </Text>
                    <TextInput
                      placeholder="$10.00"
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType="numeric"
                      style={[styles.input, { color: colors.foreground }]}
                    />
                  </View>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                    }}
                  />
                  <View style={styles.field}>
                    <Text style={[styles.label, { color: colors.mutedForeground }]}>
                      Upload Product File
                    </Text>
                    <Pressable
                      style={[styles.uploadBtn, { borderColor: colors.border, backgroundColor: colors.secondary }]}
                      onPress={() => alert("File picker simulation launched!")}
                    >
                      <Text style={[styles.uploadText, { color: colors.primary }]}>Choose file or drag here</Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                    }}
                  />
                </>
              )}

              {type === "course" && (
                <>
                  <View style={styles.field}>
                    <Text style={[styles.label, { color: colors.mutedForeground }]}>
                      Instructor Name
                    </Text>
                    <TextInput
                      placeholder="John Doe"
                      placeholderTextColor={colors.mutedForeground}
                      style={[styles.input, { color: colors.foreground }]}
                    />
                  </View>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                    }}
                  />
                  <View style={styles.field}>
                    <Text style={[styles.label, { color: colors.mutedForeground }]}>
                      Course Price (USD)
                    </Text>
                    <TextInput
                      placeholder="$49.00"
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType="numeric"
                      style={[styles.input, { color: colors.foreground }]}
                    />
                  </View>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                    }}
                  />
                </>
              )}

              {type === "bookings" && (
                <>
                  <View style={styles.field}>
                    <Text style={[styles.label, { color: colors.mutedForeground }]}>
                      Price Per Session
                    </Text>
                    <TextInput
                      placeholder="$25.00"
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType="numeric"
                      style={[styles.input, { color: colors.foreground }]}
                    />
                  </View>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                    }}
                  />
                </>
              )}

              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.mutedForeground }]}>
                  {labels.url}
                </Text>
                <TextInput
                  value={url}
                  onChangeText={setUrl}
                  placeholder="https://"
                  placeholderTextColor={colors.mutedForeground}
                  autoCapitalize="none"
                  keyboardType="url"
                  style={[styles.input, { color: colors.foreground }]}
                />
              </View>
            </SectionCard>

            <Button title={labels.button} onPress={onSave} disabled={!title.trim()} />
            <Button
              title="Back"
              variant="ghost"
              onPress={() => setStep("choose")}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heading: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    marginBottom: 6,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  rowSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  field: { paddingHorizontal: 16, paddingVertical: 12 },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  input: { fontFamily: "Inter_500Medium", fontSize: 16, paddingVertical: 4 },
  uploadBtn: {
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  uploadText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
});
