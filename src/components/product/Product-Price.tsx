import { formatPrice } from "@/utils/FormatPrice";
import { Badge } from "../ui/badge";

interface ProductPriceProps {
  price: number;
  offer: number;
}

export default function ProductPrice({ price, offer }: ProductPriceProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-semibold text-foreground">
          ₹{formatPrice(price - (price / 100) * offer)}
        </span>
        <span className="text-lg text-muted-foreground line-through">
          ₹{formatPrice(price)}
        </span>
        <Badge variant="secondary" className="font-semibold">
          {offer}% OFF
        </Badge>
      </div>
    </div>
  );
}
