import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array(5).fill(0).map((_, i) => (
          <Card key={i} className="border-primary/20">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart Skeleton */}
        <Card className="border-primary/75 bg-primary/5">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="flex justify-between">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>
              <div className="flex-1 mt-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex justify-between">
                {Array(7).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-12" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Skeleton */}
        <Card className="border-primary/75 bg-primary/5">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-8">
              <Skeleton className="h-full w-full rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-5 w-64 mb-2" />
            <Skeleton className="h-4 w-80" />
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <Card className="border-primary/75 bg-primary/5">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Sr No.", "Product Name", "Units Sold", "Total Sales"].map((_, i) => (
                    <th key={i} className="p-3">
                      <Skeleton className="h-6 w-full" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(0).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="p-3">
                      <Skeleton className="h-5 w-8" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-full" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-16" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-28" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminTableSkeleton = () => {
    return (
      <Card className="rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full">
            <div className="min-w-[800px] rounded-xl overflow-hidden">
              {/* Skeleton Header */}
              <div className="bg-primary/75 flex p-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 min-w-32">
                    <Skeleton className="h-6 w-24 bg-primary/40" />
                  </div>
                ))}
                <div className="w-[50px]"></div>
              </div>
              
              {/* Skeleton Rows */}
              <div className="bg-white dark:bg-black">
                {[1, 2, 3, 4].map((row) => (
                  <div key={row} className="flex items-center p-3 border-b border-primary/25">
                    {[1, 2, 3, 4, 5].map((cell) => (
                      <div key={cell} className="flex-1 min-w-32">
                        <Skeleton className="h-5 w-full max-w-32 bg-primary/10" />
                      </div>
                    ))}
                    <div className="w-[50px] flex justify-center">
                      <Skeleton className="h-5 w-5 bg-primary/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export default DashboardSkeleton;