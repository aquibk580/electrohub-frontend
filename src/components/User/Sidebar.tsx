"use client"

import { assets } from "@/assets/assets"
import type { AppDispatch, RootState } from "@/redux/store"
import { forwardRef, useMemo } from "react"
import { Home, User, ShoppingCart, Package, Star, Heart, LogOut, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { clearUser } from "@/redux/slices/user"
import { toast } from "react-toastify"
import axios from "../../lib/axios"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

const Sidebar = forwardRef<HTMLDivElement>((props, ref) => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user)
  const pfp = useSelector((state: RootState) => state.user.pfp)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState("")

  const sidebarData = [
    {
      path: "/",
      text: "Home",
      icon: Home,
    },
    {
      path: "/user/wishlist",
      text: "Wishlist",
      icon: Heart,
    },
    {
      path: "/user/profile",
      text: "Profile Information",
      icon: User,
    },
    {
      path: "/user/cart",
      text: "Cart",
      icon: ShoppingCart,
    },
    {
      path: "/user/orders",
      text: "My Orders",
      icon: Package,
    },
    {
      path: "/user/reviews",
      text: "My Reviews & Ratings",
      icon: Star,
    },
    {
      path: "/user/settings",
      text: "Settings",
      icon: Settings,
    },
  ]

  useEffect(() => {
    const currentItem = sidebarData.find((item) => item.path === location.pathname)
    setActiveItem(currentItem ? currentItem.text : "")
  }, [location.pathname])

  const handleLogOut = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/logout")
      if (response.status === 200) {
        dispatch(clearUser())
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "light",
        })
        navigate("/")
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "light",
      })
      console.log(error)
    }
  }

  function getRandomColor() {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const initials = user?.name
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const bgColor = useMemo(() => getRandomColor(), [])

  return (
    <div ref={ref} className="w-64 h-fit m-6 mr-0 hidden lg:grid grid-rows-[auto_1fr_auto] gap-6">
      {/* User profile card */}
      <div className="flex items-center gap-4 bg-white dark:bg-black p-4 shadow-md rounded-xl">
        <div className="h-12 w-12 flex items-center justify-center ">
          <Avatar className="rounded-full">
            <AvatarImage src={pfp!} alt="User" className="rounded-full" />
            <AvatarFallback className={`${bgColor} text-white font-bold rounded-full px-3 py-[0.9rem]`}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Hello,</div>
          <div className="font-medium dark:text-white">{user?.name}</div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="grid grid-rows-6 h-fit gap-1 text-sm font-medium py-4 bg-white dark:bg-black shadow-md rounded-xl items-center justify-center">
        {sidebarData.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg h-fit text-accent-foreground 
              hover:bg-accent
              ${activeItem === item.text && "bg-primary/25 hover:bg-primary/35 "}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>

      {/* Banner and Logout */}
      <div className="grid gap-6">
        <img src={assets.BannerLogo || "/placeholder.svg"} className="rounded-lg shadow-md" alt="Banner" />
        <Button
          variant="outline"
          className="flex items-center w-full p-5 space-x-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg shadow-md"
          onClick={handleLogOut}
        >
          <LogOut className="w-6 h-6 min-w-[24px] min-h-[24px] text-red-600 dark:text-red-400" />
          <span className="text-black dark:text-white">Log Out</span>
        </Button>
      </div>
    </div>
  )
})

export default Sidebar

