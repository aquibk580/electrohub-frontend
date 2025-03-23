"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "../../types/entityTypes"

interface HoverProductPreviewProps {
  product: Product
  children: React.ReactNode
  className?: string
}

export default function HoverProductPreview({ product, children, className }: HoverProductPreviewProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hoverStartTimeRef = useRef<number | null>(null)
  const navigate = useNavigate()

  const HOVER_DELAY = 3000 // 3 seconds

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  // Start hover timer
  const handleMouseEnter = () => {
    setIsHovering(true)
    hoverStartTimeRef.current = Date.now()

    timerRef.current = setInterval(() => {
      if (hoverStartTimeRef.current) {
        const elapsed = Date.now() - hoverStartTimeRef.current
        const newProgress = Math.min((elapsed / HOVER_DELAY) * 100, 100)
        setProgress(newProgress)

        if (elapsed >= HOVER_DELAY && !showPreview) {
          setShowPreview(true)
          clearInterval(timerRef.current as NodeJS.Timeout)
        }
      }
    }, 16) // ~60fps update
  }

  // Clear timer on mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false)
    setProgress(0)
    setShowPreview(false)
    hoverStartTimeRef.current = null

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Navigate to product page on click
  const handlePreviewClick = () => {
    navigate(`/product/${product.id}`, {
      state: { product },
    })
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Custom cursor with timer */}
      {/* {isHovering && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="rgba(var(--primary), 0.05)"
              stroke="rgba(var(--primary), 0.2)"
              strokeWidth="1"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgb(var(--primary))"
              strokeWidth="2"
              strokeDasharray={`${(2 * Math.PI * 22 * progress) / 100} ${2 * Math.PI * 22 * (1 - progress / 100)}`}
              strokeDashoffset={2 * Math.PI * 22 * 0.25}
              transform="rotate(-90 24 24)"
            />
            {progress > 0 && (
              <text
                x="24"
                y="24"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgb(var(--primary))"
                fontSize="10"
                fontWeight="bold"
              >
                {Math.ceil((HOVER_DELAY - (progress / 100) * HOVER_DELAY) / 1000)}
              </text>
            )}
          </svg>
        </div>
      )} */}

      {/* Product Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handlePreviewClick}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/30 backdrop-blur-md"
              onClick={handlePreviewClick}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 bg-background/80 backdrop-blur-md border border-border/50 shadow-lg rounded-xl overflow-hidden w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={handleMouseLeave}

            >
              <div className="grid md:grid-cols-2 cursor-pointer">
                {/* Product Image Gallery */}
                <div className="relative overflow-hidden bg-muted/10 aspect-square">
                  <div className="flex transition-transform duration-300 h-full">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0].url || "/placeholder.svg"}
                        alt={product.name}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-muted/20">
                        <span className="text-muted-foreground">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Image indicators */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {product.images.slice(0, 5).map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">{product.name}</h2>
                      <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                    </div>

                    {/* Rating */}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(product.averageRating || 0)
                                ? "text-primary fill-primary"
                                : "text-muted-foreground/30 fill-muted-foreground/30"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviews.length} reviews)</span>
                      </div>
                    )}

                    {/* Additional details */}
                    {product.categoryName && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Category: </span>
                        <span className="text-foreground">{product.categoryName}</span>
                      </div>
                    )}

                    {product.status && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Status: </span>
                        <span className={`${product.status === "OutOfStock" ? "text-red-500" : "text-green-500"}`}>
                          {product.status === "OutOfStock" ? "Out of Stock" : "In Stock"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-foreground">
                        ₹{(product.price - (product.price / 100) * product.offerPercentage).toFixed(2)}
                      </span>
                      {product.offerPercentage > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {product.offerPercentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      Click to view details
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

