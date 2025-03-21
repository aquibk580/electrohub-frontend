import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Help() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Help Center</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search for help articles..." className="pl-10 w-full" />
      </div>

      <Tabs defaultValue="popular">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popular">Popular Topics</TabsTrigger>
          <TabsTrigger value="orders">Orders & Shipping</TabsTrigger>
          <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
          <TabsTrigger value="technical">Technical Support</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How to Track Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Learn how to check the status of your order and get real-time updates on your shipment.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Policy Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Everything you need to know about our 30-day return policy and how to initiate a return.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Setting Up Your New Device</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Step-by-step instructions for setting up your new electronics and connecting them to your network.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warranty Claims Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p>How to check if your product is under warranty and the steps to file a warranty claim.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Guide</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="pt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tracking Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Log in to your ElectroHub account</li>
                  <li>Go to "Order History" in your account dashboard</li>
                  <li>Find your order and click "Track"</li>
                  <li>View real-time shipping updates and estimated delivery date</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Detailed Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Methods and Timeframes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Standard Shipping (Free on orders $35+)</h4>
                    <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Express Shipping ($9.99)</h4>
                    <p className="text-sm text-muted-foreground">Delivery in 2 business days</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Next-Day Shipping ($19.99)</h4>
                    <p className="text-sm text-muted-foreground">Delivery by end of next business day</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Store Pickup (Free)</h4>
                    <p className="text-sm text-muted-foreground">Ready within 2 hours at your selected store</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Shipping Policy</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modifying or Canceling an Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  You can modify or cancel your order within 1 hour of placing it. After that, the order may have
                  already been processed for shipping.
                </p>
                <p className="font-medium">To modify or cancel:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Log in to your ElectroHub account</li>
                  <li>Go to "Order History"</li>
                  <li>Select the order you wish to modify or cancel</li>
                  <li>Click "Modify Order" or "Cancel Order" if the option is available</li>
                  <li>If the option is not available, contact customer service immediately</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Contact Customer Service</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="pt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Return Policy Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Most items can be returned within 30 days of purchase</li>
                  <li>Original packaging and receipt/proof of purchase required</li>
                  <li>Items must be in new, unused condition with all accessories</li>
                  <li>Some items have modified return policies (see exceptions below)</li>
                  <li>Refunds are issued to the original payment method</li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md">
                  <h4 className="font-medium">Return Policy Exceptions:</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Opened software, digital downloads, and gaming products (non-returnable)</li>
                    <li>TVs over 65" (15-day return period)</li>
                    <li>Cell phones and cellular devices (14-day return period)</li>
                    <li>Opened movies, music, and video games (exchange only for same title)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Return Policy</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Return an Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">In-Store Returns:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Bring the item, all original packaging, and receipt to any ElectroHub store</li>
                      <li>Visit the customer service desk</li>
                      <li>A team member will process your return and issue a refund</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium">Online Returns:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
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
              <CardFooter>
                <Button variant="outline">Start a Return</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Processing Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">In-Store Returns:</h4>
                    <p className="text-sm text-muted-foreground">
                      Refunds to the original payment method are typically processed immediately.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Credit Card Refunds:</h4>
                    <p className="text-sm text-muted-foreground">
                      Refunds to credit cards typically appear within 3-5 business days after we receive and process
                      your return.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Debit Card Refunds:</h4>
                    <p className="text-sm text-muted-foreground">
                      Refunds to debit cards typically appear within 7-10 business days after we receive and process
                      your return.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Store Credit/Gift Cards:</h4>
                    <p className="text-sm text-muted-foreground">
                      Refunds to store credit or gift cards are processed immediately after we receive and process your
                      return.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Check Refund Status</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="pt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Support Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Phone Support</h4>
                    <p className="text-sm mb-2">Speak directly with a technical support specialist.</p>
                    <p className="text-sm font-medium">1-800-TECH-HELP (1-800-832-4435)</p>
                    <p className="text-xs text-muted-foreground">Available 24/7</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Live Chat</h4>
                    <p className="text-sm mb-2">Chat online with a support representative.</p>
                    <Button size="sm">Start Chat</Button>
                    <p className="text-xs text-muted-foreground mt-2">Available 8AM-12AM EST</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Email Support</h4>
                    <p className="text-sm mb-2">Send us a detailed description of your issue.</p>
                    <p className="text-sm font-medium">techsupport@electrohub.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">In-Store Support</h4>
                    <p className="text-sm mb-2">Visit our Tech Desk at any ElectroHub store.</p>
                    <Button size="sm" variant="outline">
                      Find a Store
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Appointments recommended</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Technical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Device Won't Power On</h4>
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li>Check that the device is properly connected to power</li>
                      <li>Try a different power outlet</li>
                      <li>For battery-powered devices, ensure the battery is charged</li>
                      <li>Perform a hard reset (consult device manual for instructions)</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium">Wi-Fi Connectivity Issues</h4>
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li>Restart your router and the device</li>
                      <li>Ensure you're connecting to the correct network</li>
                      <li>Move closer to the router to improve signal strength</li>
                      <li>Check if other devices can connect to the same network</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium">Software/App Not Working</h4>
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li>Close and reopen the application</li>
                      <li>Check for software updates</li>
                      <li>Restart your device</li>
                      <li>Uninstall and reinstall the application</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Troubleshooting Guides</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule a Repair</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  If you need professional repair services for your device, you can schedule an appointment with our
                  certified technicians.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">In-Store Repair</h4>
                    <p className="text-sm mb-3">
                      Bring your device to any ElectroHub store with a Tech Repair Center. Most repairs can be completed
                      same-day.
                    </p>
                    <Button size="sm">Schedule In-Store Repair</Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mail-In Repair</h4>
                    <p className="text-sm mb-3">
                      Ship your device to our repair center. We'll fix it and return it to you, typically within 7-10
                      business days.
                    </p>
                    <Button size="sm">Start Mail-In Repair</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">Contact Customer Support</h3>
        <p className="mb-4">Can't find what you're looking for? Our customer support team is here to help.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="flex items-center justify-center gap-2">
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
          <Button variant="outline" className="flex items-center justify-center gap-2">
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
          <Button variant="outline" className="flex items-center justify-center gap-2">
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
  )
}

