import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, CheckCircle2, Clock, CreditCard, DollarSign } from "lucide-react";
import { mockData } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";

interface PaymentTimelineItem {
  status: string;
  date: string;
  description: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/10 text-green-500';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'on hold':
      return 'bg-orange-500/10 text-orange-500';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const PaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Find the payment in mock data
  const payment = mockData.allPayments.find(p => p.id === id);
  
  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      navigate(`/admin/payments?page=${returnPage}`);
    } else {
      navigate('/admin/ordersmanage');
    }
  };
  if (!payment) {
    return <div>Payment not found</div>;
  }

  // Mock timeline data based on payment status
  const timeline: PaymentTimelineItem[] = [
    {
      status: "Payment Initiated",
      date: payment.date,
      description: "Payment request initiated by sender"
    },
    {
      status: "Processing",
      date: payment.date,
      description: `Processing payment via ${payment.paymentMode}`
    },
    {
      status: payment.status,
      date: payment.date,
      description: `Payment ${payment.status.toLowerCase()} - Amount: ${payment.amount}`
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
       <button 
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Orders</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Amount</span>
              </div>
              <p className="text-2xl font-bold">{payment.amount}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <Badge className={`${getStatusColor(payment.status)}`}>
                {payment.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Payment Mode</span>
              </div>
              <p className="text-base">{payment.paymentMode}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Date</span>
              </div>
              <p className="text-base">{payment.date}</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">{payment.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Product ID</p>
              <p className="font-medium">{payment.pid}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Sender</p>
              <p className="font-medium">{payment.sender}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Receiver</p>
              <p className="font-medium">{payment.receiver}</p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Card */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Payment Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center gap-x-4">
                  <div className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pl-12">
                    <div className="flex flex-col">
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="sm:ml-auto">
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetail;