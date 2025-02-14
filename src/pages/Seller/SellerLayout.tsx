import React, { useEffect } from "react";
import MainNav from "../../components/Seller/MainNav";
import axios from "../../lib/axios";
import { setSeller } from "@/redux/slices/seller";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const seller = useSelector((state: RootState) => state.seller.seller);
  const isAuthenticated = useSelector(
    (state: RootState) => state.seller.isAuthenticated
  );
  useEffect(() => {
    const getSellerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/seller-data`
        );
        if (response.status === 200 && response.data.authorized) {
          dispatch(
            setSeller({
              id: response.data?.seller.id,
              name: response.data?.seller.name,
              email: response.data?.seller.email,
              address: response.data?.seller.address,
              phone: response.data?.seller.phone,
              answer: response.data.seller.answer,
              pfp: response.data.seller.pfp,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!isAuthenticated) {
      getSellerData();
    }
  }, []);

  if (!isAuthenticated) {
    navigate("/");
  }
  
  return (
    <div className="flex min-h">
      <MainNav />
      <div className="flex-1">
        <header className="bg-[#004D00] text-white p-[0.9rem] flex justify-between items-center">
          <h1 className="text-xl font-semibold">{seller?.name}'s Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
