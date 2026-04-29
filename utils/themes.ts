export type ThemePreset = {
  id: string;
  name: string;
  background: string;
  cardBackground: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
  isDark?: boolean;
  hasArt?: boolean;
  artType?: "blocks" | "daniel" | "luke" | "olive";
};

export const THEMES: ThemePreset[] = [
  {
    id: "air",
    name: "Air",
    background: "#F0EFEB",
    cardBackground: "#FFFFFF",
    text: "#0E0E0E",
    buttonBackground: "#FFFFFF",
    buttonText: "#0E0E0E",
  },
  {
    id: "blocks",
    name: "Blocks",
    background: "#7B3FF2",
    cardBackground: "#EE3FE7",
    text: "#FFFFFF",
    buttonBackground: "#EE3FE7",
    buttonText: "#FFFFFF",
    artType: "blocks",
  },
  {
    id: "lake",
    name: "Lake",
    background: "#0F1830",
    cardBackground: "#1E2746",
    text: "#FFFFFF",
    buttonBackground: "#1E2746",
    buttonText: "#FFFFFF",
    isDark: true,
  },
  {
    id: "mineral",
    name: "Mineral",
    background: "#F1E9D2",
    cardBackground: "#FFFFFF",
    text: "#1A1A1A",
    buttonBackground: "#FFFFFF",
    buttonText: "#1A1A1A",
  },
  {
    id: "daniel",
    name: "Daniel Triendl",
    background: "#2C3E2E",
    cardBackground: "rgba(255,255,255,0.95)",
    text: "#FFFFFF",
    buttonBackground: "#FFFFFF",
    buttonText: "#0E0E0E",
    isDark: true,
    hasArt: true,
    artType: "daniel",
  },
  {
    id: "luke",
    name: "Luke John Matthew Arnold",
    background: "#FAFAFA",
    cardBackground: "#FFFFFF",
    text: "#0E0E0E",
    buttonBackground: "#FFFFFF",
    buttonText: "#0E0E0E",
    hasArt: true,
    artType: "luke",
  },
  {
    id: "olive",
    name: "Olive",
    background: "#7E7B3D",
    cardBackground: "#FFFFFF",
    text: "#FFFFFF",
    buttonBackground: "#FFFFFF",
    buttonText: "#0E0E0E",
  },
];

export function getTheme(id: string): ThemePreset {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
