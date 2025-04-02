import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { RootState } from "@/redux/store";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserProfileButton from "./UserProfileButton";
import { Loader2, Menu, Phone, ShoppingCart, UserRound } from "lucide-react";
import MobileSideBar from "./MobileSidebar";
import SearchBar from "./Searchbar";
import axios from "@/lib/axios";
import { Category, Product } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const pfp = useSelector((state: RootState) => state.user.pfp);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [dealProduct, setDealProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/6`
        );

        if (response.status === 200) setCategories(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDealProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/products/deal`
        );

        if (response.status === 200) setDealProduct(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchDealProduct();
  }, []);

  const components: {
    title: string;
    img: string;
    href: string;
  }[] = useMemo(() => {
    return categories.map((category) => {
      return {
        title: category.name,
        img: category.imageUrl,
        href: `/categories/${category.name}`,
      };
    });
  }, [categories]);

  return (
    <header className="fixed z-50 w-full border-b shadow-sm bg-white dark:bg-black">
      {/* Top Banner */}
      <div className="bg-primary  dark:bg-primary/25  text-sm py-1 px-6 lg:flex items-center justify-between hidden">
        <div className="flex items-center gap-2 w-full">
          <Phone className="w-4" />
          <p>+91-987654321</p>
        </div>
        <p className="text-end w-full">
          Get 5% off on Selected Items | Shop now
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="w-full flex  items-center justify-between px-3.5 md:px-6 lg:px-12 py-4">
        {/* Mobile Sidebar Toggle */}
        <div className="space-y-2 md:space-y-0 w-full md:flex   md:items-center lg:justify-between ">
          <div className="lg:hidden flex items-center w-full justify-between md:justify-normal md:gap-2.5">
            <Menu
              size={32}
              className="cursor-pointer "
              onClick={() => setShowSidebar(true)}
            />
            <div
              className="font-bold gap-1 text-3xl flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <ShoppingCart className="text-green-500" /> {""}
              Electrohub
            </div>
            <div className="md:hidden">
              {isAuthenticated && user ? (
                <UserProfileButton name={user.name} imageUrl={pfp!} />
              ) : (
                <div
                  onClick={() => navigate("/user/auth/signin")}
                  className="flex gap-1 items-center  cursor-pointer hover:text-orange-600"
                >
                  <UserRound className="text-black  dark:text-white lg:w-4 lg:h-4" />
                  <p className="hidden lg:block">Account</p>
                </div>
              )}
            </div>


          </div>

          {/* Desktop Logo */}
          <div
            className="font-bold text-2xl hidden lg:flex    items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ShoppingCart className="text-green-500 p-[1.5px]" />
            Electrohub
          </div>

          {/* Navigation Menu */}
          <NavigationMenu
            className="hidden   rounded-xl lg:flex"
            onValueChange={(value) => setOpen(value === "open")}
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent ">Deals</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-6  md:w-[400px] lg:w-[500px] lg:grid-cols-1">
                    {dealProduct ? (
                      <li className="row-span-3 relative overflow-hidden rounded-xl bg-muted/35 shadow-md  p-4 group">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-lg  no-underline outline-none focus:shadow-md"
                            href={`/product/${dealProduct?.id}`}
                          >
                            {/* Offer Badge */}
                            <div className="absolute top-3 right-3 z-10">
                              <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-md transform -rotate-6 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {dealProduct?.offerPercentage || 0}% OFF
                              </span>
                            </div>

                            {/* Product Image */}
                            <div className="relative h-56 w-56 mx-auto overflow-hidden rounded-t-lg">
                              <img
                                src={dealProduct?.images[0].url}
                                alt="Deal Product"
                                className="object-contain h-full w-full transition-transform group-hover:scale-110 duration-300"
                              />
                            </div>

                            {/* Product Info Overlay */}
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1">
                                {dealProduct?.name || "Premium Product"}
                              </h3>

                              {/* Price Section */}
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-500 font-semibold line-through text-sm">
                                  ₹{formatPrice(dealProduct!.price) || 0}
                                </span>
                                <span className="text-xl font-bold text-emerald-600">
                                  ₹
                                  {dealProduct?.offerPercentage
                                    ? formatPrice(
                                      dealProduct!.price *
                                      (1 - dealProduct!.offerPercentage / 100)
                                    )
                                    : dealProduct?.price}
                                </span>
                              </div>

                              {/* Rating */}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ) : (
                      <div className="flex flex-col justify-center items-center h-screen">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Loading Deals...</p>
                      </div>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="rounded-full">
                <NavigationMenuTrigger
                  className="rounded-full bg-transparent"
                  onClick={() => setOpen(!open)}
                >
                  Category
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl" >
                  <ul className="grid w-[400px] gap-4 p-4 rounded-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <Link
                        to={component.href}
                        key={component.title}
                        onClick={() => setOpen(false)}
                        className="group"
                      >
                        <ListItem className="flex flex-row items-center  p-3 border  shadow-none rounded-xl transition-all duration-300 hover:shadow-sm  hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-gradient-to-br from-primary/5 via-black to-primary/5">
                          <div className="flex flex-row items-center gap-4">
                            {/* Category Image */}
                            <img
                              src={component.img}
                              alt={component.title}
                              className="w-20 h-20 rounded-lg object-contain "
                            />

                            {/* Category Text */}
                            <div className="flex flex-col">
                              <div className="font-semibold text-xl hover:text-primary text-accent-foreground">
                                {component.title}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Discover the latest & top-rated {component.title} products. 
                              </p>
                            </div>
                          </div>
                        </ListItem>
                      </Link>
                    ))}
                  </ul>

                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="bg-transparent">
                <Link to="/about">
                  <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


          {/* Search Bar */}
          <SearchBar />


          {/* User Account/Profile */}
          <div className="hidden  md:flex gap-6 ">
            {isAuthenticated && user ? (
              <UserProfileButton name={user.name} imageUrl={pfp!} />
            ) : (
              <div
                onClick={() => navigate("/user/auth/signin")}
                className="flex gap-1 md:pl-4 items-center cursor-pointer hover:text-orange-600"
              >
                <UserRound className="text-black  dark:text-white" />
                <p className="hidden lg:block">Account</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 lg:hidden ${showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <MobileSideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <span
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </span>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
