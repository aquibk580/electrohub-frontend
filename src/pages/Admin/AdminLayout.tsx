import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/Common/sidebar/SidebarLayout";

const AdminLayout = () => {
  return (
    <div>
      <SidebarLayout>
        <div>
          <Outlet />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default AdminLayout;
