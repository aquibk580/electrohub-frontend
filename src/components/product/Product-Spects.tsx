"use client"

import {  BadgeCheck, Loader2, MessageSquare, MessageSquareMore, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMemo } from "react"
import { formatDate } from "@/lib/utils"
import type { Review } from "../../types/entityTypes"
import { Badge } from "../ui/badge"
import { Separator } from "@radix-ui/react-select"

interface ProductSpecsProps {
  reviews: Array<Review>
  details: { key: string; value: string }[]
  loading: boolean
}

const ProductSpecs = ({ reviews, details, loading }: ProductSpecsProps) => {
  function getRandomColor() {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getInitials = (name: string): string => {
    const initials = name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    return initials
  }

  const bgColor = useMemo(() => getRandomColor(), [])

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specifications Section */}
        <div className="rounded-lg  overflow-hidden">
          <div className="shadow-md bg-primary dark:bg-primary/60  rounded-xl p-2 pl-3">
            <h2 className="text-lg text-white font-semibold">Specifications</h2>
          </div>
          <div className="p-4   rounded-xl overflow-y-auto max-h-[500px]">
            <div className="grid gap-4">
              {details.length > 0 ? (
                details.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 py-1 border-b last:border-0">
                    <span className="font-medium">{spec.key}</span>
                    <span>{spec.value}</span>
                  </div>
                ))
              ) : (
                <h3 className="text-lg font-medium text-muted-foreground">
                  No specifications available for this product
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="rounded-xl overflow-hidden">
          <div className=" rounded-xl bg-primary shadow-md dark:bg-primary/60  p-2 pl-3">
            <h2 className="text-lg text-white font-semibold">Reviews</h2>
          </div>
          <div className="p-4  overflow-y-auto max-h-[500px]">
            {!loading ? (
              reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={review.user?.pfp} alt="User" className="w-full h-full" />
                            <AvatarFallback className={`${bgColor} text-white font-extrabold`}>
                              {getInitials(review.user.name)}
                            </AvatarFallback>
                          </Avatar>
                         <div >
                         <span className="font-medium">{review?.user?.name || "Unknown"}</span>
                          
                         <div className=" flex  text-[10px] items-center text-green-200  " ><BadgeCheck className="w-4 text-blue-700"/>Verified Customer</div>
                         </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className="text-sm text-gray-30">{formatDate(review.createdAt)}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ml-[1.5px] ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div> 
                      <p className="mt-2 text-md text-gray-200"> {review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
               <div className="h-[400px]  flex flex-col items-center justify-center p-5 ">
                <MessageSquareMore className="h-12 w-12 text-muted-foreground" />
                 <h3 className="text-md text-center font-medium text-muted-foreground ">"There are currently no reviews for this product. 
                  Be the first to share your experience!"</h3>
               </div>
              )
            ) : (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSpecs

