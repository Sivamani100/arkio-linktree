import { useColorScheme } from "react-native";

import colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";

export function useColors() {
  const systemScheme = useColorScheme();
  let appearance: "system" | "light" | "dark" = "light";
  try {
    appearance = useApp().appearance;
  } catch {
    appearance = "light";
  }

  const effective =
    appearance === "system" ? systemScheme ?? "light" : appearance;

  const palette =
    effective === "dark" && "dark" in colors ? colors.dark : colors.light;

  return { ...palette, radius: colors.radius, scheme: effective };
}
