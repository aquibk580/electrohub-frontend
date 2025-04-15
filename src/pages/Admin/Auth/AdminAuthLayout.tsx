import { ArrowLeft, ShoppingCart } from "lucide-react";
// import React from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminAuthLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-muted/45 py-8 px-4 sm:px-6 lg:px-8">
      <nav>
        <div className="flex items-center justify-start mb-8">
          <div onClick={() => navigate("/")}  className="flex absolute items-center justify-center space-x-1.5 font-semibold text-md hover:bg-primary/15 cursor-pointer px-4 py-1.5 rounded-full">
                   <ArrowLeft className="h-5 w-5 cursor-pointer text-black dark:text-white" />  
                    <span>Back</span> 
                   </div>
          <div className="text-3xl flex items-center justify-center gap-2 font-extrabold text-accent-foreground flex-grow text-center">
            <ShoppingCart className="text-green-500" /> Electrohub
          </div>
          <div className="w-6"></div>
        </div>
      </nav>
      <Outlet />
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <footer className="mt-8">
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-accent-foreground/65">
            <Link to="/terms" className="hover:text-accent-foreground/85">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-accent-foreground/85">
              Privacy Policy
            </Link>
            <Link to="/whats-new" className="hover:text-accent-foreground/85">
              What's New
            </Link>
            <Link to="/copyright" className="hover:text-accent-foreground/85">
              Copyright
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default AdminAuthLayout;
