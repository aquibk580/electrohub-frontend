import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function ShopByLocation() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Shop By Location</h2>

      <p>
        Find ElectroHub stores near you. We have over 500 locations across the United States, offering a wide selection
        of electronics and expert service.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Enter ZIP code or city, state" className="pl-10 w-full" />
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="pt-4">
          <div className="relative w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Interactive map would be displayed here</p>
              <p className="text-sm text-muted-foreground">Showing ElectroHub store locations</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="pt-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - San Francisco</CardTitle>
                  <CardDescription>Flagship Store</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    123 Market Street
                    <br />
                    San Francisco, CA 94105
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (415) 555-1234
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 10:00 AM - 9:00 PM
                    <br />
                    Sun: 11:00 AM - 6:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - New York</CardTitle>
                  <CardDescription>Flagship Store</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    456 Fifth Avenue
                    <br />
                    New York, NY 10018
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (212) 555-5678
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 9:00 AM - 10:00 PM
                    <br />
                    Sun: 10:00 AM - 8:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - Chicago</CardTitle>
                  <CardDescription>Urban Center</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    789 Michigan Avenue
                    <br />
                    Chicago, IL 60611
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (312) 555-9012
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 10:00 AM - 9:00 PM
                    <br />
                    Sun: 11:00 AM - 6:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - Los Angeles</CardTitle>
                  <CardDescription>Shopping Center</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    321 Santa Monica Blvd
                    <br />
                    Los Angeles, CA 90025
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (310) 555-3456
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 10:00 AM - 9:00 PM
                    <br />
                    Sun: 11:00 AM - 7:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - Seattle</CardTitle>
                  <CardDescription>Downtown</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    654 Pine Street
                    <br />
                    Seattle, WA 98101
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (206) 555-7890
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 10:00 AM - 9:00 PM
                    <br />
                    Sun: 11:00 AM - 6:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ElectroHub - Austin</CardTitle>
                  <CardDescription>Tech Center</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    987 Congress Avenue
                    <br />
                    Austin, TX 78701
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Phone:</span> (512) 555-2345
                  </p>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Mon-Sat: 10:00 AM - 9:00 PM
                    <br />
                    Sun: 12:00 PM - 6:00 PM
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">Store Details</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More Stores</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Store Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Tech Experts:</strong> Get personalized advice and solutions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Repair Services:</strong> Fast fixes for your devices
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Demo Zones:</strong> Try before you buy
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Curbside Pickup:</strong> Ready in as little as 1 hour
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Trade-In Program:</strong> Get credit for your old devices
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">ElectroHub is expanding! We're opening new stores in these locations soon:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Denver, CO:</strong> Opening June 2025
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Phoenix, AZ:</strong> Opening July 2025
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Miami, FL:</strong> Opening August 2025
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Portland, OR:</strong> Opening September 2025
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">Store Events</h3>
        <p className="mb-4">
          Join us for special events, workshops, and product demonstrations at your local ElectroHub store.
        </p>
        <Button>View Upcoming Events</Button>
      </div>
    </div>
  )
}

