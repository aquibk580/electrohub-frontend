import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancingOptions() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Financing Options</h2>

      <p>
        ElectroHub offers several flexible financing options to help you get the electronics you need today while paying
        over time.
      </p>

      <Tabs defaultValue="credit-card">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="credit-card">ElectroHub Card</TabsTrigger>
          <TabsTrigger value="installment">Installment Plans</TabsTrigger>
          <TabsTrigger value="lease">Lease-to-Own</TabsTrigger>
        </TabsList>

        <TabsContent value="credit-card" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>ElectroHub Credit Card</CardTitle>
              <CardDescription>Exclusive financing offers for cardholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>The ElectroHub Credit Card offers exclusive benefits and flexible payment options:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No annual fee</li>
                <li>Special financing for 6, 12, or 18 months on qualifying purchases</li>
                <li>5% back in rewards on all ElectroHub purchases</li>
                <li>Early access to sales and promotions</li>
                <li>Online account management</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                *Subject to credit approval. Minimum monthly payments required. See terms for details.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="installment" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Installment Plans</CardTitle>
              <CardDescription>Pay over time with fixed monthly payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our installment plans allow you to split your purchase into equal monthly payments:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Available for purchases of $299 and up</li>
                <li>Choose from 3, 6, 12, or 24-month plans</li>
                <li>Fixed monthly payments</li>
                <li>Competitive interest rates based on credit score</li>
                <li>No prepayment penalties</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                *Subject to credit approval. Interest rates vary based on creditworthiness.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Check Eligibility</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="lease" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lease-to-Own Program</CardTitle>
              <CardDescription>Flexible option with no credit needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our lease-to-own program offers an alternative for those who don't want to use credit:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No credit check required</li>
                <li>Take your products home today</li>
                <li>Make small payments over time</li>
                <li>Option to buy at any time</li>
                <li>Early purchase options to save money</li>
                <li>Return the product at any time if needed</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                *Lease agreement required. Available in select locations. Additional fees may apply.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-4 rounded-lg mt-8">
        <h3 className="font-medium mb-2">How to Apply</h3>
        <p>You can apply for financing in the following ways:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Online during checkout</li>
          <li>In-store at any ElectroHub location</li>
          <li>Through the ElectroHub mobile app</li>
          <li>By phone at 1-800-FINANCE</li>
        </ul>
      </div>
    </div>
  )
}

