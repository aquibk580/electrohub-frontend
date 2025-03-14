"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

interface BrandProps {
  name: string
  logo: string
  deliveryTime?: string
  onClick?: () => void
}

const BrandCard = ({ name, logo, deliveryTime = "Delivery within 24 hours", onClick }: BrandProps) => {
  const { theme } = useTheme()

  return (
    <div
    onClick={onClick}
    className={`
      rounded-xl p-2 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer transition-all duration-300
      ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}
      hover:shadow-md hover:scale-105
    `}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
      <img 
        src={logo || "/placeholder.svg"} 
        alt={`${name} logo`} 
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain" 
      />
    </div>
    <div className="flex flex-col min-w-0">
      <h3
        className={`font-medium text-sm sm:text-base md:text-lg lg:text-xl truncate
          ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        {name}
      </h3>
      <p
        className={`text-xs sm:text-sm md:text-base truncate
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
      >
        {deliveryTime}
      </p>
    </div>
  </div>
  )
}

export default function BrandSelector() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const brands: BrandProps[] = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "NVIDIA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    },
    {
      name: "Google Pixel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Boat",
      logo: "https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_black_24889e30-925c-4185-a028-9fef497a8e44.svg?v=1732879339",
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
    },
    {
      name: "Xiaomi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg",
    },
    {
      name: "Asus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
    },
  ]

  const handleBrandClick = (brandName: string) => {
    console.log(`Selected brand: ${brandName}`)
    // You can add navigation or filtering logic here
  }

  return (
    <section className={`w-full py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4 ${theme === "dark" ? "text-white" : "bg-white text-gray-900"}`}>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Choose By Brand</h2>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {brands.map((brand) => (
        <BrandCard
          key={brand.name}
          name={brand.name}
          logo={brand.logo}
          deliveryTime={brand.deliveryTime}
          onClick={() => handleBrandClick(brand.name)}
        />
      ))}
    </div>
  </div>
</section>
  )
}

