import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, User2, PlusCircle, Package, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearSeller } from "@/redux/slices/seller";
import axios from "../../lib/axios";
import { toast } from "react-toastify";

export default function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    {
      href: "/seller/dashboard",
      icon: Home,
      title: "Home",
    },
    {
      href: "/seller/dashboard/profile",
      icon: User2,
      title: "Profile",
    },
    {
      href: "/seller/dashboard/add-product",
      icon: PlusCircle,
      title: "Add Product",
    },
    {
      href: "/seller/dashboard/products",
      icon: Package,
      title: "Product List",
    },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/logout");
      if (response.status === 200) {
        dispatch(clearSeller());
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "light",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider className="w-fit">
      <Sidebar>
        <SidebarHeader className="border-b border-border/50">
          <Link to="/" className="flex items-center gap-2 px-4 py-2">
            <span className="text-xl font-bold">Electrohub</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="p-4 space-y-3">
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton
                  isActive={location.pathname === route.href}
                  className="flex items-center w-full p-2"
                  onClick={() => navigate(route.href)}
                >
                  <route.icon className="w-6 h-6 min-w-[24px] min-h-[24px]" />
                  <span>{route.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="p-5">
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center w-full p-2 space-x-1"
                onClick={handleLogOut}
              >
                <LogOut className="w-6 h-6 min-w-[24px] min-h-[24px] text-red-600" />
                <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
