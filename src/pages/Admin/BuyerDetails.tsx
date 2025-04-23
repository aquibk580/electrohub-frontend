import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ShoppingBag,
  RefreshCcw,
  ArrowLeft,
  BadgeIndianRupee,
  ContactRound,
} from "lucide-react";
import type { OrderItem, User } from "@/types/entityTypes";
import { getRandomColor } from "@/components/Home/UserProfileButton";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import { Helmet } from "react-helmet-async";
import { BuyerDetailsSkeleton } from "@/components/Admin/Skeletons";

type ExtendedUser = User & {
  totalSpend: number;
  itemsPurchased: number;
  returns: number;
  avgOrderValue: number;
};

const BuyerDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [orderItems, setOrderItems] = useState<Array<OrderItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const initials = user?.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`
        );
        if (response.status === 200) {
          setUser({
            ...response.data.user,
            totalSpend: response.data.totalSpend,
            itemsPurchased: response.data.itemsPurchased,
            returns: response.data.returns,
            avgOrderValue: response.data.avgOrderValue,
          });

          setOrderItems(response.data.orderItems);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      navigate(`/admin/buyer?page=${returnPage}`);
    } else {
      navigate("/admin/buyer");
    }
  };

  if (loading) {
    return <BuyerDetailsSkeleton />;
  }
  console.log(user);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Helmet
        title={user?.name}
        meta={[
          {
            name: "description",
            content: "Users Info ",
          },
        ]}
      />
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Buyers</span>
      </button>
      {/* Header Card */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/30 via-slate-700/35 to-primary/25">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center  space-x-4">
            <Avatar className="h-20  border-[3px]  border-primary p-1 w-20 ">
              <AvatarImage className="rounded-full" src={user?.pfp} />
              <AvatarFallback
                className={`${bgColor} text-3xl font-extrabold text-accent-foreground drop-shadow-xl flex items-center justify-center`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl ">{user?.name}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-accent-foreground/80">
                <ContactRound className="h-5 w-5 text-primary" />
                <span>Member since {formatDate(user!.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="payment">Payment Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spend
                </CardTitle>
                <BadgeIndianRupee className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{formatPrice(user!.totalSpend)}
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Items Purchased
                </CardTitle>
                <ShoppingBag className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user!.itemsPurchased}</div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Returns</CardTitle>
                <RefreshCcw className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user!.returns}</div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Order Value
                </CardTitle>
                <CreditCard className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{formatPrice(user!.avgOrderValue)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{`${user?.address}`}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Gender: {user?.gender || "Unknwon"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-primary/75 bg-primary/5  ">
            <CardHeader>
              <CardTitle className="text-xl">Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              {orderItems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-accent-foreground">
                      <TableHead className="text-center text-accent-foreground">
                        Order ID
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground">
                        Date
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground">
                        Items
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground">
                        Total
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems?.map((orderItem) => (
                      <TableRow
                        className="border-b-accent-foreground/35 hover:bg-primary/10"
                        key={orderItem.id}
                      >
                        <TableCell className="text-center text-accent-foreground">
                          {orderItem.id}
                        </TableCell>
                        <TableCell className="text-center text-accent-foreground">
                          {formatDate(orderItem.createdAt)}
                        </TableCell>
                        <TableCell className="text-center text-accent-foreground">
                          {orderItem.quantity}x{" "}
                          {orderItem?.product?.name.substring(0, 60) ||
                            "Unknown Product"}
                        </TableCell>
                        <TableCell className="text-center text-accent-foreground">
                          ₹
                          {formatPrice(
                            orderItem.product.price -
                              (orderItem.product.offerPercentage / 100) *
                                orderItem.product.price
                          )}
                        </TableCell>
                        <TableCell className="text-center text-accent-foreground">
                          <Badge
                            variant="outline"
                            className={`mt-1 
   ${
     orderItem.status === "Delivered"
       ? "bg-green-100 text-green-700 border-green-500"
       : ""
   } 
   ${
     orderItem.status === "OrderConfirmed"
       ? "bg-blue-100 text-blue-700 border-blue-500"
       : ""
   } 
   ${
     orderItem.status === "Shipped"
       ? "bg-yellow-100 text-yellow-700 border-yellow-500"
       : ""
   } 
   ${
     orderItem.status === "Cancelled"
       ? "bg-red-100 text-red-700 border-red-500"
       : ""
   } 
   ${
     orderItem.status === "Returned"
       ? "bg-purple-100 text-purple-700 border-purple-500"
       : ""
   } 
 `}
                          >
                            {orderItem.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                  Orders not available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="border-primary/75 bg-primary/5 ">
            <CardHeader>
              <CardTitle className="text-xl">Product Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {user!.reviews!.length > 0 ? (
                <div className="space-y-4">
                  {user?.reviews?.map((review) => (
                    <Card
                      onClick={() =>
                        navigate(`/admin/productsmanage/${review.product.id}`)
                      }
                      className="hover:border-primary/55 cursor-pointer border-transparent shadow-none bg-primary/10 "
                      key={review.productId}
                    >
                      <CardContent className="px-4 py-4 space-y-1.5">
                        <div className="flex justify-between sapce-y-3 items-start">
                          <div>
                            <h4 className="font-semibold text-accent-foreground hover:text-primary">
                              {review.product.name}
                            </h4>
                          </div>

                          <div className="flex">
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-primary text-primary"
                                      : "text-white fill-current"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-accent-foreground text-xs">
                              {review.rating.toFixed(1)}/5
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-accenr-foreground/95">
                          {review.content}
                        </p>
                        <div className="text-xs space-x-2 mt-3 flex items-center text-accent-foreground/90">
                          <Calendar className="w-4 h-4" />
                          <span className=" ">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                  Products not available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          {/* Transaction History */}
          <Card className="mt-4 border-primary/75 bg-primary/5 ">
            <CardHeader>
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {user!.orders!.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-accent-foreground">
                      <TableHead className="text-center text-accent-foreground ">
                        Transaction ID
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground ">
                        Date
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground ">
                        Amount
                      </TableHead>
                      <TableHead className="text-center text-accent-foreground ">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user?.orders?.map((order) => (
                      <TableRow
                        className="border-accent-foreground/45 hover:bg-primary/10"
                        key={order.id}
                      >
                        <TableCell className="text-center">
                          {order.id}
                        </TableCell>
                        <TableCell className="text-center">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          ₹{formatPrice(order.total)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-primary/70">Completed</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                  Trnasctions not available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerDetails;
