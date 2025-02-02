import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserLogin from "./pages/Auth/UserLogin";
import SellerLogin from "./pages/Auth/SellerLogin";
import Cart from "./pages/Cart/Cart";
import UserRegister from "./pages/Auth/UserRegister";
import SellerRegister from "./pages/Auth/SellerRegister";
import ProductDisplay from "./pages/Product/Product";
import AuthLayout from "@/pages/Auth/AuthLayout";
import SellerForgotPassword from "./pages/Auth/SellerForgotPassword";
import UserForgotPassword from "./pages/Auth/UserForgotPassword";
import UserLayout from "./pages/Home/UserLayout";
import { ToastContainer } from "react-toastify";
import UserDetails from "./pages/Auth/UserDetails";
import SellerLayout from "./pages/Seller/SellerLayout";
import ProductList from "./pages/Seller/ProductList";
import AddProduct from "./pages/Seller/AddProduct";
import Dashboard from "./pages/Seller/Dashboard";
import Profile from "./pages/Seller/Profile";
import SellerDetails from "./pages/Auth/SellerDetails";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
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
            <Route
              path="user-details"
              element={
                <AuthLayout>
                  <UserDetails />
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
             <Route
              path="seller-details"
              element={
                <AuthLayout>
                  <SellerDetails />
                </AuthLayout>
              }
            />
          </Route>
          <Route path="dashboard">
            <Route
              index
              element={
                <SellerLayout>
                  <Dashboard />
                </SellerLayout>
              }
            />
            <Route
              path="products"
              element={
                <SellerLayout>
                  <ProductList />
                </SellerLayout>
              }
            />
            <Route
              path="add-product"
              element={
                <SellerLayout>
                  <AddProduct />
                </SellerLayout>
              }
            />
            <Route
              path="profile"
              element={
                <SellerLayout>
                  <Profile />
                </SellerLayout>
              }
            />
          </Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
      </Routes>
    </>
  );
};

export default App;
