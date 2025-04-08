"use client"

import type { RootState } from "@/redux/store"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const isAuthenticatedUser = useSelector((state: RootState) => state.user.isAuthenticated)
  const isAuthenticatedSeller = useSelector((state: RootState) => state.seller.isAuthenticated)

  useEffect(() => {
    if (isAuthenticatedUser || isAuthenticatedSeller) {
      navigate("/")
    }
  }, [isAuthenticatedUser, isAuthenticatedSeller, navigate])

  return (
    <div className="min-h-screen w-full dark:bg-muted/45">
      <BackgroundBeamsWithCollision className="min-h-screen">
        <div className="relative z-10 w-full py-8 px-4 sm:px-6 lg:px-8">
          <nav>
            <div className="flex items-center justify-start mb-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-8 w-8 text-black dark:text-white" />
              </Link>
              <div className="text-3xl flex items-center justify-center gap-2 font-extrabold text-gray-900 dark:text-white flex-grow text-center">
                <ShoppingCart className="text-green-500" /> Electrohub
              </div>
              <div className="w-6"></div>
            </div>
          </nav>
          {children}
          <div className="max-w-4xl w-full mx-auto space-y-8">
            <footer className="mt-8">
              <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-white">
                <Link to="/terms" className="hover:text-black dark:hover:text-slate-300">
                  Terms & Conditions
                </Link>
                <Link to="/privacy" className="hover:text-black dark:hover:text-slate-300">
                  Privacy Policy
                </Link>
                <Link to="/whats-new" className="hover:text-black dark:hover:text-slate-300">
                  What's New
                </Link>
                <Link to="/copyright" className="hover:text-black dark:hover:text-slate-300">
                  Copyright
                </Link>
              </nav>
            </footer>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default AuthLayout
