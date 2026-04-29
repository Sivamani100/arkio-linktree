import { Calendar1, ArrowDown2, Eye, Direct, UserAdd, TrendUp, TickCircle, Global, Mobile, Monitor, Instagram, Facebook, Google } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBottomSheet, SheetItem } from "@/components/AppBottomSheet";
import { ScreenHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Range = "7d" | "30d" | "90d" | "all";

const insightsData: Record<
  Range,
  {
    views: number;
    clicks: number;
    contacts: number;
    ctr: string;
    trend: number[];
    sources: { name: string; value: number; icon: any; color: string }[];
    devices: { name: string; value: number; icon: any }[];
    topLinks: { title: string; clicks: number; change: string }[];
  }
> = {
  "7d": {
    views: 1248,
    clicks: 452,
    contacts: 12,
    ctr: "36.2%",
    trend: [45, 62, 58, 85, 112, 98, 145, 132, 168, 155, 190, 182, 210, 245],
    sources: [
      { name: "Instagram", value: 65, icon: Instagram, color: "#E1306C" },
      { name: "Direct", value: 20, icon: Direct, color: "#3B82F6" },
      { name: "Google", value: 10, icon: Google, color: "#EA4335" },
      { name: "Others", value: 5, icon: Global, color: "#6B7280" },
    ],
    devices: [
      { name: "Mobile", value: 85, icon: Mobile },
      { name: "Desktop", value: 15, icon: Monitor },
    ],
    topLinks: [
      { title: "My latest reel", clicks: 245, change: "+15%" },
      { title: "Book a 1:1 call", clicks: 112, change: "+8%" },
      { title: "Shop my picks", clicks: 85, change: "+4%" },
    ],
  },
  "30d": {
    views: 5840,
    clicks: 1920,
    contacts: 48,
    ctr: "32.8%",
    trend: [120, 145, 130, 160, 180, 210, 195, 230, 255, 240, 280, 310, 290, 320, 350, 330, 370, 400, 380, 420, 450, 430, 470, 500, 480, 520, 550, 530, 570, 600],
    sources: [
      { name: "Instagram", value: 58, icon: Instagram, color: "#E1306C" },
      { name: "Direct", value: 25, icon: Direct, color: "#3B82F6" },
      { name: "Google", value: 12, icon: Google, color: "#EA4335" },
      { name: "Others", value: 5, icon: Global, color: "#6B7280" },
    ],
    devices: [
      { name: "Mobile", value: 82, icon: Mobile },
      { name: "Desktop", value: 18, icon: Monitor },
    ],
    topLinks: [
      { title: "My latest reel", clicks: 840, change: "+22%" },
      { title: "Book a 1:1 call", clicks: 420, change: "+12%" },
      { title: "Newsletter Signup", clicks: 310, change: "+5%" },
    ],
  },
  "90d": {
    views: 18450,
    clicks: 6120,
    contacts: 154,
    ctr: "33.1%",
    trend: [400, 450, 420, 480, 510, 550, 530, 580, 610, 590, 640, 680, 650, 700, 740, 720, 770, 810, 790, 840, 880, 860, 910, 950, 930, 980, 1020, 1000, 1050, 1100],
    sources: [
      { name: "Instagram", value: 52, icon: Instagram, color: "#E1306C" },
      { name: "Direct", value: 30, icon: Direct, color: "#3B82F6" },
      { name: "Google", value: 14, icon: Google, color: "#EA4335" },
      { name: "Others", value: 4, icon: Global, color: "#6B7280" },
    ],
    devices: [
      { name: "Mobile", value: 78, icon: Mobile },
      { name: "Desktop", value: 22, icon: Monitor },
    ],
    topLinks: [
      { title: "My latest reel", clicks: 2450, change: "+35%" },
      { title: "Book a 1:1 call", clicks: 1240, change: "+18%" },
      { title: "Portfolio link", clicks: 980, change: "+10%" },
    ],
  },
  all: {
    views: 42800,
    clicks: 14200,
    contacts: 382,
    ctr: "33.2%",
    trend: [800, 850, 820, 880, 910, 950, 930, 980, 1020, 1000, 1050, 1100, 1080, 1150, 1200, 1180, 1250, 1310, 1290, 1340, 1400, 1380, 1450, 1510, 1490, 1540, 1600, 1580, 1650, 1720],
    sources: [
      { name: "Instagram", value: 48, icon: Instagram, color: "#E1306C" },
      { name: "Direct", value: 35, icon: Direct, color: "#3B82F6" },
      { name: "Google", value: 15, icon: Google, color: "#EA4335" },
      { name: "Others", value: 2, icon: Global, color: "#6B7280" },
    ],
    devices: [
      { name: "Mobile", value: 75, icon: Mobile },
      { name: "Desktop", value: 25, icon: Monitor },
    ],
    topLinks: [
      { title: "My latest reel", clicks: 5840, change: "+45%" },
      { title: "Book a 1:1 call", clicks: 3120, change: "+25%" },
      { title: "Main Website", clicks: 2450, change: "+15%" },
    ],
  },
};

export default function InsightsScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [range, setRange] = useState<Range>("7d");
  const [rangeSheet, setRangeSheet] = useState(false);
  const { subscription } = useApp();

  const data = insightsData[range];
  const rangeLabel = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "90d": "Last 90 days",
    all: "All time",
  }[range];

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Analytics"
        large
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <Pressable
          onPress={() => setRangeSheet(true)}
          style={[
            styles.rangePill,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Calendar1 size={16} color={colors.foreground} variant="Linear" />
          <Text style={[styles.rangeText, { color: colors.foreground }]}>
            {rangeLabel}
          </Text>
          <ArrowDown2 size={16} color={colors.foreground} variant="Linear" />
        </Pressable>

        <View style={styles.statRow}>
          <StatCard
            label="Views"
            value={data.views.toLocaleString()}
            delta="+14.5%"
            icon={<Eye size={20} color={colors.primary} variant="Linear" />}
            colors={colors}
          />
          <StatCard
            label="Clicks"
            value={data.clicks.toLocaleString()}
            delta="+8.2%"
            icon={<Direct size={20} color="#10B981" variant="Linear" />}
            colors={colors}
          />
        </View>

        <View style={styles.statRow}>
          <StatCard
            label="Subscribers"
            value={data.contacts.toLocaleString()}
            delta="+4"
            icon={<UserAdd size={20} color="#F59E0B" variant="Linear" />}
            colors={colors}
            onPress={() => router.push("/contacts")}
          />
          <StatCard
            label="CTR"
            value={data.ctr}
            delta="+2.1%"
            icon={<TrendUp size={20} color="#8B5CF6" variant="Linear" />}
            colors={colors}
          />
        </View>

        {/* --- COMPLEX LINE CHART --- */}
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: colors.foreground }]}>Performance</Text>
              <Text style={[styles.chartSub, { color: colors.mutedForeground }]}>Daily views and interactions</Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendText, { color: colors.mutedForeground }]}>Views</Text>
            </View>
          </View>

          <LineChart data={data.trend} color={colors.primary} />
        </View>

        {/* --- TRAFFIC SOURCES --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Traffic Sources</Text>
          <View style={{ marginTop: 16, gap: 16 }}>
            {data.sources.map((source, index) => (
              <View key={source.name} style={styles.sourceRow}>
                <View style={[styles.sourceIconWrap, { backgroundColor: source.color + "15" }]}>
                  <source.icon size={18} color={source.color} variant="Linear" />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.sourceTextRow}>
                    <Text style={[styles.sourceName, { color: colors.foreground }]}>{source.name}</Text>
                    <Text style={[styles.sourceValue, { color: colors.foreground }]}>{source.value}%</Text>
                  </View>
                  <View style={[styles.progressBarBg, { backgroundColor: colors.secondary }]}>
                    <View style={[styles.progressBarFill, { width: `${source.value}%`, backgroundColor: source.color }]} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statRow}>
          {/* --- DEVICE BREAKDOWN --- */}
          <View style={[styles.halfCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitleSmall, { color: colors.foreground }]}>Devices</Text>
            <View style={{ marginTop: 12, gap: 12 }}>
              {data.devices.map((device) => (
                <View key={device.name} style={styles.deviceRow}>
                  <device.icon size={18} color={colors.mutedForeground} variant="Linear" />
                  <Text style={[styles.deviceText, { color: colors.foreground }]}>{device.name}</Text>
                  <Text style={[styles.deviceValue, { color: colors.mutedForeground }]}>{device.value}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* --- TOP COUNTRIES (SIMULATED) --- */}
          <View style={[styles.halfCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitleSmall, { color: colors.foreground }]}>Top Countries</Text>
            <View style={{ marginTop: 12, gap: 8 }}>
              {[
                { name: "India", value: "62%" },
                { name: "USA", value: "18%" },
                { name: "UK", value: "8%" },
                { name: "Others", value: "12%" },
              ].map((c) => (
                <View key={c.name} style={styles.countryRow}>
                  <Text style={[styles.countryText, { color: colors.foreground }]}>{c.name}</Text>
                  <Text style={[styles.countryValue, { color: colors.mutedForeground }]}>{c.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* --- TOP LINKS --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Top Performing Links</Text>
          <View style={{ marginTop: 16 }}>
            {data.topLinks.map((link, index) => (
              <View key={link.title} style={[styles.linkPerfRow, index !== data.topLinks.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.linkTitle, { color: colors.foreground }]} numberOfLines={1}>{link.title}</Text>
                  <Text style={[styles.linkClicks, { color: colors.mutedForeground }]}>{link.clicks} clicks</Text>
                </View>
                <View style={[styles.linkChangeBadge, { backgroundColor: link.change.startsWith("+") ? "#DCFCE7" : "#FEE2E2" }]}>
                  <Text style={[styles.linkChangeText, { color: link.change.startsWith("+") ? "#16A34A" : "#EF4444" }]}>{link.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      <AppBottomSheet
        visible={rangeSheet}
        onClose={() => setRangeSheet(false)}
        title="Select Date Range"
      >
        {(["7d", "30d", "90d", "all"] as Range[]).map((r) => (
          <SheetItem
            key={r}
            label={
              {
                "7d": "Last 7 days",
                "30d": "Last 30 days",
                "90d": "Last 90 days",
                all: "All time",
              }[r]
            }
            onPress={() => {
              setRange(r);
              setRangeSheet(false);
            }}
            trailing={
              range === r ? (
                <TickCircle size={20} color={colors.primary} variant="Linear" />
              ) : null
            }
          />
        ))}
      </AppBottomSheet>
    </View>
  );
}

function LineChart({ data, color }: { data: number[]; color: string }) {
  const chartWidth = SCREEN_WIDTH - 64;
  const chartHeight = 160;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((v - min) / range) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;
  const areaData = `${pathData} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <View style={{ height: chartHeight, width: chartWidth, marginTop: 24 }}>
      <Svg height={chartHeight} width={chartWidth}>
        <Defs>
          <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </SvgGradient>
        </Defs>
        <Path d={areaData} fill="url(#grad)" />
        <Path d={pathData} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Draw specific points for visual complexity */}
        {data.length <= 15 && data.map((v, i) => {
          const x = (i / (data.length - 1)) * chartWidth;
          const y = chartHeight - ((v - min) / range) * (chartHeight - 20) - 10;
          return <Circle key={i} cx={x} cy={y} r="4" fill="#FFF" stroke={color} strokeWidth="2" />;
        })}
      </Svg>
    </View>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon,
  colors,
  onPress,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  colors: ReturnType<typeof useColors>;
  onPress?: () => void;
}) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.statCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
          {icon}
        </View>
        <View style={[styles.deltaBadge, { backgroundColor: delta.startsWith("-") ? "#FEE2E2" : "#DCFCE7" }]}>
           <Text style={[styles.deltaText, { color: delta.startsWith("-") ? "#EF4444" : "#16A34A" }]}>{delta}</Text>
        </View>
      </View>
      <Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  rangePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 20,
  },
  rangeText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  statRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deltaBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  deltaText: { fontFamily: "Inter_700Bold", fontSize: 10 },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 22 },
  statLabel: { fontFamily: "Inter_500Medium", fontSize: 13, marginTop: 4 },
  chartCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 12,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  chartTitle: { fontFamily: "Inter_700Bold", fontSize: 18 },
  chartSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  chartLegend: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: "Inter_500Medium", fontSize: 12 },
  sectionCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 12,
  },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 17 },
  sourceRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  sourceIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  sourceTextRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  sourceName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  sourceValue: { fontFamily: "Inter_700Bold", fontSize: 14 },
  progressBarBg: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  halfCard: { flex: 1, padding: 16, borderRadius: 20, borderWidth: 1 },
  sectionTitleSmall: { fontFamily: "Inter_700Bold", fontSize: 15 },
  deviceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  deviceText: { flex: 1, fontFamily: "Inter_500Medium", fontSize: 13 },
  deviceValue: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  countryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  countryText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  countryValue: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  linkPerfRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  linkTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  linkClicks: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  linkChangeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  linkChangeText: { fontFamily: "Inter_700Bold", fontSize: 12 },
});
