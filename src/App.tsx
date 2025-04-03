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
import Signin from "./pages/Admin/Auth/Signin";
import Signup from "./pages/Admin/Auth/Signup";
import AdminForgotPassword from "./pages/Admin/Auth/AdminForgotPassword";
import AdminAuthLayout from "./pages/Admin/Auth/AdminAuthLayout";
import AdminLayout from "@/components/Common/sidebar/SidebarLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import Seller from "./pages/Admin/Seller";
import SellerInfo from "./pages/Admin/SellerInfo";
import Buyer from "./pages/Admin/Buyer";
import BuyerDetails from "./pages/Admin/BuyerDetails";
import ProductManagement from "./pages/Admin/Products";
import ProductDetails from "./pages/Admin/ProductsManage";
import Order from "./pages/Admin/Order";
import OrderInfo from "./pages/Admin/OrdersManage";
import Messages from "./pages/Admin/Messages";
import ChatLayout from "./components/Admin/ChatLayout";
import ContentManagement from "./pages/Admin/ContentManagement";
import AdminSettings from "./pages/Admin/Settings";
import LogsAndSecurity from "./pages/Admin/Logs";
import Demo from "./pages/Admin/demo";
import ViewProduct from "./pages/Seller/ViewProduct";
import EditProduct from "./pages/Seller/EditProduct";
import ViewOrder from "./pages/Seller/ViewOrder";
import SellerSettings from "./pages/Seller/Settings";
import UserSettings from "./pages/User/Settings";
import ScrollToTop from "./components/Common/Scroll-To-Top";
import TopSellers from "./pages/Home/TopSellers";
import AboutUs from "./pages/Home/About-us";
import ContactUs from "./pages/Home/Contact-us";
import InfoPage from "./pages/Home/Footer-links";
import NotFound from "./components/ui/not-found";
import Admins from "./pages/Admin/Admins";
import SellerContact from "./pages/Seller/Contact";
import Category from "./pages/Home/Category";

const App = () => {
  return (
    <>
      <ToastContainer />

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
        <Route
          path="/categories/:categoryName"
          element={
            <HomeLayout>
              <Category />
            </HomeLayout>
          }
        />
        <Route
          path="/about"
          element={
            <HomeLayout>
              <AboutUs />
            </HomeLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <HomeLayout>
              <ContactUs />
            </HomeLayout>
          }
        />
        <Route path="/product">
          <Route
            path=":id"
            element={
              <HomeLayout>
                <ProductDisplay />
              </HomeLayout>
            }
          />
        </Route>
        <Route path="/topsellers">
          <Route
            path=":sellerId"
            element={
              <HomeLayout>
                <TopSellers />
              </HomeLayout>
            }
          />
        </Route>
        <Route
          path="/info/:section"
          element={
            <HomeLayout>
              <InfoPage />
            </HomeLayout>
          }
        />
        <Route path="/user">
          <Route path="auth">
            <Route
              path="signin"
              element={
                <AuthLayout>
                  <UserLogin />
                </AuthLayout>
              }
            />
            <Route
              path="signup"
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
          <Route
            path="settings"
            element={
              <UserLayout>
                <UserSettings />
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
              path="signin"
              element={
                <AuthLayout>
                  <SellerLogin />
                </AuthLayout>
              }
            />
            <Route
              path="signup"
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
              path="orders/:id"
              element={
                <SellerLayout>
                  <ViewOrder />
                </SellerLayout>
              }
            />

            <Route path="products">
              <Route
                index
                element={
                  <SellerLayout>
                    <ProductList />
                  </SellerLayout>
                }
              />
              <Route
                path="view-product/:id"
                element={
                  <SellerLayout>
                    <ViewProduct />
                  </SellerLayout>
                }
              />
              <Route
                path="edit-product/:id"
                element={
                  <SellerLayout>
                    <EditProduct />
                  </SellerLayout>
                }
              />
            </Route>
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
          <Route
            path="contact"
            element={
              <SellerLayout>
                <SellerContact />
              </SellerLayout>
            }
          />
          <Route
            path="settings"
            element={
              <SellerLayout>
                <SellerSettings />
              </SellerLayout>
            }
          />
        </Route>
        <Route path="/admin">
          <Route path="auth">
            <Route
              path="signin"
              element={
                <AdminAuthLayout>
                  <Signin />
                </AdminAuthLayout>
              }
            />
            <Route
              path="signup"
              element={
                <AdminAuthLayout>
                  <Signup />
                </AdminAuthLayout>
              }
            />
            <Route
              path="forgot-password"
              element={
                <AdminAuthLayout>
                  <AdminForgotPassword />
                </AdminAuthLayout>
              }
            />
          </Route>
          <Route
            path="dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="seller"
            element={
              <AdminLayout>
                <Seller />
              </AdminLayout>
            }
          />
          <Route
            path="sellerinfo/:id"
            element={
              <AdminLayout>
                <SellerInfo />
              </AdminLayout>
            }
          />
          <Route
            path="buyer"
            element={
              <AdminLayout>
                <Buyer />
              </AdminLayout>
            }
          />
          <Route
            path="buyer/:id"
            element={
              <AdminLayout>
                <BuyerDetails />
              </AdminLayout>
            }
          />
          <Route
            path="productmanage"
            element={
              <AdminLayout>
                <ProductManagement />
              </AdminLayout>
            }
          />
          <Route
            path="productsmanage/:id"
            element={
              <AdminLayout>
                <ProductDetails />
              </AdminLayout>
            }
          />
          <Route
            path="ordersmanage"
            element={
              <AdminLayout>
                <Order />
              </AdminLayout>
            }
          />
          <Route
            path="ordersmanage/:id"
            element={
              <AdminLayout>
                <OrderInfo />
              </AdminLayout>
            }
          />
          <Route
            path="admins"
            element={
              <AdminLayout>
                <Admins />
              </AdminLayout>
            }
          />
          <Route
            path="messages"
            element={
              <AdminLayout>
                <Messages />
              </AdminLayout>
            }
          />
          <Route
            path="messages/chat/:id"
            element={
              <AdminLayout>
                <ChatLayout />
              </AdminLayout>
            }
          />
          <Route
            path="cms"
            element={
              <AdminLayout>
                <ContentManagement />
              </AdminLayout>
            }
          />
          <Route
            path="settings"
            element={
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            }
          />
          <Route
            path="logs"
            element={
              <AdminLayout>
                <LogsAndSecurity />
              </AdminLayout>
            }
          />
          <Route
            path="demo"
            element={
              <AdminLayout>
                <Demo />
              </AdminLayout>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
