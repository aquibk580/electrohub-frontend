import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Share2, Trash2 } from "lucide-react";
import { assets } from "@/assets/assets";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      productName: "Aspir Back Cover for Realme Narzo 20A, Realme Narzo 10A",
      rating: 4,
      review: "Good Product",
      comment: "Delightful",
      date: "08 May, 2022",
      image: "/api/placeholder/100/120",
    },
    {
      id: 2,
      productName: "Aspir Back Cover for Realme Narzo 20A, Realme Narzo 10A",
      rating: 4,
      review: "Good Product",
      comment: "Delightful",
      date: "08 May, 2022",
      image: "/api/placeholder/100/120",
    },
    {
      id: 3,
      productName: "Aspir Back Cover for Realme Narzo 20A, Realme Narzo 10A",
      rating: 4,
      review: "Good Product",
      comment: "Delightful",
      date: "08 May, 2022",
      image: "/api/placeholder/100/120",
    },
    {
      id: 4,
      productName: "Aspir Back Cover for Realme Narzo 20A, Realme Narzo 10A",
      rating: 4,
      review: "Good Product",
      comment: "Delightful",
      date: "08 May, 2022",
      image: "/api/placeholder/100/120",
    },
    {
      id: 5,
      productName: "Aspir Back Cover for Realme Narzo 20A, Realme Narzo 10A",
      rating: 4,
      review: "Good Product",
      comment: "Delightful",
      date: "08 May, 2022",
      image: "/api/placeholder/100/120",
    },
  ];

  return (
    <Card className="h-full flex flex-col rounded-lg shadow-md">
      <CardHeader>
        <h1 className="text-xl sm:text-2xl font-semibold">My Reviews (3)</h1>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col md:flex-row items-center  justify-between gap-4 px-4 py-3 border-b border-gray-300"
          >
            {/* Left Section (Image + Details) */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 w-full">
              <img
                src={assets.laptop}
                alt={review.productName}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 object-contain rounded"
              />
              <div className="flex-1 p-2 sm:p-5 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-medium mb-2">
                  {review.productName}
                </h3>
                <div className="flex justify-center sm:justify-start items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {review.rating} ★
                  </Badge>
                  <span className="font-medium">{review.comment}</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  {review.review}
                </p>
                <div className="flex justify-center sm:justify-start items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
                  <span>Raihan Shaikh</span>
                  <Check className="w-4 h-4" />
                  <span>Certified Buyer</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>

            {/* Right Section (Buttons) */}
            <div className="flex justify-center md:justify-end gap-2 w-full md:w-auto">
              <Button className="bg-white hover:bg-gray-100 flex items-center w-full md:w-auto shadow-none">
                <Edit className="w-5 h-5" />
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-red-700 flex items-center w-full md:w-auto shadow-none">
                <Trash2 className="w-5 h-5" />
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-blue-700 flex items-center w-full md:w-auto shadow-none">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Reviews;
