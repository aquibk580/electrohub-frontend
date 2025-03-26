import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react"

export default function Faqs() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl">
          Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact
          our customer support team.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full mt-8">
        <div className="mb-6 overflow-x-auto">
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-background">
              All FAQs
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-md data-[state=active]:bg-background">
              Orders
            </TabsTrigger>
            <TabsTrigger value="returns" className="rounded-md data-[state=active]:bg-background">
              Returns
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-md data-[state=active]:bg-background">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="technical" className="rounded-md data-[state=active]:bg-background">
              Technical
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="pt-2">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-primary/10 text-primary border-primary/20">
                  Popular
                </Badge>
                General Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                    <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-primary/10 text-primary border-primary/20">
                  Important
                </Badge>
                Orders & Returns
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {ordersFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                    <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="pt-2">
          <Accordion type="single" collapsible className="w-full">
            {ordersFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="returns" className="pt-2">
          <Accordion type="single" collapsible className="w-full">
            {returnsFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="shipping" className="pt-2">
          <Accordion type="single" collapsible className="w-full">
            {shippingFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="technical" className="pt-2">
          <Accordion type="single" collapsible className="w-full">
            {technicalFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                <AccordionTrigger className="text-left hover:no-underline py-4 hover:bg-muted/10 px-4 rounded-md">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/20 p-6 rounded-lg mt-8 border-muted/30">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Still have questions?</h3>
          <p className="text-muted-foreground">Our customer support team is available to help you:</p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-muted/30">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-sm text-muted-foreground">1-800-ELECTRO</p>
                <p className="text-xs text-muted-foreground mt-1">(1-800-353-2876)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-muted/30">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">support@electrohub.com</p>
                <p className="text-xs text-muted-foreground mt-1">Response within 24h</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-muted/30">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Live Chat</h4>
                <p className="text-sm text-muted-foreground">Available on our website</p>
                <p className="text-xs text-muted-foreground mt-1">24/7 Support</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-muted/30">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">In-Store</h4>
                <p className="text-sm text-muted-foreground">Visit any ElectroHub location</p>
                <p className="text-xs text-muted-foreground mt-1">Find a store near you</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button className="px-8">Contact Us Now</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Data for the component
const generalFaqs = [
  {
    question: "What are your store hours?",
    answer:
      "Most ElectroHub stores are open Monday through Saturday from 10:00 AM to 9:00 PM, and Sunday from 11:00 AM to 6:00 PM. Hours may vary by location, especially during holidays. Please check our Store Locator for specific hours at your nearest location.",
  },
  {
    question: "Do you price match?",
    answer:
      "Yes, ElectroHub offers price matching against local retail competitors and select online retailers. The item must be identical (same model number and color), in stock at the competitor, and we must be able to verify the price. Price matching requests must be made at the time of purchase or within our return period if you've already purchased the item.",
  },
  {
    question: "How do I redeem a gift card?",
    answer:
      "You can redeem an ElectroHub gift card in-store at checkout or online by entering the gift card number and PIN during the payment step of checkout. Gift cards never expire and can be used for any purchase. If your purchase amount exceeds the gift card balance, you'll need to pay the difference with another payment method.",
  },
  {
    question: "What is ElectroHub's price adjustment policy?",
    answer:
      "If an item you purchased goes on sale within 14 days of your purchase, we'll refund the difference between what you paid and the sale price. You'll need to bring your original receipt to any ElectroHub store or contact customer service with your order number if you purchased online. Some exclusions apply, including clearance items and limited-time offers.",
  },
]

const ordersFaqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your ElectroHub account and visiting the 'Order History' section. Alternatively, you can use the tracking number provided in your shipping confirmation email. If you checked out as a guest, you can track your order using the order number and email address on our Order Tracking page.",
  },
  {
    question: "How do I cancel or modify an order?",
    answer:
      "If you need to cancel or modify an order, please contact our customer service team as soon as possible at 1-800-ELECTRO. We process orders quickly, so there's a limited window to make changes. Once an order has shipped, it cannot be canceled, but you can return it according to our return policy once received.",
  },
  {
    question: "Can I change my shipping address after placing an order?",
    answer:
      "Address changes can only be made if the order hasn't been processed for shipping yet. Please contact our customer service team immediately at 1-800-ELECTRO if you need to change your shipping address. If your order has already shipped, we may be able to redirect it in some cases, though additional fees may apply.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Delivery times depend on the shipping method you selected at checkout, your location, and product availability. Standard shipping typically takes 3-5 business days, Express shipping takes 2 business days, and Next-Day shipping delivers by the end of the next business day. You can check the estimated delivery date in your order confirmation email or in your account's Order History.",
  },
]

const returnsFaqs = [
  {
    question: "What is your return policy?",
    answer:
      "Most items can be returned within 30 days of purchase with the original receipt and packaging. Some products, such as opened software, digital downloads, and certain personal care items, may have different return policies. Restocking fees may apply to certain items. Please see our full Return Policy for details.",
  },
  {
    question: "How do I return an item purchased online?",
    answer:
      "To return an item purchased online, log into your ElectroHub account, go to 'Order History,' select the order containing the item you wish to return, and click 'Return Item.' Follow the instructions to generate a prepaid return shipping label. Package the item securely with all original materials, attach the shipping label, and drop it off at any authorized shipping location.",
  },
  {
    question: "Can I return an item without a receipt?",
    answer:
      "Returns without a receipt may be accepted for store credit at the current selling price of the item. A valid government-issued photo ID is required for all returns without a receipt. There are limits to the number and value of no-receipt returns we can process per customer. For online purchases, we can look up your order using the email address and order number.",
  },
  {
    question: "How long does it take to process a refund?",
    answer:
      "Refund processing times vary depending on your payment method. In-store returns are typically processed immediately. Credit card refunds usually appear within 3-5 business days after we receive and process your return. Debit card refunds may take 7-10 business days. Store credit or gift card refunds are processed immediately after we receive and process your return.",
  },
]

const shippingFaqs = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, ElectroHub ships to addresses within the United States, including Alaska, Hawaii, and Puerto Rico. We also ship to Canada and Mexico. We do not offer shipping to other international destinations at this time, but we're working to expand our shipping options in the future.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Standard shipping is free on orders over $35. For orders under $35, standard shipping costs $5.99. Express shipping is available for $9.99, and Next-Day shipping for $19.99. Store pickup is always free. Additional charges may apply for oversized items or shipments to Alaska, Hawaii, or Puerto Rico.",
  },
  {
    question: "Can I ship to multiple addresses in one order?",
    answer:
      "Unfortunately, we cannot split a single order to ship to multiple addresses. If you need to send items to different addresses, please place separate orders for each shipping destination.",
  },
  {
    question: "Do you ship to P.O. boxes?",
    answer:
      "Yes, we can ship to P.O. boxes using standard shipping. However, express and next-day shipping options are not available for P.O. box addresses. Additionally, large or heavy items may not be eligible for shipping to P.O. boxes.",
  },
]

const technicalFaqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Sign In' button at the top of our website, then select 'Forgot Password.' Enter the email address associated with your account, and we'll send you a link to reset your password. The link is valid for 24 hours. If you don't receive the email, please check your spam folder or contact customer support.",
  },
  {
    question: "How do I update my payment information?",
    answer:
      "To update your payment information, log into your ElectroHub account, go to 'Account Settings,' and select 'Payment Methods.' From there, you can edit existing payment methods or add new ones. For security reasons, you'll need to re-enter your full card information when updating an existing payment method.",
  },
  {
    question: "Why won't my coupon code work?",
    answer:
      "Coupon codes may not work for several reasons: the code may have expired, you may have entered it incorrectly, the items in your cart may not be eligible for the promotion, or the minimum purchase requirement may not have been met. Some coupons cannot be combined with other offers or discounts. Please check the terms and conditions of the coupon for specific details.",
  },
  {
    question: "How do I install software I purchased?",
    answer:
      "For digital software purchases, you'll receive an email with download instructions and an activation code. Follow the instructions in the email to download and install the software. For physical software purchases, insert the installation disc into your computer and follow the on-screen instructions. If you encounter any issues, please refer to the software manufacturer's website or contact our technical support team.",
  },
]

