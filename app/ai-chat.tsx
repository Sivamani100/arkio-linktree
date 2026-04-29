import { Edit2, Magicpen, ArrowUp2 } from "iconsax-react-nativejs";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const SUGGESTIONS = [
  "What were my top performing links last month?",
  "Where is most of my audience from?",
  "Which day of the week gets the most traffic?",
  "What can I do to grow my audience?",
];

function generateReply(prompt: string) {
  const lower = prompt.toLowerCase();
  if (lower.includes("top") || lower.includes("performing")) {
    return "Based on your last 30 days, your top three links were Winter essentials (212 clicks, 17.5% CTR), My Amazon finds (164 clicks, 13.6% CTR), and YouTube Channel (98 clicks, 8.1% CTR). Try pinning Winter essentials to the top to keep momentum.";
  }
  if (lower.includes("audience") && lower.includes("from")) {
    return "Most of your audience is in the US (47%), followed by India (18%), the UK (11%), and Canada (7%). Posting in the early evening US time should reach the largest share.";
  }
  if (lower.includes("day") || lower.includes("week")) {
    return "Wednesdays and Sundays bring the most traffic to your Linktree. Sunday afternoons see your highest conversion to subscriptions.";
  }
  if (lower.includes("grow")) {
    return "Three quick wins: 1) turn on the Subscribe block in Audience, 2) connect your Instagram and link your latest posts, and 3) add a short bio with one clear call-to-action.";
  }
  return "Great question. Based on your current data, I'd recommend keeping your most popular links near the top, refreshing your design every few weeks, and adding a Subscribe form so you can reach your audience directly.";
}

export default function AiChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { aiChats, createAiChat, addAiMessage } = useApp();

  const [chatId, setChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const chat = useMemo(
    () => aiChats.find((c) => c.id === chatId) ?? null,
    [aiChats, chatId],
  );

  const send = (text: string) => {
    if (!text.trim()) return;
    let id = chatId;
    if (!id) {
      id = createAiChat();
      setChatId(id);
    }
    addAiMessage(id, { role: "user", text: text.trim() });
    setInput("");
    setTimeout(() => {
      if (id) addAiMessage(id, { role: "assistant", text: generateReply(text) });
    }, 600);
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader
        title="Dig deeper"
        rightContent={
          <Pressable
            hitSlop={10}
            onPress={() => {
              setChatId(null);
              setInput("");
            }}
          >
            <Edit2 size={20} color={colors.foreground} variant="Linear" />
          </Pressable>
        }
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={64}
      >
        {!chat || chat.messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 20,
              flexGrow: 1,
              justifyContent: "center",
              gap: 12,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 18 }}>
              <LinearGradient
                colors={["#A855F7", "#7C3AED", "#3B82F6"]}
                style={styles.aiOrb}
              >
                <Magicpen
                  size={28}
                  color="#FFFFFF"
                  variant="Linear"
                />
              </LinearGradient>
              <Text style={[styles.heading, { color: colors.foreground }]}>
                Ask me anything about your Linktree
              </Text>
              <Text
                style={[styles.subhead, { color: colors.mutedForeground }]}
              >
                I can analyze your links, audience, and clicks to find what's
                working.
              </Text>
            </View>
            {SUGGESTIONS.map((s) => (
              <Pressable
                key={s}
                onPress={() => send(s)}
                style={[
                  styles.suggestion,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Magicpen
                  size={16}
                  color={colors.primary}
                  variant="Linear"
                />
                <Text
                  style={[
                    styles.suggestionText,
                    { color: colors.foreground },
                  ]}
                >
                  {s}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 12,
            }}
          >
            {chat.messages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.bubble,
                  m.role === "user"
                    ? { backgroundColor: colors.primary, alignSelf: "flex-end" }
                    : { backgroundColor: colors.card, alignSelf: "flex-start" },
                ]}
              >
                <Text
                  style={{
                    color:
                      m.role === "user" ? "#FFFFFF" : colors.foreground,
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                >
                  {m.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              marginBottom: insets.bottom + 8,
            },
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything about your Linktree"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground }]}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => send(input)}
            style={[
              styles.sendBtn,
              {
                backgroundColor: input.trim()
                  ? colors.primary
                  : colors.secondary,
              },
            ]}
          >
            <ArrowUp2
              size={18}
              color={input.trim() ? "#FFFFFF" : colors.mutedForeground}
              variant="Linear"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  aiOrb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heading: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  subhead: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 24,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  suggestionText: { fontFamily: "Inter_500Medium", fontSize: 14, flex: 1 },
  bubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
  },
  input: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 15 },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
