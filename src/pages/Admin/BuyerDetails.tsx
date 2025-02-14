// First, let's update the mock-data.ts to include more buyer details


// Now let's create the BuyerDetails.tsx component
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Calendar, CreditCard, ShoppingBag, RefreshCcw } from 'lucide-react';
import { mockData, buyerDetails } from '@/data/mock-data';

const BuyerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const buyer =buyerDetails[id || ''];

    if (!buyer) {
        return <div>Buyer not found</div>;
    }

    const handleStatusChange = (newStatus: 'active' | 'suspended') => {
        // Implement status change logic here
        console.log(`Changing status to ${newStatus}`);
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={buyer.personalInfo.profilePhoto} />
                            <AvatarFallback>{buyer.personalInfo.buyerName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{buyer.personalInfo.buyerName}</CardTitle>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Badge variant={buyer.personalInfo.status === 'active' ? 'default' : 'destructive'}>
                                    {buyer.personalInfo.status}
                                </Badge>
                                <span>•</span>
                                <span>Member since {buyer.personalInfo.joinDate}</span>
                            </div>
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={buyer.personalInfo.status === 'active' ? 'destructive' : 'default'}>
                                {buyer.personalInfo.status === 'active' ? 'Suspend Buyer' : 'Activate Buyer'}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {buyer.personalInfo.status === 'active' ? 'Suspend Buyer Account' : 'Activate Buyer Account'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to {buyer.personalInfo.status === 'active' ? 'suspend' : 'activate'} this buyer's account?
                                    This action can be reversed later.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() =>
                                    handleStatusChange(buyer.personalInfo.status === 'active' ? 'suspended' : 'active')
                                }>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{buyer.statistics.totalSpend}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Items Purchased</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{buyer.statistics.totalItemsPurchased}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Returns Rate</CardTitle>
                                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{buyer.statistics.returnsRate}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{buyer.statistics.averageOrderValue}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{buyer.personalInfo.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{buyer.personalInfo.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {`${buyer.personalInfo.address.street}, ${buyer.personalInfo.address.city}, 
                      ${buyer.personalInfo.address.state} ${buyer.personalInfo.address.pincode}`}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Age: {buyer.personalInfo.age}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Purchase History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {buyer.purchaseHistory.map((order) => (
                                        <TableRow key={order.orderId}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                {order.items.map((item) => (
                                                    <div key={item.productName}>
                                                        {item.quantity}x {item.productName}
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>{order.total}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{order.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {buyer.reviews.map((review) => (
                                    <Card key={review.productId}>
                                        <CardContent className="pt-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold">{review.productName}</h4>
                                                    <div className="flex items-center space-x-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{review.date}</span>
                                            </div>
                                            <p className="mt-2 text-muted-foreground">{review.comment}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Preferred Payment Method</span>
                                    <span>{buyer.paymentDetails.preferredPaymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Wallet Balance</span>
                                    <span>{buyer.paymentDetails.walletBalance}</span>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Saved Payment Methods</h4>
                                    <div className="space-y-2">
                                        {buyer.paymentDetails.savedCards.map((card) => (
                                            <div
                                                key={card.lastFourDigits}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <p className="font-medium">{card.cardType}</p>
                                                        <p className="text-sm text-muted-foreground">**** **** **** {card.lastFourDigits}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">Remove</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transaction History */}
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        {
                                            id: "TXN1001",
                                            date: "Feb 10, 2024",
                                            type: "Purchase",
                                            amount: "₹146,800",
                                            status: "Completed"
                                        },
                                        {
                                            id: "TXN1002",
                                            date: "Feb 8, 2024",
                                            type: "Refund",
                                            amount: "₹2,500",
                                            status: "Completed"
                                        },
                                        {
                                            id: "TXN1003",
                                            date: "Feb 5, 2024",
                                            type: "Wallet Top-up",
                                            amount: "₹5,000",
                                            status: "Completed"
                                        }
                                    ].map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.id}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{transaction.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default BuyerDetails;

