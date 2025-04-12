import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setPfp, setUser } from "@/redux/slices/user";
import axios from "../../lib/axios";
import API from "axios";
import { ChatBot } from "@/components/Home/ChatBot";
import { Helmet } from "react-helmet-async";
const HomeLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const isSellerAuthenticated = useSelector(
    (state: RootState) => state.seller.isAuthenticated
  );
  useEffect(() => {
    if (isSellerAuthenticated) {
      navigate("/seller/dashboard");
      return;
    }
  }, [isSellerAuthenticated, navigate]);

  if (isSellerAuthenticated) return null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user-data`
        );

        if (response.status === 200 && response.data?.authorized) {
          const user = response.data.user;

          dispatch(
            setUser({
              id: user.id,
              email: user.email,
              name: user.name,
              address: user.address,
              phone: user.phone,
              answer: user.answer,
              gender: user.gender,
            })
          );
          dispatch(setPfp(user.pfp));
        }
      } catch (error: any) {
        if (API.isAxiosError(error)) {
          const status = error.response?.status;

          switch (status) {
            case 401:
              console.warn("User is unauthorized. Logging out...");
              break;
            case 404:
              console.warn("User not found.");
              break;
            default:
              console.error("Error fetching user data:", error.message);
          }
        } else {
          console.error("Non-Axios error:", error);
        }
      }
    };
    if (!isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="selection:bg-primary selection:text-primary-foreground">
      <Helmet
        title="Electrohub"
        meta={[
          {
            name: "description",
            content: "Buy Products at very Reasonable cost",
          },
        ]}
      />
      <Navbar />
      <div className="pt-[4rem] lg:pt-[6.7rem] ">
        <Outlet />
      </div>
      <div
        className={` transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <ChatBot
          botName="Electro Bot"
          welcomeMessage="👋 Hi there! How can I help you today?"
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
