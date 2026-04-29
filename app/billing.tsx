import { Flash, Card, Add } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function BillingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { subscription } = useApp();

  const planName =
    subscription === "pro"
      ? "Pro"
      : subscription === "starter"
        ? "Starter"
        : "Free";

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Billing" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        <SectionCard padding={20}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>
            Current plan
          </Text>
          <View style={styles.planRow}>
            <Text style={[styles.planName, { color: colors.foreground }]}>
              {planName}
            </Text>
            {subscription !== "free" ? (
              <View
                style={[styles.activeBadge, { backgroundColor: colors.success }]}
              >
                <Text style={styles.activeText}>Active</Text>
              </View>
            ) : null}
          </View>
          {subscription === "free" ? (
            <Text style={[styles.helper, { color: colors.mutedForeground }]}>
              You are on the Free plan. Upgrade to unlock advanced features.
            </Text>
          ) : (
            <Text style={[styles.helper, { color: colors.mutedForeground }]}>
              Renews on May 28, 2026
            </Text>
          )}
          <Button
            title={subscription === "free" ? "Upgrade plan" : "Manage plan"}
            onPress={() => router.push("/edit-plan")}
            style={{ marginTop: 14 }}
            icon={
              <Flash
                size={16}
                color="#FFF"
                variant="Linear"
              />
            }
          />
        </SectionCard>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Payment methods
        </Text>

        <SectionCard padding={20}>
          <View style={styles.emptyRow}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Card
                size={22}
                color={colors.foreground}
                variant="Linear"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
                No payment methods
              </Text>
              <Text
                style={[
                  styles.helper,
                  { color: colors.mutedForeground, marginTop: 2 },
                ]}
              >
                Add a card to upgrade your plan
              </Text>
            </View>
            <Pressable>
              <Add size={22} color={colors.foreground} variant="Linear" />
            </Pressable>
          </View>
        </SectionCard>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Billing history
        </Text>
        <SectionCard padding={20}>
          <Text style={[styles.helper, { color: colors.mutedForeground }]}>
            No invoices yet. Once you upgrade, your receipts will appear here.
          </Text>
        </SectionCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  planName: { fontFamily: "Inter_700Bold", fontSize: 28 },
  activeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  activeText: {
    color: "#FFFFFF",
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
  helper: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 4 },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginTop: 6,
  },
  emptyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
});
