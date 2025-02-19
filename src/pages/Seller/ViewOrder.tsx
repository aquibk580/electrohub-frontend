import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assets } from "@/assets/assets";
import { MoveLeft } from "lucide-react";

const orders = [
  {
    id: "1",
    productName: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    description: "The iPhone 13 Plus features a stunning OLED display, powerful A15 Bionic chip, and an advanced dual-camera system for professional photography.",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Confirmed",
    customerDetails: {
      name: "Raihan Shaikh",
      email: "raihan@example.com",
      phone: "+91 9876543210",
      address: "Mumbai, India Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    productDetails: {
      name: "iPhone 13 Plus",
      storage: "128 GB",
      ram: "12 GB",
      color: "Green",
      image: assets.mobile,
    },
  },
];

const getStatusColor = (status:any) => {
  switch (status) {
    case "Confirmed": return "bg-primary/10 text-primary";
    case "Delivered": return "bg-secondary/10 text-secondary";
    case "Shipped": return "bg-accent/10 text-accent";
    case "Cancelled": return "bg-destructive/10 text-destructive";
    case "Returned": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const ViewOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === orderId);
  const [status, setStatus] = useState(order ? order.status : "Confirmed");

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-foreground">
        Order not found! 😢
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button className="text-sm bg-transparent text-muted-foreground rounded-full hover:bg-accent shadow-none" onClick={() => navigate(-1)}>
        <MoveLeft/> Back to Orders
      </Button>

      <div className="space-y-3">
        <div>
          <div className="text-2xl font-semibold text-foreground">Order Details</div>
        </div>
        
        <div className="space-y-4 w-full">
          <div className="flex flex-col lg:flex-row gap-2 lg:items-center bg-card border p-3 md:p-1 rounded-lg shadow-sm">
            <Link to={`product/${order.id}`}>
              <p className="text-muted-foreground ml-2 mt-1 text-sm">Order ID: {order.id}45363</p>
              <img src={order.productDetails.image} alt="Product" className="w-full lg:w-48 object-cover" />
            </Link>
            <div className="flex-1 p-3 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{order.productName}</h3>
              <p className="text-muted-foreground text-sm">{order.description}</p>
              <label className={`${getStatusColor(status)} text-xs p-1 px-3 rounded-md`}>{status}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 text-muted-foreground mt-2">
                <p className="text-sm"><strong>Date:</strong> {order.date}</p>
                <p className="text-sm"><strong>Total:</strong> {order.total}</p>
              </div>
            </div>
            <div className="w-full lg:w-[400px] p-4 md:p-6">
              <h3 className="text-md font-semibold text-foreground">Update Order Status</h3>
              <Select onValueChange={setStatus} defaultValue={status}>
                <SelectTrigger className="w-full border bg-background rounded-md px-4 py-2 mt-2">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 md:p-6 rounded-lg bg-card border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">Customer Details</h3>
              <div className="space-y-2 text-muted-foreground text-[15px]">
                <p><strong>Name:</strong> {order.customerDetails.name}</p>
                <p><strong>Email:</strong> {order.customerDetails.email}</p>
                <p><strong>Phone:</strong> {order.customerDetails.phone}</p>
                <p><strong>Address:</strong> {order.customerDetails.address}</p>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-lg bg-card border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">Product Details</h3>
              <div className="space-y-2 text-muted-foreground text-[15px]">
                <p><strong>Name:</strong> {order.productDetails.name}</p>
                <p><strong>Storage:</strong> {order.productDetails.storage}</p>
                <p><strong>RAM:</strong> {order.productDetails.ram}</p>
                <p><strong>Color:</strong> {order.productDetails.color}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;