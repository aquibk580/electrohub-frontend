import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

const ProductAddtocart = () => {
    const [isWishlisted, setIsWishlisted] = useState(false)

    return (
        <div><div className="flex space-x-4">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="flex-1 hover:bg-green-950 cursor-pointer" size="lg">
                            Add to Cart
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add this item to your cart</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer" size="lg">
                            Buy Now
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Buy This Item Now</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={isWishlisted ? "text-red-500 cursor-pointer" : "cursor-pointer"}
                        >
                            <Heart className={`h-7 w-7 ${isWishlisted ? "fill-current" : ""}`} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to wishlist</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div></div>
    )
}

export default ProductAddtocart

