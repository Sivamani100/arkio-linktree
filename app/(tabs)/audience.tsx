import { Chart, SearchNormal1, CloseCircle, Import, People, Lock } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { ScreenHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

type Tab = "overview" | "manage" | "integrations";
type Filter = "all" | "subscribed" | "unsubscribed";



export default function AudienceScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const { audienceCapture, setAudienceCapture, subscribers, showToast } = useApp();

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Audience"
        showSettings
        onSettingsPress={() => router.push("/privacy")}
      />

      <View style={styles.tabs}>
        {(["overview", "manage", "integrations"] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tabBtn,
                active && {
                  backgroundColor: colors.secondary,
                  borderRadius: 999,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: active ? "Inter_600SemiBold" : "Inter_500Medium",
                  fontSize: 14,
                  color: active ? colors.foreground : colors.mutedForeground,
                }}
              >
                {t === "overview" ? "Overview" : t === "manage" ? "Manage" : "Integrations"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
          gap: 14,
        }}
      >
        {tab === "overview" ? (
          <OverviewTab subscribers={subscribers} />
        ) : tab === "manage" ? (
          <ManageTab
            subscribers={subscribers}
            audienceCapture={audienceCapture}
            setAudienceCapture={setAudienceCapture}
            showToast={showToast}
          />
        ) : (
          <IntegrationsTab />
        )}
      </ScrollView>
    </View>
  );
}

function OverviewTab({ subscribers }: { subscribers: any[] }) {
  const colors = useColors();
  const router = useRouter();
  const { setAudienceCapture, showToast } = useApp();

  const newLast7Days = useMemo(() => {
    // Basic count of recent subscribers (all are new in this demo)
    return subscribers.length;
  }, [subscribers]);

  const unsubscribedCount = subscribers.filter(s => !s.subscribed).length;
  const subscribedCount = subscribers.filter(s => s.subscribed).length;

  return (
    <>
      <SectionCard padding={20}>
        <View style={styles.statsGrid}>
          <StatCol label="Subscribers" value={subscribedCount.toString()} />
          <StatCol label="New in the last 7 days" value={newLast7Days.toString()} />
          <StatCol label="Unsubscribed" value={unsubscribedCount.toString()} />
          <StatCol label="Lifetime total" value={subscribers.length.toString()} />
        </View>
        <Button
          title="More analytics"
          variant="outline"
          icon={<Chart size={16} color={colors.foreground} variant="Linear" />}
          onPress={() => router.push("/insights")}
          style={{ marginTop: 14 }}
        />
      </SectionCard>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Your audience capture tools
      </Text>

      <SectionCard background={colors.secondary} padding={20}>
        <Text
          style={[styles.cardTitle, { color: colors.foreground, textAlign: "center" }]}
        >
          Let's start capturing your audience.
        </Text>
        <Text
          style={[
            styles.cardSub,
            {
              color: colors.mutedForeground,
              textAlign: "center",
              marginTop: 6,
              lineHeight: 20,
            },
          ]}
        >
          Cut through the algorithm and stay in contact by adding a Subscribe
          option to your Linktree.
        </Text>
        <Button
          title="Turn on Subscribe"
          variant="primary"
          fullWidth={false}
          onPress={() => {
            setAudienceCapture(true);
            showToast("Subscribe turned on");
          }}
          style={{ marginTop: 16, alignSelf: "center" }}
        />
      </SectionCard>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Grow your audience
      </Text>
      <SectionCard padding={20}>
        <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
          Add subscribers exclusive sign-up benefits to grow your list faster.
        </Text>
        <Button
          title="Add a benefit"
          variant="outline"
          onPress={() => router.push("/add-link")}
          style={{ marginTop: 14 }}
        />
      </SectionCard>
    </>
  );
}

function ManageTab({
  subscribers,
  audienceCapture,
  setAudienceCapture,
  showToast,
}: {
  subscribers: any[];
  audienceCapture: boolean;
  setAudienceCapture: (v: boolean) => void;
  showToast: (m: string) => void;
}) {
  const colors = useColors();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return subscribers
      .filter((s) =>
        filter === "all"
          ? true
          : filter === "subscribed"
            ? s.subscribed
            : !s.subscribed,
      )
      .filter((s) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
        );
      });
  }, [query, filter, subscribers]);

  return (
    <>
      <SectionCard padding={18}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              Subscribe block
            </Text>
            <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
              Show a subscribe form on your arkio
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setAudienceCapture(!audienceCapture);
              showToast(
                audienceCapture
                  ? "Subscribe turned off"
                  : "Subscribe turned on",
              );
            }}
            style={[
              styles.toggle,
              {
                backgroundColor: audienceCapture
                  ? colors.success
                  : colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.toggleDot,
                { transform: [{ translateX: audienceCapture ? 18 : 0 }] },
              ]}
            />
          </Pressable>
        </View>
      </SectionCard>

      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <SearchNormal1 size={18} color={colors.mutedForeground} variant="Linear" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search subscribers"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.searchInput, { color: colors.foreground }]}
        />
        {query.length > 0 ? (
          <Pressable hitSlop={10} onPress={() => setQuery("")}>
            <CloseCircle size={18} color={colors.mutedForeground} variant="Linear" />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.filterRow}>
        {(["all", "subscribed", "unsubscribed"] as Filter[]).map((f) => {
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: active ? colors.foreground : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? colors.background : colors.foreground,
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                }}
              >
                {f === "all"
                  ? "All"
                  : f === "subscribed"
                    ? "Subscribed"
                    : "Unsubscribed"}
              </Text>
            </Pressable>
          );
        })}
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => router.push("/contacts")}
          style={[styles.exportBtn, { borderColor: colors.border }]}
        >
          <Import size={14} color={colors.foreground} variant="Linear" />
          <Text style={[styles.exportText, { color: colors.foreground }]}>
            Export
          </Text>
        </Pressable>
      </View>

      <SectionCard padding={0}>
        {filtered.length === 0 ? (
          <View style={styles.emptyManage}>
            <People size={28} color={colors.mutedForeground} variant="Linear" />
            <Text
              style={[styles.emptyTitle, { color: colors.foreground }]}
            >
              No subscribers yet
            </Text>
            <Text
              style={[styles.emptySub, { color: colors.mutedForeground }]}
            >
              {query
                ? "No matches for that search."
                : "Once people subscribe they’ll appear here."}
            </Text>
          </View>
        ) : (
          filtered.map((s, i) => (
            <View
              key={s.email}
              style={[
                styles.subRow,
                i !== filtered.length - 1 && {
                  borderBottomColor: colors.border,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <View
                style={[styles.avatar, { backgroundColor: colors.secondary }]}
              >
                <Text style={[styles.avatarText, { color: colors.foreground }]}>
                  {s.name[0]}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.subName, { color: colors.foreground }]}>
                  {s.name}
                </Text>
                <Text style={[styles.subEmail, { color: colors.mutedForeground }]}>
                  {s.email}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.subDate, { color: colors.mutedForeground }]}>
                  {s.date}
                </Text>
                <View
                  style={[
                    styles.subBadge,
                    {
                      backgroundColor: s.subscribed
                        ? "#DCFCE7"
                        : colors.secondary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.subBadgeText,
                      { color: s.subscribed ? "#16A34A" : colors.foreground },
                    ]}
                  >
                    {s.subscribed ? "Subscribed" : "Unsubscribed"}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </SectionCard>
    </>
  );
}

function IntegrationsTab() {
  const colors = useColors();
  return (
    <>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Audience integrations
      </Text>
      <Text
        style={[styles.cardSub, { color: colors.mutedForeground, marginTop: -8 }]}
      >
        Use your favorite marketing tools to make the most of the audience
        you’re growing
      </Text>

      <IntegrationCard
        name="Klaviyo"
        color="#EA6F47"
        letter="k"
        description="Sync your list from arkio so every new signup gets your latest emails"
      />
      <IntegrationCard
        name="Kit"
        color="#3B82F6"
        letter="K"
        description="Sync your list from arkio so every new signup gets your latest emails"
      />
      <IntegrationCard
        name="Mailchimp"
        color="#FFE01B"
        letter="M"
        description="Sync your list from arkio so every new signup gets your latest emails"
      />
      <IntegrationCard
        name="ConvertKit"
        color="#FB7185"
        letter="C"
        description="Sync your list from arkio so every new signup gets your latest emails"
      />
    </>
  );
}

function IntegrationCard({
  name,
  color,
  letter,
  description,
}: {
  name: string;
  color: string;
  letter: string;
  description: string;
}) {
  const colors = useColors();
  const router = useRouter();
  const { showToast } = useApp();
  return (
    <SectionCard padding={18}>
      <View style={styles.intHeader}>
        <View style={[styles.intLogo, { backgroundColor: color }]}>
          <Text style={styles.intLetter}>{letter}</Text>
        </View>
        <Pressable
          onPress={() => router.push("/pro-upgrade")}
          style={[styles.upgradePill, { backgroundColor: "#0E0E0E" }]}
        >
          <Text style={styles.upgradeText}>Upgrade</Text>
          <Lock size={12} color="#FFF" variant="Linear" />
        </Pressable>
      </View>
      <Text style={[styles.cardTitle, { color: colors.foreground, marginTop: 12 }]}>
        {name}
      </Text>
      <Text
        style={[styles.cardSub, { color: colors.mutedForeground, marginTop: 4 }]}
      >
        {description}
      </Text>
      <Button
        title="Connect"
        variant="outline"
        onPress={() => showToast(`Connecting to ${name}...`)}
        style={{ marginTop: 14 }}
      />
    </SectionCard>
  );
}

function StatCol({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View style={styles.statCol}>
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <Text style={[styles.statValue, { color: colors.foreground }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  tabBtn: { paddingHorizontal: 14, paddingVertical: 8 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap" },
  statCol: { width: "50%", paddingVertical: 8 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 13, marginBottom: 4 },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 28 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 6 },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  cardSub: { fontFamily: "Inter_400Regular", fontSize: 13 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    padding: 3,
  },
  toggleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  exportText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  emptyManage: {
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 16,
    gap: 8,
  },
  emptyTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  emptySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    textAlign: "center",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  subName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  subEmail: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  subDate: { fontFamily: "Inter_400Regular", fontSize: 11 },
  subBadge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  subBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 10 },
  intHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  intLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  intLetter: { color: "#0E0E0E", fontFamily: "Inter_700Bold", fontSize: 22 },
  upgradePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  upgradeText: { color: "#FFFFFF", fontFamily: "Inter_600SemiBold", fontSize: 12 },
});
