import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, HelpCircle, TruckIcon, RefreshCcw, Cpu } from "lucide-react"

export default function Help() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">Find answers to your questions and get the support you need</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for help articles..."
          className="pl-10 w-full h-12 rounded-full border-muted-foreground/20"
        />
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <div className="mb-6 overflow-x-auto">
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
            <TabsTrigger value="popular" className="rounded-md">
              Popular Topics
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-md ">
              Orders & Shipping
            </TabsTrigger>
            <TabsTrigger value="returns" className="rounded-md ">
              Returns & Refunds
            </TabsTrigger>
            <TabsTrigger value="technical" className="rounded-md ">
              Technical Support
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="popular" className="pt-2 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="overflow-hidden border-muted/30 transition-all hover:shadow-md">
                <div className="flex items-center p-1 bg-muted/20">
                  <Badge variant="outline" className="ml-4 bg-primary/10 text-primary border-primary/20">
                    {topic.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <span className="bg-primary/10 p-2 rounded-md text-primary">{topic.icon}</span>
                    <span>{topic.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{topic.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t bg-muted/10 p-4">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                    View Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground">{topic.readTime} min read</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-medium">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our support team is ready to help you with any questions or issues you might have.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Button variant="default">Contact Support</Button>
              <Button variant="outline">Browse All Topics</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="pt-2 space-y-6">
          <div className="space-y-6">
            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-primary" />
                  Tracking Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Log in to your ElectroHub account</li>
                  <li>Go to "Order History" in your account dashboard</li>
                  <li>Find your order and click "Track"</li>
                  <li>View real-time shipping updates and estimated delivery date</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 flex justify-between">
                <Button variant="ghost" size="sm" className="text-primary">
                  View Detailed Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-primary" />
                  Shipping Methods and Timeframes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {shippingMethods.map((method, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/10 space-y-1">
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <Badge variant="outline" className="mt-2 bg-primary/5 text-primary border-primary/20">
                        {method.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  View Shipping Policy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  Modifying or Canceling an Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You can modify or cancel your order within 1 hour of placing it. After that, the order may have
                  already been processed for shipping.
                </p>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <p className="font-medium mb-2">To modify or cancel:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                    <li>Log in to your ElectroHub account</li>
                    <li>Go to "Order History"</li>
                    <li>Select the order you wish to modify or cancel</li>
                    <li>Click "Modify Order" or "Cancel Order" if the option is available</li>
                    <li>If the option is not available, contact customer service immediately</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  Contact Customer Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="pt-2 space-y-6">
          <div className="space-y-6">
            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  Return Policy Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Most items can be returned within 30 days of purchase</li>
                  <li>Original packaging and receipt/proof of purchase required</li>
                  <li>Items must be in new, unused condition with all accessories</li>
                  <li>Some items have modified return policies (see exceptions below)</li>
                  <li>Refunds are issued to the original payment method</li>
                </ul>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-medium text-warning-foreground mb-2">Return Policy Exceptions:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Opened software, digital downloads, and gaming products (non-returnable)</li>
                    <li>TVs over 65" (15-day return period)</li>
                    <li>Cell phones and cellular devices (14-day return period)</li>
                    <li>Opened movies, music, and video games (exchange only for same title)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  View Full Return Policy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  How to Return an Item
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/10 space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        1
                      </Badge>
                      In-Store Returns:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                      <li>Bring the item, all original packaging, and receipt to any ElectroHub store</li>
                      <li>Visit the customer service desk</li>
                      <li>A team member will process your return and issue a refund</li>
                    </ol>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/10 space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        2
                      </Badge>
                      Online Returns:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                      <li>Log in to your ElectroHub account</li>
                      <li>Go to "Order History" and select the order</li>
                      <li>Click "Return Item" and follow the instructions</li>
                      <li>Print the prepaid return shipping label</li>
                      <li>Package the item securely with all original materials</li>
                      <li>Attach the shipping label and drop off at any authorized shipping location</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  Start a Return
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  Refund Processing Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {refundMethods.map((method, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/10 space-y-1">
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <Badge variant="outline" className="mt-2 bg-primary/5 text-primary border-primary/20">
                        {method.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  Check Refund Status
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="pt-2 space-y-6">
          <div className="space-y-6">
            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Technical Support Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {supportOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-muted/30 hover:border-primary/20 transition-colors space-y-2"
                    >
                      <h4 className="font-medium flex items-center gap-2">
                        {option.icon}
                        {option.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium">{option.contact}</span>
                        <Badge variant="outline" className="bg-muted/20 text-muted-foreground">
                          {option.availability}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Common Technical Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalIssues.map((issue, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/10">
                      <h4 className="font-medium mb-2">{issue.problem}</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                        {issue.solutions.map((solution, idx) => (
                          <li key={idx}>{solution}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="text-primary">
                  View Troubleshooting Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Schedule a Repair
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you need professional repair services for your device, you can schedule an appointment with our
                  certified technicians.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/10 space-y-2">
                    <h4 className="font-medium">In-Store Repair</h4>
                    <p className="text-sm text-muted-foreground">
                      Bring your device to any ElectroHub store with a Tech Repair Center. Most repairs can be completed
                      same-day.
                    </p>
                    <Button size="sm" className="mt-2">
                      Schedule In-Store Repair
                    </Button>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/10 space-y-2">
                    <h4 className="font-medium">Mail-In Repair</h4>
                    <p className="text-sm text-muted-foreground">
                      Ship your device to our repair center. We'll fix it and return it to you, typically within 7-10
                      business days.
                    </p>
                    <Button size="sm" className="mt-2">
                      Start Mail-In Repair
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/20 p-8 rounded-lg mt-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-xl font-medium">Contact Customer Support</h3>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Our customer support team is here to help you 24/7.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Live Chat
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Data for the component
const popularTopics = [
  {
    title: "How to Track Your Order",
    description: "Learn how to check the status of your order and get real-time updates on your shipment.",
    icon: <TruckIcon className="h-4 w-4" />,
    category: "Orders",
    readTime: 3,
  },
  {
    title: "Return Policy Explained",
    description: "Everything you need to know about our 30-day return policy and how to initiate a return.",
    icon: <RefreshCcw className="h-4 w-4" />,
    category: "Returns",
    readTime: 5,
  },
  {
    title: "Setting Up Your New Device",
    description: "Step-by-step instructions for setting up your new electronics and connecting them to your network.",
    icon: <Cpu className="h-4 w-4" />,
    category: "Technical",
    readTime: 8,
  },
  {
    title: "Warranty Claims Process",
    description: "How to check if your product is under warranty and the steps to file a warranty claim.",
    icon: <HelpCircle className="h-4 w-4" />,
    category: "Support",
    readTime: 4,
  },
]

const shippingMethods = [
  {
    name: "Standard Shipping",
    description: "Delivery in 3-5 business days",
    price: "Free on orders $35+",
  },
  {
    name: "Express Shipping",
    description: "Delivery in 2 business days",
    price: "$9.99",
  },
  {
    name: "Next-Day Shipping",
    description: "Delivery by end of next business day",
    price: "$19.99",
  },
  {
    name: "Store Pickup",
    description: "Ready within 2 hours at your selected store",
    price: "Free",
  },
]

const refundMethods = [
  {
    name: "In-Store Returns",
    description: "Refunds to the original payment method are typically processed immediately.",
    time: "Immediate",
  },
  {
    name: "Credit Card Refunds",
    description:
      "Refunds to credit cards typically appear within 3-5 business days after we receive and process your return.",
    time: "3-5 business days",
  },
  {
    name: "Debit Card Refunds",
    description:
      "Refunds to debit cards typically appear within 7-10 business days after we receive and process your return.",
    time: "7-10 business days",
  },
  {
    name: "Store Credit/Gift Cards",
    description:
      "Refunds to store credit or gift cards are processed immediately after we receive and process your return.",
    time: "Immediate",
  },
]

const supportOptions = [
  {
    name: "Phone Support",
    description: "Speak directly with a technical support specialist.",
    contact: "1-800-TECH-HELP",
    availability: "Available 24/7",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-phone text-primary"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
  {
    name: "Live Chat",
    description: "Chat online with a support representative.",
    contact: "Start Chat",
    availability: "8AM-12AM EST",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle text-primary"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
  },
  {
    name: "Email Support",
    description: "Send us a detailed description of your issue.",
    contact: "techsupport@electrohub.com",
    availability: "Response within 24h",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail text-primary"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
  },
  {
    name: "In-Store Support",
    description: "Visit our Tech Desk at any ElectroHub store.",
    contact: "Find a Store",
    availability: "Appointments recommended",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-map-pin text-primary"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  },
]

const technicalIssues = [
  {
    problem: "Device Won't Power On",
    solutions: [
      "Check that the device is properly connected to power",
      "Try a different power outlet",
      "For battery-powered devices, ensure the battery is charged",
      "Perform a hard reset (consult device manual for instructions)",
    ],
  },
  {
    problem: "Wi-Fi Connectivity Issues",
    solutions: [
      "Restart your router and the device",
      "Ensure you're connecting to the correct network",
      "Move closer to the router to improve signal strength",
      "Check if other devices can connect to the same network",
    ],
  },
  {
    problem: "Software/App Not Working",
    solutions: [
      "Close and reopen the application",
      "Check for software updates",
      "Restart your device",
      "Uninstall and reinstall the application",
    ],
  },
]

