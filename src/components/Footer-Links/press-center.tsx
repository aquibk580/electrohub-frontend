import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ExternalLink } from "lucide-react"
import Image from "../Common/Image"

export default function PressCenter() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Press Center</h1>
        <p className="text-muted-foreground text-lg">
          The latest news, press releases, and media resources for journalists and media professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h2 className="text-2xl font-semibold mb-4">Latest Press Releases</h2>
            <div className="space-y-6">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="font-medium">
                      Company News
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>March 18, 2025</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">ElectroHub Announces Expansion to 10 New Cities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ElectroHub, the nation's leading electronics retailer, today announced plans to open 10 new retail
                    locations across the United States in the coming months, creating over 500 new jobs and bringing its
                    innovative shopping experience to more communities.
                  </p>
                </CardContent>
                <CardFooter className="pt-3 border-t bg-muted/50">
                  <Button variant="outline" size="sm" className="gap-1">
                    Read Full Release
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="font-medium">
                      Corporate Responsibility
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>March 12, 2025</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    ElectroHub Foundation Launches $5 Million Tech Education Initiative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The ElectroHub Foundation today announced a new $5 million initiative aimed at providing technology
                    education and resources to underserved communities across the country, helping to bridge the digital
                    divide and prepare students for careers in tech.
                  </p>
                </CardContent>
                <CardFooter className="pt-3 border-t bg-muted/50">
                  <Button variant="outline" size="sm" className="gap-1">
                    Read Full Release
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="font-medium">
                      Sustainability
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>March 5, 2025</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">ElectroHub Commits to Carbon Neutrality by 2030</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As part of its ongoing commitment to environmental responsibility, ElectroHub has announced
                    ambitious plans to achieve carbon neutrality across all operations within the next five years,
                    including retail stores, distribution centers, and corporate offices.
                  </p>
                </CardContent>
                <CardFooter className="pt-3 border-t bg-muted/50">
                  <Button variant="outline" size="sm" className="gap-1">
                    Read Full Release
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle>Media Contacts</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              <div className="py-4">
                <h4 className="font-semibold text-sm">Press Inquiries</h4>
                <p className="text-sm mt-1">press@electrohub.com</p>
                <p className="text-sm">1-800-PRESS-EH (1-800-773-7734)</p>
              </div>
              <div className="py-4">
                <h4 className="font-semibold text-sm">Corporate Communications</h4>
                <p className="text-sm mt-1">Sarah Johnson, Director of Communications</p>
                <p className="text-sm">sjohnson@electrohub.com</p>
              </div>
              <div className="py-4">
                <h4 className="font-semibold text-sm">Investor Relations</h4>
                <p className="text-sm mt-1">investors@electrohub.com</p>
                <p className="text-sm">1-800-INV-RELS (1-800-468-7357)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle>Media Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Company Logos & Brand Assets
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Executive Headshots & Bios
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Product Images
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Store Images
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    B-Roll Footage
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Fact Sheet & Company History
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle>Press Kit</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4 text-muted-foreground">
                Download our comprehensive press kit containing company information, executive bios, high-resolution
                images, and fact sheets.
              </p>
              <Button className="w-full">Download Press Kit</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">ElectroHub in the News</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=192&width=384"
                alt="News article image"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <span className="font-medium text-primary">TechDaily</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  March 15, 2025
                </span>
              </CardDescription>
              <CardTitle className="text-lg leading-tight">
                ElectroHub's Innovative Store Design Wins Retail Excellence Award
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground">
                The company's new flagship store concept has been recognized for its interactive displays and
                sustainable design elements.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="gap-1">
                Read Article
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=192&width=384"
                alt="News article image"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <span className="font-medium text-primary">Business Insider</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  March 10, 2025
                </span>
              </CardDescription>
              <CardTitle className="text-lg leading-tight">
                ElectroHub CEO Discusses Future of Retail Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground">
                In an exclusive interview, CEO Michael Chen shares insights on how AI and AR are transforming the
                shopping experience.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="gap-1">
                Read Article
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=192&width=384"
                alt="News article image"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <span className="font-medium text-primary">Forbes</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  March 5, 2025
                </span>
              </CardDescription>
              <CardTitle className="text-lg leading-tight">
                ElectroHub Named to "Most Sustainable Companies" List
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground">
                The retailer's commitment to reducing e-waste and carbon emissions earns recognition in Forbes' annual
                sustainability ranking.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="gap-1">
                Read Article
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl mt-8 border border-primary/10">
        <h3 className="text-xl font-semibold mb-4">Press Event Calendar</h3>
        <p className="mb-6 text-muted-foreground">
          Stay informed about upcoming press conferences, product launches, and media events.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background rounded-lg shadow-sm border">
            <div>
              <h4 className="font-semibold">Q2 Earnings Call</h4>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <CalendarIcon className="mr-1 h-3 w-3" />
                April 15, 2025
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-3 w-3" />
                2:00 PM EST
              </p>
            </div>
            <Button size="sm" className="mt-2 sm:mt-0">
              Register
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background rounded-lg shadow-sm border">
            <div>
              <h4 className="font-semibold">Summer Product Showcase</h4>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <CalendarIcon className="mr-1 h-3 w-3" />
                May 20, 2025
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-3 w-3" />
                10:00 AM EST
              </p>
            </div>
            <Button size="sm" className="mt-2 sm:mt-0">
              Register
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background rounded-lg shadow-sm border">
            <div>
              <h4 className="font-semibold">Annual Tech Innovation Summit</h4>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <CalendarIcon className="mr-1 h-3 w-3" />
                June 12, 2025
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-3 w-3" />
                9:00 AM - 5:00 PM EST
              </p>
            </div>
            <Button size="sm" className="mt-2 sm:mt-0">
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

