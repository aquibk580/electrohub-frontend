import { reviews, specifications } from '@/assets/assets'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import {  Star } from 'lucide-react'
import { Badge } from '../ui/badge'

const ProductSpects = () => {
  return (
    <div> <div className="mt-12 h-[500px] overflow-hidden">
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        {/* <TabsTrigger value="faq">FAQs</TabsTrigger> */}
      </TabsList>

      <TabsContent
        value="details"
        className="mt-6 h-[400px] overflow-y-auto overflow-x-hidden"
      >
        <div className="prose max-w-none dark:prose-invert">
          <div className="grid gap-4">
            {specifications.map((spec, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 gap-4 py-2 border-b"
              >
                <span className="font-medium">{spec.label}</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="reviews"
        className="mt-6 h-[400px] px-6 overflow-y-auto overflow-x-hidden"
      >
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <Badge variant="secondary">Verified Purchase</Badge>
                  )}
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-600">{review.content}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* <TabsContent
        value="faq"
        className="mt-6 h-[400px] overflow-y-auto overflow-x-hidden"
      >
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b pb-4">
              <h3 className="font-medium text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </TabsContent> */}
    </Tabs>
  </div></div>
  )
}

export default ProductSpects