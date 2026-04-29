import { TickCircle } from "iconsax-react-nativejs";
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

import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { useApp, type SubscriptionTier } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

type Plan = {
  id: SubscriptionTier;
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0/mo",
    perks: [
      "Unlimited links",
      "Customizable themes",
      "Basic insights",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$5/mo",
    perks: [
      "Everything in Free",
      "Sell digital products",
      "Email collection",
      "Standard insights",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12/mo",
    highlight: true,
    perks: [
      "Everything in Starter",
      "Audience integrations (Mailchimp, Klaviyo, Kit)",
      "Advanced insights & demographics",
      "AI assistant — chat with your data",
      "Priority support",
    ],
  },
];

export default function EditPlanScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { subscription, setSubscription } = useApp();

  const [selected, setSelected] = useState<SubscriptionTier>(subscription);

  const onConfirm = () => {
    setSubscription(selected);
    router.back();
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Edit Plan" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        <Text style={[styles.heading, { color: colors.foreground }]}>
          Choose the plan that's right for you
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          You can switch or cancel any time. Try Pro free for 14 days.
        </Text>

        {PLANS.map((plan) => {
          const isSelected = selected === plan.id;
          const isCurrent = subscription === plan.id;
          return (
            <Pressable
              key={plan.id}
              onPress={() => setSelected(plan.id)}
              style={[
                styles.planCard,
                {
                  backgroundColor: plan.highlight ? "#0E0E0E" : colors.card,
                  borderColor: isSelected ? colors.primary : colors.border,
                  borderWidth: isSelected ? 2 : 1,
                  borderRadius: 20,
                },
              ]}
            >
              <View style={styles.planHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.planTitleRow}>
                    <Text
                      style={[
                        styles.planName,
                        { color: plan.highlight ? "#FFF" : colors.foreground },
                      ]}
                    >
                      {plan.name}
                    </Text>
                    {plan.highlight ? (
                      <View
                        style={[
                          styles.recommended,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Text style={styles.recommendedText}>
                          Recommended
                        </Text>
                      </View>
                    ) : null}
                    {isCurrent ? (
                      <View
                        style={[
                          styles.currentBadge,
                          {
                            backgroundColor: plan.highlight
                              ? "#FFFFFF"
                              : colors.secondary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.currentText,
                            {
                              color: plan.highlight
                                ? "#0E0E0E"
                                : colors.foreground,
                            },
                          ]}
                        >
                          Current
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.planPrice,
                      {
                        color: plan.highlight
                          ? "rgba(255,255,255,0.7)"
                          : colors.mutedForeground,
                      },
                    ]}
                  >
                    {plan.price}
                  </Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: isSelected
                        ? colors.primary
                        : plan.highlight
                          ? "rgba(255,255,255,0.5)"
                          : colors.border,
                    },
                  ]}
                >
                  {isSelected ? (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: colors.primary },
                      ]}
                    />
                  ) : null}
                </View>
              </View>

              <View style={{ marginTop: 12, gap: 8 }}>
                {plan.perks.map((p) => (
                  <View key={p} style={styles.perkRow}>
                    <TickCircle
                      size={16}
                      color={plan.highlight ? "#86EFAC" : colors.success}
                      variant="Linear"
                    />
                    <Text
                      style={[
                        styles.perkText,
                        {
                          color: plan.highlight
                            ? "rgba(255,255,255,0.92)"
                            : colors.foreground,
                        },
                      ]}
                    >
                      {p}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
          );
        })}

        <Button
          title={selected === subscription ? "Keep current plan" : "Confirm change"}
          onPress={onConfirm}
          style={{ marginTop: 12 }}
          disabled={selected === subscription}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heading: { fontFamily: "Inter_700Bold", fontSize: 22 },
  sub: { fontFamily: "Inter_400Regular", fontSize: 14, marginTop: -8 },
  planCard: {
    padding: 18,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  planTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  planName: { fontFamily: "Inter_700Bold", fontSize: 22 },
  planPrice: { fontFamily: "Inter_500Medium", fontSize: 14, marginTop: 4 },
  recommended: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  recommendedText: {
    color: "#FFFFFF",
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  currentText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: { width: 12, height: 12, borderRadius: 6 },
  perkRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  perkText: { fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
});
