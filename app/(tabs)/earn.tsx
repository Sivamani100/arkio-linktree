import { ArrowRight2, DollarCircle, MoneySend, ShoppingBag, Teacher, Link1, People, Location, TickCircle, Card } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image as RNImage,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppBottomSheet } from "@/components/AppBottomSheet";
import { Button } from "@/components/Button";
import { ScreenHeader } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function EarnScreen() {
  const colors = useColors();
  const router = useRouter();
  const { showToast, subscription } = useApp();
  const [eligibilityVisible, setEligibilityVisible] = useState(false);
  const [coursesVisible, setCoursesVisible] = useState(false);
  const [productsGuideVisible, setProductsGuideVisible] = useState(false);
  const [affiliateVisible, setAffiliateVisible] = useState(false);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Earn"
        large
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View
          style={[
            styles.countryBanner,
            { backgroundColor: "#FEF3C7" },
          ]}
        >
          <Text style={styles.flag}>🇮🇳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.countryTitle}>You're earning in India</Text>
            <Text style={styles.countrySub}>
              Earnings are paid out in INR. Tap to change your country.
            </Text>
          </View>
          <Pressable
            onPress={() => showToast("Country picker coming soon")}
            hitSlop={10}
          >
            <ArrowRight2 size={20} color="#92400E" variant="Linear" />
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Monetize your audience
        </Text>

        <Pressable
          onPress={() => setEligibilityVisible(true)}
          style={[
            styles.featureCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View
            style={[styles.featureIcon, { backgroundColor: "#DCFCE7" }]}
          >
            <DollarCircle size={20} color="#16A34A" variant="Linear" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>
              arkio Monetization
            </Text>
            <Text
              style={[styles.featureSub, { color: colors.mutedForeground }]}
            >
              Get paid when your visitors buy or tip on your arkio.
            </Text>
            <Text style={styles.eligibilityHint}>Check eligibility</Text>
          </View>
          <ArrowRight2
            size={20}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </Pressable>

        <Pressable
          onPress={() => router.push("/add-link")}
          style={[
            styles.featureCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View
            style={[styles.featureIcon, { backgroundColor: "#FEE2E2" }]}
          >
            <MoneySend size={22} color="#DC2626" variant="Linear" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>
              Tip jar
            </Text>
            <Text
              style={[styles.featureSub, { color: colors.mutedForeground }]}
            >
              Let supporters send you a tip directly from your profile.
            </Text>
          </View>
          <ArrowRight2
            size={20}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </Pressable>

        <Pressable
          onPress={() => setProductsGuideVisible(true)}
          style={[
            styles.featureCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View
            style={[styles.featureIcon, { backgroundColor: "#DBEAFE" }]}
          >
            <ShoppingBag size={20} color="#2563EB" variant="Linear" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>
              Sell a product
            </Text>
            <Text
              style={[styles.featureSub, { color: colors.mutedForeground }]}
            >
              Add a checkout link for digital downloads or physical goods.
            </Text>
          </View>
          <ArrowRight2
            size={20}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </Pressable>

        <Pressable
          onPress={() => setCoursesVisible(true)}
          style={[
            styles.featureCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View
            style={[styles.featureIcon, { backgroundColor: "#FAE8FF" }]}
          >
            <Teacher size={22} color="#A21CAF" variant="Linear" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>
              Sell a course
            </Text>
            <Text
              style={[styles.featureSub, { color: colors.mutedForeground }]}
            >
              Package your knowledge into a paid course or video series.
            </Text>
          </View>
          <ArrowRight2
            size={20}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </Pressable>

        <Pressable
          onPress={() => setAffiliateVisible(true)}
          style={[
            styles.featureCard,
            { backgroundColor: colors.card, borderRadius: colors.radius },
          ]}
        >
          <View
            style={[styles.featureIcon, { backgroundColor: "#FFEDD5" }]}
          >
            <Link1 size={20} color="#EA580C" variant="Linear" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>
              Affiliate links
            </Text>
            <Text
              style={[styles.featureSub, { color: colors.mutedForeground }]}
            >
              Earn commission when your audience buys from your links.
            </Text>
          </View>
          <ArrowRight2
            size={20}
            color={colors.mutedForeground}
            variant="Linear"
          />
        </Pressable>
      </ScrollView>

      <AppBottomSheet
        visible={eligibilityVisible}
        onClose={() => setEligibilityVisible(false)}
        title="Are you eligible?"
      >
        <Text
          style={[styles.eligibilitySub, { color: colors.mutedForeground }]}
        >
          You'll need to meet the following before you can earn money on Linktree.
        </Text>

        <Requirement
          icon={<People size={20} color={colors.foreground} variant="Linear" />}
          title="500+ profile visits"
          status="2/2"
          done
        />
        <Requirement
          icon={
            <Location
              size={20}
              color={colors.foreground}
              variant="Linear"
            />
          }
          title="A supported country"
          status="India"
          done
        />
        <Requirement
          icon={<TickCircle size={20} color={colors.foreground} variant="Linear" />}
          title="An active Linktree for 30+ days"
          status="In progress"
        />
        <Requirement
          icon={
            <Card
              size={20}
              color={colors.foreground}
              variant="Linear"
            />
          }
          title="Verified payment account"
          status="Not started"
        />

        <Button
          title="Apply for monetization"
          variant="dark"
          onPress={() => {
            setEligibilityVisible(false);
            showToast("Application submitted");
          }}
          style={{ marginTop: 18 }}
        />
        <Button
          title="Maybe later"
          variant="ghost"
          onPress={() => setEligibilityVisible(false)}
          style={{ marginTop: 4 }}
        />
      </AppBottomSheet>

      <AppBottomSheet
        visible={coursesVisible}
        onClose={() => setCoursesVisible(false)}
        title="Build a course"
      >
        <View style={styles.courseImage}>
          <RNImage
            source={{ uri: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.coursesTitle, { color: colors.foreground }]}>
          Turn your expertise into income
        </Text>
        <Text style={[styles.coursesSub, { color: colors.mutedForeground }]}>
          Bundle videos, PDFs, and lessons into a paid course your audience can
          buy in just a tap.
        </Text>

        <View style={{ marginTop: 14 }}>
          <CourseFeature label="Drag and drop course builder" />
          <CourseFeature label="Sell to anyone, anywhere in 130+ countries" />
          <CourseFeature label="Built in payments and refunds" />
          <CourseFeature label="Student progress tracking" last />
        </View>

        <Button
          title="Start building"
          variant="dark"
          onPress={() => {
            setCoursesVisible(false);
            router.push("/add-link");
          }}
          style={{ marginTop: 18 }}
        />
        <Button
          title="Not now"
          variant="ghost"
          onPress={() => setCoursesVisible(false)}
          style={{ marginTop: 4 }}
        />
      </AppBottomSheet>

      <AppBottomSheet
        visible={productsGuideVisible}
        onClose={() => setProductsGuideVisible(false)}
        title="Sell Products"
      >
        <View style={[styles.courseImage, { backgroundColor: "#DBEAFE" }]}>
          <RNImage
            source={{ uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.coursesTitle, { color: colors.foreground }]}>
          Start selling in minutes
        </Text>
        <Text style={[styles.coursesSub, { color: colors.mutedForeground }]}>
          Add physical products, digital downloads, or services and get paid directly through your arkio.
        </Text>

        <View style={{ marginTop: 14 }}>
          <Step
            number="1"
            title="Connect a payment provider"
            desc="Link your PayPal or Stripe account to receive funds."
          />
          <Step
            number="2"
            title="Add product details"
            desc="Upload an image, set a price, and add a description."
          />
          <Step
            number="3"
            title="Share with your audience"
            desc="Your products will appear as cards on your profile."
          />
        </View>

        <Button
          title="Go to Visual Editor"
          variant="dark"
          onPress={() => {
            setProductsGuideVisible(false);
            router.push("/visual-editor");
          }}
          style={{ marginTop: 18 }}
        />
        <Button
          title="Learn more"
          variant="ghost"
          onPress={() => setProductsGuideVisible(false)}
          style={{ marginTop: 4 }}
        />
      </AppBottomSheet>

      <AppBottomSheet
        visible={affiliateVisible}
        onClose={() => setAffiliateVisible(false)}
        title="Affiliate Links"
      >
        <View style={[styles.courseImage, { backgroundColor: "#FFEDD5" }]}>
          <RNImage
            source={{ uri: "https://images.unsplash.com/photo-1556742049-04ff43621278?w=600" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.coursesTitle, { color: colors.foreground }]}>
          Earn from your recommendations
        </Text>
        <Text style={[styles.coursesSub, { color: colors.mutedForeground }]}>
          Partner with your favorite brands and earn a commission on every sale you generate.
        </Text>

        <View style={{ marginTop: 16 }}>
          <View style={[styles.featureCard, { backgroundColor: colors.secondary, borderRadius: 12 }]}>
            <Link1 size={20} color={colors.primary} />
            <Text style={{ flex: 1, color: colors.foreground, fontFamily: "Inter_500Medium" }}>Access exclusive brand deals</Text>
          </View>
          <View style={[styles.featureCard, { backgroundColor: colors.secondary, borderRadius: 12, marginTop: 8 }]}>
            <DollarCircle size={20} color={colors.primary} />
            <Text style={{ flex: 1, color: colors.foreground, fontFamily: "Inter_500Medium" }}>Auto-conversion of normal links to affiliate links</Text>
          </View>
        </View>

        <Button
          title="Browse brands"
          variant="dark"
          onPress={() => {
            setAffiliateVisible(false);
            showToast("Opening affiliate marketplace...");
          }}
          style={{ marginTop: 18 }}
        />
      </AppBottomSheet>
    </View>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  const colors = useColors();
  return (
    <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
      <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#FFF", fontFamily: "Inter_700Bold", fontSize: 14 }}>{number}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 14 }}>{title}</Text>
        <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 }}>{desc}</Text>
      </View>
    </View>
  );
}

function Requirement({
  icon,
  title,
  status,
  done,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  done?: boolean;
}) {
  const colors = useColors();
  return (
    <View style={styles.reqRow}>
      <View
        style={[
          styles.reqIcon,
          { backgroundColor: done ? "#DCFCE7" : colors.secondary },
        ]}
      >
        {done ? (
          <TickCircle size={18} color="#16A34A" variant="Linear" />
        ) : (
          icon
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.reqTitle, { color: colors.foreground }]}>
          {title}
        </Text>
        <Text
          style={[
            styles.reqStatus,
            { color: done ? colors.success : colors.mutedForeground },
          ]}
        >
          {status}
        </Text>
      </View>
    </View>
  );
}

function CourseFeature({ label, last }: { label: string; last?: boolean }) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.courseFeature,
        !last && {
          borderBottomColor: colors.border,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <TickCircle size={18} color={colors.success} variant="Linear" />
      <Text style={[styles.courseFeatureText, { color: colors.foreground }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  countryBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 16,
  },
  flag: { fontSize: 32 },
  countryTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#92400E" },
  countrySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#92400E",
    marginTop: 2,
    opacity: 0.85,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginBottom: 12,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    marginBottom: 10,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  featureSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  eligibilityHint: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    marginTop: 6,
    color: "#16A34A",
  },
  eligibilitySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    paddingVertical: 12,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  reqIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  reqTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  reqStatus: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  courseImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F1E9D2",
    marginTop: 8,
  },
  coursesTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginTop: 14,
  },
  coursesSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  courseFeature: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  courseFeatureText: { fontFamily: "Inter_500Medium", fontSize: 14, flex: 1 },
});
