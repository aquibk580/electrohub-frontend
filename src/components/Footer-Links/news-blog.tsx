import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Star } from "lucide-react"
// import Image from "next/image"
import Image from "../Common/Image"

export default function NewsBlog() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">News & Blog</h1>
        <p className="text-muted-foreground text-lg">
          Stay up to date with the latest news, product releases, and tech insights from ElectroHub.
        </p>
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent gap-2">
          <TabsTrigger
            value="featured"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="tech-tips"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Tech Tips
          </TabsTrigger>
          <TabsTrigger
            value="product-reviews"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Product Reviews
          </TabsTrigger>
          <TabsTrigger
            value="company-news"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Company News
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2 overflow-hidden">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Featured article image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-3">Featured</Badge>
                  <h3 className="text-2xl font-bold mb-2">The Future of Smart Home Technology in 2025</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <span>March 15, 2025</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    <span>8 min read</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Explore how AI, IoT, and new connectivity standards are transforming our homes into more
                    intelligent, efficient, and responsive living spaces.
                  </p>
                  <Button>Read Article</Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=192&width=384" alt="Article image" fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>March 10, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>6 min read</span>
                </div>
                <CardTitle className="text-xl">Top 5 Gaming Laptops of 2025</CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-0 flex-grow">
                <p className="text-muted-foreground">
                  Our experts have tested the latest gaming laptops to bring you the definitive ranking based on
                  performance, design, and value.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=192&width=384" alt="Article image" fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>March 5, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>5 min read</span>
                </div>
                <CardTitle className="text-xl">Sustainable Tech: Eco-Friendly Electronics</CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-0 flex-grow">
                <p className="text-muted-foreground">
                  Discover how manufacturers are reducing their environmental impact and creating more sustainable
                  electronic products.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech-tips" className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <Badge className="w-fit mb-2">Productivity</Badge>
                <CardTitle>10 Hidden Features in Your Smartphone</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 28, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>4 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlock the full potential of your device with these lesser-known but incredibly useful features that
                  can boost your productivity.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <Badge className="w-fit mb-2">Security</Badge>
                <CardTitle>Securing Your Smart Home Devices</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 20, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>7 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Essential steps to protect your connected devices from security vulnerabilities and keep your smart
                  home safe from hackers.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <Badge className="w-fit mb-2">Troubleshooting</Badge>
                <CardTitle>Fix Common PC Performance Issues</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 15, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>6 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step guides to diagnose and resolve the most frequent problems that can slow down your
                  computer.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="product-reviews" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Product review image"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Smartphones</Badge>
                  <div className="flex items-center text-yellow-500">
                    <span className="font-bold text-lg mr-1 text-foreground">4.8</span>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">Galaxy Ultra S25 Review</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>March 1, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>10 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <p className="text-muted-foreground">
                  Our comprehensive review of Samsung's latest flagship phone, featuring groundbreaking camera
                  technology and AI capabilities.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Product review image"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Audio</Badge>
                  <div className="flex items-center text-yellow-500">
                    <span className="font-bold text-lg mr-1 text-foreground">4.5</span>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current opacity-50" />
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">SoundMax Pro Wireless Earbuds</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 25, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>8 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <p className="text-muted-foreground">
                  These premium earbuds deliver exceptional sound quality and noise cancellation in a comfortable,
                  long-lasting package.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Product review image"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Smart Home</Badge>
                  <div className="flex items-center text-yellow-500">
                    <span className="font-bold text-lg mr-1 text-foreground">4.2</span>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current opacity-30" />
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">HomeIQ Smart Thermostat</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 18, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>7 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <p className="text-muted-foreground">
                  This AI-powered thermostat learns your preferences and optimizes your home's climate for comfort and
                  energy efficiency.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Product review image"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="w-fit">Laptops</Badge>
                  <div className="flex items-center text-yellow-500">
                    <span className="font-bold text-lg mr-1 text-foreground">4.7</span>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current opacity-70" />
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">UltraBook Pro X15</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>February 10, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>9 min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <p className="text-muted-foreground">
                  A powerhouse laptop that combines performance, battery life, and portability in a sleek, premium
                  design.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Full Review</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company-news" className="pt-6">
          <div className="space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Press Release</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <span>March 18, 2025</span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">ElectroHub Announces Expansion to 10 New Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ElectroHub is excited to announce the opening of 10 new retail locations across the United States in
                  the coming months, creating over 500 new jobs and bringing our innovative shopping experience to more
                  communities.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Full Release</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Community</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <span>March 12, 2025</span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">ElectroHub Foundation Launches Tech Education Initiative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our new $5 million initiative aims to provide technology education and resources to underserved
                  communities, helping to bridge the digital divide and prepare students for careers in tech.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Sustainability</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <span>March 5, 2025</span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">ElectroHub Commits to Carbon Neutrality by 2030</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As part of our ongoing commitment to environmental responsibility, ElectroHub has announced ambitious
                  plans to achieve carbon neutrality across all operations within the next five years.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read Our Sustainability Plan</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="w-fit">Awards</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <span>February 28, 2025</span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">
                  ElectroHub Named "Retailer of the Year" at Tech Industry Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ElectroHub has been recognized for excellence in customer experience, innovation, and business
                  performance at this year's prestigious Tech Industry Awards ceremony.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mt-8 border border-primary/10">
        <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
        <p className="mb-6 text-muted-foreground">
          Get the latest news, tech tips, and exclusive offers delivered directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button className="sm:w-auto">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

