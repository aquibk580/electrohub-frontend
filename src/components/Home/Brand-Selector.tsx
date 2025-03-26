import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import axios from "@/lib/axios";
import { Seller } from "../../types/entityTypes";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Loader2 } from "lucide-react";

interface SellerProps {
  name: string;
  logo: string;
  deliveryTime?: string;
  onClick?: () => void;
}

const SellerCard = ({
  name,
  logo,
  deliveryTime = "Delivery within 24 hours",
  onClick,
}: SellerProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        h-[120px]
        rounded-xl p-2 sm:p-3 md:p-4 
        flex items-center gap-2 sm:gap-3 md:gap-4 
        cursor-pointer transition-all duration-300
        bg-slate-50/15
         dark:bg-gradient-to-r from-gray-800 to-black
        shadow-sm  border  dark:border-gray-700
        hover:shadow-lg hover:scale-105
        
        
      `}
    >
      <div className="w-16  h-16  sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-24 lg:h-24  p-1 border-2 border-gray-400 dark:border-white 
                  rounded-full overflow-hidden flex-shrink-0
                  flex items-center justify-center 
                   dark:bg-gray-900
                 ">
        <img
          src={logo || "/placeholder.svg"}
          alt={`${name} logo`}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate 
                      text-gray-900 dark:text-white">
          {name}  
        </h3>
       
        <p className="text-xs sm:text-sm  truncate 
                    text-gray-500 dark:text-gray-300">
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
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Top Sellers...</p>
      </div>
    );
  }

  return (
    <section
      className={`w-full  sm:py-6  px-2 sm:px-3 md:px-4 lg:px-1`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-6">
        Top Sellers & Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {sellers.map((seller) => (
          <SellerCard
            key={seller.id}
            name={seller.name}
            logo={seller.pfp}
            deliveryTime={"24 Hours Delivery"}
            onClick={() => handleSellerClick(seller.id)}
          />
        ))}
      </div>
    </section>
  );
}