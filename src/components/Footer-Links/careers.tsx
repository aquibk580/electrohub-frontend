import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Careers() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Careers at ElectroHub</h2>

      <p>
        Join our team and help shape the future of electronics retail. At ElectroHub, we're passionate about technology
        and creating exceptional customer experiences.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-primary/10 rounded-t-lg">
            <CardTitle>Why Work With Us</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Competitive compensation and benefits</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Employee discounts on products</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Career growth and development opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Flexible work arrangements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Inclusive and diverse workplace</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Paid volunteer time</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary/10 rounded-t-lg">
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Innovation:</strong> We embrace new ideas and technologies
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Customer Focus:</strong> We put customers at the center of everything we do
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Integrity:</strong> We act with honesty and transparency
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Teamwork:</strong> We collaborate to achieve common goals
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Diversity:</strong> We value different perspectives and backgrounds
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="retail">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="retail">Retail</TabsTrigger>
          <TabsTrigger value="corporate">Corporate</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="retail" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Retail Opportunities</h3>
            <p>
              Our retail team members are the face of ElectroHub, providing exceptional service and expert advice to our
              customers.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Associate</CardTitle>
                  <CardDescription>Multiple Locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Help customers find the perfect technology solutions for their needs while meeting sales goals.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Manager</CardTitle>
                  <CardDescription>Boston, Chicago, Seattle</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Lead a team of retail professionals and oversee all aspects of store operations.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Support Specialist</CardTitle>
                  <CardDescription>Multiple Locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Provide technical assistance and troubleshooting for customers' devices and systems.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Service Representative</CardTitle>
                  <CardDescription>Multiple Locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Handle returns, exchanges, and customer inquiries with professionalism and care.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="corporate" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Corporate Opportunities</h3>
            <p>
              Our corporate team supports our retail operations and drives strategic initiatives across the company.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Manager</CardTitle>
                  <CardDescription>San Francisco, CA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Develop and implement marketing strategies to drive brand awareness and sales growth.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Human Resources Specialist</CardTitle>
                  <CardDescription>New York, NY</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Support recruitment, employee relations, and HR programs across the organization.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Analyst</CardTitle>
                  <CardDescription>Chicago, IL</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analyze financial data and provide insights to support business decision-making.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Procurement Specialist</CardTitle>
                  <CardDescription>Austin, TX</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Manage vendor relationships and negotiate contracts for product procurement.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technology Opportunities</h3>
            <p>
              Our technology team builds and maintains the digital infrastructure that powers ElectroHub's operations.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Software Engineer</CardTitle>
                  <CardDescription>San Francisco, CA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Develop and maintain web applications and services for our e-commerce platform.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UX/UI Designer</CardTitle>
                  <CardDescription>Remote</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Create intuitive and engaging user experiences for our website and mobile app.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Scientist</CardTitle>
                  <CardDescription>Seattle, WA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analyze customer data to derive insights and improve personalization.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>IT Support Specialist</CardTitle>
                  <CardDescription>Multiple Locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Provide technical support for internal systems and employee devices.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Distribution Opportunities</h3>
            <p>
              Our distribution team ensures products are efficiently received, stored, and shipped to stores and
              customers.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Associate</CardTitle>
                  <CardDescription>Multiple Locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Pick, pack, and ship orders accurately and efficiently in our distribution centers.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logistics Coordinator</CardTitle>
                  <CardDescription>Dallas, TX</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coordinate transportation and delivery of products to stores and customers.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Control Specialist</CardTitle>
                  <CardDescription>Atlanta, GA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Monitor and maintain accurate inventory levels across our distribution network.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Center Manager</CardTitle>
                  <CardDescription>Phoenix, AZ</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Oversee all operations at a distribution center, including staffing and performance.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-8 text-center">
        <h3 className="text-lg font-medium mb-2">Ready to Join Our Team?</h3>
        <p className="mb-4">
          Browse our current openings and apply online today. We're looking forward to meeting you!
        </p>
        <Button size="lg">View All Job Openings</Button>
      </div>
    </div>
  )
}

