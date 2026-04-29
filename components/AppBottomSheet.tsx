import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export function AppBottomSheet({
  visible,
  onClose,
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.card,
            paddingBottom: insets.bottom + 16,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        ]}
      >
        <View style={styles.handleWrap}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
        </View>
        {title ? (
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.foreground }]}>
              {title}
            </Text>
          </View>
        ) : null}
        {children}
      </View>
    </Modal>
  );
}

export function SheetItem({
  icon,
  label,
  onPress,
  destructive,
  trailing,
}: {
  icon?: React.ReactNode;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
  trailing?: React.ReactNode;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemRow,
        pressed && { opacity: 0.6 },
      ]}
    >
      {icon ? <View style={styles.itemIcon}>{icon}</View> : null}
      <Text
        style={[
          styles.itemLabel,
          { color: destructive ? colors.destructive : colors.foreground },
        ]}
      >
        {label}
      </Text>
      <View style={{ flex: 1 }} />
      {trailing}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  handleWrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  titleRow: {
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    gap: 14,
  },
  itemIcon: {
    width: 24,
    alignItems: "center",
  },
  itemLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
});
