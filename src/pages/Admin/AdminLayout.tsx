import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/Common/sidebar/SidebarLayout";
import { Helmet } from "react-helmet-async";
const AdminLayout = () => {
  return (
    <SidebarLayout>
      <Helmet>
      <title>Admin</title>
      <meta name="description" content="Manage Seller, User and Products" />
      </Helmet>
      <div>
        <Outlet />
      </div>
    </SidebarLayout>
  );
};

export default AdminLayout;
