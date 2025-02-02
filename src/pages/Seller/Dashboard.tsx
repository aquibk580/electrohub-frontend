import { Package2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type React from "react"; // Import React

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-slate-50">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="text-[#0B3B0B]">{icon}</div>
        <div>
          <div className="text-4xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Total Items"
            value={34}
            icon={<Package2 className="h-12 w-12" />}
          />
          <StatCard
            title="Total Orders"
            value={20}
            icon={<ShoppingCart className="h-12 w-12" />}
          />
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Orders</h2>
          <Card>
            <CardHeader>{/* Add table or order list here */}</CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
