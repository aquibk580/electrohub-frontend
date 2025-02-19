"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  Settings2,
  LayoutGrid,
  Users,
  Store,
  User,
  ShoppingBag,
  ClipboardList,
  Wallet,
  BarChart2,
  Bell,
  Shield,
  PackageSearch,
  BadgePlus,
  CircleUserRound,
  Home,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type UserRole = "admin" | "seller";

interface RoleData {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
  };
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
  navItems: any[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole;
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const seller = useSelector((state: RootState) => state.seller.seller);
  const admin = useSelector((state: RootState) => state.admin.admin);
  const data: Record<UserRole, RoleData> = {
    admin: {
      user: {
        name: admin?.name ?? "Admin",
        email: admin?.email ?? "admin@example.com",
        avatar: "/avatars/admin.jpg",
        role: "admin",
      },
      teams: [
        {
          name: "ELECTROHUB",
          logo: GalleryVerticalEnd,
          plan: "Enterprise",
        },
      ],
      navItems: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutGrid,
          isActive: true,
        },
        {
          title: "User Management",
          url: "#",
          icon: Users,
          items: [
            {
              title: "Seller",
              url: "/admin/seller",
              icon: Store,
            },
            {
              title: "Buyer",
              url: "/admin/buyer",
              icon: User,
            },
          ],
        },
        {
          title: "Product Management",
          url: "/admin/productmanage",
          icon: ShoppingBag,
        },
        {
          title: "Orders Management",
          url: "/admin/ordersmanage",
          icon: ClipboardList,
        },
        {
          title: "Payments & Transaction",
          url: "/admin/payments",
          icon: Wallet,
        },
        {
          title: "Reports & Analytics",
          url: "/admin/reports",
          icon: BarChart2,
        },
        {
          title: "Notification & Messages",
          url: "/admin/messages",
          icon: Bell,
        },
        {
          title: "CMS",
          url: "/admin/cms",
          icon: Bell,
        },
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings2,
        },
        {
          title: "Logs & Security",
          url: "/admin/logs",
          icon: Shield,
        },
      ],
    },
    seller: {
      user: {
        name: seller?.name ?? "Seller",
        email: seller?.email ?? "seller@example.com",
        avatar: seller?.pfp ?? "/avatars/seller.jpg",
        role: "seller",
      },
      teams: [
        {
          name: "Electrohub",
          logo: Store,
          plan: "Basic",
        },
      ],
      navItems: [
        {
          title: "Home",
          url: "/seller/dashboard",
          icon: Home,
          isActive: true,
        },
        {
          title: "Profile",
          url: "/seller/dashboard/profile",
          icon: CircleUserRound,
        },
        {
          title: "Add Products",
          url: "/seller/dashboard/add-product",
          icon: BadgePlus,
        },
        {
          title: "Product List",
          url: "/seller/dashboard/products",
          icon: PackageSearch,
        },
      ],
    },
  };
  const roleData = data[userRole];

  return (
    <Sidebar className="min-h-screen  " collapsible="icon" {...props}>
    <SidebarHeader >
      <TeamSwitcher teams={roleData.teams} />
    </SidebarHeader>
    <SidebarContent >
      <NavMain items={roleData.navItems} />
    </SidebarContent>
    <SidebarFooter >
      <NavUser user={roleData.user} userRole={userRole} />
    </SidebarFooter>
  </Sidebar>
  );
}
