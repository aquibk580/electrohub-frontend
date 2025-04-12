"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Tv,
  Camera,
  Speaker,
  Gamepad,
  Printer,
  Tablet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Types for our offers
type OfferType = "featured" | "discount" | "clearance" | "all"

interface Offer {
  id: number
  title: string
  discount: string
  subtitle: string
  icon: React.ReactNode
  color: string
  type: OfferType
  image?: string
  couponCode?: string
  expiresIn?: string
}

// Enhanced offers data for Electrohub electronics store
const offers: Offer[] = [
  {
    id: 1,
    title: "Premium Laptops",
    discount: "25% OFF",
    subtitle: "MacBook, Dell XPS & more",
    icon: <Laptop className="h-5 w-5" />,
    color: "from-blue-500 to-indigo-600",
    type: "featured",
    image: "/api/placeholder/480/240",
    couponCode: "LAPTOP25",
    expiresIn: "2 days",
  },
  {
    id: 2,
    title: "Smartphones",
    discount: "20% OFF",
    subtitle: "Latest iPhone & Samsung models",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-emerald-500 to-teal-600",
    type: "discount",
    couponCode: "PHONE20",
  },
  {
    id: 3,
    title: "Audio Devices",
    discount: "30% OFF",
    subtitle: "Premium headphones & earbuds",
    icon: <Headphones className="h-5 w-5" />,
    color: "from-violet-500 to-purple-600",
    type: "discount",
  },
  {
    id: 4,
    title: "Smart Watches",
    discount: "15% OFF",
    subtitle: "Apple Watch, Fitbit & Garmin",
    icon: <Watch className="h-5 w-5" />,
    color: "from-rose-500 to-pink-600",
    type: "discount",
    couponCode: "WATCH15",
  },
  {
    id: 5,
    title: "Smart TVs",
    discount: "30% OFF",
    subtitle: "4K & OLED displays",
    icon: <Tv className="h-5 w-5" />,
    color: "from-amber-500 to-orange-600",
    type: "clearance",
    image: "/orders/img-6.jpg",
  },
  {
    id: 6,
    title: "Cameras",
    discount: "35% OFF",
    subtitle: "DSLRs & Mirrorless",
    icon: <Camera className="h-5 w-5" />,
    color: "from-gray-700 to-gray-900",
    type: "clearance",
    couponCode: "CAMERA35",
    image: "/orders/img-6.jpg",
  },
  {
    id: 7,
    title: "Gaming",
    discount: "20% OFF",
    subtitle: "Consoles & Accessories",
    icon: <Gamepad className="h-5 w-5" />,
    color: "from-red-500 to-red-700",
    type: "featured",
    image: "/api/placeholder/480/240",
    
  },
  {
    id: 8,
    title: "Speakers",
    discount: "40% OFF",
    subtitle: "Bluetooth & Smart Speakers",
    icon: <Speaker className="h-5 w-5" />,
    color: "from-cyan-500 to-blue-600",
    type: "discount",
  },
  {
    id: 9,
    title: "Printers",
    discount: "25% OFF",
    subtitle: "Laser & InkJet models",
    icon: <Printer className="h-5 w-5" />,
    color: "from-lime-500 to-green-600",
    type: "clearance",
  },
  {
    id: 10,
    title: "Tablets",
    discount: "15% OFF",
    subtitle: "iPad & Android tablets",
    icon: <Tablet className="h-5 w-5" />,
    color: "from-fuchsia-500 to-purple-600",
    type: "featured",
  },
]

export default function ElectrohubOffers() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  // Filter offers based on active tab
  const filteredOffers =
    activeTab === "all" ? offers : offers.filter((offer) => offer.type === activeTab)

  // Check if scroll buttons should be visible
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons)
      // Initial check
      checkScrollButtons()
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons)
    }
  }, [filteredOffers])

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">ElectroHub Deals</h2>
            <p className="text-foreground mt-1 ">Discover amazing offers on the latest electronics</p>
          </div>
          {/* <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="all">All Deals</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="discount">Discounts</TabsTrigger>
              <TabsTrigger value="clearance">Clearance</TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>
        
        {/* Mobile tabs */}
        <div className="md:hidden mb-4 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("all")}
              className="whitespace-nowrap"
            >
              All Deals
            </Button>
            <Button 
              variant={activeTab === "featured" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("featured")}
              className="whitespace-nowrap"
            >
              Featured
            </Button>
            <Button 
              variant={activeTab === "discount" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("discount")}
              className="whitespace-nowrap"
            >
              Discounts
            </Button>
            <Button 
              variant={activeTab === "clearance" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("clearance")}
              className="whitespace-nowrap"
            >
              Clearance
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Left scroll button */}
        {showLeftScroll && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className={cn(
                "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shrink-0 snap-start",
                "w-[280px] sm:w-[320px] md:w-[300px] lg:w-[280px]",
                hoveredCard === offer.id ? "shadow-xl" : "shadow-md"
              )}
              onMouseEnter={() => setHoveredCard(offer.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {offer.image ? (
                // Image-based card
                <div className="relative h-52">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-4 flex flex-col justify-end">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit text-white font-bold text-lg">
                      {offer.discount}
                    </div>
                    <div className="text-white font-medium text-xl mt-2">{offer.title}</div>
                    <div className="text-white/90 text-sm mt-1">{offer.subtitle}</div>
                    
                    {offer.expiresIn && (
                      <div className="mt-2 flex items-center gap-1 text-black/80 text-xs">
                        <span className="bg-red-500 h-1.5 w-1.5 rounded-full animate-pulse"></span>
                        Ends in {offer.expiresIn}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Gradient-based card
                <div className={cn("bg-gradient-to-br p-5 h-52 flex flex-col justify-between", offer.color)}>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white">
                    {offer.icon}
                  </div>

                  <div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit text-white font-bold text-lg">
                      {offer.discount}
                    </div>
                    <div className="text-white font-medium text-xl mt-2">{offer.title}</div>
                    <div className="text-white/90 text-sm mt-1">{offer.subtitle}</div>
                    
                    {offer.expiresIn && (
                      <div className="mt-2 flex items-center gap-1 text-white/80 text-xs">
                        <span className="bg-red-500 h-1.5 w-1.5 rounded-full animate-pulse"></span>
                        Ends in {offer.expiresIn}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hover effect with coupon code */}
              {offer.couponCode && hoveredCard === offer.id && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm mb-2">Use code:</p>
                  <p className="text-white font-bold text-lg bg-white/20 px-4 py-2 rounded-md tracking-wide">
                    {offer.couponCode}
                  </p>
                  <Button size="sm" className="mt-4">
                    Shop Now
                  </Button>
                </div>
              )}

              {/* Bottom actions */}
              <div className="bg-white border-t border-gray-100 text-black p-3 flex items-center justify-between">
                <div className="flex items-center">
                  {offer.icon}
                  <span className="ml-2 text-sm font-medium">{offer.type === "clearance" ? "Limited Stock" : "In Stock"}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightScroll && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* View all deals button */}
      <div className="mt-6 text-center">
        <Button variant="outline" className="mx-auto">
          View All ElectroHub Deals
        </Button>
      </div>
    </div>
  )
}