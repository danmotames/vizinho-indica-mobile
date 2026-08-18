export const colors = {
  bgApp: "#E7EDFD",
  surface: "#FFFFFF",
  surfaceSoft: "#F4F6FF",
  primary: "#5981F3",
  primaryDeep: "#3E61C8",
  text: "#22262E",
  muted: "#667085",
  border: "#DDE4F5",
  chip: "#EEF2FF",
  whatsapp: "#1FB866",
  success: "#1B9B68",
  warning: "#D99520",
  error: "#D74D5C",
  shadow: "#314275",
} as const;

export const spacing = {
  unit: 8,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  hero: 48,
  large: 64,
} as const;

export const radius = { control: 16, card: 20, sheet: 28, pill: 999 } as const;

export const elevation = {
  level1: { boxShadow: "0px 2px 8px rgba(49, 66, 117, 0.06)" },
  level2: { boxShadow: "0px 6px 16px rgba(49, 66, 117, 0.08)" },
} as const;
export const fonts = { regular: "Manrope_400Regular", medium: "Manrope_500Medium", semibold: "Manrope_600SemiBold", bold: "Manrope_700Bold", extraBold: "Manrope_800ExtraBold" } as const;
