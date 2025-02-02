import { Skeleton } from '../ui/skeleton'
const ProductSkeleton = () => {
  return (
    <div><div className="container mx-auto px-4 py-8 mt-16">

    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Image Section */}
      <div className="space-y-4">
        {/* Main Image */}
        <Skeleton className="aspect-[4/3] w-full h-[500px] rounded-lg" />
        {/* Thumbnail Images */}
        <div className="flex gap-4 mt-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="w-20 h-20 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Right Column - Product Details */}
      <div className="space-y-6">
        {/* Deal Badge */}
        <Skeleton className="h-6 w-24 rounded-full" />

        {/* Title */}
        <Skeleton className="h-8 w-3/4" />

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4" />
            ))}
          </div>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Price Section */}
        <div className="flex items-baseline space-x-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Delivery Info */}
        <div className="flex space-x-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-28" />
        </div>

        {/* Available Offers */}
        <div className="space-y-4 border rounded-lg p-4">
          <Skeleton className="h-6 w-32" />
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Skeleton className="h-5 w-20" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-14" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-12" />
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default ProductSkeleton