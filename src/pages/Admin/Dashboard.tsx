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
import { Product } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { formatDate } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChartPie } from "@/components/Admin/Chart-Pie";
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
  const salesData = {
    "IN-AN": 12000,
    "IN-AP": 800,
    "IN-AR": 10000,
    "IN-AS": 500,
    "IN-BR": 300,
    "IN-CH": 12000,
    "IN-CT": 800,
    "IN-DD": 10000,
    "IN-DL": 500,
    "IN-DN": 300,
    "IN-GA": 12000,
    "IN-GJ": 800,
    "IN-HP": 10000,
    "IN-HR": 500,
    "IN-JH": 300,
    "IN-JK": 12000,
    "IN-KA": 800,
    "IN-KL": 10000,
    "IN-LD": 500,
    "IN-MH": 300,
    "IN-ML": 12000,
    "IN-MN": 800,
    "IN-MP": 10000,
    "IN-MZ": 500,
    "IN-NL": 300,
    "IN-OR": 12000,
    "IN-PB": 800,
    "IN-PY": 10000,
    "IN-RJ": 500,
    "IN-SK": 300,
    "IN-TG": 12000,
    "IN-TN": 800,
    "IN-TR": 10000,
    "IN-UP": 500,
    "IN-UT": 300,
    "IN-WB": 12000,
  };

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

  return (
    <div className="flex flex-col gap-4 p-4">
      {statisticsLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading Sales Statistcis...</p>
        </div>
      ) : (
        <>
          <DashboardStats stats={stats} variant="payment" />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sales Statistics */}
            <Card>
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
            <div className="max-w-lg">
              <ChartPie />
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 gap-4">
        {/* Top Products Table */}
        <Card>
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
