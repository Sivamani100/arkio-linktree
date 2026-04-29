import { ArchiveBook, Refresh2, Trash } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { StackHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function ArchiveScreen() {
  const colors = useColors();
  const router = useRouter();
  const { archivedLinks, restoreLink, removeLink, showToast } = useApp();

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Archive" />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={[styles.note, { color: colors.mutedForeground }]}>
          Archived links are hidden from your Linktree but kept here so you can
          restore them anytime.
        </Text>

        {archivedLinks.length === 0 ? (
          <View style={styles.empty}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.secondary },
              ]}
            >
              <ArchiveBook size={28} color={colors.foreground} variant="Linear" />
            </View>
            <Text
              style={[styles.emptyTitle, { color: colors.foreground }]}
            >
              Your archive is empty
            </Text>
            <Text
              style={[styles.emptySub, { color: colors.mutedForeground }]}
            >
              Archive a link from your Links tab to keep it here.
            </Text>
            <Pressable
              onPress={() => router.back()}
              style={[
                styles.emptyBtn,
                { backgroundColor: colors.foreground },
              ]}
            >
              <Text
                style={[styles.emptyBtnText, { color: colors.background }]}
              >
                Back to Links
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ gap: 12, marginTop: 12 }}>
            {archivedLinks.map((link) => (
              <View
                key={link.id}
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderRadius: colors.radius },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.title, { color: colors.foreground }]}
                    numberOfLines={1}
                  >
                    {link.title}
                  </Text>
                  {link.url ? (
                    <Text
                      style={[styles.url, { color: colors.mutedForeground }]}
                      numberOfLines={1}
                    >
                      {link.url}
                    </Text>
                  ) : null}
                </View>
                <Pressable
                  onPress={() => {
                    restoreLink(link.id);
                    showToast("Link restored");
                  }}
                  style={[
                    styles.actionBtn,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <Refresh2
                    size={16}
                    color={colors.foreground}
                    variant="Linear"
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    removeLink(link.id);
                    showToast("Deleted permanently");
                  }}
                  style={[
                    styles.actionBtn,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <Trash
                    size={16}
                    color={colors.destructive}
                    variant="Linear"
                  />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  note: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  empty: {
    alignItems: "center",
    paddingTop: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginTop: 16,
  },
  emptySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  emptyBtn: {
    marginTop: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
  },
  emptyBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  title: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  url: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
