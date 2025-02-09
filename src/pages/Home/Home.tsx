import { serviceContain } from "@/assets/assets";
import AllProducts from "@/components/Home/AllProducts";
import 'animate.css';

const Home = () => {
  return (
    <div className="px-6 py-10">
      {/* AllProducts Section */}
      <div className="mb-16">
        <AllProducts />
      </div>

      {/* Services Section */}
      <div className="flex flex-col gap-7 md:gap-10 px-4 md:px-14 py-10 border rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl text-start font-semibold">
          Services to help you shop
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {serviceContain.map((item) => (
            <div
              className="animate__animated animate__zoomIn rounded-xl bg-slate-50 shadow-lg hover:shadow-2xl transition-shadow"
              key={item.id}
            >
              <div className="px-6 py-7">
                <h1 className="text-xl md:text-2xl font-semibold w-full">
                  {item.title}
                </h1>
                <h2 className="mt-3 text-sm md:text-lg font-normal w-full">
                  {item.desc}
                </h2>
              </div>
              <div className="overflow-hidden mt-4 rounded-b-xl">
                <img
                  src={item.img}
                  className="hover:scale-110 transition-transform duration-300 ease-in-out object-cover max-w-full h-auto rounded-b-xl"
                  alt={item.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
