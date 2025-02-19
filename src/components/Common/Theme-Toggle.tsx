import { useTheme, THEMES, type Theme, type Color } from "@/components/theme-provider"
import { Moon, Sun, Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
interface ColorOption {
  value: Color
  label: string
  hsl: string
}

const colorOptions: ColorOption[] = [
  {
    value: "default",
    label: "Default",
    hsl: "hsl(222.2 47.4% 11.2%)",
  },
  {
    value: "blue",
    label: "Blue",
    hsl: "hsl(221.2 83.2% 53.3%)",
  },
  {
    value: "green",
    label: "Green",
    hsl: "hsl(142.1 76.2% 36.3%)",
  },
  {
    value: "purple",
    label: "Purple",
    hsl: "hsl(280 100% 45.9%)",
  },
  {
    value: "red",
    label: "Red",
    hsl: "hsl(0 84.2% 60.2%)",
  },
  {
    value: "orange",
    label: "Orange",
    hsl: "hsl(25 90% 55%)",
  },
  {
    value: "yellow",
    label: "Yellow",
    hsl: "hsl(50 100% 50%)",
  },
  {
    value: "teal",
    label: "Teal",
    hsl: "hsl(180 76% 40%)",
  },
  {
    value: "pink",
    label: "Pink",
    hsl: "hsl(330 100% 70%)",
  },
  {
    value: "cyan",
    label: "Cyan",
    hsl: "hsl(190 80% 45%)",
  },
  {
    value: "brown",
    label: "Brown",
    hsl: "hsl(30 50% 30%)",
  },
  {
    value: "gray",
    label: "Gray",
    hsl: "hsl(0 0% 50%)",
  },
] as const

export default function ThemeToggle() {
  const { theme, setTheme, color, setColor } = useTheme()

  const handleThemeChange = (value: string) => {
    if (THEMES.includes(value as Theme)) {
      setTheme(value as Theme)
    }
  }

  return (
    <div className="">
      

      <div className="grid gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Choose between light and dark mode for your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={theme} onValueChange={handleThemeChange}>
              <TabsList className="grid w-full max-w-md grid-cols-3 text-xs md:text-xl ">
                <TabsTrigger value="light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  System
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Palette
            </CardTitle>
            <CardDescription>
              Select your preferred accent color for the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className="w-10 h-10 rounded-lg relative transition-all hover:scale-105 ring-offset-background"
                  style={{ 
                    backgroundColor: option.hsl,
                    boxShadow: color === option.value ? '0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary))' : 'none'
                  }}
                >
                  {color === option.value && (
                    <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                  )}
                  <span className="sr-only">{option.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-medium">Preview</h4>
              <div className="grid gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Primary Button
                </Button>
                <Button variant="outline">
                  Outline Button
                </Button>
                <div className="p-4 rounded-lg border bg-primary/10 text-primary">
                  Text and background using the primary color
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>

      </div>
    </div>
  )
}