import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AffiliatePartners() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Affiliate & Partners</h2>

      <p>
        Join the ElectroHub affiliate program or explore partnership opportunities to grow your business while
        connecting your audience with the latest in electronics and technology.
      </p>

      <Tabs defaultValue="affiliate">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="affiliate">Affiliate Program</TabsTrigger>
          <TabsTrigger value="partners">Business Partners</TabsTrigger>
          <TabsTrigger value="vendors">Become a Vendor</TabsTrigger>
        </TabsList>

        <TabsContent value="affiliate" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub Affiliate Program</CardTitle>
                  <CardDescription>Earn commissions by promoting our products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our affiliate program offers competitive commissions, dedicated support, and marketing resources to
                    help you maximize your earnings.
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-medium">Program Benefits:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Up to 10% commission on qualified sales</li>
                      <li>45-day cookie duration</li>
                      <li>Regular payment schedule</li>
                      <li>Real-time reporting dashboard</li>
                      <li>Exclusive promotions and deals</li>
                      <li>Dedicated affiliate manager</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Who Can Join:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Content creators and bloggers</li>
                      <li>Social media influencers</li>
                      <li>Deal and coupon websites</li>
                      <li>Technology reviewers</li>
                      <li>Email marketers</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Apply to Affiliate Program</Button>
                </CardFooter>
              </Card>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Affiliate Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Marketing Materials & Banners
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Product Data Feeds
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Affiliate Program FAQ
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Commission Structure
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="font-bold">TT</span>
                        </div>
                        <div>
                          <h4 className="font-medium">TechTrends Blog</h4>
                          <p className="text-xs text-muted-foreground">Technology Review Site</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        "The ElectroHub affiliate program has been a game-changer for our site. Their high-converting
                        product links and competitive commission rates have significantly increased our revenue."
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="font-bold">GG</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Gadget Guru</h4>
                          <p className="text-xs text-muted-foreground">YouTube Channel</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        "As a content creator, I appreciate how easy ElectroHub makes it to generate custom links and
                        track performance. Their exclusive deals for my audience have helped grow my channel."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Affiliate FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">How do I get paid?</h4>
                      <p className="text-sm text-muted-foreground">
                        Payments are made monthly via PayPal, direct deposit, or check for all earnings over $50.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">When do commissions get approved?</h4>
                      <p className="text-sm text-muted-foreground">
                        Commissions are approved after the return period (30 days) has passed for the purchased
                        products.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I promote specific products?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, you can create custom links for any product on our website or use category-specific links.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Business Partnership Opportunities</CardTitle>
                  <CardDescription>Strategic alliances to grow together</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    ElectroHub partners with businesses across various industries to create mutually beneficial
                    relationships that drive growth and innovation.
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-medium">Partnership Types:</h3>
                    <div className="grid gap-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Retail Partnerships</h4>
                        <p className="text-sm text-muted-foreground">
                          Store-within-a-store concepts and retail distribution opportunities.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Technology Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          API and software integration partnerships for seamless customer experiences.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Corporate Programs</h4>
                        <p className="text-sm text-muted-foreground">
                          Employee purchase programs and B2B procurement solutions.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Educational Partnerships</h4>
                        <p className="text-sm text-muted-foreground">
                          Special programs for schools, universities, and educational institutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Explore Partnership Opportunities</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">T</span>
                        </div>
                        <p className="text-sm font-medium">TechCorp</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">I</span>
                        </div>
                        <p className="text-sm font-medium">InnovateCo</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">D</span>
                        </div>
                        <p className="text-sm font-medium">DigitalEdu</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-md flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium">SmartSys</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Our Partnership Team</CardTitle>
                </CardHeader>
                <CardContent>
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
                      <select aria-label="Select partnership type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                    <Button type="submit">Submit Inquiry</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Become a Vendor</CardTitle>
                  <CardDescription>Sell your products through ElectroHub</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Join our network of trusted vendors and gain access to millions of customers through our retail
                    stores and online marketplace.
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-medium">Vendor Benefits:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Access to millions of customers across the country</li>
                      <li>Dedicated vendor portal for inventory and order management</li>
                      <li>Marketing support and product promotion</li>
                      <li>Streamlined logistics and fulfillment options</li>
                      <li>Transparent reporting and timely payments</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">What We Look For:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Innovative electronic products and accessories</li>
                      <li>Consistent product quality and reliability</li>
                      <li>Competitive pricing and good margins</li>
                      <li>Strong warranty and customer support</li>
                      <li>Sustainable packaging and business practices</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Apply to Become a Vendor</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Submit Application</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete our vendor application form with details about your company and products.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Product Review</h4>
                        <p className="text-sm text-muted-foreground">
                          Our merchandising team will evaluate your products for quality, market fit, and pricing.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Vendor Onboarding</h4>
                        <p className="text-sm text-muted-foreground">
                          If approved, you'll complete our onboarding process and vendor agreement.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Integration & Launch</h4>
                        <p className="text-sm text-muted-foreground">
                          Set up your products in our system and prepare for launch in our stores or online.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="p-3 border rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-file-text"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" x2="8" y1="13" y2="13" />
                          <line x1="16" x2="8" y1="17" y2="17" />
                          <line x1="10" x2="8" y1="9" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Vendor Guidelines</h4>
                        <p className="text-xs text-muted-foreground">
                          Download our comprehensive vendor guidelines and requirements.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-bar-chart-2"
                        >
                          <line x1="18" x2="18" y1="20" y2="10" />
                          <line x1="12" x2="12" y1="20" y2="4" />
                          <line x1="6" x2="6" y1="20" y2="14" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Vendor Portal Demo</h4>
                        <p className="text-xs text-muted-foreground">
                          See how our vendor portal works with this interactive demo.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-help-circle"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Vendor FAQ</h4>
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

      <div className="bg-muted p-6 rounded-lg mt-8">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium mb-2">Have Questions?</h3>
            <p>Our partnership team is ready to help you explore opportunities with ElectroHub.</p>
          </div>
          <div className="flex gap-4">
            <Button>Contact Us</Button>
            <Button variant="outline">Schedule a Call</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

