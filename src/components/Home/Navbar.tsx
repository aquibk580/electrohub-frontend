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
import { Menu, Phone, ShoppingCart, UserRound } from "lucide-react";
import MobileSideBar from "./MobileSidebar";
import SearchBar from "./Searchbar";
import axios from "@/lib/axios";
import { Category } from "@/types/entityTypes";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const pfp = useSelector((state: RootState) => state.user.pfp);
  const [categories, setCategories] = useState<Array<Category>>([]);
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
      <div className="bg-primary dark:bg-primary/25  text-sm py-1 px-6 lg:flex items-center justify-between hidden">
        <div className="flex items-center gap-2 w-full">
          <Phone className="w-4" />
          <p>+91-987654321</p>
        </div>
        <p className="text-end w-full">
          Get 5% off on Selected Items | Shop now
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="w-full flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex items-center w-full justify-between">
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
          <div>
            {isAuthenticated && user ? (
              <UserProfileButton name={user.name} imageUrl={pfp!} />
            ) : (
              <div
                onClick={() => navigate("/user/auth/signin")}
                className="flex gap-1 items-center cursor-pointer hover:text-orange-600"
              >
                <UserRound className="text-black  dark:text-white lg:w-4 lg:h-4" />
                <p className="hidden lg:block">Account</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Logo */}
        <div
          className="font-bold text-2xl hidden lg:flex   items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ShoppingCart className="text-green-500 p-[1.5px]" />
          Electrohub
        </div>

        {/* Navigation Menu */}
        <NavigationMenu
          className="hidden lg:flex"
          onValueChange={(value) => setOpen(value === "open")}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-full">
                Deals
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      ></a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="rounded-full"
                onClick={() => setOpen(!open)}
              >
                Category
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <Link
                      to={component.href}
                      key={component.title}
                      onClick={() => setOpen(false)}
                    >
                      <ListItem className="flex flex-row items-center p-2 py-1 border rounded-md ">
                        <div className="flex flex-row items-center gap-3">
                          <img
                            src={component.img}
                            alt={component.title}
                            className="w-20 h-20 rounded-md object-cover"
                          />

                          <div className="flex flex-col items-start">
                            <div className="font-medium text-md">
                              {component.title}
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
        <div className="hidden lg:flex gap-6 ">
          {isAuthenticated && user ? (
            <UserProfileButton name={user.name} imageUrl={pfp!} />
          ) : (
            <div
              onClick={() => navigate("/user/auth/signin")}
              className="flex gap-1 items-center cursor-pointer hover:text-orange-600"
            >
              <UserRound className="text-black dark:text-white" />
              <p className="hidden lg:block">Account</p>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 lg:hidden ${
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
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
