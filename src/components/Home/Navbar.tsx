import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { assets } from "../../assets/assets";

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
import { Menu } from "lucide-react";
import MobileSideBar from "./MobileSidebar";
import { Input } from "../ui/input";
import Logo from "../Logo";
import SearchBar from "./Searchbar";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const pfp = useSelector((state: RootState) => state.user.pfp);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const components: {
    title: string;
    img: string;
    href: string;
    description: string;
  }[] = [
    {
      title: "Alert Dialog",
      img: assets.laptop,
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      img: assets.mobile,
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      img: assets.monitor,
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      img: assets.earbuds,
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      img: assets.tablet,
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      img: assets.watch,
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <header className="fixed z-50 w-full border-b shadow-sm bg-white dark:bg-black">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-sm py-1 px-6 lg:flex justify-between hidden">
        <div className="flex items-center gap-2 w-full">
          <img className="w-4" src={assets.phone_icon} alt="Phone" />
          <p>+91-987654321</p>
        </div>
        <p className="text-center w-full">
          Get 5% off on Selected Items | Shop now
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="w-full flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex items-center w-full justify-between">
          <Menu
            size={32}
            className="cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="font-semibold text-3xl flex items-center cursor-pointer"  onClick={() => navigate("/")}>
            <Logo
              containerClass="w-6 h-6 mr-[0.1rem]"
              polygonClass="fill-black dark:fill-white"
              frameClass="fill-black dark:fill-white"
            />
            lectrohub
          </h1>
          <div>
            {isAuthenticated && user ? (
              <UserProfileButton name={user.name} imageUrl={pfp!} />
            ) : (
              <div
                onClick={() => navigate("/user/auth/signin")}
                className="flex gap-1 items-center cursor-pointer hover:text-orange-600"
              >
                <img
                  className="lg:h-5 h-7"
                  src={assets.account_icon}
                  alt="Account"
                />
                <p className="hidden lg:block">Account</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Logo */}
        <h1 className="font-semibold text-3xl hidden lg:flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Logo
            containerClass="w-6 h-6  mr-[0.1rem]"
            polygonClass="fill-black dark:fill-white"
            frameClass="fill-black dark:fill-white"
          />
          lectrohub
        </h1>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
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
              <NavigationMenuTrigger className="rounded-full">
                Category
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      className="flex flex-row items-center p-2 py-1 border  rounded-md " // Reduced vertical padding (py-1)
                      key={component.title}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={component.img}
                          alt={component.title}
                          className="w-20 h-20 rounded-md object-cover"
                        />

                        <div className="flex flex-col items-start">
                          <div className="font-medium text-black text-md">
                            {component.title}
                          </div>
                          <div className="text-xs">
                            {component.description.slice(0, 45)}...
                          </div>
                        </div>
                      </div>
                    </ListItem>
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
              <img
                className="lg:h-5 h-7"
                src={assets.account_icon}
                alt="Account"
              />
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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
