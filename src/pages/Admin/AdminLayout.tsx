import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/Common/sidebar/SidebarLayout";

const AdminLayout = () => {
  return (
    <SidebarLayout>
      <div>
        <Outlet />
      </div>
    </SidebarLayout>
  );
};

export default AdminLayout;
