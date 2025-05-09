import { ArrowLeft } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets.ts";
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
    <div className="min-h-screen w-full bg-muted/30  dark:bg-muted/45 py-8 px-4 sm:px-6 lg:px-8">
      <nav>
        <div className="flex items-center justify-start mb-8">
          <div onClick={() => navigate("/")} className="flex absolute items-center justify-center space-x-1.5 font-semibold text-md hover:bg-primary/15 cursor-pointer px-4 py-1.5 rounded-full">
            <ArrowLeft className="h-5 w-5 cursor-pointer text-black dark:text-white"/>
            <span className="hidden md:flex">Back</span>
          </div>

          <div className="text-3xl flex items-center justify-center gap-2 font-extrabold text-gray-900 dark:text-inherit flex-grow text-center">
           <img className="w-12 h-12" src={assets.logo1}/> Electrohub
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
