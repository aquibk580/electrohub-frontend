"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import type { BannerCrousel } from "@/pages/Admin/ContentManagement"
import axios from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

export default function BannerCarousel() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [bannerCarousels, setBannerCarousels] = useState<Array<BannerCrousel>>([])
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const getAllBannerCarousel = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/banner-carousels`)
        if (response.status === 200) {
          setBannerCarousels(response.data)
        }
      } catch (error: any) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getAllBannerCarousel()
  }, [])

  const Banners = bannerCarousels.map((banner) => banner.imageUrl)

  useEffect(() => {
    // Clear any existing interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (bannerCarousels.length > 0) {
      if (isPlaying) {
        intervalRef.current = window.setInterval(() => {
          changeSlide(1)
        }, 5000)
      } else if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, bannerCarousels])

  const changeSlide = (dir: number) => {
    if (Banners.length === 0) return
    setDirection(dir)
    setIndex((prev) => (prev + dir + Banners.length) % Banners.length)
  }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  if (isLoading) {
    return (
      <div className="w-full mx-auto overflow-hidden rounded-xl shadow-lg h-40 sm:h-60 md:h-80 lg:h-[500px]">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  if (bannerCarousels.length === 0) {
    return null
  }

  return (
    <div className="relative  w-full  overflow-hidden rounded-2xl shadow-lg h-40 sm:h-60 md:h-80 mt-16 md:mt-5  lg:mt-1 lg:h-[84svh] ">
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={() => navigate(bannerCarousels[index].href)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={Banners[index]}
            alt={`Banner ${index + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0.5 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Overlay with gradient for better text visibility if needed */}
        <div className="absolute inset-0 dark:bg-gradient-to-t  from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Navigation buttons with improved styling */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 shadow-md"
          onClick={(e) => {
            e.stopPropagation()
            changeSlide(-1)
          }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 shadow-md"
          onClick={(e) => {
            e.stopPropagation()
            togglePlayPause()
          }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"} slideshow</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 shadow-md"
          onClick={(e) => {
            e.stopPropagation()
            changeSlide(1)
          }}
        >
          <ChevronRight className="w-5 h-5" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {Banners.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

