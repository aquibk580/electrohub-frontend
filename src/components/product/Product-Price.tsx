import { Badge } from "../ui/badge"

interface ProductPriceProps {
  price: number
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-foreground">₹{price.toFixed(2)}</span>
        <span className="text-lg text-muted-foreground line-through">₹{price * 37}</span>
        <Badge variant="secondary" className="font-semibold">
          57% OFF
        </Badge>
      </div>
    </div>
  )
}

