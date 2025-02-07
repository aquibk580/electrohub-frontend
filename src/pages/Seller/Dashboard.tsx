import { Search, LayoutGrid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { label: "Total Orders", value: "48" },
  { label: "Order Items overtime", value: "420" },
  { label: "Returns", value: "9" },
  { label: "Fulfilled orders overtime", value: "389" },
]

const orders = [
  {
    id: "1",
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Pending",
  },
  // Add more orders as needed
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Seller Panel</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">XYZ</span>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </header>

      <div className="bg-amber-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">BECOME A AFFILIATE MARKETER</h2>
        <div className="flex justify-between">
          <div className="text-center">
            <div className="mb-2">Step 1</div>
            <div>Choose a Niche</div>
          </div>
          {/* Add other steps similarly */}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex justify-between mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Order.." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-md" />
                    <div className="text-sm">{order.product}</div>
                  </div>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Open menu</span>
                    <Filter className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

