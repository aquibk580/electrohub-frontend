import React, { useEffect } from "react";
import MainNav from "../../components/Seller/MainNav";
import axios from "../../lib/axios";
import { setSeller } from "@/redux/slices/seller";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
          "http://localhost:8000/api/auth/seller-data"
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

    if (!seller) {
      getSellerData();
    }
  }, [seller, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <MainNav>
      <Helmet
        title=" Seller"
        meta={[
          {
            name: "og:url",
            property: "og:url",
            content: `${import.meta.env.VITE_APP_URL}/seller/dashboard`,
          }
        ]}></Helmet>



      <div className=" h-full p-1.5 md:p-6 bg-white dark:bg-black">{children}</div>
    </MainNav>
  );
}
