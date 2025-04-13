import { Skeleton } from "@/components/ui/skeleton";

export const ProductSpecsSkeleton = () => {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specifications Skeleton */}
        <div className="rounded-lg overflow-hidden">
          <div className="shadow-md bg-primary/60 rounded-xl p-2 pl-3">
            <Skeleton className="h-5 w-32 bg-primary/40" />
          </div>
          <div className="p-4 rounded-xl max-h-[500px] space-y-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 py-1 border-b last:border-0"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="rounded-xl overflow-hidden">
          <div className="rounded-xl bg-primary/60 shadow-md p-2 pl-3">
            <Skeleton className="h-5 w-28 bg-primary/40" />
          </div>
          <div className="p-4 max-h-[500px] space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return [...Array(4)].map((_, index) => (
    <Skeleton
      key={index}
      className="h-14 w-14 sm:h-20 sm:w-20 lg:w-28 lg:h-28 rounded-lg border cursor-pointer bg-primary/40"
    />
  ));
};
