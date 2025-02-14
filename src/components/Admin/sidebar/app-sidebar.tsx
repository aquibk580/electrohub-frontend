"use client";

import type * as React from "react";
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
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type UserRole = "admin";

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
  const admin = useSelector((state: RootState) => state.admin.admin);
  const data: Record<UserRole, RoleData> = {
    admin: {
      user: {
        name: admin!.name,
        email: admin!.email,
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
  };
  const roleData = data[userRole];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={roleData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleData.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={roleData.user} userRole={userRole} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
