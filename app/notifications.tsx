import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { NotificationBing, More } from "iconsax-react-nativejs";
import { StackHeader } from "@/components/Header";
import { useColors } from "@/hooks/useColors";

const FILTERS = ["All", "Updates", "Opportunities", "Insights"];

export default function NotificationsScreen() {
  const colors = useColors();
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader
        title="Notifications"
        rightContent={
          <Pressable hitSlop={10}>
            <More size={22} color={colors.foreground} variant="Linear" />
          </Pressable>
        }
      />
      
      <View style={styles.filterWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <Pressable
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[
                  styles.filterBtn,
                  {
                    backgroundColor: isActive ? colors.foreground : colors.background,
                    borderColor: isActive ? colors.foreground : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    { color: isActive ? colors.background : colors.foreground },
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.emptyWrap}>
        <View style={styles.emptyIconWrap}>
          <NotificationBing size={48} color={colors.mutedForeground} variant="Linear" />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
          No notifications yet
        </Text>
        <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
          Messages, new features, and insights will appear here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  filterWrap: {
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  emptyIconWrap: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginBottom: 8,
  },
  emptySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
