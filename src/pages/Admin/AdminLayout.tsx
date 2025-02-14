import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/Admin/sidebar/SidebarLayout";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <SidebarLayout>
      <div className="admin-content">
        <Outlet /> {/* This will render the nested routes */}

      </div>
      </SidebarLayout>
    </div>
  );
};

export default AdminLayout;
