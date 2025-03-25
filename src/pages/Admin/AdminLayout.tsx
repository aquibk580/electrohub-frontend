import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/Common/sidebar/SidebarLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AdminLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );

  if (!isAuthenticated) return null;

  return (
    <SidebarLayout>
      <div>
        <Outlet />
      </div>
    </SidebarLayout>
  );
};

export default AdminLayout;
