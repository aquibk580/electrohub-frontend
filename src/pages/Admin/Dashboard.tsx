import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { mockData, tableHeaders } from "@/data/mock-data";
import DashboardStats from "@/components/Admin/dashboard-stats";

const Dashboard = () => {
  const weeklyData = [
    { week: "Week 1", value: 110000 },
    { week: "Week 2", value: 90000 },
    { week: "Week 3", value: 85000 },
    { week: "Week 4", value: 150000 },
  ];

  const topProducts = mockData.products.slice(0, 5).map((product) => ({
    id: product.id,
    productName: product.title,
    unitsSold: Math.floor(Math.random() * 1000),
    totalProfits: `₹${(Math.random() * 200000).toFixed(2)}/-`,
  }));
  const stats = [
    {
      label: "Total Transactions",
      value: "1254",
      //   change: { value: 14 },
    },
    {
      label: "Sales",
      value: "₹1,32,42,400",
      change: { value: 14 },
    },
    {
      label: "Monthly Order",
      value: "42,400",
      change: { value: -7 },
    },
    {
      label: "Monthly Revenue",
      value: "₹32,42,400",
      change: { value: 14 },
    },
    {
      label: "Online Visitors",
      value: "1,43,649",
      change: { value: -7 },
    },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <DashboardStats stats={stats} variant="payment" />
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TableWrapper>
              <DataTable
                headers={[
                  { key: "id", label: "ID" },
                  { key: "productName", label: "Product Name" },
                  { key: "unitsSold", label: "Units Sold" },
                  { key: "totalProfits", label: "Total Profits" },
                ]}
                data={topProducts}
                type={"seller"}
              />
            </TableWrapper>
          </CardContent>
        </Card>

        {/* Monthly Target */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Target</CardTitle>
            <p className="text-sm text-muted-foreground">
              Target You Have Set for Each Month
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span>Sales 30,000,000</span>
                  <span>{70 + i * 10}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${70 + i * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
