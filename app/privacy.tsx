import { Lock, ArrowRight2 } from "iconsax-react-nativejs";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function PrivacyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { dataSharing, setDataSharing } = useApp();

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Privacy" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        <Text style={[styles.label, { color: colors.mutedForeground }]}>
          Data
        </Text>
        <SectionCard padding={0}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: colors.foreground }]}>
                Share usage data
              </Text>
              <Text
                style={[styles.sub, { color: colors.mutedForeground }]}
              >
                Help us improve arkio by sharing anonymous app usage data.
              </Text>
            </View>
            <Switch
              value={dataSharing}
              onValueChange={setDataSharing}
              trackColor={{ false: "#D4D4D8", true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>
        </SectionCard>

        <Text style={[styles.label, { color: colors.mutedForeground }]}>
          Profile
        </Text>
        <SectionCard padding={0}>
          <RowLink
            label="Sensitive content warning"
            description="Hide your profile behind an age confirmation"
          />
          <Divider />
          <RowLink
            label="Hide social icons"
            description="Don’t show social icons on your profile"
          />
          <Divider />
          <RowLink
            label="Hide arkio branding"
            description="Available on Pro plans"
            locked
          />
        </SectionCard>

        <Text style={[styles.label, { color: colors.mutedForeground }]}>
          Account
        </Text>
        <SectionCard padding={0}>
          <RowLink label="Download my data" />
          <Divider />
          <RowLink label="Delete account" destructive />
        </SectionCard>
      </ScrollView>
    </View>
  );
}

function RowLink({
  label,
  description,
  destructive,
  locked,
}: {
  label: string;
  description?: string;
  destructive?: boolean;
  locked?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable style={styles.rowLink}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.title,
            { color: destructive ? colors.destructive : colors.foreground },
          ]}
        >
          {label}
        </Text>
        {description ? (
          <Text style={[styles.sub, { color: colors.mutedForeground }]}>
            {description}
          </Text>
        ) : null}
      </View>
      {locked ? (
        <Lock size={16} color={colors.mutedForeground} variant="Linear" />
      ) : (
        <ArrowRight2
          size={20}
          color={colors.mutedForeground}
          variant="Linear"
        />
      )}
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
        marginLeft: 16,
      }}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginTop: 6,
    marginBottom: -6,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  rowLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  title: { fontFamily: "Inter_500Medium", fontSize: 15 },
  sub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
});
