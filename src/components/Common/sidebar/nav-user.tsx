import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { clearSeller } from "@/redux/slices/seller";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearAdmin } from "@/redux/slices/admin";
import { Button } from "@/components/ui/button";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "seller";
  };
  userRole: "admin" | "seller";
}

export function NavUser({ user, userRole }: NavUserProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isMobile } = useSidebar();

  // const menuItems = {
  //   admin: [
  //     { icon: Sparkles, label: "Upgrade to Pro" },
  //     { icon: BadgeCheck, label: "Account" },
  //     { icon: CreditCard, label: "Billing" },
  //     { icon: Bell, label: "Notifications" },
  //   ],
  //   seller: [
  //     { icon: Store, label: "Shop Settings" },
  //     { icon: User, label: "Profile" },
  //     { icon: Bell, label: "Notifications" },
  //     { icon: CreditCard, label: "Payment Info" },
  //   ]
  // }

  // const currentMenuItems = menuItems[userRole]

  const handleSellerLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`
      );
      if (response.status === 200) {
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "dark",
        });
        dispatch(clearSeller());
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleAdminLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/auth/logout`
      );
      if (response.status === 200) {
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "dark",
        });
        dispatch(clearAdmin());
        navigate("/admin/auth/signin");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className=" focus-visible:ring-0"
            >
              <Avatar className="h-8 w-8 rounded-full bg-red-600">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-green-950 text-white font-semibold">
                  {user.name.slice(0, 2).toUpperCase()} 
                </AvatarFallback>
              </Avatar>
              <div className=" flex flex-col text-left text-sm  leading-tight">
                <span className=" font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 space-y-1 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal  ">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-green-950 text-white font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs capitalize">
                    {userRole}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <hr />
            <DropdownMenuItem className="font-medium">
              <Button
                variant="outline"
                className=""
                onClick={() =>
                  user.role === "seller"
                    ? handleSellerLogout()
                    : handleAdminLogout()
                }
              >
                <LogOut className="mr-2 text-red-500 font-medium  h-4 w-4" />
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
