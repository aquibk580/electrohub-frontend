import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Star, Package, TrendingUp, Users } from "lucide-react";
import { mockData } from "@/data/mock-data";

const SellerDetails = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Find seller from both top sellers and all sellers
      const foundSeller = [...mockData.topsellers, ...mockData.sellers].find(
        (s) => s.id === id
      );
      if (foundSeller) {
        // Enhance with additional mock data
        setSeller({
          ...foundSeller,
          rating: 4.8,
          totalOrders: 15234,
          joinDate: "Jan 15, 2023",
          verificationStatus: "Verified",
          contactInfo: {
            email: "seller@example.com",
            phone: "+91 9876543210",
            address: "123 Business Street, Mumbai, Maharashtra, 400001",
          },
          performance: {
            monthlyData: Array.from({ length: 6 }, (_, i) => ({
              month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
              sales: Math.floor(Math.random() * 50000) + 10000,
              profit: Math.floor(Math.random() * 30000) + 5000,
            })),
            metrics: {
              orderCompletion: 98.5,
              customerSatisfaction: 4.7,
              responseTime: "2 hours",
              returnRate: "2.3%",
            },
          },
          recentOrders: mockData.orders.slice(0, 5),
        });
      }
    }
  }, [id]);

  if (!seller) return null;

  return (
    //<SidbarLayout breadcrumbs={breadcrumbs}>
    <div className="w-full px-4 py-6 space-y-6">
      {/* Seller Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">{seller.sellerName}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">{seller.sellerNiche}</Badge>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500"
                >
                  {seller.verificationStatus}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>{seller.rating} Rating</span>
              <span>•</span>
              <span>{seller.totalOrders.toLocaleString()} Orders</span>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Member Since:</strong> {seller.joinDate}
            </p>
            <p>
              <strong>Country:</strong> {seller.originCountry}
            </p>
            <p>
              <strong>Total Profits:</strong> {seller.totalProfits}
            </p>
            <p>
              <strong>Items Sold:</strong> {seller.totalItemsSold}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seller.performance.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#82ca9d"
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Order Completion</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {seller.performance.metrics.orderCompletion}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Satisfaction</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {seller.performance.metrics.customerSatisfaction}/5
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Response Time</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {seller.performance.metrics.responseTime}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Return Rate</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {seller.performance.metrics.returnRate}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Email</span>
            <span>{seller.contactInfo.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Phone</span>
            <span>{seller.contactInfo.phone}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Address</span>
            <span>{seller.contactInfo.address}</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seller.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{order.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <Badge variant="outline" className="mt-1">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerDetails;
