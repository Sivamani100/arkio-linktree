import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toast } from "@/components/Toast";
import { AppProvider, useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function AuthGate() {
  const { ready, isAuthenticated, hasOnboarded } = useApp();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const top = segments[0] as string | undefined;
    const inSplash = top === "splash";
    const inAuth = top === "sign-in";
    const inOnboarding = top === "onboarding";

    // Initial load: redirect to splash if we're at the root
    if (segments.length === 0) {
      router.replace("/splash");
      return;
    }

    if (inSplash) return;

    if (!hasOnboarded && !inOnboarding) {
      router.replace("/onboarding");
    } else if (hasOnboarded && inOnboarding) {
      if (!isAuthenticated) {
        router.replace("/sign-in");
      } else {
        router.replace("/(tabs)");
      }
    } else if (hasOnboarded && !isAuthenticated && !inAuth && !inSplash) {
      router.replace("/sign-in");
    }
  }, [ready, isAuthenticated, hasOnboarded, segments, router]);

  return null;
}

function RootLayoutNav() {
  const colors = useColors();
  return (
    <>
      <StatusBar style={colors.scheme === "dark" ? "light" : "dark"} />
      <AuthGate />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="splash" options={{ animation: "fade" }} />
        <Stack.Screen name="sign-in" options={{ animation: "fade" }} />
        <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen name="my-info" />
        <Stack.Screen name="billing" />
        <Stack.Screen name="edit-plan" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="ai-chat" />
        <Stack.Screen name="instagram-auto-reply" />
        <Stack.Screen name="social-planner" />
        <Stack.Screen name="add-link" />
        <Stack.Screen name="preview" />
        <Stack.Screen name="social-connect" />
        <Stack.Screen name="archive" />
        <Stack.Screen name="contacts" />
        <Stack.Screen
          name="pro-upgrade"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
      </Stack>
      <Toast />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardProvider>
                <RootLayoutNav />
              </KeyboardProvider>
            </GestureHandlerRootView>
          </AppProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
