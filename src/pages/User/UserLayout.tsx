import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import Sidebar from "@/components/User/Sidebar";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    const adjustHeight = () => {
      setTimeout(() => {
        if (sidebarRef.current) {
          const sidebarHeight = sidebarRef.current.offsetHeight;
          setContentHeight(sidebarHeight);
        }
      }, 100);
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user/auth/signin");
    }
  }, []);

  if (isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <div className="flex flex-1 bg-muted dark:bg-gray-600/10 pt-[8rem] md:pt-[4.45rem] lg:pt-[6rem]">
          <div ref={sidebarRef} className="h-fit">
            <Sidebar />
          </div>
          <div
            ref={contentRef}
            className="flex-1 sm:p-6 p-4 overflow-hidden"
            style={{ height: contentHeight ? `${contentHeight}px` : "auto" }}
          >
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default UserLayout;
