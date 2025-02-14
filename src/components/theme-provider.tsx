import { createContext, useContext, useEffect, useState } from "react"

export const THEMES = ["light", "dark", "system"] as const
export type Theme = (typeof THEMES)[number]

export const COLORS = ["default", "blue", "green", "purple", "red", "orange", "yellow", "teal", "pink", "cyan", "brown", "gray"] as const
export type Color = (typeof COLORS)[number]

type ColorConfig = {
  [key in Color]: {
    light: {
      primary: string
      primaryForeground: string
      accent: string
      accentForeground: string
    }
    dark: {
      primary: string
      primaryForeground: string
      accent: string
      accentForeground: string
    }
  }
}

const colorConfig: ColorConfig = {
  default: {
    light: {
      primary: "222.2 47.4% 11.2%",
      primaryForeground: "210 40% 98%",
      accent: "210 40% 96.1%",
      accentForeground: "222.2 47.4% 11.2%",
    },
    dark: {
      primary: "210 40% 98%",
      primaryForeground: "222.2 47.4% 11.2%",
      accent: "217.2 32.6% 17.5%",
      accentForeground: "210 40% 98%",
    }
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
    }
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
    }
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
    }
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
    }
  },
  orange: {
    light: { primary: "25 90% 55%", primaryForeground: "210 40% 98%", accent: "25 90% 55% / 10%", accentForeground: "25 90% 55%" },
    dark: { primary: "25 91% 65%", primaryForeground: "210 40% 98%", accent: "25 91% 65% / 15%", accentForeground: "24 75% 80.9%" }
  },
  yellow: {
    light: { primary: "50 100% 50%", primaryForeground: "210 40% 98%", accent: "50 100% 50% / 10%", accentForeground: "50 100% 50%" },
    dark: { primary: "50 91% 60%", primaryForeground: "210 40% 98%", accent: "50 91% 60% / 15%", accentForeground: "49 75% 80.9%" }
  },
  teal: {
    light: { primary: "180 76% 40%", primaryForeground: "210 40% 98%", accent: "180 76% 40% / 10%", accentForeground: "180 76% 40%" },
    dark: { primary: "180 70% 50%", primaryForeground: "210 40% 98%", accent: "180 70% 50% / 15%", accentForeground: "179 75% 80.9%" }
  },
  pink: {
    light: { primary: "330 100% 70%", primaryForeground: "210 40% 98%", accent: "330 100% 70% / 10%", accentForeground: "330 100% 70%" },
    dark: { primary: "330 91% 80%", primaryForeground: "210 40% 98%", accent: "330 91% 80% / 15%", accentForeground: "329 75% 90.9%" }
  },
  cyan: {
    light: { primary: "190 80% 45%", primaryForeground: "210 40% 98%", accent: "190 80% 45% / 10%", accentForeground: "190 80% 45%" },
    dark: { primary: "190 70% 55%", primaryForeground: "210 40% 98%", accent: "190 70% 55% / 15%", accentForeground: "189 75% 80.9%" }
  },
  brown: {
    light: { primary: "30 50% 30%", primaryForeground: "210 40% 98%", accent: "30 50% 30% / 10%", accentForeground: "30 50% 30%" },
    dark: { primary: "30 40% 40%", primaryForeground: "210 40% 98%", accent: "30 40% 40% / 15%", accentForeground: "29 75% 80.9%" }
  },
  gray: {
    light: { primary: "0 0% 50%", primaryForeground: "210 40% 98%", accent: "0 0% 50% / 10%", accentForeground: "0 0% 50%" },
    dark: { primary: "0 0% 60%", primaryForeground: "210 40% 98%", accent: "0 0% 60% / 15%", accentForeground: "0 0% 80.9%" }
  }
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColor?: Color
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  color: Color
  setColor: (color: Color) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  color: "default",
  setColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "default",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(`${storageKey}-theme`)
      return savedTheme && THEMES.includes(savedTheme as Theme)
        ? (savedTheme as Theme)
        : defaultTheme
    }
    return defaultTheme
  })

  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem(`${storageKey}-color`)
      return savedColor && COLORS.includes(savedColor as Color)
        ? (savedColor as Color)
        : defaultColor
    }
    return defaultColor
  })

  useEffect(() => {
    const root = window.document.documentElement
    const selectedColor = colorConfig[color]
    const isDark = root.classList.contains("dark")
    const colorMode = isDark ? "dark" : "light"

    root.classList.remove(...THEMES.filter(t => t !== "system"))
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Update all color CSS variables based on the current theme
    Object.entries(selectedColor[colorMode]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [theme, color])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement
        const isDark = mediaQuery.matches
        const selectedColor = colorConfig[color]
        const colorMode = isDark ? "dark" : "light"

        root.classList.remove("light", "dark")
        root.classList.add(isDark ? "dark" : "light")

        // Update colors when system theme changes
        Object.entries(selectedColor[colorMode]).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value)
        })
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, color])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(`${storageKey}-theme`, newTheme)
      setTheme(newTheme)
    },
    color,
    setColor: (newColor: Color) => {
      localStorage.setItem(`${storageKey}-color`, newColor)
      setColor(newColor)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}