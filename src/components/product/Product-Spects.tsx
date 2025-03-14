import { specifications } from "@/assets/assets";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Loader2, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Review } from "./productTypes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMemo } from "react";
import { formatDate } from "@/lib/utils";
interface ProductSpectsProps {
  reviews: Array<Review>;
  details: { key: string; value: string }[];
  loading: boolean;
}

const ProductSpects = ({ reviews, details, loading }: ProductSpectsProps) => {
  function getRandomColor() {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  const getInitials = (name: string): string => {
    const initials = name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return initials;
  };
  const bgColor = useMemo(() => getRandomColor(), []);
  return (
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









            
<<<<<<< HEAD
            {!loading ? (
              reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={review.user?.pfp}
                            alt="User"
                            className="w-full h-full"
=======
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={review.user?.pfp}
                          alt="User"
                          className="w-full h-full"
                        />
                        <AvatarFallback
                          className={`${bgColor} text-white font-extrabold`}
                        >
                          {getInitials(review.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {review?.user?.name || "Unknow"}
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span>{formatDate(review.createdAt)}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
>>>>>>> 50aba440c7b3fcc049d75febdb80b7b2d1150158
                          />
                          <AvatarFallback
                            className={`${bgColor} text-white font-extrabold`}
                          >
                            {getInitials(review.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {review?.user?.name || "Unknow"}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span>{formatDate(review.createdAt)}</span>
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
                    </div>
                    <p className="mt-2 text-gray-600 px-12">{review.content}</p>
                  </div>
                ))
              ) : (
                <h1 className="text-xl font-semibold">
                  No Reviews available for this product
                </h1>
              )
            ) : (
              <div className="flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductSpects;
