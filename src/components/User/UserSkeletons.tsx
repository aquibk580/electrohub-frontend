import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function WishlistSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 h-full">
      <Card className="flex flex-col rounded-xl shadow-md w-full">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="space-y-6 overflow-y-auto flex-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 items-center">
                  <div className="w-36 h-36 sm:w-32 sm:h-32 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="space-y-3 w-full sm:w-64">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 h-full overflow-hidden">
      <Card className="flex flex-col overflow-hidden rounded-xl shadow-md w-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="space-y-6 overflow-hidden flex-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 items-center">
                  <div className="w-36 h-36 sm:w-32 sm:h-32 md:w-44 md:h-44 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="space-y-3 w-full sm:w-64">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <Card className="w-full xl:max-w-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 animate-pulse"></div>
            </div>
          ))}
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/5 animate-pulse"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/6 animate-pulse"></div>
          </div>
          <Separator className="my-2 border" />
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 animate-pulse"></div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full mt-0.5 animate-pulse"></div>
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </CardFooter>
    </Card>
  );
}

export function OrderSkeleton() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <Card className="flex flex-col rounded-xl shadow-md w-full">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="space-y-6 overflow-y-auto flex-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 border-b border-gray-300 py-4"
              >
                {/* Image Skeleton */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />

                {/* Product Info Skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/5 animate-pulse" />
                </div>

                {/* Status + Message Skeleton */}
                <div className="flex flex-col items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                  </div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left section */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 w-full">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="flex-1 space-y-3 w-full sm:p-2 text-center sm:text-left">
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex justify-center sm:justify-start gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                  <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-1" />
                </div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Right section (buttons) */}
            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
              <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
