import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ElectrohubBrands() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">ElectroHub Brands</h2>

      <p>
        Discover our exclusive in-house brands designed to provide quality, innovation, and value across a wide range of
        electronics and accessories.
      </p>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Brands</TabsTrigger>
          <TabsTrigger value="tech">Tech Essentials</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="smart-home">Smart Home</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">TechPro</h3>
              </div>
              <CardHeader>
                <CardTitle>TechPro</CardTitle>
                <CardDescription>Premium Computing & Mobile Accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Our flagship brand offering high-performance laptops, tablets, and mobile accessories designed for
                  professionals and power users.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop TechPro</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">SoundWave</h3>
              </div>
              <CardHeader>
                <CardTitle>SoundWave</CardTitle>
                <CardDescription>Premium Audio Equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Immersive audio experiences with our line of headphones, speakers, and home theater systems that
                  deliver exceptional sound quality.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop SoundWave</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">SmartLife</h3>
              </div>
              <CardHeader>
                <CardTitle>SmartLife</CardTitle>
                <CardDescription>Connected Home Solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Transform your home with our integrated smart home products, including lighting, security, and climate
                  control systems.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop SmartLife</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">PowerMax</h3>
              </div>
              <CardHeader>
                <CardTitle>PowerMax</CardTitle>
                <CardDescription>Charging & Power Solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Keep your devices powered with our range of high-capacity power banks, fast chargers, and durable
                  cables designed for everyday use.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop PowerMax</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">GameEdge</h3>
              </div>
              <CardHeader>
                <CardTitle>GameEdge</CardTitle>
                <CardDescription>Gaming Peripherals & Accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Elevate your gaming experience with our performance-focused keyboards, mice, headsets, and controllers
                  designed for competitive gamers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop GameEdge</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">ShieldTech</h3>
              </div>
              <CardHeader>
                <CardTitle>ShieldTech</CardTitle>
                <CardDescription>Device Protection & Security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Protect your valuable devices with our premium cases, screen protectors, and security solutions
                  designed for durability and style.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop ShieldTech</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">TechPro</h3>
              </div>
              <CardHeader>
                <CardTitle>TechPro</CardTitle>
                <CardDescription>Premium Computing & Mobile Accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our flagship brand offering high-performance laptops, tablets, and mobile accessories designed for
                  professionals and power users.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium">Product Lines:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Ultrabook laptops</li>
                      <li>Convertible tablets</li>
                      <li>Docking stations</li>
                      <li>Wireless mice & keyboards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Premium materials</li>
                      <li>High performance</li>
                      <li>Extended battery life</li>
                      <li>2-year warranty</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop TechPro</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">GameEdge</h3>
              </div>
              <CardHeader>
                <CardTitle>GameEdge</CardTitle>
                <CardDescription>Gaming Peripherals & Accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Elevate your gaming experience with our performance-focused keyboards, mice, headsets, and controllers
                  designed for competitive gamers.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium">Product Lines:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Mechanical keyboards</li>
                      <li>Precision gaming mice</li>
                      <li>Surround sound headsets</li>
                      <li>Custom controllers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>RGB lighting</li>
                      <li>Programmable buttons</li>
                      <li>Low latency</li>
                      <li>Ergonomic design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop GameEdge</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="pt-4">
          <Card>
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">SoundWave</h3>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">SoundWave</h3>
                <p className="text-sm text-muted-foreground mb-4">Premium Audio Equipment</p>
                <p className="mb-4">
                  Immersive audio experiences with our line of headphones, speakers, and home theater systems that
                  deliver exceptional sound quality.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Product Categories:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Wireless headphones & earbuds</li>
                      <li>Bluetooth speakers</li>
                      <li>Soundbars & home theater</li>
                      <li>Professional audio equipment</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Signature Series:</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-sm font-medium">SoundWave Pro</p>
                        <p className="text-xs text-muted-foreground">Studio Quality</p>
                      </div>
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-sm font-medium">SoundWave Air</p>
                        <p className="text-xs text-muted-foreground">Wireless Freedom</p>
                      </div>
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-sm font-medium">SoundWave Bass</p>
                        <p className="text-xs text-muted-foreground">Deep Sound</p>
                      </div>
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-sm font-medium">SoundWave Home</p>
                        <p className="text-xs text-muted-foreground">Surround Sound</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button>Shop SoundWave Collection</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="relative h-40 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">PowerMax</h3>
              </div>
              <CardHeader>
                <CardTitle>PowerMax</CardTitle>
                <CardDescription>Charging & Power Solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Keep your devices powered with our range of high-capacity power banks, fast chargers, and durable
                  cables designed for everyday use.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium">Product Lines:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Fast charging adapters</li>
                      <li>Portable power banks</li>
                      <li>Wireless charging pads</li>
                      <li>Multi-device charging stations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Fast charging technology</li>
                      <li>High capacity batteries</li>
                      <li>Compact design</li>
                      <li>Safety protection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop PowerMax</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-lg flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">ShieldTech</h3>
              </div>
              <CardHeader>
                <CardTitle>ShieldTech</CardTitle>
                <CardDescription>Device Protection & Security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Protect your valuable devices with our premium cases, screen protectors, and security solutions
                  designed for durability and style.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium">Product Lines:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Phone & tablet cases</li>
                      <li>Screen protectors</li>
                      <li>Laptop sleeves & bags</li>
                      <li>Privacy filters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Military-grade drop protection</li>
                      <li>Scratch resistance</li>
                      <li>Antimicrobial treatment</li>
                      <li>Slim profile design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Shop ShieldTech</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="smart-home" className="pt-4">
          <Card>
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">SmartLife</h3>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">SmartLife</h3>
                <p className="text-sm text-muted-foreground mb-4">Connected Home Solutions</p>
                <p className="mb-4">
                  Transform your home with our integrated smart home products, including lighting, security, and climate
                  control systems.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Product Categories:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Smart lighting & switches</li>
                      <li>Security cameras & doorbells</li>
                      <li>Smart thermostats & sensors</li>
                      <li>Voice-controlled assistants</li>
                      <li>Smart appliance controllers</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Easy setup with SmartLife app</li>
                      <li>Works with major voice assistants</li>
                      <li>Energy monitoring & savings</li>
                      <li>Seamless integration between devices</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Button>Shop SmartLife Collection</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Brand Promise</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Quality Assurance:</strong> All ElectroHub brand products undergo rigorous testing to ensure
                  reliability and performance.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Extended Warranty:</strong> Most ElectroHub brand products come with a 2-year warranty,
                  exceeding industry standards.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Value Pricing:</strong> Premium features and quality at competitive prices compared to
                  national brands.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>
                  <strong>Responsive Support:</strong> Dedicated customer service team for ElectroHub brand products.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exclusive Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Eco-Friendly Series</h4>
                <p className="text-sm">
                  Our sustainable product line made with recycled materials and energy-efficient designs.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Limited Edition Collaborations</h4>
                <p className="text-sm">Special releases created in partnership with designers and artists.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Pro Series</h4>
                <p className="text-sm">Professional-grade products designed for content creators and power users.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">Become a Brand Ambassador</h3>
        <p className="mb-4">
          Love our ElectroHub brands? Join our ambassador program to get exclusive products, special discounts, and
          opportunities to provide feedback on new products.
        </p>
        <Button>Apply Now</Button>
      </div>
    </div>
  )
}

