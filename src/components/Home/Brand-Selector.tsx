import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import axios from "@/lib/axios";
import { Seller } from "../../types/entityTypes";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
  const { theme } = useTheme();
  
  const getFormattedLogoUrl = (logoUrl: string) => {
    if (!logoUrl) return "/placeholder.svg";
    
    if (logoUrl.includes("=s") && !logoUrl.startsWith("http")) {
      return `https://lh3.googleusercontent.com/${logoUrl}`;
    }
    
    return logoUrl;
  };

  return (
    <div
      onClick={onClick}
      className={`
      rounded-xl p-2 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer transition-all duration-300
      ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-200"
      }
      hover:shadow-md hover:scale-105
    `}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
        <img
          src={getFormattedLogoUrl(logo)}
          alt={`${name} logo`}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3
          className={`font-medium text-sm sm:text-base md:text-lg lg:text-xl truncate
          ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          {name}
        </h3>
        <p
          className={`text-xs sm:text-sm md:text-base truncate
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
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
      className={`w-full py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4 lg:px-10 ${
        theme === "dark" ? "text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
        Top Sellers
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