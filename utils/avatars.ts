export type AvatarPreset = {
  id: string;
  colors: [string, string];
};

export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: "default", colors: ["#D4D4D4", "#A3A3A3"] },
  { id: "ocean", colors: ["#22D3EE", "#1E3A8A"] },
  { id: "forest", colors: ["#FACC15", "#166534"] },
  { id: "ruby", colors: ["#DB2777", "#7F1D1D"] },
  { id: "mask-blue", colors: ["#1D4ED8", "#0E1B4D"] },
  { id: "sunset", colors: ["#FB923C", "#7C2D12"] },
  { id: "violet", colors: ["#A78BFA", "#4C1D95"] },
];

export function getAvatar(id: string): AvatarPreset {
  return AVATAR_PRESETS.find((a) => a.id === id) ?? AVATAR_PRESETS[0];
}
