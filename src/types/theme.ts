// types/theme.ts

import { Color } from "@/components/theme-provider"

export type ThemeColor = {
    hue: string
    saturation: string
    lightness: string
  }
  
  export type ThemeColors = {
    [key in Color]: ThemeColor
  }
  
  export type ThemeVars = {
    [key: string]: string
  }