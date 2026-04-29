import { Instagram, Music, Play, Sms, Export, Add, FolderOpen, ArrowRight2, More, Calendar1, AddCircle, Eye, Brush, Magicpen, Edit2, TickCircle, ArchiveBook, CloseCircle, NotificationBing, ScanBarcode, DocumentCopy, Global, Menu as MenuIcon, ExportCurve, Trash, ShoppingBag } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  View,
  Linking,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SOCIAL_LOGOS } from "../add-to-bio";

import { Avatar } from "@/components/Avatar";
import { AppBottomSheet, SheetItem } from "@/components/AppBottomSheet";
import { ScreenHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function MyLinktreeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    profile,
    links,
    socials,
    subscription,
    instagramConnected,
    audienceCapture,
    toggleLink,
    archiveLink,
    removeLink,
    products,
    removeProduct,
    achievements,
    removeAchievement,
    showToast,
  } = useApp();

  const [profileSheetVisible, setProfileSheetVisible] = useState(false);
  const [setupSheetVisible, setSetupSheetVisible] = useState(false);
  const [linkSheet, setLinkSheet] = useState<string | null>(null);
  const [fabExpanded, setFabExpanded] = useState(false);
  const [shareSheetVisible, setShareSheetVisible] = useState(false);

  const visibleLinks = useMemo(
    () => links.filter((l) => !l.archived),
    [links],
  );

  const setupItems = useMemo(
    () => [
      { label: "Pick a username", done: !!profile.username },
      { label: "Add a profile photo", done: !!profile.avatarId },
      { label: "Add your first link", done: visibleLinks.length > 0 },
      {
        label: "Connect a social account",
        done: Object.values(socials).some(Boolean) || instagramConnected,
      },
      { label: "Turn on audience capture", done: audienceCapture },
    ],
    [profile, visibleLinks, socials, instagramConnected, audienceCapture, subscription],
  );

  const setupDone = setupItems.filter((i) => i.done).length;
  const setupPct = Math.round((setupDone / setupItems.length) * 100);

  const onShare = () => {
    setShareSheetVisible(true);
  };

  const socialPills = [
    ...SOCIAL_LOGOS.map((logo) => ({
      key: logo.id,
      icon: (
        <FontAwesome5
          name={logo.iconName as any}
          size={18}
          color={logo.color}
        />
      ),
      connected: socials[logo.id] || (logo.id === "instagram" && instagramConnected),
    })),
    {
      key: "email" as const,
      icon: <Sms size={18} color={colors.foreground} variant="Linear" />,
      connected: !!profile.email,
    },
  ];

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Links"
        rightContent={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Pressable hitSlop={10} onPress={onShare}>
              <Export size={22} color={colors.foreground} variant="Linear" />
            </Pressable>
            <Pressable hitSlop={10} onPress={() => router.push("/notifications")}>
              <NotificationBing size={22} color={colors.foreground} variant="Linear" />
            </Pressable>
          </View>
        }
        large
      />

      <View style={{ backgroundColor: colors.background, zIndex: 10 }}>
        <Pressable
          style={styles.profileRow}
          onPress={() => setProfileSheetVisible(true)}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={[styles.username, { color: colors.foreground }]}>
                @{profile.username}
              </Text>
              {profile.isVerified && (
                <FontAwesome5 name="check-circle" size={16} color="#3B82F6" />
              )}
            </View>
            <Text style={[styles.bio, { color: colors.mutedForeground }]}>
              {profile.bio || "Add bio"}
            </Text>
            <View style={styles.socialRow}>
              {socialPills.filter(s => s.connected).map((s) => (
                <SocialIcon
                  key={s.key}
                  icon={s.icon}
                  connected={false}
                  onPress={() => router.push("/social-connect")}
                />
              ))}
              <Pressable
                onPress={() => router.push("/social-connect")}
                style={[styles.socialAdd, { backgroundColor: colors.secondary }]}
              >
                <Add size={16} color={colors.foreground} variant="Linear" />
              </Pressable>
            </View>
          </View>
          {profile.profilePhotoUri ? (
            <Image source={{ uri: profile.profilePhotoUri }} style={styles.avatarImg} />
          ) : (
            <Avatar id={profile.avatarId} size={64} />
          )}
        </Pressable>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>

        <View style={styles.collectionRow}>
          <Pressable
            onPress={() => router.push("/add-link")}
            style={[
              styles.collectionBtn,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <FolderOpen size={16} color={colors.foreground} variant="Linear" />
            <Text style={[styles.collectionText, { color: colors.foreground }]}>
              Add collection
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/archive")}
            style={styles.archiveBtn}
          >
            <Text style={[styles.archiveText, { color: colors.foreground }]}>
              Archive
            </Text>
            <ArrowRight2 size={16} color={colors.foreground} variant="Linear" />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 16, gap: 12, marginTop: 8 }}>
          {visibleLinks.map((link) => (
            <View
              key={link.id}
              style={[
                styles.linkCard,
                { backgroundColor: colors.card, borderRadius: colors.radius },
              ]}
            >
              <View style={styles.linkHeader}>
                <Pressable
                  hitSlop={8}
                  onPress={() => setLinkSheet(link.id)}
                  style={{ marginRight: 8 }}
                >
                  <FontAwesome5
                    name="grip-vertical"
                    size={16}
                    color={colors.mutedForeground}
                  />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.linkTitle, { color: colors.foreground }]}
                    numberOfLines={1}
                  >
                    {link.title}
                  </Text>
                </View>
                <Switch
                  value={link.enabled}
                  onValueChange={() => toggleLink(link.id)}
                  disabled={link.pending}
                  trackColor={{ false: "#D4D4D8", true: colors.success }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {link.pending ? (
                <View
                  style={[styles.pendingBox, { backgroundColor: colors.pending }]}
                >
                  <Text
                    style={[styles.pendingText, { color: colors.pendingText }]}
                  >
                    {link.pendingMessage}
                  </Text>
                </View>
              ) : link.url ? (
                <Text
                  style={[styles.linkUrl, { color: colors.mutedForeground }]}
                  numberOfLines={1}
                >
                  {link.url}
                </Text>
              ) : null}

              {link.type === "bookings" ? (
                <View
                  style={[styles.iconChip, { backgroundColor: colors.secondary }]}
                >
                  <Calendar1 size={16} color={colors.foreground} variant="Linear" />
                </View>
              ) : null}
            </View>
          ))}

          {visibleLinks.length === 0 && products.length === 0 && achievements.length === 0 ? (
            <Pressable
              onPress={() => router.push("/add-link")}
              style={[
                styles.emptyLink,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <AddCircle size={22} color={colors.foreground} variant="Linear" />
              <Text style={[styles.emptyLinkText, { color: colors.foreground }]}>
                Add your first link
              </Text>
            </Pressable>
          ) : null}

          {/* === PRODUCTS SECTION === */}
          {products.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <ShoppingBag size={20} color={colors.foreground} variant="Linear" />
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.foreground }}>Products</Text>
              </View>
              {products.map((p) => (
                <View key={p.id} style={[styles.linkCard, { backgroundColor: colors.card, borderRadius: colors.radius, padding: 12, marginBottom: 10 }]}>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <Image source={{ uri: p.imageUri }} style={{ width: 60, height: 60, borderRadius: 8 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 15 }}>{p.title}</Text>
                      <Text style={{ color: colors.primary, fontFamily: "Inter_700Bold", fontSize: 14, marginTop: 4 }}>{p.price}</Text>
                    </View>
                    <Pressable hitSlop={10} onPress={() => removeProduct(p.id)}>
                      <Trash size={18} color="#EF4444" variant="Linear" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* === ACHIEVEMENTS SECTION === */}
          {achievements.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <FontAwesome5 name="trophy" size={18} color={colors.foreground} />
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.foreground }}>Achievements</Text>
              </View>
              {achievements.map((a) => (
                <View key={a.id} style={[styles.linkCard, { backgroundColor: colors.card, borderRadius: colors.radius, padding: 12, marginBottom: 10 }]}>
                  <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                    {a.imageUri ? (
                      <Image source={{ uri: a.imageUri }} style={{ width: 44, height: 44, borderRadius: 22 }} />
                    ) : (
                      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary + "10", alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome5 name={a.icon} size={18} color={colors.primary} />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 15 }}>{a.title}</Text>
                      {a.description ? (
                        <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 }} numberOfLines={1}>{a.description}</Text>
                      ) : null}
                    </View>
                    <Pressable hitSlop={10} onPress={() => removeAchievement(a.id)}>
                      <Trash size={18} color="#EF4444" variant="Linear" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={[styles.bottomBarWrap, { paddingBottom: insets.bottom + 16 }]}
        pointerEvents="box-none"
      >
        <View style={styles.bottomRow}>
          {setupPct < 100 ? (
            <Pressable
              onPress={() => setSetupSheetVisible(true)}
              style={[
                styles.setupBadge,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.setupText, { color: colors.foreground }]}>
                {setupPct}%
              </Text>
              <Text style={[styles.setupSub, { color: colors.foreground }]}>
                set up
              </Text>
            </Pressable>
          ) : (
            <View />
          )}

          <Pressable
            style={[styles.fabBtn, { backgroundColor: colors.primary }]}
            onPress={() => setFabExpanded(!fabExpanded)}
          >
            <View
              style={{
                transform: [{ rotate: fabExpanded ? "45deg" : "0deg" }],
              }}
            >
              <Add size={28} color="#FFFFFF" variant="Linear" />
            </View>
          </Pressable>


        </View>
      </View>

      <AppBottomSheet
        visible={profileSheetVisible}
        onClose={() => setProfileSheetVisible(false)}
      >
        <SheetItem
          icon={<Edit2 size={20} color={colors.foreground} variant="Linear" />}
          label="Edit Profile"
          onPress={() => {
            setProfileSheetVisible(false);
            router.push("/my-info");
          }}
        />
        <SheetItem
          icon={<Brush size={20} color={colors.foreground} variant="Linear" />}
          label="Visual Editor"
          onPress={() => {
            setProfileSheetVisible(false);
            router.push("/visual-editor");
          }}
        />
        <SheetItem
          icon={<FontAwesome5 name="palette" size={18} color={colors.foreground} />}
          label="Design Studio"
          onPress={() => {
            setProfileSheetVisible(false);
            router.push("/appearance");
          }}
        />
        <SheetItem
          icon={<Export size={20} color={colors.foreground} variant="Linear" />}
          label="Share"
          onPress={() => {
            setProfileSheetVisible(false);
            onShare();
          }}
        />
        <SheetItem
          icon={<Eye size={20} color={colors.foreground} variant="Linear" />}
          label="View"
          onPress={() => {
            setProfileSheetVisible(false);
            router.push("/preview");
          }}
        />
      </AppBottomSheet>

      <AppBottomSheet
        visible={setupSheetVisible}
        onClose={() => setSetupSheetVisible(false)}
        title={`Set up your arkio (${setupDone}/${setupItems.length})`}
      >
        {setupItems.map((item) => (
          <View
            key={item.label}
            style={styles.checklistRow}
          >
            <View
              style={[
                styles.checkCircle,
                {
                  backgroundColor: item.done ? colors.success : "transparent",
                  borderColor: item.done ? colors.success : colors.border,
                },
              ]}
            >
              {item.done ? (
                <TickCircle size={14} color="#FFFFFF" variant="Linear" />
              ) : null}
            </View>
            <Text
              style={[
                styles.checklistLabel,
                {
                  color: item.done ? colors.mutedForeground : colors.foreground,
                  textDecorationLine: item.done ? "line-through" : "none",
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </AppBottomSheet>

      <AppBottomSheet
        visible={!!linkSheet}
        onClose={() => setLinkSheet(null)}
      >
        <SheetItem
          icon={<Edit2 size={20} color={colors.foreground} variant="Linear" />}
          label="Edit"
          onPress={() => {
            setLinkSheet(null);
            router.push("/add-link");
          }}
        />
        <SheetItem
          icon={<ArchiveBook size={20} color={colors.foreground} variant="Linear" />}
          label="Archive"
          onPress={() => {
            if (linkSheet) {
              archiveLink(linkSheet);
              showToast("Link archived");
            }
            setLinkSheet(null);
          }}
        />
        <SheetItem
          icon={<CloseCircle size={20} color={colors.destructive || "red"} variant="Linear" />}
          label="Delete"
          onPress={() => {
            if (linkSheet) {
              removeLink(linkSheet);
              showToast("Link deleted forever");
            }
            setLinkSheet(null);
          }}
        />
        <SheetItem
          icon={<CloseCircle size={20} color={colors.foreground} variant="Linear" />}
          label="Cancel"
          onPress={() => setLinkSheet(null)}
        />
      </AppBottomSheet>
      {fabExpanded && (
        <View style={[styles.fabMenu, { bottom: insets.bottom + 84 }]}>
          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/visual-editor");
            }}
          >
            <ShoppingBag size={20} color="#2563EB" variant="Linear" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Add Product
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/visual-editor");
            }}
          >
            <FontAwesome5 name="trophy" size={18} color="#A21CAF" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Add Achievement
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/add-link");
            }}
          >
            <Add size={20} color={colors.foreground} variant="Linear" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Add Link
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/preview");
            }}
          >
            <Eye size={20} color={colors.foreground} variant="Linear" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Preview
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/visual-editor");
            }}
          >
            <Brush size={20} color={colors.foreground} variant="Linear" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Editor
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.fabMenuItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => {
              setFabExpanded(false);
              router.push("/ai-chat");
            }}
          >
            <Magicpen size={20} color={colors.foreground} variant="Linear" />
            <Text style={[styles.fabMenuText, { color: colors.foreground }]}>
              Enhance
            </Text>
          </Pressable>
        </View>
      )}

      <AppBottomSheet
        visible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        title="Share your arkio"
      >
        <View style={{ backgroundColor: "#011689", borderRadius: 16, padding: 24, alignItems: "center", marginVertical: 16 }}>
           <Avatar id={profile.avatarId} size={80} />
           <Text style={{ fontFamily: "Inter_700Bold", color: "#FFFFFF", fontSize: 20, marginTop: 12 }}>@{profile.username}</Text>
           <Text style={{ fontFamily: "Inter_500Medium", color: "#FFFFFF", fontSize: 14 }}>linktr.ee/{profile.username}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 }}>
           <Text style={{ flex: 1, fontFamily: "Inter_500Medium", fontSize: 15, color: colors.foreground }}>linktr.ee/{profile.username}</Text>
           <Pressable hitSlop={10} onPress={() => { showToast("Link copied!"); setShareSheetVisible(false); }}>
             <DocumentCopy size={20} color={colors.foreground} variant="Linear" />
           </Pressable>
        </View>

        <SheetItem
          icon={<MenuIcon size={20} color={colors.foreground} variant="Linear" />}
          label="Add to bio"
          trailing={<ArrowRight2 size={16} color={colors.mutedForeground} variant="Linear" />}
          onPress={() => {
            router.push("/add-to-bio");
            setShareSheetVisible(false);
          }}
        />
        <SheetItem
          icon={<ScanBarcode size={20} color={colors.foreground} variant="Linear" />}
          label="QR code"
          trailing={<ArrowRight2 size={16} color={colors.mutedForeground} variant="Linear" />}
          onPress={() => {
            router.push("/qr-code");
            setShareSheetVisible(false);
          }}
        />
        <SheetItem
          icon={<Export size={20} color={colors.foreground} variant="Linear" />}
          label="Share to..."
          trailing={<ArrowRight2 size={16} color={colors.mutedForeground} variant="Linear" />}
          onPress={() => {
            Share.share({ message: `Check out my arkio: arkio.me/${profile.username}` });
            setShareSheetVisible(false);
          }}
        />
        <SheetItem
          icon={<Global size={20} color={colors.foreground} variant="Linear" />}
          label="Open"
          trailing={<ExportCurve size={16} color={colors.mutedForeground} variant="Linear" />}
          onPress={() => {
            Linking.openURL(`https://linktr.ee/${profile.username}`);
            setShareSheetVisible(false);
          }}
        />
      </AppBottomSheet>
    </View>
  );
}

function SocialIcon({
  icon,
  connected,
  onPress,
}: {
  icon: React.ReactNode;
  connected: boolean;
  onPress: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.socialIconWrap, { backgroundColor: colors.secondary }]}
    >
      {icon}
      {connected ? (
        <View style={[styles.connectedDot, { borderColor: colors.background }]} />
      ) : null}
    </Pressable>
  );
}

function ActionItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable style={styles.actionItem} onPress={onPress}>
      {icon}
      <Text style={[styles.actionLabel, { color: colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  username: { fontFamily: "Inter_700Bold", fontSize: 20 },
  avatarImg: { width: 64, height: 64, borderRadius: 32 },
  bio: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  socialRow: { flexDirection: "row", gap: 6, marginTop: 12 },
  socialIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  connectedDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22C55E",
    borderWidth: 2,
  },
  socialAdd: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 16 },
  collectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  collectionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  collectionText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  archiveBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  archiveText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  linkCard: { padding: 16, gap: 8 },
  linkHeader: { flexDirection: "row", alignItems: "center" },
  linkTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  linkUrl: { fontFamily: "Inter_400Regular", fontSize: 13 },
  pendingBox: { padding: 12, borderRadius: 8, marginLeft: 26 },
  pendingText: { fontFamily: "Inter_500Medium", fontSize: 13, lineHeight: 18 },
  iconChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 26,
    marginTop: 4,
  },
  emptyLink: {
    padding: 22,
    borderWidth: 1.5,
    borderStyle: "dashed",
    alignItems: "center",
    gap: 8,
  },
  emptyLinkText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  setupBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#A78BFA",
    alignItems: "center",
    justifyContent: "center",
  },
  setupText: { fontFamily: "Inter_700Bold", fontSize: 13 },
  setupSub: { fontFamily: "Inter_400Regular", fontSize: 9 },
  bottomBarWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
  },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  fabMenu: {
    position: "absolute",
    right: 14,
    gap: 10,
    alignItems: "flex-end",
    zIndex: 9999,
  },
  fabMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  fabMenuText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  fabBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checklistLabel: { fontFamily: "Inter_500Medium", fontSize: 15, flex: 1 },
});
