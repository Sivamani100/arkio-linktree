import React from "react";
import { useRouter } from "expo-router";
import { SplashScreen } from "@/components/SplashScreen";

export default function SplashPage() {
  const router = useRouter();

  const handleFinish = () => {
    router.replace("/onboarding");
  };

  return <SplashScreen onFinish={handleFinish} />;
}
