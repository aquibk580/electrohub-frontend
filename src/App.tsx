// import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserLogin from "./pages/Auth/UserLogin";
import SellerLogin from "./pages/Auth/SellerLogin";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import UserRegister from "./pages/Auth/UserRegister";
import SellerRegister from "./pages/Auth/SellerRegister";
import ProductDisplay from "./pages/ProductDisplay";
import AuthLayout from "./pages/Auth/components/AuthLayout";
import SellerForgotPassword from "./pages/Auth/SellerForgotPassword";
import UserForgotPassword from "./pages/Auth/UserForgotPassword";

const App = () => {
  const location = useLocation();

  // Define the routes where Navbar and Footer should be hidden
  const hiddenPaths: string[] = [
    "/user/auth/login",
    "/seller/auth/login",
    "/user/auth/register",
    "/seller/auth/register",
    "/seller/auth/forgot-password",
    "/user/auth/forgot-password",
  ];
  const shouldShowLayout = !hiddenPaths.includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user">
          <Route path="auth">
            <Route
              path="login"
              element={
                <AuthLayout>
                  <UserLogin />
                </AuthLayout>
              }
            />
            <Route
              path="register"
              element={
                <AuthLayout>
                  <UserRegister />
                </AuthLayout>
              }
            />
            <Route
              path="forgot-password"
              element={
                <AuthLayout>
                  <UserForgotPassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>

        <Route path="/seller">
          <Route path="auth">
            <Route
              path="login"
              element={
                <AuthLayout>
                  <SellerLogin />
                </AuthLayout>
              }
            />
            <Route
              path="register"
              element={
                <AuthLayout>
                  <SellerRegister />
                </AuthLayout>
              }
            />
            <Route
              path="forgot-password"
              element={
                <AuthLayout>
                  <SellerForgotPassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
      </Routes>
      {shouldShowLayout && <Footer />}
    </>
  );
};

export default App;
