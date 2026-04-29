import { SearchNormal1 } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { AppBottomSheet } from "@/components/AppBottomSheet";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import { SOCIAL_LOGOS } from "./add-to-bio";

export default function SocialConnectScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { socials, setSocialConnected, showTotalFollowers, setShowTotalFollowers, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof SOCIAL_LOGOS[0] | null>(null);
  const [urlInput, setUrlInput] = useState("");

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="" />

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Connect your{"\n"}social accounts
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Add icons to your arkio so visitors can find you on every platform.
        </Text>

        <View style={[styles.searchWrap, { backgroundColor: colors.card }]}>
          <SearchNormal1 size={20} color={colors.mutedForeground} variant="Linear" />
          <TextInput
            placeholder="Search social platforms"
            placeholderTextColor={colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.foreground }]}
          />
        </View>

        <View style={{ marginTop: 28, gap: 14 }}>
          {SOCIAL_LOGOS.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
            const connectedKey = item.id as keyof typeof socials;
            const connected = socials[connectedKey];
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  if (connected) {
                    setSocialConnected(connectedKey, false);
                    showToast(`Disconnected ${item.name}`);
                  } else {
                    setSelectedItem(item);
                    setUrlInput("");
                  }
                }}
                style={[
                  styles.row,
                  {
                    backgroundColor: colors.card,
                    borderRadius: colors.radius,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <FontAwesome5 name={item.iconName as any} size={20} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowLabel, { color: colors.foreground }]}>
                    {item.name}
                  </Text>
                  {connected ? (
                    <Text
                      style={[styles.rowNote, { color: colors.success }]}
                    >
                      Connected
                    </Text>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.connectBtn,
                    {
                      backgroundColor: connected
                        ? colors.secondary
                        : colors.foreground,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.connectText,
                      {
                        color: connected ? colors.foreground : colors.background,
                      },
                    ]}
                  >
                    {connected ? "Disconnect" : "Connect"}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => setShowTotalFollowers(!showTotalFollowers)}
          style={[styles.totalRow, { borderTopColor: colors.border }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.rowLabel, { color: colors.foreground }]}>
              Show total followers
            </Text>
            <Text
              style={[styles.rowSub, { color: colors.mutedForeground }]}
            >
              Display combined followers across all networks on your profile.
            </Text>
          </View>
          <View
            style={[
              styles.toggle,
              {
                backgroundColor: showTotalFollowers
                  ? colors.success
                  : colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                {
                  alignSelf: showTotalFollowers ? "flex-end" : "flex-start",
                },
              ]}
            />
          </View>
        </Pressable>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <Button title="Done" variant="dark" onPress={() => router.back()} />
      </View>

      <AppBottomSheet
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={`Add ${selectedItem?.label}`}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: colors.mutedForeground, marginBottom: 8 }}>
            URL or Username
          </Text>
          <TextInput
            value={urlInput}
            onChangeText={setUrlInput}
            placeholder={`Your ${selectedItem?.label} handle or URL`}
            placeholderTextColor={colors.mutedForeground}
            style={[styles.modalInput, { color: colors.foreground, borderColor: colors.border }]}
            autoCapitalize="none"
          />
          <View style={{ marginTop: 24 }}>
            <Button
              title="Add Link"
              disabled={!urlInput.trim()}
              onPress={() => {
                if (selectedItem) {
                  setSocialConnected(selectedItem.id as keyof typeof socials, true);
                  showToast(`Connected ${selectedItem.name}`);
                }
                setSelectedItem(null);
              }}
            />
          </View>
        </View>
      </AppBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  rowNote: { fontFamily: "Inter_500Medium", fontSize: 12, marginTop: 2 },
  rowSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  connectBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  connectText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 18,
    marginTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
});
