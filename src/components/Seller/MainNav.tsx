import { AppSidebar } from "@/components/Common/sidebar/app-sidebar";
import { BreadcrumbHeader } from "@/components/Common/sidebar/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { useLocation } from "react-router-dom";
import { findBreadcrumbConfig } from "../Common/sidebar/BreadcrumbConfig";

const MainNav = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const breadcrumbs = findBreadcrumbConfig(location.pathname);
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
