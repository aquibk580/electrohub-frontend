import AllProducts from "@/components/Home/AllProducts";
import ServiceSection from "@/components/Home/ServiceSection";
import "animate.css";

const Home = () => {
  return (
    <div className="px-6 py-10">
      {/* AllProducts Section */}
      <div className="mb-16">
        <AllProducts />
      </div>

      {/* Services Section */}
      <ServiceSection />
    </div>
  );
};

export default Home;
