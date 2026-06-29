// constants/colors.ts

export const COLORS = {
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
} as const;

export const GRADIENTS = {
    screen: [COLORS.backgroundDeep, COLORS.background, "#100608"] as const,
    sheet: ["rgba(25,25,30,0.98)", "rgba(8,8,11,0.99)"] as const,
    primary: [COLORS.primaryBright, COLORS.primaryDark] as const,
    primaryPressed: [COLORS.primary, "#991117"] as const,
} as const;
