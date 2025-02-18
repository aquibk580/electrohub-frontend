import { specifications } from "@/assets/assets";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Review } from "./productTypes";
interface ProductSpectsProps {
  reviews: Array<Review>;
  details: { key: string; value: string }[];
}

const ProductSpects = ({ reviews, details }: ProductSpectsProps) => {
  return (
    <div>
      {" "}
      <div className="mt-12 h-[500px] overflow-hidden">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="mt-6 h-[400px] overflow-y-auto overflow-x-hidden"
          >
            <div className="prose px-5 sm:px-10 dark:prose-invert">
              <div className="grid gap-4">
                {details.length > 0 ? (
                  details.map((spec, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-4 py-2 border-b"
                    >
                      <span className="font-medium">{spec.key}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <h1 className="text-xl font-semibold">
                    No Specifications available for this product
                  </h1>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="mt-6 h-[400px] px-6 overflow-y-auto overflow-x-hidden"
          >
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {review?.user?.name || "Unknow"}
                        </span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.content}</p>
                  </div>
                ))
              ) : (
                <h1 className="text-xl font-semibold">
                  No Reviews available for this product
                </h1>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductSpects;
