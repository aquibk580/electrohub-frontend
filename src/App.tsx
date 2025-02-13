import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserLogin from "./pages/Auth/UserLogin";
import SellerLogin from "./pages/Auth/SellerLogin";
import Cart from "./pages/User/Cart";
import UserRegister from "./pages/Auth/UserRegister";
import SellerRegister from "./pages/Auth/SellerRegister";
import ProductDisplay from "./pages/Product/Product";
import AuthLayout from "@/pages/Auth/AuthLayout";
import SellerForgotPassword from "./pages/Auth/SellerForgotPassword";
import UserForgotPassword from "./pages/Auth/UserForgotPassword";
import HomeLayout from "./pages/Home/HomeLayout";
import { ToastContainer } from "react-toastify";
import UserDetails from "./pages/Auth/UserDetails";
import SellerLayout from "./pages/Seller/SellerLayout";
import ProductList from "./pages/Seller/ProductList";
import AddProduct from "./pages/Seller/AddProduct";
import Dashboard from "./pages/Seller/Dashboard";
import Profile from "./pages/Seller/Profile";
import UserProfile from "./pages/User/Profile";
import SellerDetails from "./pages/Auth/SellerDetails";
import { Wishlist } from "./pages/User/WishList";
import UserLayout from "./pages/User/UserLayout";
import Reviews from "./pages/User/Review";
import UserOrders from "./pages/User/Order";
import OrderDetails from "./pages/User/OrderDetails";
import MobileSideBar from "./components/Home/MobileSidebar";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
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
          <Route
            path="wishlist"
            element={
              <UserLayout>
                <Wishlist />
              </UserLayout>
            }
          />
          <Route
            path="cart"
            element={
              <UserLayout>
                <Cart />
              </UserLayout>
            }
          />
          <Route
            path="profile"
            element={
              <UserLayout>
                <UserProfile />
              </UserLayout>
            }
          />
          <Route path="orders">
            <Route
              index
              element={
                <UserLayout>
                  <UserOrders />
                </UserLayout>
              }
            />
            <Route
              path=":id"
              element={
                <UserLayout>
                  <OrderDetails />
                </UserLayout>
              }
            />
            <Route />
          </Route>
          <Route
            path="reviews"
            element={
              <UserLayout>
                <Reviews />
              </UserLayout>
            }
          />
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
        <Route
          path="/product/:id"
          element={
            <HomeLayout>
              <ProductDisplay />
            </HomeLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
