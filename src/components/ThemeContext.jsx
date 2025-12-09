import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

  // -------------------------
  // 1. Initialisation propre (évite le flash)
  // -------------------------
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      return saved === "dark";
    }

    // Si aucun theme dans localStorage → utiliser theme système
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  // -------------------------
  // 2. Mise à jour automatique du <html> pour Tailwind
  // -------------------------
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // -------------------------
  // 3. Toggle du thème
  // -------------------------
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// -------------------------
// 4. Couleurs du thème automatiquement adaptées
// -------------------------
export const useThemeColors = () => {
  const { isDark } = useTheme();

  return {
    bgPrimary: isDark
      ? "radial-gradient(58.98% 58.98% at 55.9% 41.02%, #1E293B 0%, #0B1220 60.45%, #0F172A 100%)"
      : "radial-gradient(58.98% 58.98% at 55.9% 41.02%, #F8FAFC 0%, #E2E8F0 60.45%, #CBD5E1 100%)",

    bgSecondary: isDark ? "#1B2540" : "#E2E8F0",
    bgCard: isDark ? "#0F1A33" : "#F1F5F9",

    textPrimary: isDark ? "#FFFFFF" : "#0F172A",
    textSecondary: isDark ? "#D1D5DB" : "#475569",
    textMuted: isDark ? "#9CA3AF" : "#64748B",

    accent: "#FFC107",

    navBg: isDark ? "#00000050" : "#FFFFFF80",
    navText: isDark ? "#F3F4F6" : "#1E293B",

    isDark,
  };
};