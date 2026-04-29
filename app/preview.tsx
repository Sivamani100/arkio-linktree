import { CloseCircle, ExportCurve } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

import { Button } from "@/components/Button";
import { LinktreeLogo } from "@/components/LinktreeLogo";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import { getTheme } from "@/utils/themes";

export default function PreviewScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, links, audienceCapture, products, achievements, awards, addSubscriber, showToast } = useApp();
  const [email, setEmail] = useState("");
  const theme = getTheme(profile.themeId);
  const ct = profile.customTheme;

  const visible = links.filter((l) => l.enabled && !l.pending);

  // ── Background color & text ──────────────────────────────────────────────
  const containerBg = ct
    ? ct.backgroundType === "flat"
      ? ct.backgroundColor
      : "#000"
    : theme.background;
  const textColor = ct ? ct.fontColor : theme.text;

  // ── Button styles ──────────────────────────────────────────────────────
  const getBtnStyle = () => {
    if (!ct) return { backgroundColor: theme.buttonBackground, borderRadius: 8, height: 52 };

    let radius = 8;
    if (ct.buttonShape === "pill") radius = 999;
    if (ct.buttonShape === "rectangle") radius = 0;

    const height = ct.buttonHeight || 52;

    if (ct.buttonStyle === "outline") {
      return { backgroundColor: "transparent", borderRadius: radius, borderWidth: 2, borderColor: ct.buttonColor };
    }
    if (ct.buttonStyle === "hardShadow") {
      return {
        backgroundColor: ct.buttonColor,
        borderRadius: radius,
        borderWidth: 2,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
      };
    }
    if (ct.buttonStyle === "glassmorphism") {
      return {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: radius,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(10px)",
      };
    }
    return { backgroundColor: ct.buttonColor, borderRadius: radius };
  };

  const btnRadius = !ct ? 8 : (ct.buttonShape === "pill" ? 999 : (ct.buttonShape === "rectangle" ? 0 : 8));
  const cardRadius = Math.min(btnRadius, 24);
  const btnHeight = ct?.buttonHeight || 52;

  const btnTextC = ct ? ct.buttonFontColor : theme.buttonText;
  const customBtnStyle = getBtnStyle();

  // ── Profile Photo ─────────────────────────────────────────────────────
  const ProfilePhoto = () => {
    if (profile.profilePhotoUri) {
      return (
        <Image
          source={{ uri: profile.profilePhotoUri }}
          style={styles.profilePhoto}
        />
      );
    }
    // fallback to default Avatar component-like placeholder
    return (
      <View style={[styles.profilePhoto, { backgroundColor: "#1D4ED8", alignItems: "center", justifyContent: "center" }]}>
        <FontAwesome5 name="user" size={40} color="#FFF" />
      </View>
    );
  };

  // ── Content ────────────────────────────────────────────────────────────
  const ContentBody = () => (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: insets.bottom + 60,
      }}
    >
      <ProfilePhoto />
      <View style={styles.nameRow}>
        <Text style={[styles.username, { color: textColor }]}>
          @{profile.username}
        </Text>
        {profile.isVerified && (
          <FontAwesome5 name="check-circle" size={20} color="#3B82F6" style={styles.verifiedBadge} />
        )}
      </View>
      {profile.bio ? (
        <Text style={[styles.bio, { color: textColor }]}>{profile.bio}</Text>
      ) : null}

      <View style={styles.linksWrap}>
        {visible.length === 0 ? (
          <View style={[styles.linkBtn, customBtnStyle, { height: btnHeight }]}>
            <Text style={[styles.linkText, { color: btnTextC }]}>
              Join {profile.username} on Linktree
            </Text>
          </View>
        ) : (
          visible.map((l) => {
            // If link has an image, render it as a card (like a product)
            if (l.imageUri) {
              return (
                <Pressable key={l.id} style={[styles.linkCard, customBtnStyle, { borderRadius: cardRadius, overflow: "hidden", width: "100%", marginBottom: 12 }]}>
                  <Image source={{ uri: l.imageUri }} style={{ width: "100%", height: 180 }} resizeMode="cover" />
                  <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: btnTextC, fontFamily: "Inter_700Bold", fontSize: 16, flex: 1 }}>{l.title}</Text>
                    <ExportCurve size={18} color={btnTextC} variant="Linear" />
                  </View>
                </Pressable>
              );
            }

            // Normal link button
            return (
              <Pressable key={l.id} style={[styles.linkBtn, customBtnStyle, { height: btnHeight, flexDirection: "row", paddingHorizontal: 20 }]}>
                <View style={{ width: 20 }} />
                <Text style={[styles.linkText, { color: btnTextC, flex: 1, textAlign: "center" }]}>{l.title}</Text>
                <ExportCurve size={18} color={btnTextC} variant="Linear" />
              </Pressable>
            );
          })
        )}
      </View>

      {audienceCapture ? (
        <View style={[styles.subscribeCard, customBtnStyle, { padding: 20 }]}>
          <Text style={[styles.subscribeTitle, { color: btnTextC }]}>Subscribe</Text>
          <Text style={[styles.subscribeSub, { color: btnTextC, opacity: 0.7, marginBottom: 12 }]}>
            Get the latest from @{profile.username}
          </Text>
          <TextInput
            placeholder="Email address"
            placeholderTextColor={btnTextC + "80"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: btnTextC + "10",
              borderRadius: 8,
              padding: 12,
              color: btnTextC,
              fontFamily: "Inter_500Medium",
              marginBottom: 10
            }}
          />
          <Button
            title="Subscribe"
            variant="primary"
            onPress={() => {
              if (!email.includes("@")) return showToast("Enter a valid email");
              addSubscriber(email);
              setEmail("");
              showToast("Subscribed successfully!");
            }}
          />
        </View>
      ) : null}

      {/* Products - Single Column */}
      {products.length > 0 && (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: textColor, fontFamily: "Inter_700Bold", fontSize: 17, marginBottom: 12 }}>🛍️ Products</Text>
          <View style={{ gap: 16 }}>
            {products.map((p) => (
              <Pressable key={p.id} style={[styles.prodCardWide, customBtnStyle, { borderRadius: cardRadius, overflow: "hidden", width: "100%" }]}>
                <Image source={{ uri: p.imageUri }} style={{ width: "100%", height: 200 }} resizeMode="cover" />
                <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: btnTextC, fontFamily: "Inter_600SemiBold", fontSize: 16 }} numberOfLines={1}>{p.title}</Text>
                    <Text style={{ color: btnTextC, fontFamily: "Inter_700Bold", fontSize: 18, marginTop: 4 }}>{p.price}</Text>
                  </View>
                  <ExportCurve size={20} color={btnTextC} variant="Linear" />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Achievements - 2 Columns */}
      {achievements.length > 0 && (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: textColor, fontFamily: "Inter_700Bold", fontSize: 17, marginBottom: 12 }}>🏆 Achievements</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {achievements.map((a) => (
              <View key={a.id} style={[styles.achCardGrid, customBtnStyle, { borderRadius: cardRadius, width: "48%", padding: 12, alignItems: "center" }]}>
                {a.imageUri ? (
                  <Image source={{ uri: a.imageUri }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10 }} />
                ) : (
                  <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: btnTextC + "10", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <FontAwesome5 name={a.icon} size={24} color={btnTextC} />
                  </View>
                )}
                <Text style={{ color: btnTextC, fontFamily: "Inter_700Bold", fontSize: 14, textAlign: "center" }} numberOfLines={1}>{a.title}</Text>
                <Text style={{ color: btnTextC, fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center", opacity: 0.7, marginTop: 4 }} numberOfLines={2}>{a.description}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: textColor, fontFamily: "Inter_700Bold", fontSize: 17, marginBottom: 12 }}>🎖️ Awards</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {awards.map((a) => (
              <View key={a.id} style={{ alignItems: "center", width: 90 }}>
                <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: a.color + "20", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                  <FontAwesome5 name={a.icon} size={22} color={a.color} />
                </View>
                <Text style={{ color: textColor, fontFamily: "Inter_600SemiBold", fontSize: 12, textAlign: "center" }}>{a.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerLogo}>
          <LinktreeLogo size={20} color={textColor} />
        </View>
        <Text style={{ color: textColor, fontFamily: "Inter_500Medium", fontSize: 13 }}>
          Join {profile.username} on Linktree
        </Text>
      </View>
    </ScrollView>
  );

  // ── Top Bar ───────────────────────────────────────────────────────────
  const TopBar = () => (
    <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 24) }]}>
      <Pressable hitSlop={12} onPress={() => router.back()}>
        <CloseCircle size={26} color={textColor} variant="Linear" />
      </Pressable>
      <Pressable hitSlop={12}>
        <ExportCurve size={22} color={textColor} variant="Linear" />
      </Pressable>
    </View>
  );

  // ── LIQUID GLASS ─────────────────────────────────────────────────────
  if (ct?.backgroundType === "liquid-glass") {
    return (
      <View style={styles.flex}>
        {/* Vibrant orb background */}
        <LinearGradient
          colors={["#0f0c29", "#302b63", "#24243e"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.orb, styles.orb1, { backgroundColor: ct.backgroundColor || "#667eea" }]} />
        <View style={[styles.orb, styles.orb2, { backgroundColor: "#f093fb" }]} />
        <View style={[styles.orb, styles.orb3, { backgroundColor: "#4facfe" }]} />
        {/* Frosted blur overlay */}
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        <TopBar />
        <ContentBody />
      </View>
    );
  }

  // ── GRADIENT BACKGROUND ────────────────────────────────────────────────
  if (ct?.backgroundType === "gradient" && ct.gradientColors) {
    return (
      <LinearGradient colors={ct.gradientColors} style={styles.flex} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <TopBar />
        <ContentBody />
      </LinearGradient>
    );
  }

  // ── IMAGE BACKGROUND ─────────────────────────────────────────────────
  if (ct?.backgroundType === "image" && ct.backgroundImageUri) {
    return (
      <ImageBackground source={{ uri: ct.backgroundImageUri }} style={styles.flex} resizeMode="cover">
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <TopBar />
        <ContentBody />
      </ImageBackground>
    );
  }

  // ── FLAT / DEFAULT ────────────────────────────────────────────────────
  return (
    <View style={[styles.flex, { backgroundColor: containerBg }]}>
      <TopBar />
      <ContentBody />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 8,
  },
  username: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
  },
  verifiedBadge: { marginTop: 1 },
  bio: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    opacity: 0.85,
  },
  linksWrap: {
    width: "100%",
    gap: 12,
    marginTop: 22,
  },
  linkBtn: {
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  linkText: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  subscribeCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    marginTop: 14,
    alignItems: "center",
  },
  subscribeTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  subscribeSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    marginTop: 4,
  },
  footer: { alignItems: "center", marginTop: 36 },
  footerLogo: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  // Liquid Glass Orbs
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.6,
  },
  orb1: { width: 280, height: 280, top: -60, left: -80 },
  orb2: { width: 220, height: 220, top: 300, right: -60 },
  orb3: { width: 200, height: 200, bottom: 100, left: 20 },
  prodCardWide: { borderRadius: 14 },
  achCardGrid: { borderRadius: 14 },
  achRow: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14 },
});
