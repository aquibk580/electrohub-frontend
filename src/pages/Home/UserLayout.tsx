import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isSellerAuthenticated = useSelector(
    (state: RootState) => state.seller.isAuthenticated
  );
  useEffect(() => {
    if (isSellerAuthenticated) {
      navigate("/seller/dashboard");
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
