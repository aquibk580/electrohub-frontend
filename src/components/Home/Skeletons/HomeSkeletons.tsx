import { Card } from "../../ui/card";

const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-muted/40 animate-pulse rounded-md ${className}`} />
);

export const DealsBannerSkeleton = () => {
  return (
    <div className="space-y-6 my-8">
      <div className="space-y-2">
        <SkeletonBox className="h-8 w-1/3" />
        <SkeletonBox className="h-4 w-2/3" />
      </div>

      <div className="grid gap-3">
        {/* Top Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(2)].map((_, idx) => (
            <Card
              key={idx}
              className="bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none rounded-2xl flex justify-between h-56 md:h-60 lg:h-72 px-2"
            >
              <div className="h-full w-3/4 flex flex-col pl-4 lg:pl-8 justify-center space-y-4">
                <SkeletonBox className="h-8 lg:h-10 w-1/2" />
                <SkeletonBox className="h-5 lg:h-6 w-3/4" />
                <SkeletonBox className="h-6 lg:h-8 w-1/4" />
              </div>
              <SkeletonBox className="h-full w-1/4 rounded-xl" />
            </Card>
          ))}
        </div>

        {/* Bottom Three Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, idx) => (
            <Card
              key={idx}
              className="bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none rounded-2xl flex h-40 lg:h-60 px-2"
            >
              <div className="w-3/4 flex flex-col pl-2 lg:pl-4 justify-center space-y-3">
                <SkeletonBox className="h-6 lg:h-8 w-2/3" />
                <SkeletonBox className="h-4 lg:h-5 w-3/4" />
                <SkeletonBox className="h-6 w-1/3" />
              </div>
              <SkeletonBox className="h-full w-1/4 rounded-xl" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
