import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/components/theme-provider";
import axios from "@/lib/axios";
import { Seller } from "../../types/entityTypes";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Loader2 } from "lucide-react";
import { getRandomColor } from "./UserProfileButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SellerProps {
  name: string;
  logo: string;
  deliveryTime?: string;
  onClick?: () => void;
  verified?: boolean;
}

const SellerCard = ({
  name,
  logo,
  deliveryTime = "Delivery within 24 hours",
  onClick,
  verified = false,
}: SellerProps) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);

  return (
    <div
      onClick={onClick}
      className="
        group relative
        flex items-center gap-4
        rounded-xl p-5
        bg-white dark:bg-gradient-to-r from-slate-900 to-black
        border border-gray-300 dark:border-gray-700
        shadow-md  hover:shadow-lg
        transition-all duration-300 ease-in-out hover:scale-[1.01]
        cursor-pointer
        overflow-hidden  hover:border-primary dark:hover:border-slate-200 
      "
    >
      {/* Avatar Section */}
      <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
        <Avatar className="w-full h-full rounded-full border-2 border-gray-200 dark:border-gray-600">
          <AvatarImage
            src={logo}
            alt={`${name} logo`}
            className="w-full h-full object-cover"
          />
          <AvatarFallback
            className={`${bgColor} flex items-center justify-center text-xl md:text-2xl font-bold text-white w-full h-full`}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        {verified && (
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
            <BadgeCheck className="w-5 h-5 text-blue-500" />
          </div>
        )}
      </div>

      {/* Seller Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className=" font-semibold text-lg md:text-xl truncate text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm md:text-base truncate text-gray-500 dark:text-gray-300">
          {deliveryTime}
        </p>
      </div>
    </div>
  );
};


export default function TopSellers() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopSellers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/sellers`
        );
        if (response.status === 200) {
          setSellers(response.data.sellers);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTopSellers();
  }, []);

  const handleSellerClick = (sellerId: number) => {
    navigate(`/topsellers/${sellerId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
        <p className="text-muted-foreground text-sm">Loading Top Sellers...</p>
      </div>
    );
  }

  return (
    <section className="w-full  mx-auto py-6  sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Top Sellers & Brands
        </h2>
      </div>
      
      {sellers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sellers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.id}
              name={seller.name}
              logo={seller.pfp}
              deliveryTime="24 Hours Delivery"
              onClick={() => handleSellerClick(seller.id)}
              verified
            />
          ))}
        </div>
      )}
    </section>
  );
}