import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { BreadcrumbHeader } from "./Header";
import { findBreadcrumbConfig } from "./BreadcrumbConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const location = useLocation();
  const breadcrumbs = findBreadcrumbConfig(location.pathname);

  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar userRole="admin" className="w-64 border-r" />
      <SidebarInset className="flex-1 overflow-auto">
        <BreadcrumbHeader items={breadcrumbs} />
        <div className="bg-slate-50/30 dark:bg-transparent dark:bg-gradient-to-br from-primary/5 to-slate-900/10  ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
