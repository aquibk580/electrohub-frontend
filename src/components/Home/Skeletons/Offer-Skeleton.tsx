import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscountOffersSkeleton() {
  // Generate an array of placeholder items
  const skeletonItems = Array(8).fill(null);

  return (
    <div className="w-full mx-auto px-4 py-8 mt-8 border-t rounded-xl animate-pulse">
      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center">
              <div className="bg-yellow-500/30 w-6 h-6 rounded mr-2"></div>
              <div className="h-9 bg-primary/20 rounded w-36"></div>
            </div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-64 mt-1"></div>
          </div>
        </div>
        
        {/* Filter button skeletons */}
        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
            <div className="h-8 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full w-40"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-36"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-36"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Left scroll button skeleton */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center">
          <ChevronLeft className="h-6 w-6 text-gray-300 dark:text-gray-600" />
        </div>

        {/* Scrollable container with skeleton cards */}
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth snap-x">
          {skeletonItems.map((_, index) => {
            // Randomize the skeleton colors slightly
            const bgColorClass = [
              "bg-blue-600/30",
              "bg-purple-600/30",
              "bg-emerald-600/30",
              "bg-amber-600/30",
              "bg-rose-600/30",
              "bg-indigo-600/30",
              "bg-cyan-600/30",
            ][index % 7];
            
            return (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-md shrink-0 snap-start w-[220px] sm:w-[260px] md:w-[240px] lg:w-[220px]"
              >
                <div className={`relative h-64 ${bgColorClass}`}>
                  {/* Image placeholder */}
                  <div className="absolute inset-0 m-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  
                  {/* Floating discount tag skeleton */}
                  <div className="absolute top-4 left-4 h-6 w-16 bg-amber-500/40 rounded-full"></div>
                  
                  {/* Deal name badge skeleton */}
                  <div className="absolute top-4 right-4 h-6 w-24 bg-black/30 rounded-lg"></div>
                  
                  {/* Product info overlay skeleton */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="h-6 bg-white/20 rounded w-3/4 mb-2"></div>
                    
                    <div className="flex items-center mt-2">
                      <div className="h-5 bg-white/30 rounded w-16"></div>
                      <div className="h-4 bg-white/20 rounded w-12 ml-2"></div>
                    </div>
                    
                    {/* Save amount skeleton */}
                    <div className="mt-2 h-5 bg-green-500/40 rounded-full w-20"></div>
                  </div>
                </div>

                {/* Timer skeleton */}
                <div className="bg-black/70 h-6 w-full"></div>
              </div>
            );
          })}
        </div>

        {/* Right scroll button skeleton */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-lg p-2 hidden md:flex items-center justify-center">
          <ChevronRight className="h-6 w-6 text-gray-300 dark:text-gray-600" />
        </div>
      </div>

      {/* View all deals button skeleton */}
      <div className="mt-6 text-center">
        <div className="mx-auto h-10 bg-primary/30 rounded w-40 inline-block"></div>
      </div>
    </div>
  );
}