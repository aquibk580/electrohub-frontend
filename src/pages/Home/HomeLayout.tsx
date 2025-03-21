import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPfp, setUser } from "@/redux/slices/user";
import axios from "../../lib/axios";
import { ChatBot } from "@/components/Home/ChatBot";
// import { ChatBot } from "@/components/Home/NewChatbot";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
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
    }
  }, [isSellerAuthenticated, navigate]);

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
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.warn("User is unauthorized.");
          } else if (error.response?.status === 404) {
            console.warn("User not found.");
          } else {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    if (!isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, dispatch]);
  return (
    <div className="selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <div className="pt-[4rem] lg:pt-[6.7rem] ">{children}</div>
      <ChatBot
        botName="Support Bot"
        welcomeMessage="👋 Hi there! How can I help you today?"
      />
      <Footer />
    </div>
  );
};

export default HomeLayout;
