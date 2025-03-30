import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Package, Users, Loader2, VerifiedIcon } from "lucide-react";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { OrderItem, Product, Seller } from "@/types/entityTypes";
import { getRandomColor } from "@/components/Home/UserProfileButton";
import { formatPrice } from "@/utils/FormatPrice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SellerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [sellerProducts, setSellerProducts] = useState<Array<Product>>([]);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const getSellerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/sellers/${id}`
        );
        if (response.status === 200) {
          setSeller(response.data.seller);
          setAverageRating(response.data.averageRating);
          setTotalSales(response.data.totalSales);
          setSellerProducts(response.data.sellerProducts);
          setTotalReturns(response.data.totalReturns);
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSellerData();
    console.log(seller);
  }, []);

  const initials = seller?.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Seller Details...</p>
      </div>
    );
  }

  return (
    //<SidbarLayout breadcrumbs={breadcrumbs}>
    <div className="w-full px-4 py-6 space-y-6">
      {/* Seller Overview */}
      <Card className="border-primary/65 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Seller Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-col-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 flex items-center justify-center  md: ">
            <div className="flex flex-col items-center  gap-2 w-fit">
              <Avatar>
                <AvatarImage
                  src={seller?.pfp}
                  alt="User"
                  className="w-32 h-32 object-cover border-[3px] border-primary  p-1.5 rounded-full"
                />
                <AvatarFallback
                  className={`${bgColor}  text-white font-extrabold`}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex space-x-1 items-center">
              <h3 className="text-xl  font-bold">{seller?.name}</h3>
              <VerifiedIcon className="w-5 h-5 text-blue-600"/>
              </div>
              {/* <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">{seller.email}</Badge>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500"
                >
                  {seller.phone}
                </Badge>
              </div> */}
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Member Since :  </strong> {formatDate(seller!?.createdAt)}
            </p>
            <p>
              <strong>Email : </strong> {seller?.email}
            </p>
            <p>
              <strong>Address : </strong> {seller?.address}
            </p>
            <div className="flex">
              <strong>Average Rating : </strong>
              <div className="flex items-center space-x-1">
                <span>{averageRating}</span>
                <Star className="w-[15px] h-[15px] text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="border-primary/70 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Seller insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-primary" />
                  <span>Total Products</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {sellerProducts.length}
                </p>
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-primary" />
                  <span>Order Completion</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{totalSales}</p>
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-8 w-8 text-primary " />
                  <span>Satisfaction</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{averageRating}</p>
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <span>Total Returns</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{totalReturns}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 ">
          <div className="flex justify-between">
            <span >Email :</span>
            <span>{seller?.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Phone :</span>
            <span>{seller?.phone}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Address :</span>
            <span>{seller?.address}</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="Products">
        <TabsList>
          <TabsTrigger value="Products">Products</TabsTrigger>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="Products">
          {/* Seller Products */}
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Seller Products</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-2 ">
                {sellerProducts.map((product: Product) => (
                  <div
                  onClick={() => navigate(`/admin/productsmanage/${product.id}`)}
                    key={product.id}
                    className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer  border-transparent shadow-none hover:border-primary/70 bg-primary/10   p-4 border rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className=" w-24 h-24 md:w-20 md:h-20 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm md:text-md">{product.name}</p>
                        <p className="text-sm text-accent-foreground">
                          {formatDate(product.createAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹
                        {formatPrice(
                          product.price -
                            (product.offerPercentage / 100) * product.price
                        )}
                      </p>
                      <Badge
  variant="outline"
  className={`mt-1 
    ${product.status === "Active" ? "bg-green-100 text-green-700 border-green-500" : ""} 
    ${product.status === "Inactive" ? "bg-gray-100 text-gray-700 border-gray-500" : ""} 
    ${product.status === "Out of Stock" ? "bg-red-100 text-red-700 border-red-500" : ""} 
  `}
>
  {product.status}
</Badge>

                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Orders">
          {/* Recent Orders */}
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {orders.map((order: OrderItem) => (
                  <div
                  onClick={() => navigate(`/admin/ordersmanage/${order.id}`)}
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center border-transparent cursor-pointer bg-primary/10 hover:border-primary/70  justify-between p-4 border rounded-xl"
                  
                  >
                    <div className="flex  items-center space-x-4">
                      <img
                        src={order.product.images[0].url}
                        alt={order.product.name}
                        className="w-24 h-24 md:w-20 md:h-20 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">
                          <strong>Order ID : </strong>
                          {order.id}
                        </p>
                        <p className="font-medium">{order.product.name}</p>
                        <p className="text-sm text-accent-foreground/80">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹
                        {formatPrice(
                          order.product.price -
                            (order.product.offerPercentage / 100) *
                              order.product.price
                        )}
                      </p>
                      <Badge
  variant="outline"
  className={`mt-1 
    ${order.status === "Delivered" ? "bg-green-100 text-green-700 border-green-500" : ""} 
    ${order.status === "OrderConfirmed" ? "bg-blue-100 text-blue-700 border-blue-500" : ""} 
    ${order.status === "Shipped" ? "bg-yellow-100 text-yellow-700 border-yellow-500" : ""} 
    ${order.status === "Cancelled" ? "bg-red-100 text-red-700 border-red-500" : ""} 
    ${order.status === "Returned" ? "bg-purple-100 text-purple-700 border-purple-500" : ""} 
  `}
>
  {order.status}
</Badge>

                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDetails;
