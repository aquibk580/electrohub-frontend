"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Star,
  ShoppingCart,
  Loader2,
  BadgeCheck,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  PackageX,
} from "lucide-react";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import type { Seller, Product } from "@/types/entityTypes"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/Home/ProductCard"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const TopSellerPage: React.FC = () => {
  const { sellerId } = useParams()
  const [seller, setSeller] = useState<Seller | null>(null)
  const [averageRating, setAverageRating] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  useEffect(() => {
    const getSellerData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/sellers/${sellerId}`)
        if (response.status === 200) {
          setSeller(response.data.seller)
          setAverageRating(response.data.averageRating)
          setTotalSales(response.data.totalSales)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getSellerData()
  }, [sellerId]);

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchWishlist = async () => {
      try {
        const wishlistRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/wishlist/wishlistproducts`)

        if (wishlistRes.status === 200 && wishlistRes.data?.wishlist) {
          setWishlist(new Set(wishlistRes.data.wishlist))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchWishlist()
  }, [isAuthenticated])


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Loading seller profile...</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{seller?.name || "Top Seller"} | Marketplace</title>
        <meta
          name="description"
          content={`Shop premium products from ${seller?.name}, a verified top seller on our marketplace.`}
        />
      </Helmet>

      <div className="min-h-screen  dark:bg-black">


        {/* Hero Section */}
        <div className=" dark:bg-black ">
          <div className="container  mx-auto px-4 pt-16 md:py-6">
            <div className="flex flex-col lg:flex-row gap-10 py-6 bg-slate-50/30 border dark:border-slate-700    dark:bg-gradient-to-tl from-slate-700 via-slate-900 to-black  shadow-md rounded-xl items-center px-6 md:px-16 ">
              <div className="flex flex-col  items-center   justify-center ">
                <div className="relative ">
                  <img
                    src={seller?.pfp || "/placeholder.svg?height=160&width=160"}
                    alt={seller?.name}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-[3px] dark:border-white  p-1 shadow-md"
                  />
                  <Badge className="absolute bottom-0 left-12 px-2 py-1  bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 rounded-lg dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                  </Badge>
                </div>


              </div>
              <div className="md:w-11/12 lg:w-4/5">
                <h1 className="text-3xl md:text-4xl text-center lg:text-start  font-bold text-gray-900 dark:text-white">{seller?.name}</h1>
                <p className="mt-2 text-gray-600 text-center md:text-start dark:text-gray-400">Experience Premium Quality Products with Fast & Reliable Delivery!</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 border dark:border-slate-700 shadow-md dark:bg-gray-800/50  p-3 md:p-4 rounded-xl">
                    <div className="p-2">
                      <Package className="w-8 h-8 text-gray-700  dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{seller?.products.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 border  dark:border-slate-700 shadow-md dark:bg-gray-800/50 p-3 md:p-4 rounded-xl">
                    <div className="p-2 ">
                      <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{averageRating.toFixed(1)} / 5</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 border dark:border-slate-700 shadow-md dark:bg-gray-800/50 p-3 md:p-4 rounded-xl">
                    <div className="p-2 ">
                      <ShoppingCart className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sales</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{totalSales.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="flex  gap-3">
                    <MapPin className="w-5 h-5  text-gray-400" />
                    <span className="text-gray-600  dark:text-gray-300">{seller?.address || "Mumbai, India"}</span>
                  </div>

                  <div className="flex  gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600  dark:text-gray-300">
                    Member since in {new Date(seller?.createdAt).getFullYear()}
                    </span>
                  </div>

                  <div className="flex  gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Responds within 24 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-3 lg:py-1">
          <div className="flex flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">Products by {seller?.name}</h2>
            <div className="flex  w-max items-center gap-2 border rounded-full bg-muted py-1.5 px-4 text-gray-600 dark:text-gray-400">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-[10px] md:text-sm ">100% Authentic Products</span>
            </div>
          </div>

          <Separator className="mb-8" />

          {seller?.products && seller.products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {seller.products.map((product) => (
                <ProductCard product={product} wishlist={wishlist} setWishlist={setWishlist} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center shadow-md bg-slate-50/30 dark:border-none dark:bg-transparent rounded-xl border border-gray-200 dark:border-gray-800">
              <PackageX className="w-16 h-16 text-gray-900 dark:text-gray-50 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Products Available</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                This seller hasn't listed any products yet. Check back soon for new items!
              </p>
              <Button
                variant="outline"
                className="rounded-lg border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 dark:border-gray-200 dark:text-gray-300 dark:hover:border-gray-600"
              >
                Notify Me When Products Are Added
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TopSellerPage

