import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/Common/Scroll-To-Top";

// Layouts
import HomeLayout from "./pages/Home/HomeLayout";
import UserLayout from "./pages/User/UserLayout";
import SellerLayout from "./pages/Seller/SellerLayout";
import AdminLayout from "@/components/Common/sidebar/SidebarLayout";
import AuthLayout from "@/pages/Auth/AuthLayout";
import AdminAuthLayout from "./pages/Admin/Auth/AdminAuthLayout";

// Shared
import NotFound from "./components/ui/not-found";

// Home Pages
import Home from "./pages/Home/Home";
import Category from "./pages/Home/Category";
import AboutUs from "./pages/Home/About-us";
import ContactUs from "./pages/Home/Contact-us";
import ProductDisplay from "./pages/Product/Product";
import TopSellers from "./pages/Home/TopSellers";
import InfoPage from "./pages/Home/Footer-links";

// User Auth & Pages
import UserLogin from "./pages/Auth/UserLogin";
import UserRegister from "./pages/Auth/UserRegister";
import UserForgotPassword from "./pages/Auth/UserForgotPassword";
import UserDetails from "./pages/Auth/UserDetails";
import { Wishlist } from "./pages/User/WishList";
import Cart from "./pages/User/Cart";
import UserProfile from "./pages/User/Profile";
import UserSettings from "./pages/User/Settings";
import UserOrders from "./pages/User/Order";
import OrderDetails from "./pages/User/OrderDetails";
import Reviews from "./pages/User/Review";

// Seller Auth & Pages
import SellerLogin from "./pages/Auth/SellerLogin";
import SellerRegister from "./pages/Auth/SellerRegister";
import SellerForgotPassword from "./pages/Auth/SellerForgotPassword";
import SellerDetails from "./pages/Auth/SellerDetails";
import Dashboard from "./pages/Seller/Dashboard";
import ViewOrder from "./pages/Seller/ViewOrder";
import ProductList from "./pages/Seller/ProductList";
import ViewProduct from "./pages/Seller/ViewProduct";
import EditProduct from "./pages/Seller/EditProduct";
import AddProduct from "./pages/Seller/AddProduct";
import SellerSettings from "./pages/Seller/Settings";
import SellerContact from "./pages/Seller/Contact";
import Profile from "./pages/Seller/Profile";

// Admin Auth & Pages
import Signin from "./pages/Admin/Auth/Signin";
import Signup from "./pages/Admin/Auth/Signup";
import AdminForgotPassword from "./pages/Admin/Auth/AdminForgotPassword";
import AdminDashboard from "./pages/Admin/Dashboard";
import Seller from "./pages/Admin/Seller";
import SellerInfo from "./pages/Admin/SellerInfo";
import Buyer from "./pages/Admin/Buyer";
import BuyerDetails from "./pages/Admin/BuyerDetails";
import ProductManagement from "./pages/Admin/Products";
import ProductDetails from "./pages/Admin/ProductsManage";
import Order from "./pages/Admin/Order";
import OrderInfo from "./pages/Admin/OrdersManage";
import Admins from "./pages/Admin/Admins";
import Messages from "./pages/Admin/Messages";
import ChatLayout from "./components/Admin/ChatLayout";
import ContentManagement from "./pages/Admin/ContentManagement";
import AdminSettings from "./pages/Admin/Settings";
import LogsAndSecurity from "./pages/Admin/Logs";

const App = () => {
  return (
    <>
      <ToastContainer />

      <ScrollToTop />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryName" element={<Category />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/topsellers/:sellerId" element={<TopSellers />} />
          <Route path="/info/:section" element={<InfoPage />} />
        </Route>
        <Route path="/user">
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<UserLogin />} />
            <Route path="signup" element={<UserRegister />} />
            <Route path="forgot-password" element={<UserForgotPassword />} />
            <Route path="user-details" element={<UserDetails />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="orders">
              <Route index element={<UserOrders />} />
              <Route path=":id" element={<OrderDetails />} />
            </Route>
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>

        <Route path="/seller">
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<SellerLogin />} />
            <Route path="signup" element={<SellerRegister />} />
            <Route path="forgot-password" element={<SellerForgotPassword />} />
            <Route path="seller-details" element={<SellerDetails />} />
          </Route>
          <Route path="dashboard" element={<SellerLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders/:id" element={<ViewOrder />} />
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path="view-product/:id" element={<ViewProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="contact" element={<SellerContact />} />
          <Route path="settings" element={<SellerSettings />} />
        </Route>
        <Route path="/admin">
          <Route path="auth" element={<AdminAuthLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<AdminForgotPassword />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="seller" element={<Seller />} />
            <Route path="sellerinfo/:id" element={<SellerInfo />} />
            <Route path="buyer" element={<Buyer />} />
            <Route path="buyer/:id" element={<BuyerDetails />} />
            <Route path="productmanage" element={<ProductManagement />} />
            <Route path="productsmanage/:id" element={<ProductDetails />} />
            <Route path="ordersmanage" element={<Order />} />
            <Route path="ordersmanage/:id" element={<OrderInfo />} />
            <Route path="admins" element={<Admins />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/chat/:id" element={<ChatLayout />} />
            <Route path="cms" element={<ContentManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logs" element={<LogsAndSecurity />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
