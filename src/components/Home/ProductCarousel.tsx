import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import { ProductCrousel } from "@/pages/Admin/ContentManagement";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/utils/FormatPrice";

export default function ProductCarousel() {
  const navigate = useNavigate();
  const [productCarousels, setProductCarousels] = useState<
    Array<ProductCrousel>
  >([]);

  useEffect(() => {
    const getAllProductCarousels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels`
        );
        if (response.status === 200) {
          setProductCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllProductCarousels();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-10"
    >
      <CarouselContent>
        {productCarousels.map((productCarousel) => (
          <CarouselItem
            key={productCarousel.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 cursor-pointer"
            onClick={() => navigate(productCarousel.href)}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <img src={productCarousel.imageUrl} alt="Products" />
                  <p>{productCarousel.name}</p>
                  <h1 className="font-semibold text-green-600">
                    From ₹{formatPrice(productCarousel.price)}
                  </h1>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0" />
      <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0" />
    </Carousel>
  );
}
