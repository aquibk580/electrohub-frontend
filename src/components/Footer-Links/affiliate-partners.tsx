import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, FileText, BarChart2, HelpCircle, Quote } from "lucide-react"

export default function AffiliatePartners() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Affiliate & Partners</h1>
        <p className="text-muted-foreground text-lg">
          Join the ElectroHub affiliate program or explore partnership opportunities to grow your business while
          connecting your audience with the latest in electronics and technology.
        </p>
      </div>

      <Tabs defaultValue="affiliate" className="w-full">
        <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 h-auto p-0 bg-transparent gap-2">
          <TabsTrigger
            value="affiliate"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Affiliate Program
          </TabsTrigger>
          <TabsTrigger
            value="partners"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Business Partners
          </TabsTrigger>
          <TabsTrigger
            value="vendors"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Become a Vendor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="affiliate" className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card className="overflow-hidden border-primary/20">
                <CardHeader className="bg-primary/5 border-b">
                  <CardTitle>ElectroHub Affiliate Program</CardTitle>
                  <CardDescription>Earn commissions by promoting our products</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground">
                    Our affiliate program offers competitive commissions, dedicated support, and marketing resources to
                    help you maximize your earnings.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Program Benefits:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Up to 10% commission on qualified sales</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>45-day cookie duration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Regular payment schedule</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Real-time reporting dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Exclusive promotions and deals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Dedicated affiliate manager</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Who Can Join:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Content creators and bloggers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Social media influencers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Deal and coupon websites</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Technology reviewers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Email marketers</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button className="w-full sm:w-auto">Apply to Affiliate Program</Button>
                </CardFooter>
              </Card>

              <div className="p-6 bg-muted rounded-lg border">
                <h3 className="font-semibold mb-4">Affiliate Resources</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Marketing Materials & Banners
                    </Button>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Product Data Feeds
                    </Button>
                  </li>
                  <li className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Affiliate Program FAQ
                    </Button>
                  </li>
                  <li className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Commission Structure
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Success Stories</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-5 border rounded-lg bg-background shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="font-bold">TT</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">TechTrends Blog</h4>
                          <p className="text-xs text-muted-foreground">Technology Review Site</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Quote className="h-5 w-5 mr-2 text-primary/60 flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">
                          The ElectroHub affiliate program has been a game-changer for our site. Their high-converting
                          product links and competitive commission rates have significantly increased our revenue.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 border rounded-lg bg-background shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="font-bold">GG</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Gadget Guru</h4>
                          <p className="text-xs text-muted-foreground">YouTube Channel</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Quote className="h-5 w-5 mr-2 text-primary/60 flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">
                          As a content creator, I appreciate how easy ElectroHub makes it to generate custom links and
                          track performance. Their exclusive deals for my audience have helped grow my channel.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Affiliate FAQ</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">How do I get paid?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Payments are made monthly via PayPal, direct deposit, or check for all earnings over $50.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">When do commissions get approved?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Commissions are approved after the return period (30 days) has passed for the purchased
                        products.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Can I promote specific products?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Yes, you can create custom links for any product on our website or use category-specific links.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card className="overflow-hidden border-primary/20">
                <CardHeader className="bg-primary/5 border-b">
                  <CardTitle>Business Partnership Opportunities</CardTitle>
                  <CardDescription>Strategic alliances to grow together</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground">
                    ElectroHub partners with businesses across various industries to create mutually beneficial
                    relationships that drive growth and innovation.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Partnership Types:</h3>
                    <div className="grid gap-3">
                      <div className="p-4 border rounded-lg bg-background shadow-sm">
                        <h4 className="font-semibold">Retail Partnerships</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Store-within-a-store concepts and retail distribution opportunities.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-background shadow-sm">
                        <h4 className="font-semibold">Technology Integration</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          API and software integration partnerships for seamless customer experiences.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-background shadow-sm">
                        <h4 className="font-semibold">Corporate Programs</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Employee purchase programs and B2B procurement solutions.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-background shadow-sm">
                        <h4 className="font-semibold">Educational Partnerships</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Special programs for schools, universities, and educational institutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button className="w-full sm:w-auto">Explore Partnership Opportunities</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Current Partners</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg flex items-center justify-center bg-background shadow-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">T</span>
                        </div>
                        <p className="text-sm font-medium">TechCorp</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center bg-background shadow-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">I</span>
                        </div>
                        <p className="text-sm font-medium">InnovateCo</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center bg-background shadow-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">D</span>
                        </div>
                        <p className="text-sm font-medium">DigitalEdu</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center bg-background shadow-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium">SmartSys</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Contact Our Partnership Team</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Company Name
                        </label>
                        <Input id="name" placeholder="Your company name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Business Email
                        </label>
                        <Input id="email" type="email" placeholder="you@company.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="partnership" className="text-sm font-medium">
                        Partnership Type
                      </label>
                      <select
                        aria-label="Select partnership type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option>Select partnership type</option>
                        <option>Retail Partnership</option>
                        <option>Technology Integration</option>
                        <option>Corporate Program</option>
                        <option>Educational Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Partnership Details
                      </label>
                      <Textarea id="message" placeholder="Tell us about your partnership idea" rows={4} />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      Submit Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card className="overflow-hidden border-primary/20">
                <CardHeader className="bg-primary/5 border-b">
                  <CardTitle>Become a Vendor</CardTitle>
                  <CardDescription>Sell your products through ElectroHub</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground">
                    Join our network of trusted vendors and gain access to millions of customers through our retail
                    stores and online marketplace.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Vendor Benefits:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Access to millions of customers across the country</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Dedicated vendor portal for inventory and order management</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Marketing support and product promotion</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Streamlined logistics and fulfillment options</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Transparent reporting and timely payments</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">What We Look For:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Innovative electronic products and accessories</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Consistent product quality and reliability</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Competitive pricing and good margins</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Strong warranty and customer support</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>Sustainable packaging and business practices</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button className="w-full sm:w-auto">Apply to Become a Vendor</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Vendor Application Process</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Submit Application</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete our vendor application form with details about your company and products.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Product Review</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Our merchandising team will evaluate your products for quality, market fit, and pricing.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Vendor Onboarding</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          If approved, you'll complete our onboarding process and vendor agreement.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Integration & Launch</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Set up your products in our system and prepare for launch in our stores or online.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle>Vendor Resources</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-3">
                    <div className="p-4 border rounded-lg flex items-center bg-background shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Vendor Guidelines</h4>
                        <p className="text-xs text-muted-foreground">
                          Download our comprehensive vendor guidelines and requirements.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center bg-background shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <BarChart2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Vendor Portal Demo</h4>
                        <p className="text-xs text-muted-foreground">
                          See how our vendor portal works with this interactive demo.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center bg-background shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Vendor FAQ</h4>
                        <p className="text-xs text-muted-foreground">
                          Find answers to common questions about our vendor program.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mt-8 border border-primary/10">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold mb-2">Have Questions?</h3>
            <p className="text-muted-foreground">
              Our partnership team is ready to help you explore opportunities with ElectroHub.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto">Contact Us</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

