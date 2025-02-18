import { Heart, Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const increment = () => setQuantity((prev) => prev + 1)
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setQuantity(value)
    }
  }

  return (
    <div className="grid grid-cols-2 items-center gap-6">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={decrement} className="h-10 w-10 rounded-lg bg-primary text-primary-foreground">
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="h-10 w-14 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button variant="outline" size="icon" onClick={increment} className="h-10 w-10 rounded-lg bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>


      {/* Wishlist Button (Hidden on larger screens) */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`sm:hidden ${isWishlisted ? 'text-red-500 mt-7 w-11 ml-12' : ' mt-7 w-11 ml-12'}`}
            >
              <Heart className={`h-7 w-7 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to wishlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ProductQuantity
