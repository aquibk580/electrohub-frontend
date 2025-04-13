import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
const AuthLayout = () => {
  const navigate = useNavigate();
  const isAuthenticatedUser = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const isAuthenticatedSeller = useSelector(
    (state: RootState) => state.seller.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticatedUser || isAuthenticatedSeller) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen w-full dark:bg-muted/45 py-8 px-4 sm:px-6 lg:px-8">
      <nav>
        <div className="flex items-center justify-start mb-8">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />

          <div className="text-3xl flex items-center justify-center gap-2 font-extrabold text-gray-900 dark:text-inherit flex-grow text-center">
            <ShoppingCart className="text-green-500" /> Electrohub
          </div>
          <div className="w-6"></div>
        </div>
      </nav>
      <Outlet />
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <footer className="mt-8">
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-white">
            <Link
              to="/terms"
              className="hover:text-black dark:hover:text-slate-300"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="hover:text-black  dark:hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/whats-new"
              className="hover:text-black dark:hover:text-slate-300"
            >
              What's New
            </Link>
            <Link
              to="/copyright"
              className="hover:text-black dark:hover:text-slate-300"
            >
              Copyright
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
