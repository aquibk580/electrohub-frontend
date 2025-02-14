import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockData } from "@/data/mock-data";
import { ArrowLeft, Check, Package, Star, Truck } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);

  const breadcrumbs = [
    { href: "/admin/ordersmanage", label: "Orders Management" },
    { href: "#", label: "Order Details" },
  ];

  useEffect(() => {
    if (id) {
      const foundOrder = mockData.orders.find((o) => o.id === id);
      setOrder(foundOrder);
    }
  }, [id]);
  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      navigate(`/admin/ordersmanage?page=${returnPage}`);
    } else {
      navigate('/admin/ordersmanage');
    }
  };

  if (!order) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      "Pending": "bg-yellow-500",
      "Shipped": "bg-blue-500",
      "Delivered": "bg-green-500",
      "Cancelled": "bg-red-500",
      "Returns": "bg-purple-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getPaymentStatusClass = (status: string) => {
    return status === "Completed"
      ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
  };

  const timelineIcons = {
    "Order Placed": <Package className="w-6 h-6" />,
    "Order Confirmed": <Check className="w-6 h-6" />,
    "Shipped": <Package className="w-6 h-6" />,
    "Out for Delivery": <Truck className="w-6 h-6" />,
    "Delivered": <Check className="w-6 h-6" />
  };

  return (
    // <SidebarLayout breadcrumbs={breadcrumbs}>
    <div className="w-full px-4 py-6 space-y-6 ">
      {/* <div className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <a href="/admin/ordersmanage" className="font-medium">
          Back to Orders
        </a>
      </div> */}
       <button 
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Orders</span>
      </button>
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details #{order.id}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={order.image}
                alt={order.productName}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{order.productName}</h3>
                <p className="text-sm text-muted-foreground">{order.total}</p>
                <Badge
                  className={`${getStatusColor(order.status)} text-white mt-2`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Seller Information</h3>
            <div className="flex items-center space-x-2">
              <span>{order.orderDetails.sellerInfo.name}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{order.orderDetails.sellerInfo.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Total Orders: {order.orderDetails.sellerInfo.totalOrders}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4">
            {order.orderDetails.orderTimeline.map((event: any, index: number) => (
              <div key={index} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${index <= order.orderDetails.orderTimeline.findIndex(
                    (e: any) => e.status === order.status
                  )
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                    }`}>
                    {timelineIcons[event.status as keyof typeof timelineIcons]}
                  </div>
                  {index < order.orderDetails.orderTimeline.length - 1 && (
                    <div className="w-px h-16 bg-border" />
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{event.status}</h4>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping and Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{order.orderDetails.shippingAddress.name}</p>
            <p>{order.orderDetails.shippingAddress.address}</p>
            <p>
              {order.orderDetails.shippingAddress.city}, {order.orderDetails.shippingAddress.state}
            </p>
            <p>{order.orderDetails.shippingAddress.pincode}</p>
            <p>{order.orderDetails.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span>{order.orderDetails.paymentDetails.method}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Transaction ID</span>
              <span>{order.orderDetails.paymentDetails.transactionId}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Status</span>
              <Badge className={getPaymentStatusClass(order.orderDetails.paymentDetails.status)}>
                {order.orderDetails.paymentDetails.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;