import { Star } from "lucide-react"
import { Badge } from "../ui/badge"

interface ProductTitleRatingProps {
  title: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductTitleRating({ title, description, rating }: ProductTitleRatingProps) {
  return (
    <div>
      <Badge variant="destructive" className="mb-2">
        Limited time deal
      </Badge>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <h3 className="text-sm font-medium text-gray-600 line-clamp-2">{description}</h3>
      <div className="mt-3 flex items-center space-x-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(rating.rate) ? "fill-green-700 text-green-700" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          ({rating.rate} rating, {rating.count} reviews)
        </span>
      </div>
    </div>
  )
}

