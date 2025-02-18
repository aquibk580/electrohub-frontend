import { AppSidebar } from "@/components/Common/sidebar/app-sidebar";
import { BreadcrumbHeader } from "@/components/Common/sidebar/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const breadcrumbs: { href: string; label: string }[] = [
  { href: "/dashboard", label: "Dashboard" },
];

const MainNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar userRole="seller" className="w-64 border-r" />

      {/* Main Content */}
      <SidebarInset className="flex-1 overflow-auto ">
        <BreadcrumbHeader items={breadcrumbs} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainNav;
