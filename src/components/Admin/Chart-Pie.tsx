import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Category } from "@/types/entityTypes";
interface ChartPieProps {
  loading: boolean;
  highest: {
    name: string;
    productCount: string;
  } | null;
  categories: Array<Category & { productCount: string }>;
}

export function ChartPie({ loading, highest, categories }: ChartPieProps) {
  // Generate unique colors dynamically
  const generateColors = (count: number) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
    ];
    return colors.slice(0, count);
  };

  // Convert categories to chart-friendly format
  const chartData = categories.map((category, index) => ({
    name: category.name,
    value: Number(category.productCount),
    fill: generateColors(categories.length)[index],
  }));

  // Create Chart Config
  const chartConfig: ChartConfig = categories.reduce((acc, category, index) => {
    acc[category.name] = {
      label: category.name,
      color: generateColors(categories.length)[index],
    };
    return acc;
  }, {} as ChartConfig);

  // Total count calculation
  const totalProducts = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Category chart...</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-full  mx-auto px-8 border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-slate-900/20 to-primary/5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Distribution</CardTitle>
        <CardDescription>Categories and their product counts</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[303px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalProducts.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Products
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic my-24 text-center">
            Categories not available
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          The most trending category is {highest?.name}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total product distribution across categories
        </div>
      </CardFooter>
    </Card>
  );
}
