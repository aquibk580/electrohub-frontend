import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "lodash";

import { useTheme } from "../theme-provider";
interface IndiaMapProps {
  salesData: { [key: string]: number };
  title?: string;
  className?: string;
  height?: string;
  width?: string;
}

const stateNames: { [key: string]: string } = {
    "IN-AN": "Andaman and Nicobar Islands",
    "IN-AP": "Andhra Pradesh",
    "IN-AR": "Arunachal Pradesh",
    "IN-AS": "Assam",
    "IN-BR": "Bihar",
    "IN-CH": "Chandigarh",
    "IN-CT": "Chhattisgarh",
    "IN-DD": "Dadra and Nagar Haveli and Daman and Diu",
    "IN-DL": "Delhi",
    "IN-GA": "Goa",
    "IN-GJ": "Gujarat",
    "IN-HP": "Himachal Pradesh",
    "IN-HR": "Haryana",
    "IN-JH": "Jharkhand",
    "IN-JK": "Jammu and Kashmir",
    "IN-KA": "Karnataka",
    "IN-KL": "Kerala",
    "IN-LD": "Lakshadweep",
    "IN-MH": "Maharashtra",
    "IN-ML": "Meghalaya",
    "IN-MN": "Manipur",
    "IN-MP": "Madhya Pradesh",
    "IN-MZ": "Mizoram",
    "IN-NL": "Nagaland",
    "IN-OR": "Odisha",
    "IN-PB": "Punjab",
    "IN-PY": "Puducherry",
    "IN-RJ": "Rajasthan",
    "IN-SK": "Sikkim",
    "IN-TG": "Telangana",
    "IN-TN": "Tamil Nadu",
    "IN-TR": "Tripura",
    "IN-UP": "Uttar Pradesh",
    "IN-UT": "Uttarakhand",
    "IN-WB": "West Bengal"
};

const IndiaSalesMap: React.FC<IndiaMapProps> = ({ 
  salesData, 
  className = "",
  height = "100%",
  width = "100%"
}) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: { state: string; sales: number } | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const { color, theme } = useTheme();

  // Calculate color ranges based on data
  const { colorRanges, maxSales } = useMemo(() => {
    const values = Object.values(salesData);
    const max = Math.max(...values);
    const intervals = 5;
    
    const ranges = Array.from({ length: intervals }, (_, i) => {
      return Math.round((max * (i + 1)) / intervals);
    });

    return {
      colorRanges: ranges.reverse(),
      maxSales: max
    };
  }, [salesData]);

  // Generate HSL color based on selected theme color and intensity
  const getColorForSales = (sales: number) => {
    const intensity = sales / maxSales;
    const baseHue = getBaseHue(color);
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Adjust saturation and lightness based on theme
    const saturation = isDark ? 70 : 85;
    const minLightness = isDark ? 25 : 40;
    const maxLightness = isDark ? 45 : 85;
    
    const lightness = minLightness + ((1 - intensity) * (maxLightness - minLightness));
    
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/india.svg")
        .then((response) => response.text())
        .then((data) => {
          setSvgContent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading SVG:", error);
          setLoading(false);
        });
    }
  }, []);
  

 // Install lodash if not already
  useEffect(() => {
    const updateSvg = debounce(() => {
      if (svgContent) {
        let modifiedSvg = svgContent;
        Object.entries(salesData).forEach(([stateCode, sales]) => {
          const color = getColorForSales(sales);
          const regex = new RegExp(`id=\\"${stateCode}\\"`, "g");
          modifiedSvg = modifiedSvg.replace(
            regex, 
            `id="${stateCode}" data-state="${stateCode}" data-sales="${sales}" style="fill:${color};transition:fill 0.3s ease" class="hover:brightness-110 cursor-pointer"`
          );
        });
        setSvgContent(modifiedSvg);
      }
    }, 200);
    
    updateSvg();
    return () => updateSvg.cancel();
  }, [salesData, svgContent, color, theme]);
  

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const target = (e.target as HTMLElement);
    const state = target.getAttribute('data-state');
    const sales = target.getAttribute('data-sales');

    if (state && sales) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTooltip({
        visible: true,
        x,
        y,
        content: {
          state: stateNames[state] || state,
          sales: parseInt(sales),
        },
      });
    } else {
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <Card className={`${className}`} style={{ width, height }}>
      <CardContent className="relative flex-grow">
        {loading ? (
          <Skeleton className="w-full h-full min-h-[300px] rounded-lg" />
        ) : (
          <div 
            ref={containerRef}
            className="w-full h-full relative min-h-[300px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="absolute inset-0 flex items-center justify-center"
              dangerouslySetInnerHTML={{ 
                __html: svgContent.replace(
                  '<svg',
                  '<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" style="max-width: 100%; max-height: 100%; width: auto; height: auto;"'
                )
              }} 
            />
            {tooltip.visible && tooltip.content && (
              <div
                className="absolute pointer-events-none bg-card text-primary rounded-lg shadow-lg p-2 z-50"
                style={{
                  left: `${tooltip.x}px`,
                  top: `${tooltip.y - 60}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="text-sm text-secondary-foreground">{tooltip.content.state}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sales:</span>
                  <span className="font-medium text-primary">
                    ₹{tooltip.content.sales.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get base hue for different colors
const getBaseHue = (color: string): number => {
  const hueMap: { [key: string]: number } = {
    blue: 210,
    green: 142,
    purple: 280,
    red: 0,
    orange: 25,
    yellow: 50,
    teal: 180,
    pink: 330,
    cyan: 190,
    brown: 30,
    gray: 0,
    default: 210
  };
  return hueMap[color] || hueMap.default;
};

export default IndiaSalesMap;