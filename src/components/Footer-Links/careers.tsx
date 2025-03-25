import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, MapPin } from "lucide-react"

export default function Careers() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Careers at ElectroHub</h1>
        <p className="text-muted-foreground text-lg">
          Join our team and help shape the future of electronics retail. At ElectroHub, we're passionate about technology
          and creating exceptional customer experiences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-primary/20">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle>Why Work With Us</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Competitive compensation and benefits</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Employee discounts on products</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Career growth and development opportunities</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Flexible work arrangements</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Inclusive and diverse workplace</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>Paid volunteer time</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-primary/20">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold">Innovation:</span> We embrace new ideas and technologies
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold">Customer Focus:</span> We put customers at the center of everything we do
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold">Integrity:</span> We act with honesty and transparency
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold">Teamwork:</span> We collaborate to achieve common goals
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold">Diversity:</span> We value different perspectives and backgrounds
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="retail" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent gap-2">
          <TabsTrigger value="retail" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
            Retail
          </TabsTrigger>
          <TabsTrigger value="corporate" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
            Corporate
          </TabsTrigger>
          <TabsTrigger value="tech" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
            Technology
          </TabsTrigger>
          <TabsTrigger value="distribution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
            Distribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="retail" className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Retail Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Our retail team members are the face of ElectroHub, providing exceptional service and expert advice to our
                customers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Sales Associate</span>
                    <Badge variant="outline" className="ml-2">Multiple Locations</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Various Cities</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Help customers find the perfect technology solutions for their needs while meeting sales goals.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Store Manager</span>
                    <Badge variant="outline" className="ml-2">3 Locations</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Boston, Chicago, Seattle</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Lead a team of retail professionals and oversee all aspects of store operations.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Technical Support Specialist</span>
                    <Badge variant="outline" className="ml-2">Multiple Locations</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Various Cities</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Provide technical assistance and troubleshooting for customers' devices and systems.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Customer Service Representative</span>
                    <Badge variant="outline" className="ml-2">Multiple Locations</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Various Cities</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Handle returns, exchanges, and customer inquiries with professionalism and care.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="corporate" className="pt-6">
          <Card className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Corporate Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Our corporate team supports our retail operations and drives strategic initiatives across the company.
              </p>
            </div>

            <Card className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Marketing Manager</span>
                    <Badge variant="outline" className="ml-2">San Francisco</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Develop and implement marketing strategies to drive brand awareness and sales growth.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Human Resources Specialist</span>
                    <Badge variant="outline" className="ml-2">New York</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>New York, NY</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Support recruitment, employee relations, and HR programs across the organization.</p>
                </CardContent>
                <CardContent />
              </Card>
              <CardFooter className="bg-muted/50 border-t">
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Financial Analyst</span>
                  <Badge variant="outline" className="ml-2">Chicago</Badge>
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>Chicago, IL</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analyze financial data and provide insights to support business decision-making.</p>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t">
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Procurement Specialist</span>
                  <Badge variant="outline" className="ml-2">Austin</Badge>
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>Austin, TX</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage vendor relationships and negotiate contracts for product procurement.</p>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t">
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          </Card>
        </TabsContent >

        <TabsContent
          value="tech"
          className=
          "pt-6" >
          (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Technology Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Our technology team builds and maintains the digital infrastructure that powers ElectroHub's operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Software Engineer</span>
                    <Badge variant="outline" className="ml-2">
                      San Francisco
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Develop and maintain web applications and services for our e-commerce platform.
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>UX/UI Designer</span>
                    <Badge variant="outline" className="ml-2">
                      Remote
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Remote</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create intuitive and engaging user experiences for our website and mobile app.
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Data Scientist</span>
                    <Badge variant="outline" className="ml-2">
                      Seattle
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Seattle, WA</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Analyze customer data to derive insights and improve personalization.
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>IT Support Specialist</span>
                    <Badge variant="outline" className="ml-2">
                      Multiple Locations
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Various Cities</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provide technical support for internal systems and employee devices.
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          )
        </TabsContent>

        <TabsContent value="distribution" className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Distribution Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Our distribution team ensures products are efficiently received, stored, and shipped to stores and
                customers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Warehouse Associate</span>
                    <Badge variant="outline" className="ml-2">Multiple Locations</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Various Cities</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Pick, pack, and ship orders accurately and efficiently in our distribution centers.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Logistics Coordinator</span>
                    <Badge variant="outline" className="ml-2">Dallas</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Dallas, TX</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Coordinate transportation and delivery of products to stores and customers.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Inventory Control Specialist</span>
                    <Badge variant="outline" className="ml-2">Atlanta</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Atlanta, GA</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Monitor and maintain accurate inventory levels across our distribution network.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Distribution Center Manager</span>
                    <Badge variant="outline" className="ml-2">Phoenix</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>Phoenix, AZ</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Oversee all operations at a distribution center, including staffing and performance.</p>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs >

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mt-8 text-center border border-primary/10">
        <h3 className="text-2xl font-semibold mb-3">Ready to Join Our Team?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Browse our current openings and apply online today. We're looking forward to meeting you!
        </p>
        <Button size="lg" className="px-8">View All Job Openings</Button>
      </div>
    </div >
  )
}

