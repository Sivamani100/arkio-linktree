import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { StackHeader } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function MyInfoScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile, updateProfile } = useApp();

  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);

  const onSave = () => {
    updateProfile({ username, email, name, bio });
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="My Information" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 100,
            gap: 14,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarRow}>
            <Avatar id={profile.avatarId} size={88} />
          </View>

          <SectionCard padding={0}>
            <Field
              label="Username"
              value={username}
              onChangeText={setUsername}
              prefix="linktr.ee/"
            />
            <Divider />
            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Divider />
            <Field label="Name" value={name} onChangeText={setName} />
            <Divider />
            <Field
              label="Bio"
              value={bio}
              onChangeText={setBio}
              multiline
              placeholder="Tell people about yourself"
            />
          </SectionCard>

          <Button title="Save" variant="primary" onPress={onSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  prefix,
  keyboardType,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (s: string) => void;
  prefix?: string;
  keyboardType?: "default" | "email-address";
  multiline?: boolean;
  placeholder?: string;
}) {
  const colors = useColors();
  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <View style={styles.inputRow}>
        {prefix ? (
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
            }}
          >
            {prefix}
          </Text>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          style={[
            styles.input,
            { color: colors.foreground },
            multiline && { minHeight: 60, textAlignVertical: "top" },
          ]}
        />
      </View>
    </View>
  );
}

function Divider() {
  const colors = useColors();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border,
      }}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  avatarRow: { alignItems: "center", paddingVertical: 18 },
  field: { paddingHorizontal: 16, paddingVertical: 12 },
  fieldLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    paddingVertical: 4,
  },
});
