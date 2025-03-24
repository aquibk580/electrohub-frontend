import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Info } from "lucide-react"

export default function WarrantyInformation() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ElectroHub Warranty Information</h1>
        <p className="text-muted-foreground text-lg">
          Our warranty policies are designed to provide you with peace of mind and ensure your satisfaction with your
          purchase.
        </p>
      </div>

      <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
        <p className="text-muted-foreground">
          At ElectroHub, we stand behind the quality of our products. Our warranty policies are designed to provide you
          with peace of mind and ensure your satisfaction with your purchase.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Standard Warranty Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-muted-foreground">
                Most products sold by ElectroHub come with a manufacturer's warranty that covers defects in materials
                and workmanship. The duration of coverage varies by product category:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Televisions and Home Theater:</span> 1-2 years
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Computers and Tablets:</span> 1 year
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Smartphones:</span> 1 year
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Major Appliances:</span> 1 year parts and labor
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Small Appliances:</span> 1 year
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    <span className="font-medium">Audio Equipment:</span> 1 year
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                How to File a Warranty Claim
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-muted-foreground">
                If you experience an issue with a product purchased from ElectroHub:
              </p>

              <ol className="space-y-4">
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p>Locate your purchase receipt or order confirmation</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p>Contact our customer service team at 1-800-ELECTRO or visit your nearest ElectroHub store</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p>Provide the product details, purchase date, and description of the issue</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p>
                      Our team will guide you through the next steps, which may include repair, replacement, or return
                      options
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Extended Warranty Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-muted-foreground">
                For additional protection beyond the manufacturer's warranty, ElectroHub offers extended warranty plans
                that provide:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Coverage for up to 5 years from the date of purchase</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Protection against mechanical and electrical failures</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Power surge protection</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>No deductibles or hidden fees</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Convenient in-home service for large items</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Transferable coverage if you sell the product</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Return Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Most products can be returned within 30 days of purchase with original packaging and receipt. Special
                restrictions may apply to certain categories. See our full return policy for details.
              </p>

              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1" className="border-b">
                  <AccordionTrigger className="text-base font-medium">Return Exceptions</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Opened software, digital downloads, and gaming products (non-returnable)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>TVs over 65" (15-day return period)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Cell phones and cellular devices (14-day return period)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Opened movies, music, and video games (exchange only for same title)</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b">
                  <AccordionTrigger className="text-base font-medium">Refund Processing Times</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>
                          <span className="font-medium">Credit Cards:</span> 3-5 business days
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>
                          <span className="font-medium">Debit Cards:</span> 7-10 business days
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>
                          <span className="font-medium">Store Credit/Gift Cards:</span> Immediate
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-medium">Restocking Fees</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Some items may be subject to a restocking fee if returned:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Drones and aerial cameras: 15% restocking fee</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>DSLR cameras and lenses: 10% restocking fee</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Projectors: 10% restocking fee</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

