import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  ThumbsUp,
  Clock,
  Zap,
  Gift,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Product } from "../../types/entityTypes";
import { useNavigate } from "react-router-dom";

interface ElectrohubOffersProps {
  products: Product[];
}

// Array of background colors for random assignment
const bgColors = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-orange-600",
  "bg-cyan-600",
  "bg-lime-600",
  "bg-fuchsia-600",
  "bg-teal-600",
];

// Catchy deal names based on discount percentage
const getDealName = (percentage: number): string => {
  if (percentage >= 60) {
    const hotTitles = ["Blazing Deal", "Fire Sale", "Hot Pick", "Sizzling Offer"];
    return hotTitles[Math.floor(Math.random() * hotTitles.length)];
  } else if (percentage >= 30) {
    const highTitles = ["Epic Savings", "Deal Bonanza", "Killer Discount", "Budget Buster"];
    return highTitles[Math.floor(Math.random() * highTitles.length)];
  } else if (percentage >= 15) {
    const mediumTitles = ["Limited Time", "Flash Deal", "Deal Drop", "Treasure", "Hype Pick"];
    return mediumTitles[Math.floor(Math.random() * mediumTitles.length)];
  } else {
    const lowTitles = ["Today Only!", "Daily Scoop", "Snag It Now", "Last Call", "Going, Gone"];
    return lowTitles[Math.floor(Math.random() * lowTitles.length)];
  }
};

export default function ElectrohubOffers({ products }: ElectrohubOffersProps) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [activeDiscount, setActiveDiscount] = useState<string>("all");

  // Generate random background color for each product
  const productsWithColors = useMemo(() => {
    return products.map(product => ({
      ...product,
      bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      dealName: getDealName(product.offerPercentage)
    }));
  }, [products]);

  // Filter out products with offers and limit to 15 random products to differentiate from all products view
  const productsWithOffers = useMemo(() => {
    const filtered = productsWithColors
      .filter(product => product.offerPercentage && product.offerPercentage > 0)
      // Shuffle the products to display them in random order
      .sort(() => 0.1 - Math.random())
    // .slice(0, 15); // Limit to 15 random products

    // Sort so that items with highest discount show first
    return filtered.sort((a, b) => b.offerPercentage - a.offerPercentage);
  }, [productsWithColors]);

  // Check if scroll buttons should be visible
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const offerTime = useMemo(() => {
    return {
      hours: Math.floor(Math.random() * 24) + 1,
      minutes: Math.floor(Math.random() * 60),
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      // Initial check
      checkScrollButtons();
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, [productsWithOffers]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Filter products based on discount percentage
  const filterByDiscount = (offerPercentage: number): boolean => {
    if (activeDiscount === "all") return true;

    switch (activeDiscount) {
      case "hot": return offerPercentage >= 60;
      case "high": return offerPercentage >= 30 && offerPercentage < 60;
      case "medium": return offerPercentage >= 15 && offerPercentage < 30;
      case "low": return offerPercentage < 15;
      default: return true;
    }
  };

  // Get filtered products
  const filteredProducts = productsWithOffers.filter(product =>
    filterByDiscount(product.offerPercentage)
  );

  // Navigate to product detail
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Check if we have any hot deals (>60% off)
  const hasHotDeals = productsWithOffers.some(product => product.offerPercentage >= 60);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full mx-auto px-4 py-8 mt-8 border-t rounded-xl">
      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-500" />
              Deal Dash
            </h2>
            <p className="text-foreground mt-1">Electrifying savings you can't resist</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button
              variant={activeDiscount === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveDiscount("all")}
              className="whitespace-nowrap rounded-full"
            >
              All Deals
            </Button>
            {hasHotDeals && (
              <Button
                variant={activeDiscount === "hot" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDiscount("hot")}
                className="whitespace-nowrap rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
              >
                <Flame className="mr-1 h-4 w-4" />
                Blazing Deals (60%+ Off)
              </Button>
            )}
            <Button
              variant={activeDiscount === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveDiscount("high")}
              className="whitespace-nowrap rounded-full"
            >
              <Gift className="mr-1 h-4 w-4" />
              Epic Savings (30-59%)
            </Button>
            <Button
              variant={activeDiscount === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveDiscount("medium")}
              className="whitespace-nowrap rounded-full"
            >
              <Tag className="mr-1 h-4 w-4" />
              Flash Deals (15-29%)
            </Button>
            <Button
              variant={activeDiscount === "low" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveDiscount("low")}
              className="whitespace-nowrap rounded-full"
            >
              <Clock className="mr-1 h-4 w-4" />
              Today Only (Up to 15%)
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Left scroll button */}
        {showLeftScroll && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
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
          {filteredProducts.map((product) => {
            const discountedPrice = product.price - (product.price * (product.offerPercentage / 100));
            const mainImageUrl = product.images && product.images.length > 0
              ? product.images[0].url
              : "/api/placeholder/480/240";

            const isHotDeal = product.offerPercentage >= 60;

            return (
              <div
                key={product.id}
                className={cn(
                  "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shrink-0 snap-start",
                  "w-[220px] sm:w-[260px] md:w-[240px] lg:w-[220px]",
                  hoveredCard === product.id ? "shadow-xl scale-105" : "shadow-md",
                  isHotDeal ? "ring-2 ring-red-500" : ""
                )}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleProductClick(product.id)}
              >
                <div className={cn("relative h-64", product.bgColor)}>
                  <img
                    src={mainImageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 "
                  />

                  {/* Floating discount tag */}
                  <div className={cn(
                    "absolute top-4 left-3 px-3 py-1 rounded-full font-bold text-white",
                    isHotDeal ? "bg-red-500" : "bg-amber-500"
                  )}>
                    {product.offerPercentage}% OFF
                  </div>

                  {/* Deal name badge */}
                  <div className="absolute top-4 right-3">
                    <div className={cn(
                      "px-3 py-1 rounded-lg font-bold text-white text-[11px]",
                      isHotDeal ? "bg-gradient-to-r from-red-600 to-orange-500" : "bg-black/70"
                    )}>
                      {product.dealName}
                    </div>
                  </div>

                  {/* Product info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-1">{product.name}</h3>

                    <div className="flex items-center mt-2">
                      <div className="text-white font-semibold">${discountedPrice.toFixed(2)}</div>
                      <div className="text-white/70 line-through ml-2 text-sm">${product.price.toFixed(2)}</div>
                    </div>

                    {/* Save amount */}
                    {product.offerPercentage >= 10 && (
                      <div className="mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full w-fit">
                        Save ${(product.price - discountedPrice).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hot deal indicator */}
                {isHotDeal && (
                  <div className="absolute top-16 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold transform rotate-45 translate-x-6 shadow-lg">
                    <Flame className="h-3 w-3 inline mr-1" />
                    HOT!
                  </div>
                )}

                {/* Timer for urgency */}
                {product.offerPercentage >= 30 && (
                  <div className="bg-black text-white p-2 text-xs text-center font-medium flex items-center justify-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {offerTime.hours}h {offerTime.minutes}m left
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right scroll button */}
        {showRightScroll && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* View all deals button */}
      <div className="mt-6 text-center">
        <Button
          variant="default"
          className="mx-auto px-6 py-2 font-medium bg-gradient-to-r from-primary to-primary/80"
          onClick={() => navigate("/offers")}
        >
          Explore All Deals
        </Button>
      </div>
    </div>
  );
}