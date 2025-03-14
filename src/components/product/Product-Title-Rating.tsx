import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Review } from "./productTypes";

interface ProductTitleRatingProps {
  title: string;
  description: string;
  reviews: Array<Review>;
  averageRating: number;
}

export default function ProductTitleRating({
  title,
  description,
  reviews,
  averageRating,
}: ProductTitleRatingProps) {
  const [showDescription, setShowDescription] = useState(false);
  
  const displayDescription = () => {
    showDescription ? setShowDescription(false) : setShowDescription(true);
  };

  return (
    <div>
      <Badge variant="destructive" className="mb-2 text-xs sm:text-sm">
        Limited time deal
      </Badge>
      <h1 className="text-xl sm:text-xl md:text-2xl font-semibold text-foreground">
        {title}
      </h1>
      <h3
        onClick={displayDescription}
        className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-500 ${
          showDescription ? "" : "line-clamp-2"
        }`}
      >
        {description}
      </h3>
      <div className="mt-3 flex items-center space-x-2 sm:space-x-4">
        <div className="flex gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                i < Math.round(averageRating)
                  ? "fill-primary text-primary"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground">
          ({averageRating} rating, {reviews.length} reviews)
        </span>
      </div>
    </div>
  );
}
