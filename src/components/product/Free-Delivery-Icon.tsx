import { TooltipProvider,  Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { RotateCcw, Truck } from 'lucide-react'

const FreeDeliveryIcon = () => {
  return (
    <div> <div className="flex items-center text-muted-foreground space-x-4">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center text-gray-700">
          <Truck className="h-5 w-5 mr-2" />
          <span className="text-sm ">Free Delivery</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Free delivery on orders above ₹499</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center text-gray-700">
          <RotateCcw className="h-5 w-5 mr-2" />
          <span className="text-sm">7 Days Return</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Easy 7 days return and exchange</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div></div>
  )
}

export default FreeDeliveryIcon