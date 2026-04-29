import { ArrowLeft2, Setting2, InfoCircle } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export function ScreenHeader({
  title,
  showBack = false,
  showSettings = false,
  showProBadge = false,
  showInfo = false,
  rightContent,
  large = false,
  onSettingsPress,
}: {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  showProBadge?: boolean;
  showInfo?: boolean;
  rightContent?: React.ReactNode;
  large?: boolean;
  onSettingsPress?: () => void;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? Math.max(insets.top, 16) : insets.top;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: topPad + 6, backgroundColor: colors.background },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.leftSide}>
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.iconBtn}
            >
              <ArrowLeft2 size={26} color={colors.foreground} variant="Linear" />
            </Pressable>
          ) : null}
          {!showBack || large ? (
            <Text
              style={[
                large ? styles.titleLarge : styles.title,
                { color: colors.foreground },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : (
            <Text
              style={[styles.titleCenter, { color: colors.foreground }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightSide}>
          {showProBadge ? (
            <Pressable
              style={[styles.proBadge, { borderColor: colors.primary }]}
              onPress={() => router.push("/edit-plan")}
            >
              <Text style={[styles.proText, { color: colors.primary }]}>
                Try Pro for free
              </Text>
            </Pressable>
          ) : null}
          {rightContent}
          {showSettings ? (
            <Pressable
              hitSlop={10}
              style={styles.iconBtn}
              onPress={onSettingsPress}
            >
              <Setting2 size={22} color={colors.foreground} variant="Linear" />
            </Pressable>
          ) : null}
          {showInfo ? (
            <Pressable hitSlop={10} style={styles.iconBtn}>
              <InfoCircle size={22} color={colors.foreground} variant="Linear" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
  },
  titleLarge: {
    fontFamily: "Inter_700Bold",
    fontSize: 30,
  },
  titleCenter: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    flex: 1,
    textAlign: "center",
    marginRight: 26,
  },
  proBadge: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  proText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  iconBtn: {
    padding: 4,
  },
});

export function StackHeader({
  title,
  rightContent,
}: {
  title: string;
  rightContent?: React.ReactNode;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad = Platform.OS === "web" ? Math.max(insets.top, 16) : insets.top;

  return (
    <View
      style={[
        stackStyles.container,
        { paddingTop: topPad + 6, backgroundColor: colors.background },
      ]}
    >
      <View style={stackStyles.row}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={stackStyles.backBtn}
        >
          <ArrowLeft2 size={26} color={colors.foreground} variant="Linear" />
        </Pressable>
        <Text
          style={[stackStyles.title, { color: colors.foreground }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={stackStyles.right}>{rightContent}</View>
      </View>
    </View>
  );
}

const stackStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 36,
  },
  backBtn: {
    width: 32,
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
  },
  right: {
    width: 32,
    alignItems: "flex-end",
  },
});

export function Section({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ paddingHorizontal: 16 }, style]}>{children}</View>;
}
