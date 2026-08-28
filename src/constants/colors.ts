// constants/colors.ts

export type ThemeMode = "light" | "dark";

export const THEMES = {
  dark: {
    // Brand
    primary: "#E41E26",
    primaryBright: "#FF3B43",
    primaryDark: "#B8141B",
    primarySoft: "rgba(228,30,38,0.14)",
    primaryBorder: "rgba(228,30,38,0.34)",

    // Black canvas
    background: "#08080B",
    backgroundDeep: "#030304",
    backgroundSecondary: "#0E0E12",
    surface: "#141419",
    surfaceElevated: "#19191F",

    // Glass surfaces
    glass: "rgba(255,255,255,0.055)",
    glassStrong: "rgba(255,255,255,0.085)",
    glassBorder: "rgba(255,255,255,0.105)",
    glassHighlight: "rgba(255,255,255,0.16)",
    glassShadow: "rgba(0,0,0,0.72)",
    scrim: "rgba(0,0,0,0.78)",

    // Text
    text: "#FAFAFC",
    textSecondary: "rgba(250,250,252,0.68)",
    textMuted: "rgba(250,250,252,0.42)",
    textDisabled: "rgba(250,250,252,0.28)",
    controlIcon: "#0E0E12",

    // Input
    inputBackground: "rgba(255,255,255,0.045)",
    inputBorder: "rgba(255,255,255,0.10)",
    inputFocus: "rgba(228,30,38,0.85)",

    // Status
    success: "#32D583",
    error: "#FF5A63",
    warning: "#F5B942",

    white: "#FFFFFF",
    black: "#000000",
  },
  light: {
    primary: "#C92830",
    primaryBright: "#D63A42",
    primaryDark: "#9F2027",
    primarySoft: "rgba(201,40,48,0.11)",
    primaryBorder: "rgba(201,40,48,0.26)",
    background: "#F1F2F4",
    backgroundDeep: "#F7F8FA",
    backgroundSecondary: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceElevated: "#F1F1F4",
    glass: "rgba(31,35,42,0.055)",
    glassStrong: "rgba(31,35,42,0.10)",
    glassBorder: "rgba(31,35,42,0.13)",
    glassHighlight: "rgba(255,255,255,0.85)",
    glassShadow: "rgba(9,9,11,0.16)",
    scrim: "rgba(9,9,11,0.48)",
    text: "#202229",
    textSecondary: "rgba(32,34,41,0.68)",
    textMuted: "rgba(32,34,41,0.52)",
    textDisabled: "rgba(23,23,28,0.32)",
    controlIcon: "#202229",
    inputBackground: "rgba(9,9,11,0.045)",
    inputBorder: "rgba(9,9,11,0.14)",
    inputFocus: "rgba(215,25,32,0.85)",
    success: "#178A52",
    error: "#D71920",
    warning: "#B77912",
    white: "#FFFFFF",
    black: "#000000",
  },
} as const;

export type ThemeColors = (typeof THEMES)[ThemeMode];

// Kept mutable so existing components that read COLORS during render update with the active theme.
export const COLORS: Record<keyof ThemeColors, string> = { ...THEMES.dark };

export const GRADIENTS: {
  screen: [string, string, string];
  sheet: [string, string];
  primary: [string, string];
  primaryPressed: [string, string];
} = {
  screen: ["#030d14", "#08080B", "#100608"],
  sheet: ["rgba(25,25,30,0.98)", "rgba(8,8,11,0.99)"],
  primary: [COLORS.primaryBright, COLORS.primaryDark],
  primaryPressed: [COLORS.primary, "#991117"],
};

export const applyThemeColors = (mode: ThemeMode) => {
  Object.assign(COLORS, THEMES[mode]);
  Object.assign(GRADIENTS, {
    screen:
      mode === "dark"
        ? ["#030D14", "#08080B", "#100608"]
        : ["#F7F8FA", "#F1F2F4", "#fff7f7"],
    sheet:
      mode === "dark"
        ? ["rgba(25,25,30,0.98)", "rgba(8,8,11,0.99)"]
        : ["rgba(255,255,255,0.98)", "rgba(190, 206, 240, 0.99)"],
    primary: [COLORS.primaryBright, COLORS.primaryDark],
    primaryPressed: [COLORS.primary, mode === "dark" ? "#991117" : "#A90F16"],
  });
};
