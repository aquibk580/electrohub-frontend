"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AutoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); 

  const Banners = [
    assets.samsungs25Banner,
    assets.iphone16Banner,
    assets.PS5Banner,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + Banners.length) % Banners.length);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-md shadow-lg h-96">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={Banners[index]}
            alt={`Slide ${index}`}
            className="absolute w-full h-96 object-fill"
            initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0.5 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <Button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0"
        onClick={() => changeSlide(-1)}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </Button>

      <Button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0"
        onClick={() => changeSlide(1)}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Banners.map((_, i) => (
          <Button
            key={i}
            className={cn(
              "h-2 w-2 rounded-full transition focus-visible:ring-0",
              i === index ? "bg-white" : "bg-gray-400"
            )}
            onClick={() => changeSlide(i - index)}
          />
        ))}
      </div>
    </div>
  );
}
