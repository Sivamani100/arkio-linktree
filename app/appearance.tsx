import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { StackHeader } from "@/components/Header";
import { useColors } from "@/hooks/useColors";
import { useApp, CustomTheme } from "@/context/AppContext";
import { THEMES } from "@/utils/themes";

// ─── Dummy Photo Libraries ───────────────────────────────────────────────────
const MALE_PHOTOS = [
  { id: "male-1", uri: "https://i.pravatar.cc/200?img=11" },
  { id: "male-2", uri: "https://i.pravatar.cc/200?img=12" },
  { id: "male-3", uri: "https://i.pravatar.cc/200?img=57" },
  { id: "male-4", uri: "https://i.pravatar.cc/200?img=68" },
  { id: "male-5", uri: "https://i.pravatar.cc/200?img=15" },
];
const FEMALE_PHOTOS = [
  { id: "female-1", uri: "https://i.pravatar.cc/200?img=47" },
  { id: "female-2", uri: "https://i.pravatar.cc/200?img=44" },
  { id: "female-3", uri: "https://i.pravatar.cc/200?img=49" },
  { id: "female-4", uri: "https://i.pravatar.cc/200?img=45" },
  { id: "female-5", uri: "https://i.pravatar.cc/200?img=48" },
];

const BACKGROUND_PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600",
  "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
];

const PRESET_COLORS = [
  "#000000", "#FFFFFF", "#F3F3F1", "#FF5B5B",
  "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B",
  "#EC4899", "#14B8A6", "#F97316", "#6366F1",
];

const GRADIENT_PRESETS: Array<[string, string]> = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#ffecd2", "#fcb69f"],
  ["#ff9a9e", "#fecfef"],
];

type Tab = "Profile" | "Background" | "Buttons" | "Themes" | "Badge" | "Achievements";

export default function AppearanceScreen() {
  const colors = useColors();
  const { profile, updateProfile, showToast, achievements, awards } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [photoGender, setPhotoGender] = useState<"male" | "female">("male");

  const ct: CustomTheme = profile.customTheme || {
    backgroundType: "flat",
    backgroundColor: "#F3F3F1",
    buttonStyle: "fill",
    buttonShape: "rounded",
    buttonColor: "#FFFFFF",
    buttonFontColor: "#000000",
    fontColor: "#000000",
    buttonHeight: 52,
  };

  const updateCT = (partial: Partial<CustomTheme>) => {
    updateProfile({ customTheme: { ...ct, ...partial } });
  };

  const pickProfilePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      updateProfile({ profilePhotoUri: result.assets[0].uri });
      showToast("Profile photo updated!");
    }
  };

  const pickBackgroundPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.8,
    });
    if (!result.canceled) {
      updateProfile({ backgroundPhotoUri: result.assets[0].uri });
      updateCT({ backgroundType: "image", backgroundImageUri: result.assets[0].uri });
      showToast("Background photo updated!");
    }
  };

  const router = useRouter();

  const SectionTitle = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
  );

  const ColorRow = ({
    label, value, onChange,
  }: { label: string; value: string; onChange: (c: string) => void }) => (
    <View style={styles.section}>
      <SectionTitle title={label} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorRow}>
        {PRESET_COLORS.map((c) => (
          <Pressable
            key={c}
            onPress={() => onChange(c)}
            style={[
              styles.colorCircle,
              { backgroundColor: c },
              (c === "#FFFFFF" || c === "#F3F3F1") && { borderWidth: 1, borderColor: colors.border },
              value === c && { borderWidth: 3, borderColor: colors.primary },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );

  // ─── Profile Tab ─────────────────────────────────────────────────────────
  const ProfileTab = () => (
    <View>
      {/* Current Profile Photo Preview */}
      <View style={styles.section}>
        <SectionTitle title="Profile Photo" />
        <View style={styles.profilePhotoWrap}>
          {profile.profilePhotoUri ? (
            <Image source={{ uri: profile.profilePhotoUri }} style={styles.profilePhotoBig} />
          ) : (
            <View style={[styles.profilePhotoBig, { backgroundColor: colors.secondary, alignItems: "center", justifyContent: "center" }]}>
              <FontAwesome5 name="user" size={40} color={colors.mutedForeground} />
            </View>
          )}
          <View style={styles.photoActions}>
            <Pressable onPress={pickProfilePhoto} style={[styles.photoBtn, { backgroundColor: colors.primary }]}>
              <FontAwesome5 name="camera" size={14} color="#FFF" />
              <Text style={styles.photoBtnText}>Upload Photo</Text>
            </Pressable>
            {profile.profilePhotoUri && (
              <Pressable
                onPress={() => updateProfile({ profilePhotoUri: undefined })}
                style={[styles.photoBtn, { backgroundColor: colors.destructive || "#EF4444" }]}
              >
                <FontAwesome5 name="trash" size={14} color="#FFF" />
                <Text style={styles.photoBtnText}>Remove</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* Dummy Photo Gallery */}
      <View style={styles.section}>
        <SectionTitle title="Or choose an avatar" />
        <View style={styles.genderToggle}>
          <Pressable
            onPress={() => setPhotoGender("male")}
            style={[styles.genderBtn, { backgroundColor: photoGender === "male" ? colors.primary : colors.secondary }]}
          >
            <Text style={{ color: photoGender === "male" ? "#FFF" : colors.foreground, fontFamily: "Inter_600SemiBold" }}>Male</Text>
          </Pressable>
          <Pressable
            onPress={() => setPhotoGender("female")}
            style={[styles.genderBtn, { backgroundColor: photoGender === "female" ? colors.primary : colors.secondary }]}
          >
            <Text style={{ color: photoGender === "female" ? "#FFF" : colors.foreground, fontFamily: "Inter_600SemiBold" }}>Female</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoGallery}>
          {(photoGender === "male" ? MALE_PHOTOS : FEMALE_PHOTOS).map((photo) => (
            <Pressable
              key={photo.id}
              onPress={() => updateProfile({ profilePhotoUri: photo.uri })}
              style={[
                styles.avatarThumb,
                profile.profilePhotoUri === photo.uri && { borderWidth: 3, borderColor: colors.primary },
              ]}
            >
              <Image source={{ uri: photo.uri }} style={styles.avatarThumbImg} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  // ─── Background Tab ────────────────────────────────────────────────────────
  const BackgroundTab = () => (
    <View>
      {/* Background Type Selector */}
      <View style={styles.section}>
        <SectionTitle title="Background Style" />
        <View style={styles.bgTypeRow}>
          {[
            { id: "flat", icon: "square", label: "Solid" },
            { id: "gradient", icon: "palette", label: "Gradient" },
            { id: "liquid-glass", icon: "tint", label: "Glass" },
            { id: "image", icon: "image", label: "Image" },
          ].map((type) => (
            <Pressable
              key={type.id}
              onPress={() => updateCT({ backgroundType: type.id as any })}
              style={[
                styles.bgTypeBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
                ct.backgroundType === type.id && { borderColor: colors.primary, borderWidth: 2 },
              ]}
            >
              <FontAwesome5 name={type.icon} size={20} color={ct.backgroundType === type.id ? colors.primary : colors.mutedForeground} />
              <Text style={{ color: colors.foreground, fontFamily: "Inter_500Medium", fontSize: 12, marginTop: 4 }}>{type.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Flat color */}
      {ct.backgroundType === "flat" && (
        <ColorRow label="Background Color" value={ct.backgroundColor} onChange={(c) => updateCT({ backgroundColor: c })} />
      )}

      {/* Gradient */}
      {ct.backgroundType === "gradient" && (
        <View style={styles.section}>
          <SectionTitle title="Gradient Presets" />
          <View style={styles.gradientGrid}>
            {GRADIENT_PRESETS.map((pair, i) => (
              <Pressable
                key={i}
                onPress={() => updateCT({ gradientColors: pair, backgroundColor: pair[0] })}
                style={[
                  styles.gradientCard,
                  JSON.stringify(ct.gradientColors) === JSON.stringify(pair) && { borderWidth: 3, borderColor: colors.primary },
                ]}
              >
                <LinearGradient colors={pair as [string, string]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Liquid Glass info */}
      {ct.backgroundType === "liquid-glass" && (
        <View style={[styles.glassInfoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LinearGradient colors={["#667eea33", "#764ba244"]} style={StyleSheet.absoluteFill} />
          <FontAwesome5 name="tint" size={32} color={colors.primary} />
          <Text style={[styles.glassTitle, { color: colors.foreground }]}>Liquid Glass</Text>
          <Text style={[styles.glassSub, { color: colors.mutedForeground }]}>
            A stunning frosted-glass effect with vibrant blurred orbs in the background. Perfect for a modern, premium look.
          </Text>
          <ColorRow label="Orb Accent Color" value={ct.backgroundColor} onChange={(c) => updateCT({ backgroundColor: c })} />
        </View>
      )}

      {/* Image background */}
      {ct.backgroundType === "image" && (
        <View>
          <View style={styles.section}>
            <SectionTitle title="Upload Background Image" />
            <Pressable onPress={pickBackgroundPhoto} style={[styles.uploadBtn, { borderColor: colors.primary }]}>
              <FontAwesome5 name="cloud-upload-alt" size={24} color={colors.primary} />
              <Text style={{ color: colors.primary, fontFamily: "Inter_600SemiBold", marginTop: 8 }}>Tap to upload</Text>
            </Pressable>
          </View>
          <View style={styles.section}>
            <SectionTitle title="Or pick a scene" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bgGallery}>
              {BACKGROUND_PHOTOS.map((uri, i) => (
                <Pressable
                  key={i}
                  onPress={() => updateCT({ backgroundType: "image", backgroundImageUri: uri })}
                  style={[
                    styles.bgThumb,
                    ct.backgroundImageUri === uri && { borderWidth: 3, borderColor: colors.primary },
                  ]}
                >
                  <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );

  // ─── Buttons Tab ──────────────────────────────────────────────────────────
  const ButtonsTab = () => (
    <View>
      <View style={styles.section}>
        <SectionTitle title="Button Shape" />
        <View style={styles.row}>
          {[
            { id: "rectangle", label: "Sharp", r: 0 },
            { id: "rounded", label: "Rounded", r: 12 },
            { id: "pill", label: "Pill", r: 999 },
          ].map((s) => (
            <Pressable
              key={s.id}
              onPress={() => updateCT({ buttonShape: s.id as any })}
              style={[
                styles.shapePreview,
                { backgroundColor: colors.card, borderColor: colors.border, borderRadius: s.r > 24 ? 24 : s.r },
                ct.buttonShape === s.id && { borderColor: colors.primary, borderWidth: 2 },
              ]}
            >
              <Text style={{ color: colors.foreground, fontFamily: "Inter_500Medium" }}>{s.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Button Style" />
        <View style={styles.row}>
          {[
            { id: "fill", label: "Filled" },
            { id: "outline", label: "Outline" },
            { id: "hardShadow", label: "Shadow" },
            { id: "glassmorphism", label: "Glass" },
          ].map((s) => (
            <Pressable
              key={s.id}
              onPress={() => updateCT({ buttonStyle: s.id as any })}
              style={[
                styles.shapePreview,
                { backgroundColor: colors.card, borderColor: colors.border },
                ct.buttonStyle === s.id && { borderColor: colors.primary, borderWidth: 2 },
              ]}
            >
              <Text style={{ color: colors.foreground, fontFamily: "Inter_500Medium" }}>{s.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title={`Button Height: ${ct.buttonHeight || 52}px`} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorRow}>
          {[40, 48, 52, 60, 68, 76].map((h) => (
            <Pressable
              key={h}
              onPress={() => updateCT({ buttonHeight: h })}
              style={[
                styles.heightPill,
                { backgroundColor: colors.card, borderColor: colors.border },
                ct.buttonHeight === h && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={{ color: colors.foreground, fontFamily: "Inter_500Medium" }}>{h}px</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ColorRow label="Button Color" value={ct.buttonColor} onChange={(c) => updateCT({ buttonColor: c })} />
      <ColorRow label="Button Text Color" value={ct.buttonFontColor} onChange={(c) => updateCT({ buttonFontColor: c })} />
      <ColorRow label="Profile Text Color" value={ct.fontColor} onChange={(c) => updateCT({ fontColor: c })} />
    </View>
  );

  // ─── Themes Tab ───────────────────────────────────────────────────────────
  const ThemesTab = () => (
    <View>
      <View style={styles.section}>
        <SectionTitle title="Preset Themes" />
        {profile.customTheme && (
          <Pressable
            onPress={() => { updateProfile({ customTheme: undefined }); showToast("Reverted to default theme"); }}
            style={[styles.clearBtn, { borderColor: "#EF4444" }]}
          >
            <FontAwesome5 name="undo" size={12} color="#EF4444" />
            <Text style={{ color: "#EF4444", marginLeft: 6, fontFamily: "Inter_500Medium" }}>Clear All Custom Styles</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.themeGrid}>
        {THEMES.map((theme) => (
          <Pressable
            key={theme.id}
            onPress={() => { updateProfile({ themeId: theme.id, customTheme: undefined }); showToast(`Applied ${theme.name}`); }}
            style={[
              styles.themeCard,
              { backgroundColor: theme.background, borderColor: colors.border },
              profile.themeId === theme.id && !profile.customTheme && { borderWidth: 3, borderColor: colors.primary },
            ]}
          >
            <View style={[styles.themeBar, { backgroundColor: theme.buttonBackground }]} />
            <View style={[styles.themeBar, { backgroundColor: theme.buttonBackground }]} />
            <View style={[styles.themeBar, { backgroundColor: theme.buttonBackground, width: "60%" }]} />
            <Text style={[styles.themeLabel, { color: theme.text }]}>{theme.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  // ─── Badge Tab ─────────────────────────────────────────────────────────────
  const BadgeTab = () => (
    <View>
      <View style={[styles.badgePreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.badgePreviewName, { color: colors.foreground }]}>
          @{profile.username}
          {profile.isVerified && (
            <Text>  </Text>
          )}
        </Text>
        {profile.isVerified && (
          <FontAwesome5 name="check-circle" size={20} color="#3B82F6" style={styles.verifiedIcon} />
        )}
        <Text style={[styles.badgePreviewSub, { color: colors.mutedForeground }]}>
          {profile.isVerified ? "✓ Verified Profile" : "Unverified Profile"}
        </Text>
      </View>

      <View style={[styles.section, styles.row, { alignItems: "center", justifyContent: "space-between" }]}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 4 }]}>Verified Badge</Text>
          <Text style={[{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13 }]}>
            Show a blue ✓ badge next to your name
          </Text>
        </View>
        <Switch
          value={profile.isVerified || false}
          onValueChange={(v) => { updateProfile({ isVerified: v }); showToast(v ? "Badge enabled!" : "Badge removed"); }}
          trackColor={{ false: colors.secondary, true: "#3B82F6" }}
          thumbColor="#FFF"
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <StackHeader title="Appearance Studio" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabsWrap, { borderBottomColor: colors.border }]} contentContainerStyle={styles.tabsContent}>
        {(["Profile", "Background", "Buttons", "Themes", "Badge", "Achievements"] as Tab[]).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabBtn, activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? colors.foreground : colors.mutedForeground }]}>{tab}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "Profile" && <ProfileTab />}
        {activeTab === "Background" && <BackgroundTab />}
        {activeTab === "Buttons" && <ButtonsTab />}
        {activeTab === "Themes" && <ThemesTab />}
        {activeTab === "Badge" && <BadgeTab />}
        {activeTab === "Achievements" && (
          <View>
            <SectionTitle title="Platform Awards" />
            <Text style={{ color: colors.mutedForeground, marginBottom: 16, fontSize: 13 }}>These are earned based on your profile activity.</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {awards.map((a) => (
                <View key={a.id} style={[styles.awardCard, { backgroundColor: colors.card, borderColor: colors.border, width: "100%" }]}>
                  <View style={[styles.awardIcon, { backgroundColor: a.color + "20" }]}>
                    <FontAwesome5 name={a.icon} size={20} color={a.color} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: 15 }}>{a.title}</Text>
                    <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 12 }}>Issued by {a.issuedBy}</Text>
                  </View>
                  <FontAwesome5 name="check-circle" size={16} color="#10B981" />
                </View>
              ))}
            </View>

            <View style={{ marginTop: 32 }}>
              <SectionTitle title="Your Achievements" />
              {achievements.length === 0 ? (
                <View style={{ padding: 20, alignItems: "center", borderWidth: 1, borderStyle: "dashed", borderRadius: 12, borderColor: colors.border }}>
                  <Text style={{ color: colors.mutedForeground }}>No achievements added yet.</Text>
                  <Pressable onPress={() => router.push("/visual-editor")} style={{ marginTop: 8 }}>
                    <Text style={{ color: colors.primary, fontFamily: "Inter_600SemiBold" }}>Go to Editor to add</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                  {achievements.map((a) => (
                    <View key={a.id} style={[styles.achCard, { backgroundColor: colors.card, borderColor: colors.border, width: "48%", padding: 12, alignItems: "center" }]}>
                      {a.imageUri ? (
                        <Image source={{ uri: a.imageUri }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10 }} />
                      ) : (
                        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primary + "10", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                          <FontAwesome5 name={a.icon} size={24} color={colors.primary} />
                        </View>
                      )}
                      <Text style={{ color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: 14, textAlign: "center" }} numberOfLines={1}>{a.title}</Text>
                      <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center", marginTop: 4 }} numberOfLines={2}>{a.description}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 80 },
  tabsWrap: { borderBottomWidth: 1, maxHeight: 54 },
  tabsContent: { paddingHorizontal: 4 },
  tabBtn: { paddingVertical: 16, paddingHorizontal: 16, alignItems: "center" },
  tabText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  section: { marginBottom: 28 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 15, marginBottom: 14 },
  row: { flexDirection: "row", gap: 12, flexWrap: "wrap" },

  // Profile Photo
  profilePhotoWrap: { flexDirection: "row", alignItems: "center", gap: 20 },
  profilePhotoBig: { width: 100, height: 100, borderRadius: 50 },
  photoActions: { flex: 1, gap: 10 },
  photoBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  photoBtnText: { color: "#FFF", fontFamily: "Inter_600SemiBold", fontSize: 14 },
  genderToggle: { flexDirection: "row", gap: 8, marginBottom: 14 },
  genderBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  photoGallery: { gap: 12, paddingVertical: 4 },
  avatarThumb: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: "transparent", overflow: "hidden" },
  avatarThumbImg: { width: 72, height: 72 },

  // Background
  bgTypeRow: { flexDirection: "row", gap: 10 },
  bgTypeBtn: { flex: 1, aspectRatio: 0.9, borderWidth: 1, borderRadius: 14, alignItems: "center", justifyContent: "center", gap: 4 },
  gradientGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  gradientCard: { width: "22%", aspectRatio: 1, borderRadius: 14, overflow: "hidden", borderWidth: 2, borderColor: "transparent" },
  glassInfoCard: { borderRadius: 20, borderWidth: 1, overflow: "hidden", padding: 24, alignItems: "center", gap: 8 },
  glassTitle: { fontFamily: "Inter_700Bold", fontSize: 20, marginTop: 4 },
  glassSub: { fontFamily: "Inter_400Regular", fontSize: 14, textAlign: "center", marginBottom: 16 },
  uploadBtn: { borderWidth: 2, borderStyle: "dashed", borderRadius: 16, height: 120, alignItems: "center", justifyContent: "center" },
  bgGallery: { gap: 12, paddingVertical: 4 },
  bgThumb: { width: 120, height: 180, borderRadius: 14, overflow: "hidden", borderWidth: 2, borderColor: "transparent" },

  // Buttons
  shapePreview: { flex: 1, minWidth: 80, height: 48, borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  heightPill: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderRadius: 20 },
  colorRow: { gap: 12, paddingVertical: 4 },
  colorCircle: { width: 44, height: 44, borderRadius: 22 },

  // Themes
  themeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 8 },
  themeCard: { width: "46%", height: 150, borderWidth: 1, borderRadius: 14, padding: 14, gap: 8, justifyContent: "center" },
  themeBar: { width: "100%", height: 18, borderRadius: 4 },
  themeLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12, marginTop: 4 },
  clearBtn: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderRadius: 8, alignSelf: "flex-start", marginBottom: 8 },

  // Badge
  badgePreview: { borderWidth: 1, borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 28 },
  badgePreviewName: { fontFamily: "Inter_700Bold", fontSize: 22, flexDirection: "row", alignItems: "center" },
  verifiedIcon: { marginLeft: 6 },
  badgePreviewSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 8 },
  awardCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
  awardIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  achCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
});
