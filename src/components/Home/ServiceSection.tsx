import { serviceContain } from "@/assets/assets";

const ServiceSection = () => {
  return (
    <div className="flex flex-col gap-7 md:gap-10 px-4 md:px-14 py-10 rounded-lg bg-background">
      <h1 className="text-2xl md:text-3xl text-start font-semibold text-foreground">
        Services to help you shop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        {serviceContain.map((item) => (
          <div
            className="animate__animated animate__zoomIn rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            key={item.id}
          >
            <div className="px-6 py-7">
              <h1 className="text-xl md:text-2xl font-semibold w-full text-card-foreground">
                {item.title}
              </h1>
              <h2 className="mt-3 text-sm md:text-lg font-normal w-full text-muted-foreground">
                {item.desc}
              </h2>
            </div>
            <div className="w-full mt-4 rounded-b-xl overflow-hidden">
              <img
                src={item.img}
                className="hover:scale-105 transition-transform duration-300 ease-in-out object-cover max-w-full w-full h-auto"
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;