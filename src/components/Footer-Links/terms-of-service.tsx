import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarIcon } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="mr-1 h-4 w-4" />
          <span>Last Updated: March 21, 2025</span>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
        <p className="text-muted-foreground">
          Welcome to ElectroHub. By accessing or using our website, mobile application, or making purchases in our
          stores, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before
          using our services.
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">1. Acceptance of Terms</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              By accessing or using ElectroHub's services, you agree to be bound by these Terms and our Privacy Policy.
              If you do not agree to these Terms, please do not use our services.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">2. Account Registration</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              To access certain features of our services, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account information and for all activities that occur under your
              account. You agree to provide accurate and complete information when creating an account and to update
              your information as necessary.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">3. Purchases and Payments</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              When making a purchase through ElectroHub, you agree to provide accurate and complete payment information.
              All prices are listed in the applicable currency and do not include taxes, shipping, or handling fees
              unless otherwise stated. We reserve the right to change prices at any time without notice.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">4. Shipping and Delivery</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              ElectroHub will make reasonable efforts to deliver products within the estimated delivery timeframe.
              However, we are not responsible for delays beyond our control. Risk of loss and title for items purchased
              pass to you upon delivery of the items to the carrier.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">5. Returns and Refunds</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              Our return and refund policy is outlined in our Warranty Information section. By making a purchase, you
              agree to the terms of this policy.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">6. Intellectual Property</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              All content on our website and mobile application, including text, graphics, logos, images, and software,
              is the property of ElectroHub or its content suppliers and is protected by copyright, trademark, and other
              intellectual property laws.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">7. User Conduct</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>You agree not to use our services to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Distribute malicious software or engage in fraudulent activities</li>
              <li>Interfere with the proper functioning of our services</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">8. Limitation of Liability</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              To the maximum extent permitted by law, ElectroHub shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or relating to your use of our services.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">9. Governing Law</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the state of California,
              without regard to its conflict of law provisions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">10. Changes to Terms</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of our services after any
              changes indicates your acceptance of the modified Terms.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger className="text-lg font-medium py-4">11. Contact Information</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="mt-3 p-4 bg-muted/50 rounded-lg border">
              <p>
                ElectroHub Legal Department
                <br />
                123 Tech Street
                <br />
                San Francisco, CA 94105
                <br />
                legal@electrohub.com
                <br />
                1-800-ELECTRO
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-8">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Our Privacy Policy describes how we collect, use, and share your personal information. By using our
            services, you also agree to our Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <div className="mt-4 flex justify-end">
            <a href="#" className="text-primary hover:underline font-medium">
              View Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

