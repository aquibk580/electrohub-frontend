import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  Sparkles, 
  Tag, 
  BadgePercent, 
  Package, 
  Gift, 
  ThumbsUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
// import { useTheme } from "next-themes";

// Enhanced deal data for the carousel with image support
const deals = [
  {
    id: 1,
    title: "Hot Deals",
    icon: <Flame className="text-red-500 dark:text-red-400" />,
    description: "Limited-time offers up to 70% off",
    bgColor: "bg-red-100 dark:bg-red-950/50",
    buttonText: "Shop Now",
    buttonColor: "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500",
    textColor: "text-red-500 dark:text-red-400",
    image: null,
  },
  {
    id: 2,
    title: "New Arrivals",
    icon: <Sparkles className="text-blue-500 dark:text-blue-400" />,
    description: "Just added with special introductory discounts",
    bgColor: "bg-blue-100 dark:bg-blue-950/50",
    buttonText: "Discover",
    buttonColor: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500",
    textColor: "text-blue-500 dark:text-blue-400",
    image: "/api/placeholder/500/300",
  },
  {
    id: 3,
    title: "Flash Sales",
    icon: <BadgePercent className="text-purple-500 dark:text-purple-400" />,
    description: "24-hour deals - Ends soon!",
    bgColor: "bg-purple-100 dark:bg-purple-950/50",
    buttonText: "Hurry Up",
    buttonColor: "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500",
    textColor: "text-purple-500 dark:text-purple-400",
    image: null,
  },
  {
    id: 4,
    title: "Under ₹999",
    icon: <Tag className="text-green-500 dark:text-green-400" />,
    description: "Budget-friendly picks you'll love",
    bgColor: "bg-green-100 dark:bg-green-950/50",
    buttonText: "View All",
    buttonColor: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500",
    textColor: "text-green-500 dark:text-green-400",
    image: "/laptop.png",
  },
  {
    id: 5,
    title: null,
    icon: null,
    description: null,
    bgColor: "bg-amber-100 dark:bg-amber-950/50",
    buttonText: "Shop Now",
    buttonColor: "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
    textColor: "text-amber-500 dark:text-amber-400",
    image: "/api/placeholder/500/500",
  },
  {
    id: 6,
    title: "Buy 1 Get 1 Free",
    icon: <Gift className="text-pink-500 dark:text-pink-400" />,
    description: "Double the joy with special combo offers",
    bgColor: "bg-pink-100 dark:bg-pink-950/50",
    buttonText: "Get Offer",
    buttonColor: "bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-500",
    textColor: "text-pink-500 dark:text-pink-400",
    image: null,
  },
  {
    id: 7,
    title: "Staff Picks",
    icon: <ThumbsUp className="text-indigo-500 dark:text-indigo-400" />,
    description: "Curated favorites from our experts",
    bgColor: "bg-indigo-100 dark:bg-indigo-950/50",
    buttonText: "See Picks",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500",
    textColor: "text-indigo-500 dark:text-indigo-400",
    image: "/api/placeholder/500/300",
  }
];

export default function DealCarousel() {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
//   const { theme } = useTheme();
  
  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentDeal((prev) => (prev + 1) % deals.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused]);
  
  const deal = deals[currentDeal];
  
  function nextDeal() {
    setCurrentDeal((prev) => (prev + 1) % deals.length);
  }
  
  function prevDeal() {
    setCurrentDeal((prev) => (prev - 1 + deals.length) % deals.length);
  }

  return (
    <div 
      className="w-full aspect-square shadow-lg rounded-lg overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Card className={`w-full h-full ${deal.bgColor} transition-all duration-300 flex flex-col`}>
        <CardContent className="flex flex-col items-center justify-center p-6 h-full relative">
          {deal.image ? (
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={deal.image} 
                alt={deal.title || "Promotional deal"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            </div>
          ) : null}
          
          <div className={`flex flex-col items-center justify-center ${deal.image ? 'z-10 relative' : ''}`}>
            {deal.icon && (
              <div className="mb-4 text-4xl">
                {deal.icon}
              </div>
            )}
            
            {deal.title && (
              <h3 className={`text-2xl font-bold mb-2 ${deal.textColor} ${deal.image ? 'text-white dark:text-white' : ''}`}>
                {deal.title}
              </h3>
            )}
            
            {deal.description && (
              <p className={`text-center mb-6 ${deal.image ? 'text-white/90 dark:text-white/90' : 'text-gray-700 dark:text-gray-200'}`}>
                {deal.description}
              </p>
            )}
            
            <Button className={`${deal.buttonColor} text-white font-medium px-8 py-2`}>
              {deal.buttonText}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Carousel Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 hover:opacity-100 transition-opacity">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800 shadow-md"
          onClick={prevDeal}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800 shadow-md"
          onClick={nextDeal}
        >
          <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
        </Button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {deals.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentDeal 
                ? "bg-gray-800 dark:bg-white w-4" 
                : "bg-gray-400 dark:bg-gray-600"
            }`}
            onClick={() => setCurrentDeal(index)}
          />
        ))}
      </div>
    </div>
  );
}