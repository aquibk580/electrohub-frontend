import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';

interface Product {
  name: string;
  searches: number;
}

interface MostSearchedProductsProps {
  data: Product[];
}

const MostSearchedProducts: React.FC<MostSearchedProductsProps> = ({ data }) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((item) => item.searches));

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Most Searched Products</CardTitle>
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((product, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm py-1">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.searches}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${(product.searches / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MostSearchedProducts;
