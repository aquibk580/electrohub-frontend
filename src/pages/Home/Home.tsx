import AllProducts from "@/components/Home/AllProducts";
import BannerCarousel from "@/components/Home/BannerCarousel";
import BrandSelector from "@/components/Home/Brand-Selector";
import ProductCarousel from "@/components/Home/ProductCarousel";
import ServiceSection from "@/components/Home/ServiceSection";
import "animate.css";

const Home = () => {
  return (
    <div className="px-4 sm:px-2 py-10 flex flex-col items-center">
      <BannerCarousel />
      <ProductCarousel />
      <AllProducts />
      <BrandSelector/>
      <ServiceSection />
    </div>
  );
};

export default Home;
