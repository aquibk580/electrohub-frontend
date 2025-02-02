import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ProductQuantity = () => {

    const [quantity, setQuantity] = useState(1)

    const increment = () => {
      setQuantity((prev) => prev + 1)
    }
    const decrement = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(e.target.value)
      if (!isNaN(value) && value >= 1) {
        setQuantity(value)
      }
    }
  return (
    <div><div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={decrement} className="h-10 w-10 rounded-lg  cursor-pointer">
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="h-10 w-14 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button variant="outline" size="icon" onClick={increment} className="h-10 w-10 rounded-lg cursor-pointer">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div></div>
  )
}

export default ProductQuantity