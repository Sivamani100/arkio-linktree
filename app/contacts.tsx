// import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { StackHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const { width: screenW } = Dimensions.get("window");

const series = [3, 5, 4, 7, 9, 11, 10, 14, 12, 16, 18, 22, 24, 28, 30];
const labels = ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 28"];

export default function ContactsScreen() {
  const colors = useColors();
  const { audienceCapture, setAudienceCapture, showToast } = useApp();

  const max = Math.max(...series);
  const chartW = screenW - 64;
  const chartH = 160;

  const points = useMemo(() => {
    return series.map((v, i) => {
      const x = (i / (series.length - 1)) * chartW;
      const y = chartH - (v / max) * chartH;
      return { x, y };
    });
  }, [chartW, max]);

  const path = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
  }, [points]);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Contacts" />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={[styles.statRow, { gap: 12 }]}>
          <Stat label="Subscribers" value="32" delta="+8" colors={colors} />
          <Stat label="This week" value="12" delta="+4" colors={colors} />
          <Stat label="Conv. rate" value="14%" delta="+2%" colors={colors} />
        </View>

        <View
          style={[
            styles.chartCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <Text style={[styles.chartTitle, { color: colors.foreground }]}>
            Subscriber growth
          </Text>
          <Text
            style={[styles.chartSub, { color: colors.mutedForeground }]}
          >
            Last 30 days
          </Text>

          <View style={{ height: chartH, marginTop: 16 }}>
            <View style={StyleSheet.absoluteFill}>
              {[0.25, 0.5, 0.75].map((p, i) => (
                <View
                  key={i}
                  style={[
                    styles.gridLine,
                    {
                      top: chartH * p,
                      backgroundColor: colors.border,
                    },
                  ]}
                />
              ))}
            </View>

            <Svg
              width={chartW}
              height={chartH}
              path={path}
              points={points}
              stroke={colors.primary}
              fill={colors.primary + "30"}
            />
          </View>

          <View style={styles.labels}>
            {labels.map((l) => (
              <Text
                key={l}
                style={[styles.labelText, { color: colors.mutedForeground }]}
              >
                {l}
              </Text>
            ))}
          </View>
        </View>

        <Pressable
          onPress={() => {
            setAudienceCapture(!audienceCapture);
            showToast(
              audienceCapture
                ? "Audience capture turned off"
                : "Audience capture turned on",
            );
          }}
          style={[
            styles.toggleCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.toggleTitle, { color: colors.foreground }]}>
              Audience capture
            </Text>
            <Text
              style={[styles.toggleSub, { color: colors.mutedForeground }]}
            >
              Collect emails from your visitors with a popup form.
            </Text>
          </View>
          <View
            style={[
              styles.toggle,
              {
                backgroundColor: audienceCapture ? colors.success : colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                { alignSelf: audienceCapture ? "flex-end" : "flex-start" },
              ]}
            />
          </View>
        </Pressable>

        <Text style={[styles.recentLabel, { color: colors.mutedForeground }]}>
          Recent subscribers
        </Text>

        {[
          { name: "Aanya Singh", email: "aanya@example.com", time: "2h ago" },
          { name: "Jordan Lee", email: "jordan.l@example.com", time: "1d ago" },
          { name: "Mira K.", email: "mira.k@example.com", time: "3d ago" },
          { name: "Devon R.", email: "devon.r@example.com", time: "5d ago" },
        ].map((c) => (
          <View
            key={c.email}
            style={[
              styles.contactRow,
              { backgroundColor: colors.card, borderRadius: colors.radius },
            ]}
          >
            <View
              style={[styles.avatar, { backgroundColor: colors.secondary }]}
            >
              <Text style={[styles.avatarText, { color: colors.foreground }]}>
                {c.name[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactName, { color: colors.foreground }]}>
                {c.name}
              </Text>
              <Text
                style={[styles.contactEmail, { color: colors.mutedForeground }]}
              >
                {c.email}
              </Text>
            </View>
            <Text
              style={[styles.contactTime, { color: colors.mutedForeground }]}
            >
              {c.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Stat({
  label,
  value,
  delta,
  colors,
}: {
  label: string;
  value: string;
  delta: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View
      style={[
        styles.statBox,
        { backgroundColor: colors.card, borderRadius: colors.radius },
      ]}
    >
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <Text style={[styles.statValue, { color: colors.foreground }]}>
        {value}
      </Text>
      <Text style={[styles.statDelta, { color: colors.success }]}>{delta}</Text>
    </View>
  );
}

function Svg({
  width,
  height,
  path,
  points,
  stroke,
  fill,
}: {
  width: number;
  height: number;
  path: string;
  points: { x: number; y: number }[];
  stroke: string;
  fill: string;
}) {
  const SvgComp = require("react-native-svg").default;
  const { Path, Circle } = require("react-native-svg");
  const areaPath = `${path} L ${points[points.length - 1].x} ${height} L 0 ${height} Z`;
  return (
    <SvgComp width={width} height={height}>
      <Path d={areaPath} fill={fill} stroke="none" />
      <Path d={path} stroke={stroke} strokeWidth={2.5} fill="none" />
      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={3} fill={stroke} />
      ))}
    </SvgComp>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  statRow: { flexDirection: "row" },
  statBox: { flex: 1, padding: 14 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 12 },
  statValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    marginTop: 6,
  },
  statDelta: { fontFamily: "Inter_500Medium", fontSize: 11, marginTop: 2 },
  chartCard: { padding: 16, marginTop: 16 },
  chartTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  chartSub: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  gridLine: {
    height: StyleSheet.hairlineWidth,
    left: 0,
    right: 0,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  labelText: { fontFamily: "Inter_400Regular", fontSize: 11 },
  toggleCard: {
    marginTop: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  toggleSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  toggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },
  recentLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    marginTop: 24,
    marginBottom: 8,
    paddingLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: "Inter_700Bold", fontSize: 16 },
  contactName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  contactEmail: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  contactTime: { fontFamily: "Inter_400Regular", fontSize: 11 },
});
