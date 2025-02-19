import React, { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
// import IndiaMap from "@/components/admin/map-skeleton"
import IndiaMap from "@/components/Admin/map-skeleton";
const IndiaSalesMap = React.lazy(() => import("@/components/Admin/india-sales-map"));


const Dashboard = () => {
    const [orderChartData, setorderChartData] = useState(undefined)
    // const orderChartData = [
    //     { date: "Jan 1", amount: 12500 },
    //     { date: "Jan 5", amount: 8900 },
    //     { date: "Jan 10", amount: 15600 },
    //     { date: "Jan 15", amount: 9800 },
    //     { date: "Jan 20", amount: 13200 },
    //     { date: "Jan 25", amount: 11400 },
    //     { date: "Jan 30", amount: 14500 },
    //     { date: "Feb 5", amount: 16800 },
    //     { date: "Feb 10", amount: 12300 },
    //     { date: "Feb 15", amount: 10900 }
    // "C:\Users\spher\Downloads\ELECTROHUB\electrohub-frontend-main\src\components\Admin\logo.tsx"
    // ];
    useEffect(() => {
        const fetchdata = async () => {
          try {
            const response = await fetch(`https://electrohub-express.onrender.com/admin/dashboard/ordervalues`)
            if (!response.ok) {
              throw new Error("Failed to fetch buyers")
            }
            const data = await response.json()
            setorderChartData(data)
          } catch (err) {
            console.log("An error Occured", err)
          }
        }
    
        fetchdata()
      }, [])
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
        "IN-WB": 12000
    };
    const weeklyData = [
        { week: 'Week 1', value: 110000 },
        { week: 'Week 2', value: 90000 },
        { week: 'Week 3', value: 85000 },
        { week: 'Week 4', value: 150000 },
    ];

    const topProducts = mockData.products.slice(0, 5).map(product => ({
        id: product.id,
        productName: product.title,
        unitsSold: Math.floor(Math.random() * 1000),
        totalProfits: `₹${(Math.random() * 200000).toFixed(2)}/-`
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
    ]
    return (
        <div className="flex flex-col gap-4 p-4">
            <DashboardStats stats={stats} variant="payment" />
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Sales Statistics */}
                <Card>
                            <CardHeader>
                                <CardTitle>Purchase Trend</CardTitle>
                                <CardDescription>Order values over time</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] mt-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={orderChartData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis 
                                            dataKey="date" 
                                            className="text-xs" 
                                        />
                                        <YAxis 
                                            className="text-xs"
                                            tickFormatter={(value) => `₹${value}`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))'
                                            }}
                                            formatter={(value) => [`₹${value}`, 'Amount']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            dot={{ fill: 'hsl(var(--primary))' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                {/* India Sales Map */}
                {/* <Card className=""> */}
                    {/* <CardHeader>
                        <CardTitle>Most Sales By States</CardTitle>
                    </CardHeader> */}
                    {/* <CardContent className="p-3"> */}
                        {/* <IndiaSalesMap salesData={salesData} height="450px" className="border-border flex " /> */}
                        <Suspense fallback={<div><IndiaMap/></div>}>
                            <IndiaSalesMap salesData={salesData} height="450px" className="border-border flex p-3 bg-white dark:bg-black stroke-black/20 " />
                            {/* <IndiaMap /> */}
                        </Suspense>
                    {/* </CardContent> */}
                {/* </Card> */}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TableWrapper >
                            <DataTable
                                headers={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'productName', label: 'Product Name' },
                                    { key: 'unitsSold', label: 'Units Sold' },
                                    { key: 'totalProfits', label: 'Total Profits' }
                                ]}
                                data={topProducts} type={"seller"} />
                        </TableWrapper>
                    </CardContent>
                </Card>

                {/* Monthly Target */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Target</CardTitle>
                        <p className="text-sm text-muted-foreground">Target You Have Set for Each Month</p>
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
            {/* <ChatBot/> */}
        </div>
    );
};

export default Dashboard;