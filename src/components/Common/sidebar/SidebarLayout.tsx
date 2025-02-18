import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { BreadcrumbHeader } from "./Header";
import breadcrumbConfig from "./BreadcrumbConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  const location = useLocation();
  const breadcrumbs = breadcrumbConfig[location.pathname] || [];

  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar userRole="admin" className="w-64 border-r" />
      <SidebarInset className="flex-1 overflow-auto">
        <BreadcrumbHeader items={breadcrumbs} />
        <div className="bg-primary/5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
