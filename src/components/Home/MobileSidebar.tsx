import { AppDispatch, RootState } from "@/redux/store";
import {
  CircleHelp,
  Contact,
  Heart,
  Home,
  LogIn,
  LogOut,
  Package,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { getRandomColor } from "./UserProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import { clearUser } from "@/redux/slices/user";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface MobileSidebarProps {
  setShowSidebar: (state: boolean) => void;
  showSidebar: boolean;
}

const MobileSideBar = ({ setShowSidebar, showSidebar }: MobileSidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const pfp = useSelector((state: RootState) => state.user.pfp);
  const bgColor = useMemo(() => getRandomColor(), []);
  const initials = user?.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogOut = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/logout");
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "light",
        });
        setShowSidebar(false);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={showSidebar ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-gray-900 shadow-lg border-b dark:border-gray-700 z-50"
    >
      <aside className="flex flex-col w-full h-screen px-4 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ElectroHub</h1>
          <X
            size={30}
            onClick={() => setShowSidebar(false)}
            className="cursor-pointer"
          />
        </div>

        {isAuthenticated ? (
          <div className="flex flex-col items-center mt-6 mx-2">
            <Avatar>
              <AvatarImage
                src={pfp!}
                alt={user?.name}
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback
                className={`${bgColor} text-white font-semibold w-fit h-fit mx-2 rounded-full p-6 text-3xl text-center block`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <h4 className="mx-2 mt-2 font-semibold text-gray-800 dark:text-gray-200">
              {user?.name}
            </h4>
            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        ) : (
          <div className="w-full h-32 border-2 rounded-md mt-6">Login Karo</div>
        )}

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="space-y-2">
            <Link
              to="/"
              onClick={() => setShowSidebar(false)}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
            >
              <Home size={20} />

              <span className="mx-4 font-medium">Home</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/user/profile"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                >
                  <User size={20} />

                  <span className="mx-4 font-medium">Profile</span>
                </Link>
                <Link
                  to="/user/cart"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                >
                  <ShoppingCart size={20} />

                  <span className="mx-4 font-medium">Cart</span>
                </Link>
                <Link
                  to="/user/wishlist"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Heart size={20} />

                  <span className="mx-4 font-medium">Wishlist</span>
                </Link>
                <Link
                  to="/user/orders"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Package size={20} />

                  <span className="mx-4 font-medium">Orders</span>
                </Link>
                <Link
                  to="/user/reviews"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Star size={20} />

                  <span className="mx-4 font-medium">Reviews</span>
                </Link>
              </>
            )}

            <Link
              to="/contact"
              onClick={() => setShowSidebar(false)}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
            >
              <Contact size={20} />

              <span className="mx-4 font-medium">Contact Us</span>
            </Link>
          </nav>
          <div>
            {isAuthenticated ? (
              <div
                onClick={handleLogOut}
                className="flex items-center font-medium text-md justify-start gap-0 bg-white w-full shadow-none px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
              >
                <LogOut size={20} className="text-red-600" />

                <span className="mx-4 font-medium">Log Out</span>
              </div>
            ) : (
              <Link
                to="/user/auth/login"
                onClick={() => setShowSidebar(false)}
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
              >
                <LogIn size={20} />

                <span className="mx-4 font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </motion.div>
  );
};

export default MobileSideBar;
