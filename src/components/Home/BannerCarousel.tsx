import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { BannerCrousel } from "@/pages/Admin/ContentManagement";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export default function BannerCarouselComponent() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [bannerCarousels, setBannerCarousels] = useState<Array<BannerCrousel>>([]);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const getAllBannerCarousel = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/banner-carousels`
        );
        if (response.status === 200) {
          setBannerCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllBannerCarousel();
  }, []);

  const Banners = bannerCarousels.map((banner) => banner.imageUrl);

  useEffect(() => {
    // Clear any existing interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (bannerCarousels.length > 0) {
      if (isPlaying) {
        intervalRef.current = window.setInterval(() => {
          changeSlide(1);
        }, 5000);
      } else if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bannerCarousels]);

  const changeSlide = (dir: number) => {
    if (Banners.length === 0) return;
    setDirection(dir);
    setIndex((prev) => (prev + dir + Banners.length) % Banners.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  if (bannerCarousels.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-md shadow-lg h-40 sm:h-60 md:h-80 lg:h-96 bg-accent">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => navigate(bannerCarousels[index].href)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={Banners[index]}
            alt={`Slide ${index}`}
            className="absolute w-full h-full object-cover sm:object-cover"
            initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0.5 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <Button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0"
        onClick={(e) => {
          e.stopPropagation();
          changeSlide(-1);
        }}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </Button>

      <Button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0"
        onClick={(e) => {
          e.stopPropagation();
          changeSlide(1);
        }}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </Button>
      
      <Button 
        className="absolute bottom-2 right-2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0"
        onClick={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-black" />
        ) : (
          <Play className="w-6 h-6 text-black" />
        )}
      </Button>
    </div>
  );
}