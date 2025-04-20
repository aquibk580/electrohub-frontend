import { useEffect } from "react";
import MainNav from "../../components/Seller/MainNav";
import axios from "../../lib/axios";
import { setSeller } from "@/redux/slices/seller";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SellerLayout() {
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

    if (!seller) {
      getSellerData();
    }
  }, [seller, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated, navigate]);
  ``;
  if (isAuthenticated) {
    return (
      <MainNav>
        <Helmet
          title=" Seller"
          meta={[
            {
              name: "og:url",
              property: "og:url",
              content: `${import.meta.env.VITE_APP_URL}/seller/dashboard`,
            },
          ]}
        ></Helmet>

        <div className=" p-1.5 md:p-6 bg-gray-50/15  h-[1000svh] dark:bg-muted/15">
          <Outlet />
        </div>
      </MainNav>
    );
  } else {
    return null;
  }
}
