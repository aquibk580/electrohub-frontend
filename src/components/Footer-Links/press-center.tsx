import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import Image from "next/image"

export default function PressCenter() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Press Center</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <p className="mb-4">
            Welcome to the ElectroHub Press Center. Here you'll find the latest news, press releases, media resources,
            and company information for journalists and media professionals.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Latest Press Releases</h3>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Company News</Badge>
                  <span className="text-sm text-muted-foreground">March 18, 2025</span>
                </div>
                <CardTitle>ElectroHub Announces Expansion to 10 New Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  ElectroHub, the nation's leading electronics retailer, today announced plans to open 10 new retail
                  locations across the United States in the coming months, creating over 500 new jobs and bringing its
                  innovative shopping experience to more communities.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Release</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Corporate Responsibility</Badge>
                  <span className="text-sm text-muted-foreground">March 12, 2025</span>
                </div>
                <CardTitle>ElectroHub Foundation Launches $5 Million Tech Education Initiative</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The ElectroHub Foundation today announced a new $5 million initiative aimed at providing technology
                  education and resources to underserved communities across the country, helping to bridge the digital
                  divide and prepare students for careers in tech.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Release</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Sustainability</Badge>
                  <span className="text-sm text-muted-foreground">March 5, 2025</span>
                </div>
                <CardTitle>ElectroHub Commits to Carbon Neutrality by 2030</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  As part of its ongoing commitment to environmental responsibility, ElectroHub has announced ambitious
                  plans to achieve carbon neutrality across all operations within the next five years, including retail
                  stores, distribution centers, and corporate offices.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Release</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Press Inquiries</h4>
                <p className="text-sm">press@electrohub.com</p>
                <p className="text-sm">1-800-PRESS-EH (1-800-773-7734)</p>
              </div>
              <div>
                <h4 className="font-medium">Corporate Communications</h4>
                <p className="text-sm">Sarah Johnson, Director of Communications</p>
                <p className="text-sm">sjohnson@electrohub.com</p>
              </div>
              <div>
                <h4 className="font-medium">Investor Relations</h4>
                <p className="text-sm">investors@electrohub.com</p>
                <p className="text-sm">1-800-INV-RELS (1-800-468-7357)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Company Logos & Brand Assets
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Executive Headshots & Bios
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Product Images
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Store Images
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    B-Roll Footage
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Fact Sheet & Company History
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Press Kit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Download our comprehensive press kit containing company information, executive bios, high-resolution
                images, and fact sheets.
              </p>
              <Button>Download Press Kit</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">ElectroHub in the News</h3>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <div className="relative h-40">
              {/* <Image src="/placeholder.svg" alt="News article image" fill className="object-cover rounded-t-lg" /> */}
              <img src="/placeholder.svg" alt="News article image" className="object-cover rounded-t-lg" />
            </div>
            <CardHeader>
              <CardDescription>TechDaily • March 15, 2025</CardDescription>
              <CardTitle className="text-base">
                ElectroHub's Innovative Store Design Wins Retail Excellence Award
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The company's new flagship store concept has been recognized for its interactive displays and
                sustainable design elements.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="relative h-40">
              {/* <Image src="/placeholder.svg" alt="News article image" fill className="object-cover rounded-t-lg" /> */}
<img src="/placeholder.svg" alt="News article image" className="object-cover rounded-t-lg" />
            </div>
            <CardHeader>
              <CardDescription>Business Insider • March 10, 2025</CardDescription>
              <CardTitle className="text-base">ElectroHub CEO Discusses Future of Retail Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                In an exclusive interview, CEO Michael Chen shares insights on how AI and AR are transforming the
                shopping experience.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="relative h-40">
              {/* <Image src="/placeholder.svg" alt="News article image" fill className="object-cover rounded-t-lg" /> */}
<img src="/placeholder.svg" alt="News article image" className="object-cover rounded-t-lg" />
            </div>
            <CardHeader>
              <CardDescription>Forbes • March 5, 2025</CardDescription>
              <CardTitle className="text-base">ElectroHub Named to "Most Sustainable Companies" List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The retailer's commitment to reducing e-waste and carbon emissions earns recognition in Forbes' annual
                sustainability ranking.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">Press Event Calendar</h3>
        <p className="mb-4">Stay informed about upcoming press conferences, product launches, and media events.</p>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-background rounded-md">
            <div>
              <h4 className="font-medium">Q2 Earnings Call</h4>
              <p className="text-sm text-muted-foreground">April 15, 2025 • 2:00 PM EST</p>
            </div>
            <Button size="sm">Register</Button>
          </div>
          <div className="flex justify-between items-center p-3 bg-background rounded-md">
            <div>
              <h4 className="font-medium">Summer Product Showcase</h4>
              <p className="text-sm text-muted-foreground">May 20, 2025 • 10:00 AM EST</p>
            </div>
            <Button size="sm">Register</Button>
          </div>
          <div className="flex justify-between items-center p-3 bg-background rounded-md">
            <div>
              <h4 className="font-medium">Annual Tech Innovation Summit</h4>
              <p className="text-sm text-muted-foreground">June 12, 2025 • 9:00 AM - 5:00 PM EST</p>
            </div>
            <Button size="sm">Register</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

