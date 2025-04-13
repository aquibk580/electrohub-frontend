import { Suspense } from "react";
import BannerCarousel from "@/components/Home/BannerCarousel";
import TopSellers from "@/components/Home/Brand-Selector";
import ProductCarousel from "@/components/Home/ProductCarousel";
import ServiceSection from "@/components/Home/ServiceSection";
import { Loader2 } from "lucide-react";
import "animate.css";
import { Separator } from "@radix-ui/react-select";
import MasterProduct from "@/components/Home/MasterProduct";

// import DiscountOffers from "@/components/Home/Discount-Offers";

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col space-y-7 md:space-y-8 lg:space-y-8 mx-auo px-4 sm:px-6 lg:px-6  md:py-2">
      {/* Hero Banner */}
      <section className="w-full animate__animated animate__fadeIn">
        <Suspense fallback={<LoadingFallback />}>
          <BannerCarousel />
        </Suspense>
      </section>

      {/* Featured Products */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-1s">
        <div className="mb-3 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <p className="dark:text-gray-300  mt-2">
            Explore our curated collection of top-quality, must-have products
            just for you
          </p>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <ProductCarousel />
        </Suspense>
      </section>
      <Separator className="border" />
      {/* All Products */}
      <section className="w-full animate__animated animate__fadeIn">
        <MasterProduct />
      </section>

      <Separator className="border" />
      {/* Top Sellers */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-3s">
        <Suspense fallback={<LoadingFallback />}>
          <TopSellers />
        </Suspense>
      </section>

      <Separator className="border" />
      {/* Services */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-4s">
        <Suspense fallback={<LoadingFallback />}>
          <ServiceSection />
        </Suspense>
      </section>

      {/* <Separator className="border" />
      <section className="w-full animate__animated animate__fadeIn animate__delay-4s">
        <Suspense fallback={<LoadingFallback />}>
          <DiscountOffers />
        </Suspense>
      </section> */}
    </div>
  );
};

export default Home;
