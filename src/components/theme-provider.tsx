import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];

export const COLORS = [
  "default",
  "blue",
  "green",
  "purple",
  "red",
  "orange",
  "yellow",
  "teal",
  "pink",
  "cyan",
  "brown",
  "gray",
] as const;
export type Color = (typeof COLORS)[number];

type ColorConfig = {
  [key in Color]: {
    light: {
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
    };
    dark: {
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
    };
  };
};

const colorConfig: ColorConfig = {
  default: {
    light: {
      primary: "222.2 47.4% 11.2%", // #0A0E13 (Dark Blue-Black)
      primaryForeground: "210 40% 98%", // #F0F7FF (Very Light Blue)
      accent: "210 40% 96.1%", // #E4EEF8 (Soft Light Blue)
      accentForeground: "0%, 0%, 0%, 100%", // #0A0E13 (Dark Blue-Black)
    },
    dark: {
      primary: "210 40% 98%", // #F0F7FF (Very Light Blue)
      primaryForeground: "222.2 47.4% 11.2%", // #0A0E13 (Dark Blue-Black)
      accent: "217.2 32.6% 17.5%", // #232D3B (Dark Blue-Grey)
      accentForeground: "210 40% 98%", // #F0F7FF (Very Light Blue)
    },
  },
  blue: {
    light: {
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      accent: "217 91% 60% / 10%",
      accentForeground: "221.2 83.2% 53.3%",
    },
    dark: {
      primary: "217 91% 60%",
      primaryForeground: "210 40% 98%",
      accent: "217 91% 60% / 15%",
      accentForeground: "215 20.2% 65.1%",
    },
  },
  green: {
    light: {
      primary: "142.1 76.2% 36.3%",
      primaryForeground: "210 40% 98%",
      accent: "142.1 76.2% 36.3% / 10%",
      accentForeground: "142.1 76.2% 36.3%",
    },
    dark: {
      primary: "142.1 70.6% 45.3%",
      primaryForeground: "210 40% 98%",
      accent: "142.1 70.6% 45.3% / 15%",
      accentForeground: "143.8 61.2% 75.5%",
    },
  },
  purple: {
    light: {
      primary: "280 100% 45.9%",
      primaryForeground: "210 40% 98%",
      accent: "280 100% 45.9% / 10%",
      accentForeground: "280 100% 45.9%",
    },
    dark: {
      primary: "280 91% 65%",
      primaryForeground: "210 40% 98%",
      accent: "280 91% 65% / 15%",
      accentForeground: "279 75% 80.9%",
    },
  },
  red: {
    light: {
      primary: "0 84.2% 60.2%",
      primaryForeground: "210 40% 98%",
      accent: "0 84.2% 60.2% / 10%",
      accentForeground: "0 84.2% 60.2%",
    },
    dark: {
      primary: "0 91% 71%",
      primaryForeground: "210 40% 98%",
      accent: "0 91% 71% / 15%",
      accentForeground: "0 75% 80.9%",
    },
  },
  orange: {
    light: {
      primary: "25 90% 55%",
      primaryForeground: "210 40% 98%",
      accent: "25 90% 55% / 10%",
      accentForeground: "25 90% 55%",
    },
    dark: {
      primary: "25 91% 65%",
      primaryForeground: "210 40% 98%",
      accent: "25 91% 65% / 15%",
      accentForeground: "24 75% 80.9%",
    },
  },
  yellow: {
    light: {
      primary: "50 100% 50%",
      primaryForeground: "210 40% 98%",
      accent: "50 100% 50% / 10%",
      accentForeground: "50 100% 50%",
    },
    dark: {
      primary: "50 91% 60%",
      primaryForeground: "210 40% 98%",
      accent: "50 91% 60% / 15%",
      accentForeground: "49 75% 80.9%",
    },
  },
  teal: {
    light: {
      primary: "180 76% 40%",
      primaryForeground: "210 40% 98%",
      accent: "180 76% 40% / 10%",
      accentForeground: "180 76% 40%",
    },
    dark: {
      primary: "180 70% 50%",
      primaryForeground: "210 40% 98%",
      accent: "180 70% 50% / 15%",
      accentForeground: "179 75% 80.9%",
    },
  },
  pink: {
    light: {
      primary: "330 100% 70%",
      primaryForeground: "210 40% 98%",
      accent: "330 100% 70% / 10%",
      accentForeground: "330 100% 70%",
    },
    dark: {
      primary: "330 91% 80%",
      primaryForeground: "210 40% 98%",
      accent: "330 91% 80% / 15%",
      accentForeground: "329 75% 90.9%",
    },
  },
  cyan: {
    light: {
      primary: "190 80% 45%",
      primaryForeground: "210 40% 98%",
      accent: "190 80% 45% / 10%",
      accentForeground: "190 80% 45%",
    },
    dark: {
      primary: "190 70% 55%",
      primaryForeground: "210 40% 98%",
      accent: "190 70% 55% / 15%",
      accentForeground: "189 75% 80.9%",
    },
  },
  brown: {
    light: {
      primary: "30 50% 30%",
      primaryForeground: "210 40% 98%",
      accent: "30 50% 30% / 10%",
      accentForeground: "30 50% 30%",
    },
    dark: {
      primary: "30 40% 40%",
      primaryForeground: "210 40% 98%",
      accent: "30 40% 40% / 15%",
      accentForeground: "29 75% 80.9%",
    },
  },
  gray: {
    light: {
      primary: "0 0% 50%",
      primaryForeground: "210 40% 98%",
      accent: "0 0% 50% / 10%",
      accentForeground: "0 0% 50%",
    },
    dark: {
      primary: "0 0% 60%",
      primaryForeground: "210 40% 98%",
      accent: "0 0% 60% / 15%",
      accentForeground: "0 0% 80.9%",
    },
  },
};
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: Color;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  color: Color;
  setColor: (color: Color) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  color: "default",
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Function to safely check for modern browser features
const isModernBrowser = () => {
  try {
    return !!(window && window.localStorage && window.BroadcastChannel);
  } catch {
    return false;
  }
};

// Function to create appropriate sync mechanism
const createSyncMechanism = (storageKey: string) => {
  if (isModernBrowser() && window.BroadcastChannel) {
    const channel = new BroadcastChannel("theme-sync");
    return {
      channel,
      broadcast: (type: "theme" | "color", value: string) => {
        channel.postMessage({ type, value });
      },
      cleanup: () => channel.close(),
    };
  }

  // Fallback for older browsers using storage event
  return {
    channel: null,
    broadcast: (type: "theme" | "color", value: string) => {
      // Use a timestamp to ensure the storage event fires even if the same value is set
      localStorage.setItem(
        `${storageKey}-${type}-sync`,
        `${value}:${Date.now()}`
      );
    },
    cleanup: () => {},
  };
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "default",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem(`${storageKey}-theme`);
        return savedTheme && THEMES.includes(savedTheme as Theme)
          ? (savedTheme as Theme)
          : defaultTheme;
      } catch {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  const [color, setColorState] = useState<Color>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedColor = localStorage.getItem(`${storageKey}-color`);
        return savedColor && COLORS.includes(savedColor as Color)
          ? (savedColor as Color)
          : defaultColor;
      } catch {
        return defaultColor;
      }
    }
    return defaultColor;
  });

  // Initialize sync mechanism
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = createSyncMechanism(storageKey);

    // Handle theme/color sync across tabs
    const handleStorageChange = (event: StorageEvent | MessageEvent) => {
      if ("key" in event) {
        // StorageEvent (fallback)
        if (event.key === `${storageKey}-theme-sync`) {
          const value = event.newValue?.split(":")[0] as Theme;
          if (value && THEMES.includes(value)) {
            setThemeState(value);
          }
        } else if (event.key === `${storageKey}-color-sync`) {
          const value = event.newValue?.split(":")[0] as Color;
          if (value && COLORS.includes(value)) {
            setColorState(value);
          }
        }
      } else {
        // BroadcastChannel
        const { type, value } = event.data;
        if (type === "theme" && THEMES.includes(value)) {
          setThemeState(value);
        } else if (type === "color" && COLORS.includes(value)) {
          setColorState(value);
        }
      }
    };

    if (sync.channel) {
      sync.channel.addEventListener("message", handleStorageChange);
    } else {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      if (sync.channel) {
        sync.channel.removeEventListener("message", handleStorageChange);
      } else {
        window.removeEventListener("storage", handleStorageChange);
      }
      sync.cleanup();
    };
  }, [storageKey]);

  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem(`${storageKey}-theme`, newTheme);
      createSyncMechanism(storageKey).broadcast("theme", newTheme);
    } catch (e) {
      console.warn("Failed to set theme:", e);
    }
  };

  const setColor = (newColor: Color) => {
    try {
      setColorState(newColor);
      localStorage.setItem(`${storageKey}-color`, newColor);
      createSyncMechanism(storageKey).broadcast("color", newColor);
    } catch (e) {
      console.warn("Failed to set color:", e);
    }
  };

  // Apply theme and color changes on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const root = document.documentElement;
      const selectedColor = colorConfig[color];
      const isDarkMode =
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      root.classList.remove("light", "dark");
      root.classList.add(isDarkMode ? "dark" : "light");

      const colorMode = isDarkMode ? "dark" : "light";
      Object.entries(selectedColor[colorMode]).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });

      // Force repaint to ensure colors are applied correctly
      root.style.display = "none";
      void root.offsetHeight; // Trigger reflow
      root.style.display = "";
    } catch (e) {
      console.warn("Failed to apply theme:", e);
    }
  }, [theme, color]);

  // Handle system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        if (theme === "system") {
          const root = window.document.documentElement;
          const isDark = mediaQuery.matches;
          const selectedColor = colorConfig[color];
          const colorMode = isDark ? "dark" : "light";

          root.classList.remove("light", "dark");
          root.classList.add(isDark ? "dark" : "light");

          Object.entries(selectedColor[colorMode]).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
          });
        }
      };

      if ("addEventListener" in mediaQuery) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Explicitly type mediaQuery for the legacy case
        (
          mediaQuery as MediaQueryList & {
            addListener(
              listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
            ): void;
            removeListener(
              listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
            ): void;
          }
        ).addListener(handleChange);

        return () =>
          (
            mediaQuery as MediaQueryList & {
              addListener(
                listener: (
                  this: MediaQueryList,
                  ev: MediaQueryListEvent
                ) => void
              ): void;
              removeListener(
                listener: (
                  this: MediaQueryList,
                  ev: MediaQueryListEvent
                ) => void
              ): void;
            }
          ).removeListener(handleChange);
      }
    } catch (e) {
      console.warn("Failed to setup system theme detection:", e);
    }
  }, [theme, color]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, color, setColor }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
