import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AppearanceMode = "system" | "light" | "dark";

export type LinkType =
  | "link"
  | "bookings"
  | "digital-product"
  | "course"
  | "music"
  | "video";

export type Link = {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  enabled: boolean;
  pending?: boolean;
  pendingMessage?: string;
  archived?: boolean;
  imageUri?: string;
};

export type Product = {
  id: string;
  title: string;
  price: string;
  imageUri: string;
  url: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUri?: string;
};

export type Award = {
  id: string;
  title: string;
  issuedBy: string;
  icon: string;
  color: string;
};

export type Subscriber = {
  name: string;
  email: string;
  date: string;
  subscribed: boolean;
};

export type CustomTheme = {
  backgroundType: "flat" | "gradient" | "liquid-glass" | "image";
  backgroundColor: string;
  gradientColors?: [string, string];
  backgroundImageUri?: string;
  buttonStyle: "fill" | "outline" | "hardShadow" | "glassmorphism";
  buttonShape: "rectangle" | "rounded" | "pill";
  buttonColor: string;
  buttonFontColor: string;
  fontColor: string;
  buttonHeight?: number;
};

export type Profile = {
  username: string;
  email: string;
  name: string;
  bio: string;
  avatarId: string;
  profilePhotoUri?: string;
  backgroundPhotoUri?: string;
  isVerified?: boolean;
  themeId: string;
  customTheme?: CustomTheme;
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    email?: string;
  };
};

export type AiMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export type AiChat = {
  id: string;
  title: string;
  messages: AiMessage[];
  createdAt: number;
};

export type AppState = {
  ready: boolean;

  profile: Profile;
  updateProfile: (p: Partial<Profile>) => void;

  links: Link[];
  addLink: (l: Omit<Link, "id">) => void;
  toggleLink: (id: string) => void;
  removeLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  archiveLink: (id: string) => void;
  restoreLink: (id: string) => void;
  archivedLinks: Link[];
  updateLink: (id: string, l: Partial<Link>) => void;

  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;

  achievements: Achievement[];
  addAchievement: (a: Omit<Achievement, "id">) => void;
  removeAchievement: (id: string) => void;

  awards: Award[];
  subscribers: Subscriber[];
  addSubscriber: (email: string) => void;

  subscription: "pro";

  dataSharing: boolean;
  setDataSharing: (v: boolean) => void;

  appearance: AppearanceMode;
  setAppearance: (a: AppearanceMode) => void;

  hasOnboarded: boolean;
  completeOnboarding: () => void;

  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;

  socials: Record<string, boolean>;
  setSocialConnected: (key: string, v: boolean) => void;

  showTotalFollowers: boolean;
  setShowTotalFollowers: (v: boolean) => void;

  toast: string | null;
  showToast: (msg: string) => void;

  audienceCapture: boolean;
  setAudienceCapture: (v: boolean) => void;

  instagramConnected: boolean;
  setInstagramConnected: (v: boolean) => void;

  visitorMode: boolean;
  setVisitorMode: (v: boolean) => void;

  aiChats: AiChat[];
  createAiChat: () => string;
  addAiMessage: (chatId: string, m: Omit<AiMessage, "id">) => void;
  resetAiChats: () => void;

  resetAll: () => void;
};

const STORAGE_KEY = "@linktree_app_state_v1";

const defaultProfile: Profile = {
  username: "mallipurapuravi",
  email: "mallipurapuravi@gmail.com",
  name: "",
  bio: "",
  avatarId: "mask-blue",
  themeId: "air",
  socialLinks: {
    instagram: "",
    tiktok: "",
    youtube: "",
    email: "",
  },
};

const defaultLinks: Link[] = [];

const AppContext = createContext<AppState | null>(null);

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

type PersistShape = {
  profile: Profile;
  products: Product[];
  achievements: Achievement[];
  subscribers: Subscriber[];
  subscription: SubscriptionTier;
  dataSharing: boolean;
  appearance: AppearanceMode;
  hasOnboarded: boolean;
  audienceCapture: boolean;
  instagramConnected: boolean;
  isAuthenticated: boolean;
  socials: AppState["socials"];
  showTotalFollowers: boolean;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [subscription, setSubscription] = useState<SubscriptionTier>("free");
  const [dataSharing, setDataSharing] = useState(true);
  const [appearance, setAppearance] = useState<AppearanceMode>("light");
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [audienceCapture, setAudienceCapture] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [visitorMode, setVisitorMode] = useState(false);
  const [aiChats, setAiChats] = useState<AiChat[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socials, setSocials] = useState<Record<string, boolean>>({});
  const [showTotalFollowers, setShowTotalFollowers] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [awards] = useState<Award[]>([
    { id: "a1", title: "Early Adopter", issuedBy: "LinkHub", icon: "star", color: "#F59E0B" },
    { id: "a2", title: "100 Visitors", issuedBy: "LinkHub", icon: "eye", color: "#3B82F6" },
    { id: "a3", title: "Creator Badge", issuedBy: "LinkHub", icon: "award", color: "#8B5CF6" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw) as PersistShape;
          if (data.profile) setProfile({ ...defaultProfile, ...data.profile });
          if (data.links) {
            const filteredLinks = data.links.filter(l => !["1", "2", "3", "4"].includes(l.id));
            setLinks(filteredLinks);
          }
          if (typeof data.dataSharing === "boolean")
            setDataSharing(data.dataSharing);
          if (data.appearance) setAppearance(data.appearance);
          if (typeof data.hasOnboarded === "boolean")
            setHasOnboarded(data.hasOnboarded);
          if (typeof data.audienceCapture === "boolean")
            setAudienceCapture(data.audienceCapture);
          if (typeof data.instagramConnected === "boolean")
            setInstagramConnected(data.instagramConnected);
          if (typeof data.isAuthenticated === "boolean")
            setIsAuthenticated(data.isAuthenticated);
          if (data.socials) setSocials(data.socials);
          if (typeof data.showTotalFollowers === "boolean")
            setShowTotalFollowers(data.showTotalFollowers);
          if (data.products) setProducts(data.products);
          if (data.achievements) setAchievements(data.achievements);
          if (data.subscribers) setSubscribers(data.subscribers);
        }
      } catch {
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const data: PersistShape = {
      profile,
      links,
      products,
      achievements,
      subscribers,
      dataSharing,
      appearance,
      hasOnboarded,
      audienceCapture,
      instagramConnected,
      isAuthenticated,
      socials,
      showTotalFollowers,
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, [
    ready,
    profile,
    links,
    products,
    achievements,
    subscribers,
    dataSharing,
    appearance,
    hasOnboarded,
    audienceCapture,
    instagramConnected,
    isAuthenticated,
    socials,
    showTotalFollowers,
  ]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const signIn = useCallback(() => setIsAuthenticated(true), []);
  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setHasOnboarded(false);
  }, []);
  const setSocialConnected = useCallback(
    (key: keyof AppState["socials"], v: boolean) => {
      setSocials((prev) => ({ ...prev, [key]: v }));
    },
    [],
  );
  const showToast = useCallback((msg: string) => setToast(msg), []);

  const updateProfile = useCallback((p: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...p,
      socialLinks: { ...prev.socialLinks, ...(p.socialLinks ?? {}) },
    }));
  }, []);

  const addSubscriber = useCallback((email: string) => {
    setSubscribers((prev) => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const name = email.split("@")[0]; // Simple name extraction from email
      const newSubscriber: Subscriber = { email, name, date, subscribed: true };
      return [newSubscriber, ...prev];
    });
  }, []);

  const addLink = useCallback((l: Omit<Link, "id">) => {
    setLinks((prev) => [{ ...l, id: uid() }, ...prev]);
  }, []);

  const toggleLink = useCallback((id: string) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.id === id && !l.pending ? { ...l, enabled: !l.enabled } : l,
      ),
    );
  }, []);

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const reorderLinks = useCallback((newLinks: Link[]) => {
    setLinks(newLinks);
  }, []);

  const archiveLink = useCallback((id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, archived: true, enabled: false } : l)),
    );
  }, []);

  const restoreLink = useCallback((id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, archived: false } : l)),
    );
  }, []);

  const archivedLinks = useMemo(() => links.filter((l) => l.archived), [links]);

  const updateLink = useCallback((id: string, patch: Partial<Link>) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    );
  }, []);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [{ ...p, id: uid() }, ...prev]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addAchievement = useCallback((a: Omit<Achievement, "id">) => {
    setAchievements((prev) => [{ ...a, id: uid() }, ...prev]);
  }, []);

  const removeAchievement = useCallback((id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const completeOnboarding = useCallback(() => {
    setHasOnboarded(true);
  }, []);

  const createAiChat = useCallback(() => {
    const id = uid();
    setAiChats((prev) => [
      { id, title: "New conversation", messages: [], createdAt: Date.now() },
      ...prev,
    ]);
    return id;
  }, []);

  const addAiMessage = useCallback(
    (chatId: string, m: Omit<AiMessage, "id">) => {
      setAiChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, { ...m, id: uid() }],
                title:
                  c.messages.length === 0 && m.role === "user"
                    ? m.text.slice(0, 40)
                    : c.title,
              }
            : c,
        ),
      );
    },
    [],
  );

  const resetAiChats = useCallback(() => setAiChats([]), []);

  const resetAll = useCallback(() => {
    setProfile(defaultProfile);
    setLinks([]);
    setProducts([]);
    setAchievements([]);
    setSubscribers([]);
    setDataSharing(true);
    setAppearance("light");
    setHasOnboarded(false);
    setAudienceCapture(false);
    setInstagramConnected(false);
    setVisitorMode(false);
    setAiChats([]);
    setIsAuthenticated(false);
    setSocials({
      instagram: false,
      tiktokBusiness: false,
      tiktok: false,
      youtube: false,
    });
    setShowTotalFollowers(false);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  const value = useMemo<AppState>(
    () => ({
      ready,
      profile,
      updateProfile,
      links,
      addLink,
      toggleLink,
      removeLink,
      reorderLinks,
      archiveLink,
      restoreLink,
      archivedLinks,
      updateLink,
      products,
      addProduct,
      removeProduct,
      achievements,
      addAchievement,
      removeAchievement,
      awards,
      subscribers,
      addSubscriber,
      subscription: "pro",
      dataSharing,
      setDataSharing,
      appearance,
      setAppearance,
      hasOnboarded,
      completeOnboarding,
      audienceCapture,
      setAudienceCapture,
      instagramConnected,
      setInstagramConnected,
      visitorMode,
      setVisitorMode,
      aiChats,
      createAiChat,
      addAiMessage,
      resetAiChats,
      resetAll,
      isAuthenticated,
      signIn,
      signOut,
      socials,
      setSocialConnected,
      showTotalFollowers,
      setShowTotalFollowers,
      toast,
      showToast,
    }),
    [
      ready,
      profile,
      updateProfile,
      links,
      addLink,
      toggleLink,
      removeLink,
      archiveLink,
      restoreLink,
      archivedLinks,
      updateLink,
      products,
      addProduct,
      removeProduct,
      achievements,
      addAchievement,
      removeAchievement,
      subscribers,
      addSubscriber,
      dataSharing,
      appearance,
      hasOnboarded,
      completeOnboarding,
      audienceCapture,
      instagramConnected,
      visitorMode,
      aiChats,
      createAiChat,
      addAiMessage,
      resetAiChats,
      resetAll,
      isAuthenticated,
      signIn,
      signOut,
      socials,
      setSocialConnected,
      showTotalFollowers,
      toast,
      showToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
