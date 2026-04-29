import { UserAdd, EmptyWallet, Chart, People, Menu } from "iconsax-react-nativejs";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.foreground,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          marginTop: 0,
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          elevation: 0,
          height: isWeb ? 84 : undefined,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <UserAdd size={22} color={color} variant="Linear" />
          ),
        }}
      />
      <Tabs.Screen
        name="earn"
        options={{
          title: "Earn",
          tabBarIcon: ({ color }) => (
            <EmptyWallet
              size={22}
              color={color}
              variant="Linear"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <Chart size={22} color={color} variant="Linear" />
          ),
        }}
      />
      <Tabs.Screen
        name="audience"
        options={{
          title: "Audience",
          tabBarIcon: ({ color }) => (
            <People size={22} color={color} variant="Linear" />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <View>
              <Menu size={22} color={color} variant="Linear" />
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -3,
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: colors.destructive,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
