import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { applyThemeColors, COLORS, ThemeMode } from "../constants/colors";

const THEME_STORAGE_KEY = "APP_THEME";

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode; }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((savedTheme) => {
        if (savedTheme === "light" || savedTheme === "dark") {
          applyThemeColors(savedTheme);
          setThemeState(savedTheme);
        }
      })
      .finally(() => setIsReady(true));
  }, []);

  const setTheme = async (nextTheme: ThemeMode) => {
    applyThemeColors(nextTheme);
    setThemeState(nextTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  const value = useMemo(() => ({
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  }), [theme]);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(COLORS.background);
  }, [theme]);

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} backgroundColor={COLORS.background} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

/** Rebuilds StyleSheet tokens when the selected theme changes without remounting the screen. */
export function useThemedStyles<T extends ReturnType<typeof StyleSheet.create>>(
  createStyles: () => T,
) {
  const { theme } = useTheme();
  return useMemo(createStyles, [theme]);
}
