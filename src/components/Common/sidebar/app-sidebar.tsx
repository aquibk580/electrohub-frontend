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
  Bell,
  Shield,
  PackageSearch,
  BadgePlus,
  CircleUserRound,
  Home,
  FolderKanban,
  Mail,
  ShieldCheck,
  Contact,
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
          title: "Admins",
          url: "/admin/admins",
          icon: ShieldCheck,
        },
        {
          title: "Messages",
          url: "/admin/messages",
          icon: Mail,
        },
        {
          title: "CMS",
          url: "/admin/cms",
          icon: FolderKanban,
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
          title: "Dashboard",
          url: "/seller/dashboard",
          icon: LayoutGrid,
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
        {
          title: "Contact",
          url: "/seller/contact",
          icon: Contact,
        },
        {
          title: "Settings",
          url: "/seller/settings",
          icon: Settings2,
        },
      ],
    },
  };
  const roleData = data[userRole];

  return (
    <Sidebar className="min-h-screen " collapsible="icon" {...props}>
      <SidebarHeader className="bg-white dark:bg-black">
        <TeamSwitcher teams={roleData.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-black">
        <NavMain items={roleData.navItems} />
      </SidebarContent>
      <SidebarFooter className="bg-white dark:bg-black">
        <NavUser user={roleData.user} userRole={userRole} />
      </SidebarFooter>
    </Sidebar>
  );
}
