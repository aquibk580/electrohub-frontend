import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { assets } from "../../assets/assets";
import axios from "../../lib/axios";

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
import { setPfp, setUser } from "@/redux/slices/user";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/user-data"
        );

        if (response.status === 200 && response.data?.authorized) {
          const user = response.data.user;

          dispatch(
            setUser({
              id: user.id,
              email: user.email,
              name: user.name,
              address: user.address,
              phone: user.phone,
              answer: user.answer,
            })
          );
          dispatch(setPfp(user.pfp));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.warn("User is unauthorized.");
          } else if (error.response?.status === 404) {
            console.warn("User not found.");
          } else {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchUserData();
  }, []);

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
    <header>
      <div className="bg-green-950 text-white w-full items-start text-sm flex justify-between px-6 py-1 ">
        <div className="flex items-center">
          <img className="w-4" src={assets.phone_icon} alt="" />
          <p>+91-987654321</p>
        </div>
        <p>Get 5% off on Selected Items | Shop now</p>
      </div>
      <nav className=" w-ful border  flex justify-evenly px-12 py-4 font-medium items-center">
        <h1 className="font-semibold text-3xl">Electrohub</h1>
        <NavigationMenu>
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
              <Link to="/docs">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/docs">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  What's New
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <form className="flex  items-center border px-3 py-2 rounded-full focus-within:border-green-600">
          <input
            className="outline-none w-[400px] text-md"
            type="search"
            placeholder="Search your products"
          />
          <img className="h-5" src={assets.search_icon} alt="" />
        </form>

        <div className="flex gap-6">
          {isAuthenticated && user ? (
            <UserProfileButton name={user.name} imageUrl={pfp!} />
          ) : (
            <div
              onClick={() => navigate("/user/auth/login")}
              className="flex gap-1 items-center  cursor-pointer hover:text-orange-600 "
            >
              <img className="h-5" src={assets.account_icon} alt="" />
              <p>Account</p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
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
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
