import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// import Image from "next/image"

export default function NewsBlog() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">News & Blog</h2>

      <p>Stay up to date with the latest news, product releases, and tech insights from ElectroHub.</p>

      <Tabs defaultValue="featured">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="tech-tips">Tech Tips</TabsTrigger>
          <TabsTrigger value="product-reviews">Product Reviews</TabsTrigger>
          <TabsTrigger value="company-news">Company News</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-48 md:h-full">
                  {/* <Image
                    src="/placeholder.svg"
                    alt="Featured article image"
                    fill
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  /> */}
                  <img src="/placeholder.svg" alt="Featured article image" className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
                </div>
                <div className="p-6">
                  <Badge className="mb-2">Featured</Badge>
                  <h3 className="text-xl font-bold mb-2">The Future of Smart Home Technology in 2025</h3>
                  <p className="text-sm text-muted-foreground mb-2">March 15, 2025 • 8 min read</p>
                  <p className="mb-4">
                    Explore how AI, IoT, and new connectivity standards are transforming our homes into more
                    intelligent, efficient, and responsive living spaces.
                  </p>
                  <Button>Read Article</Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Article image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Article image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Top 5 Gaming Laptops of 2025</CardTitle>
                <CardDescription>March 10, 2025 • 6 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our experts have tested the latest gaming laptops to bring you the definitive ranking based on
                  performance, design, and value.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Article image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Article image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Sustainable Tech: Eco-Friendly Electronics</CardTitle>
                <CardDescription>March 5, 2025 • 5 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Discover how manufacturers are reducing their environmental impact and creating more sustainable
                  electronic products.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech-tips" className="pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Productivity</Badge>
                <CardTitle>10 Hidden Features in Your Smartphone</CardTitle>
                <CardDescription>February 28, 2025 • 4 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Unlock the full potential of your device with these lesser-known but incredibly useful features that
                  can boost your productivity.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Security</Badge>
                <CardTitle>Securing Your Smart Home Devices</CardTitle>
                <CardDescription>February 20, 2025 • 7 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Essential steps to protect your connected devices from security vulnerabilities and keep your smart
                  home safe from hackers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Troubleshooting</Badge>
                <CardTitle>Fix Common PC Performance Issues</CardTitle>
                <CardDescription>February 15, 2025 • 6 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Step-by-step guides to diagnose and resolve the most frequent problems that can slow down your
                  computer.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="product-reviews" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Product review image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Product review image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Smartphones</Badge>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-1">4.8</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <CardTitle>Galaxy Ultra S25 Review</CardTitle>
                <CardDescription>March 1, 2025 • 10 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our comprehensive review of Samsung's latest flagship phone, featuring groundbreaking camera
                  technology and AI capabilities.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Product review image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Product review image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Audio</Badge>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-1">4.5</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <CardTitle>SoundMax Pro Wireless Earbuds</CardTitle>
                <CardDescription>February 25, 2025 • 8 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  These premium earbuds deliver exceptional sound quality and noise cancellation in a comfortable,
                  long-lasting package.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Product review image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Product review image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Smart Home</Badge>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-1">4.2</span>
                    <span className="text-yellow-500">★★★★☆</span>
                  </div>
                </div>
                <CardTitle>HomeIQ Smart Thermostat</CardTitle>
                <CardDescription>February 18, 2025 • 7 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This AI-powered thermostat learns your preferences and optimizes your home's climate for comfort and
                  energy efficiency.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Product review image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Product review image" className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Laptops</Badge>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-1">4.7</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <CardTitle>UltraBook Pro X15</CardTitle>
                <CardDescription>February 10, 2025 • 9 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  A powerhouse laptop that combines performance, battery life, and portability in a sleek, premium
                  design.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company-news" className="pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Press Release</Badge>
                <CardTitle>ElectroHub Announces Expansion to 10 New Cities</CardTitle>
                <CardDescription>March 18, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  ElectroHub is excited to announce the opening of 10 new retail locations across the United States in
                  the coming months, creating over 500 new jobs and bringing our innovative shopping experience to more
                  communities.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Release</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Community</Badge>
                <CardTitle>ElectroHub Foundation Launches Tech Education Initiative</CardTitle>
                <CardDescription>March 12, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our new $5 million initiative aims to provide technology education and resources to underserved
                  communities, helping to bridge the digital divide and prepare students for careers in tech.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Sustainability</Badge>
                <CardTitle>ElectroHub Commits to Carbon Neutrality by 2030</CardTitle>
                <CardDescription>March 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  As part of our ongoing commitment to environmental responsibility, ElectroHub has announced ambitious
                  plans to achieve carbon neutrality across all operations within the next five years.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Our Sustainability Plan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Awards</Badge>
                <CardTitle>ElectroHub Named "Retailer of the Year" at Tech Industry Awards</CardTitle>
                <CardDescription>February 28, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  ElectroHub has been recognized for excellence in customer experience, innovation, and business
                  performance at this year's prestigious Tech Industry Awards ceremony.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">Subscribe to Our Newsletter</h3>
        <p className="mb-4">Get the latest news, tech tips, and exclusive offers delivered directly to your inbox.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

