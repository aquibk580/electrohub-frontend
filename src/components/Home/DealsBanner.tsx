import { Product } from "@/types/entityTypes";
import { Card } from "../ui/card";
import { formatPrice } from "@/utils/FormatPrice";
import { useNavigate } from "react-router-dom";

interface DealBannerProps {
  products: Array<Product>;
}

const DealsBanner = ({ products }: DealBannerProps) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          No products found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-8">
      <div className="space-y-1.5 ">
        <h1 className="text-3xl font-bold">Best Products For You</h1>
        <p className="text-accent-foreground/80">
          Experience the joy of effortless shopping with a handpicked selection
          of top-quality products, perfectly curated to match your lifestyle and
          needs.
        </p>
      </div>
      <div className="grid gap-3">
        <div className="grid  grid-cols-1 md:grid-cols-2  gap-3 ">
          {products[0] && (
            <Card
              onClick={() => navigate(`/product/${products[0].id}`)}
              className="bg-muted/70  dark:bg-transparent dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex justify-between h-52 md:h-[230px]  lg:h-72 px-2 "
            >
              <div className="h-full  w-3/4  flex flex-col items-start pl-4 lg:pl-8 space-y-6 justify-center  ">
                <div className="space-y-1 lg:space-y-2.5">
                  <h1 className="text-xl md:text-4xl lg:text-5xl text-accent-foreground font-bold">
                    {products[0].name.split(" ")[0]}
                  </h1>
                  <p className="text-2xl text-accent-foreground/85 font-light line-clamp-2">
                    {products[0].name}
                  </p>
                </div>

                <div>
                  <span className="text-lg text-accent-foreground/85">
                    Starting at
                  </span>
                  <h2 className="text-xl md:text-3xl text-primary/95 font-bold">
                    ₹
                    <span className=" md:text-2xl">
                      {formatPrice(
                        products[0].price -
                        (products[0].price / 100) *
                        products[0].offerPercentage
                      )}
                    </span>
                  </h2>
                </div>
              </div>
              <div className=" flex items-center justify-center">
                <img
                  className="h-full w-full object-contain"
                  src={products[0].images[0].url}
                  alt=""
                />
              </div>
            </Card>
          )}
          {products[1] && (
            <Card
              onClick={() => navigate(`/product/${products[1].id}`)}
              className="bg-muted/70  dark:bg-transparent dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex justify-between h-52 md:h-[230px]  lg:h-72 px-2 "
            >
              <div className="h-full  w-3/4  flex flex-col items-start pl-4 lg:pl-8 space-y-6 justify-center  ">
                <div className="space-y-1 lg:space-y-2.5">
                  <h1 className=" text-xl md:text-4xl lg:text-5xl text-accent-foreground font-bold">
                    {products[1].name.split(" ")[0]}
                  </h1>
                  <p className="text-2xl text-accent-foreground/85 font-light line-clamp-2">
                    {products[1].name}
                  </p>
                </div>

                <div>
                  <span className="text-lg text-accent-foreground/85">
                    Starting at
                  </span>
                  <h2 className="text-xl md:text-3xl text-primary/95 font-bold">
                    ₹
                    <span className="md:text-2xl">
                      {formatPrice(
                        products[1].price -
                        (products[1].price / 100) *
                        products[1].offerPercentage
                      )}
                    </span>
                  </h2>
                </div>
              </div>
              <div className=" flex items-center justify-center">
                <img
                  className="h-full w-full object-contain"
                  src={products[1].images[0].url}
                  alt=""
                />
              </div>
            </Card>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
          {products[2] && (
            <Card
              onClick={() => navigate(`/product/${products[2].id}`)}
              className="flex flex-col-reverse md:flex-row bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl  h-72 py-2.5 md:py-0 md:h-40 lg:h-60 px-2 "
            >
              <div className="text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  ">
                <div className=" lg:space-y-2 ">
                  <h1 className="text-lg lg:text-3xl font-bold">
                    {products[2].name.split(" ")[0] || "Unknown"}
                  </h1>
                  <p className=" text-sm md:text-md lg:text-xl font-light line-clamp-1 sm:line-clamp-2">
                    {products[2].name || "Unknown"}
                  </p>
                </div>

                <div>
                  <span className="text-xs md:text-sm lg:text-lg">
                    Starting at
                  </span>
                  <h2 className="text-xl  md:text-2xl text-primary/95 font-bold">
                    ₹
                    <span className="md:text-2xl">
                      {formatPrice(
                        products[2].price -
                        (products[2].price / 100) *
                        products[2].offerPercentage
                      )}
                    </span>
                  </h2>
                </div>
              </div>
              <div className=" flex items-center justify-center">
                <img
                  className="max-h-40 md:max-h-40 lg:max-h-52 w-full object-contain"
                  src={products[2].images[0].url}
                  alt=""
                />

              </div>
            </Card>
          )}
          {products[3] && (
            <Card
              onClick={() => navigate(`/product/${products[3].id}`)}
              className="flex flex-col-reverse md:flex-row bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl h-72 py-2.5 md:py-0 md:h-40 lg:h-60 px-2 "
            >
              <div className="text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  ">
                <div className=" lg:space-y-2">
                  <h1 className="text-lg md:text-xl lg:text-3xl font-bold">
                    {products[3].name.split(" ")[0] || "Unknown"}
                  </h1>
                  <p className=" text-sm md:text-md lg:text-xl font-light line-clamp-1 md:line-clamp-2">
                    {products[3].name}
                  </p>
                </div>

                <div>
                  <span className="text-xs md:text-sm lg:text-lg">
                    Starting at
                  </span>
                  <h2 className="text-xl  lg:text-2xl text-primary/95 font-bold">
                    ₹
                    <span className="md:text-2xl">
                      {formatPrice(
                        products[3].price -
                        (products[3].price / 100) *
                        products[3].offerPercentage
                      )}
                    </span>
                  </h2>
                </div>
              </div>
              <div className=" flex items-center justify-center">
              <img
                  className="max-h-40 md:max-h-40 lg:max-h-52 w-full object-contain"
                  src={products[3].images[0].url}
                  alt=""
                />
              </div>
            </Card>
          )}
         {products[4] && (
            <Card
              onClick={() => navigate(`/product/${products[3].id}`)}
              className="hidden md:flex flex-col-reverse md:flex-row bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl h-72 py-2.5 md:py-0 md:h-40 lg:h-60 px-2 "
            >
              <div className="text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  ">
                <div className=" lg:space-y-2">
                  <h1 className="text-lg md:text-xl lg:text-3xl font-bold">
                    {products[4].name.split(" ")[0] || "Unknown"}
                  </h1>
                  <p className=" text-xs md:text-md lg:text-xl font-light line-clamp-1 md:line-clamp-2">
                    {products[4].name}
                  </p>
                </div>

                <div>
                  <span className="text-xs md:text-sm lg:text-lg">
                    Starting at
                  </span>
                  <h2 className="text-xl  lg:text-2xl text-primary/95 font-bold">
                    ₹
                    <span className="md:text-2xl">
                      {formatPrice(
                        products[4].price -
                        (products[4].price / 100) *
                        products[4].offerPercentage
                      )}
                    </span>
                  </h2>
                </div>
              </div>
              <div className=" flex items-center justify-center">
              <img
                  className="max-h-40 md:max-h-40 lg:max-h-52 w-full object-contain"
                  src={products[4].images[0].url}
                  alt=""
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsBanner;
