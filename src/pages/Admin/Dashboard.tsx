import React, { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataTable } from "@/components/Admin/data-table";
import { TableWrapper } from "@/components/Admin/table-wrapper";
import DashboardStats from "@/components/Admin/dashboard-stats";
import axios from "@/lib/axios";
import { Category, Product } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { formatDate } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChartPie } from "@/components/Admin/Chart-Pie";
import DashboardSkeleton from "@/components/Admin/Skeletons";
const IndiaSalesMap = React.lazy(
  () => import("@/components/Admin/india-sales-map")
);

const Dashboard = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );
  if (!isAuthenticated) return null;
  const [loading, setLoading] = useState(true);
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [stats, setStats] = useState<
    Array<{ label: string; value: string | number }>
  >([]);
  const [salesGraph, setSalesGraph] = useState<
    Array<{ date: string; amount: number }>
  >([]);
  const [topSellingProducts, setTopSellingProducts] = useState<Array<Product>>(
    []
  );

  useEffect(() => {
    const getTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/products/topselling/${5}`
        );

        if (response.status === 200) {
          setTopSellingProducts(response.data.products);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      getTopSellingProducts();
    }
  }, []);

  useEffect(() => {
    const getSalesStatistics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/sales`
        );
        if (response.status === 200) {
          setStats([
            {
              label: "Total Transactions",
              value: response.data.orders,
            },
            {
              label: "Total Sales",
              value: response.data.sales,
            },
            {
              label: "Monthly Orders",
              value: response.data.monthlyOrders,
            },

            {
              label: "Total Sellers",
              value: response.data.sellers,
            },
            {
              label: "Total Users",
              value: response.data.users,
            },
          ]);
          setSalesGraph(
            response.data.weeklySales.map(
              (item: { date: Date; sales: number }) => {
                return {
                  date: formatDate(item.date).substring(0, 6),
                  amount: item.sales,
                };
              }
            )
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("Error While getting Sales statistics");
      } finally {
        setStatisticsLoading(false);
      }
    };
    if (isAuthenticated) {
      getSalesStatistics();
    }
  }, []);

  const topProducts = topSellingProducts.map((product, index) => ({
    srNumber: index + 1,
    productName: product.name.substring(0, 80) + "...",
    unitsSold: product._count.orderItems,
    totalSales: `₹${formatPrice(
      (product.price - (product.offerPercentage / 100) * product.price) *
        product._count.orderItems
    )}`,
  }));

  const [chartDataloading, setChartDataLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<
    Array<Category & { productCount: string }>
  >([]);
  const [highestProductCatgeory, setHighestProductCategory] = useState<{
    name: string;
    productCount: string;
  } | null>(null);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/admin/cms/categories/productCount`
        );
        if (response.status === 200) {
          setCategories(response.data);
          setHighestProductCategory(
            response.data.reduce(
              (
                max: { productCount: string },
                category: Category & { productCount: string }
              ) =>
                Number(category.productCount) > Number(max.productCount)
                  ? category
                  : max,
              response.data[0]
            )
          );
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setChartDataLoading(false);
      }
    };
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {statisticsLoading ? (
        // <div className="flex flex-col justify-center items-center h-screen">
        //   <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        //   <p className="text-muted-foreground">Loading Sales Statistcis...</p>
        // </div>
        <DashboardSkeleton/>
      ) : (
        <>
          <DashboardStats stats={stats} variant="payment" />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sales Statistics */}
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-slate-900/20 to-primary/5">
              <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
                <CardDescription>Order values over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] mt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesGraph}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value) => [
                        `₹${formatPrice(Number(value))}`,
                        "Amount",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <div className="w-full">
              <ChartPie
                loading={chartDataloading}
                categories={categories}
                highest={highestProductCatgeory}
              />
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 gap-4">
        {/* Top Products Table */}
        <Card className=" border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-slate-900/20 to-primary/5" >
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">
                  Loading seller details...
                </p>
              </div>
            ) : (
              <TableWrapper>
                <DataTable
                  headers={[
                    { key: "srNumber", label: "Sr No." },
                    { key: "productName", label: "Product Name" },
                    { key: "unitsSold", label: "Units Sold" },
                    { key: "totalSales", label: "Total Sales" },
                  ]}
                  data={topProducts}
                  type={"seller"}
                />
              </TableWrapper>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <ChatBot/> */}
    </div>
  );
};

export default Dashboard;
