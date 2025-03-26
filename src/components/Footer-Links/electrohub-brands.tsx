import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Laptop, Headphones, Home, Battery, Gamepad, Shield } from "lucide-react"
import Image from "../Common/Image" 

export default function ElectrohubBrands() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ElectroHub Brands</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover our exclusive in-house brands designed to provide quality, innovation, and value across a wide range
          of electronics and accessories.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="mb-6 overflow-x-auto">
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
            <TabsTrigger value="all" >
              All Brands
            </TabsTrigger>
            <TabsTrigger value="tech" >
              Tech Essentials
            </TabsTrigger>
            <TabsTrigger value="audio" >
              Audio
            </TabsTrigger>
            <TabsTrigger value="accessories" >
              Accessories
            </TabsTrigger>
            <TabsTrigger value="smart-home" >
              Smart Home
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="pt-2">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <Card key={index} className="overflow-hidden border-muted/30 transition-all hover:shadow-md">
                <div className="relative h-40 bg-gradient-to-r from-primary/80 to-primary rounded-t-lg flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src="/placeholder.svg?height=160&width=400"
                      alt={brand.name}
                      width={400}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex items-center gap-3">
                    {brand.icon}
                    <h3 className="text-2xl font-bold text-primary-foreground">{brand.name}</h3>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{brand.name}</CardTitle>
                  <CardDescription>{brand.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{brand.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t bg-muted/10 p-4">
                  <Button variant="outline">Shop {brand.name}</Button>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {brand.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tech" className="pt-2">
          <div className="grid gap-6 md:grid-cols-2">
            {brands
              .filter((brand) => brand.category === "Tech")
              .map((brand, index) => (
                <Card key={index} className="overflow-hidden border-muted/30">
                  <div className="md:grid md:grid-cols-3">
                    <div className="relative h-40 md:h-auto md:col-span-1 bg-gradient-to-r from-primary/80 to-primary rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                      <div className="relative z-10 p-4">{brand.icon}</div>
                    </div>
                    <div className="p-6 md:col-span-2">
                      <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{brand.tagline}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Product Lines:</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            {brand.productLines.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Key Features:</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            {brand.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button>Shop {brand.name}</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="pt-2">
          <Card className="border-muted/30 overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto bg-gradient-to-r from-primary/80 to-primary rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="SoundWave"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Headphones className="h-16 w-16 text-primary-foreground" />
                  <h3 className="text-3xl font-bold text-primary-foreground">SoundWave</h3>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">SoundWave</h3>
                <p className="text-muted-foreground mb-6">Premium Audio Equipment</p>
                <p className="mb-6">
                  Immersive audio experiences with our line of headphones, speakers, and home theater systems that
                  deliver exceptional sound quality.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Product Categories:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {audioCategories.map((category, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Signature Series:</h4>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {audioSeries.map((series, index) => (
                        <div
                          key={index}
                          className="p-3 bg-muted/10 rounded-lg border border-muted/30 hover:border-primary/20 transition-colors"
                        >
                          <p className="font-medium">{series.name}</p>
                          <p className="text-xs text-muted-foreground">{series.tagline}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button size="lg">Shop SoundWave Collection</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="pt-2">
          <div className="grid gap-6 md:grid-cols-2">
            {brands
              .filter((brand) => brand.category === "Accessories")
              .map((brand, index) => (
                <Card key={index} className="overflow-hidden border-muted/30">
                  <div className="md:grid md:grid-cols-3">
                    <div className="relative h-40 md:h-auto md:col-span-1 bg-gradient-to-r from-primary/80 to-primary rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                      <div className="relative z-10 p-4">{brand.icon}</div>
                    </div>
                    <div className="p-6 md:col-span-2">
                      <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{brand.tagline}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Product Lines:</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            {brand.productLines.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Key Features:</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            {brand.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button>Shop {brand.name}</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="smart-home" className="pt-2">
          <Card className="border-muted/30 overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto bg-gradient-to-r from-primary/80 to-primary rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="SmartLife"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Home className="h-16 w-16 text-primary-foreground" />
                  <h3 className="text-3xl font-bold text-primary-foreground">SmartLife</h3>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">SmartLife</h3>
                <p className="text-muted-foreground mb-6">Connected Home Solutions</p>
                <p className="mb-6">
                  Transform your home with our integrated smart home products, including lighting, security, and climate
                  control systems.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Product Categories:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {smartHomeCategories.map((category, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {smartHomeBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <Button size="lg">Shop SmartLife Collection</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 mt-12">
        <Card className="border-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Quality
              </Badge>
              Our Brand Promise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              {brandPromises.map((promise, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <strong className="font-medium">{promise.title}:</strong>{" "}
                    <span className="text-muted-foreground">{promise.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Special
              </Badge>
              Exclusive Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exclusiveCollections.map((collection, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/10 rounded-lg border border-muted/30 hover:border-primary/20 transition-colors"
                >
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    {collection.icon}
                    {collection.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{collection.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/20 border-muted/30 mt-12">
        <div className="md:grid md:grid-cols-3 items-center">
          <div className="p-8 md:col-span-2">
            <h3 className="text-xl font-bold mb-3">Become a Brand Ambassador</h3>
            <p className="text-muted-foreground mb-6">
              Love our ElectroHub brands? Join our ambassador program to get exclusive products, special discounts, and
              opportunities to provide feedback on new products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Apply Now</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent"></div>
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Brand Ambassador"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

// Data for the component
const brands = [
  {
    name: "TechPro",
    tagline: "Premium Computing & Mobile Accessories",
    description:
      "Our flagship brand offering high-performance laptops, tablets, and mobile accessories designed for professionals and power users.",
    icon: <Laptop className="h-12 w-12 text-primary-foreground" />,
    category: "Tech",
    productLines: ["Ultrabook laptops", "Convertible tablets", "Docking stations", "Wireless mice & keyboards"],
    features: ["Premium materials", "High performance", "Extended battery life", "2-year warranty"],
  },
  {
    name: "SoundWave",
    tagline: "Premium Audio Equipment",
    description:
      "Immersive audio experiences with our line of headphones, speakers, and home theater systems that deliver exceptional sound quality.",
    icon: <Headphones className="h-12 w-12 text-primary-foreground" />,
    category: "Audio",
    productLines: ["Wireless headphones", "Bluetooth speakers", "Home theater systems", "Professional audio equipment"],
    features: ["Studio-quality sound", "Noise cancellation", "Long battery life", "Durable construction"],
  },
  {
    name: "SmartLife",
    tagline: "Connected Home Solutions",
    description:
      "Transform your home with our integrated smart home products, including lighting, security, and climate control systems.",
    icon: <Home className="h-12 w-12 text-primary-foreground" />,
    category: "Smart Home",
    productLines: ["Smart lighting", "Security cameras", "Climate control", "Voice assistants"],
    features: ["Easy setup", "Voice control", "Energy efficient", "Seamless integration"],
  },
  {
    name: "PowerMax",
    tagline: "Charging & Power Solutions",
    description:
      "Keep your devices powered with our range of high-capacity power banks, fast chargers, and durable cables designed for everyday use.",
    icon: <Battery className="h-12 w-12 text-primary-foreground" />,
    category: "Accessories",
    productLines: [
      "Fast charging adapters",
      "Portable power banks",
      "Wireless charging pads",
      "Multi-device charging stations",
    ],
    features: ["Fast charging technology", "High capacity batteries", "Compact design", "Safety protection"],
  },
  {
    name: "GameEdge",
    tagline: "Gaming Peripherals & Accessories",
    description:
      "Elevate your gaming experience with our performance-focused keyboards, mice, headsets, and controllers designed for competitive gamers.",
    icon: <Gamepad className="h-12 w-12 text-primary-foreground" />,
    category: "Tech",
    productLines: ["Mechanical keyboards", "Precision gaming mice", "Surround sound headsets", "Custom controllers"],
    features: ["RGB lighting", "Programmable buttons", "Low latency", "Ergonomic design"],
  },
  {
    name: "ShieldTech",
    tagline: "Device Protection & Security",
    description:
      "Protect your valuable devices with our premium cases, screen protectors, and security solutions designed for durability and style.",
    icon: <Shield className="h-12 w-12 text-primary-foreground" />,
    category: "Accessories",
    productLines: ["Phone & tablet cases", "Screen protectors", "Laptop sleeves & bags", "Privacy filters"],
    features: [
      "Military-grade drop protection",
      "Scratch resistance",
      "Antimicrobial treatment",
      "Slim profile design",
    ],
  },
]

const audioCategories = [
  "Wireless headphones & earbuds",
  "Bluetooth speakers",
  "Soundbars & home theater",
  "Professional audio equipment",
  "Car audio systems",
  "DJ equipment",
]

const audioSeries = [
  { name: "SoundWave Pro", tagline: "Studio Quality" },
  { name: "SoundWave Air", tagline: "Wireless Freedom" },
  { name: "SoundWave Bass", tagline: "Deep Sound" },
  { name: "SoundWave Home", tagline: "Surround Sound" },
]

const smartHomeCategories = [
  "Smart lighting & switches",
  "Security cameras & doorbells",
  "Smart thermostats & sensors",
  "Voice-controlled assistants",
  "Smart appliance controllers",
  "Home automation hubs",
]

const smartHomeBenefits = [
  "Easy setup with SmartLife app",
  "Works with major voice assistants",
  "Energy monitoring & savings",
  "Seamless integration between devices",
]

const brandPromises = [
  {
    title: "Quality Assurance",
    description: "All ElectroHub brand products undergo rigorous testing to ensure reliability and performance.",
  },
  {
    title: "Extended Warranty",
    description: "Most ElectroHub brand products come with a 2-year warranty, exceeding industry standards.",
  },
  {
    title: "Value Pricing",
    description: "Premium features and quality at competitive prices compared to national brands.",
  },
  {
    title: "Responsive Support",
    description: "Dedicated customer service team for ElectroHub brand products.",
  },
]

const exclusiveCollections = [
  {
    title: "Eco-Friendly Series",
    description: "Our sustainable product line made with recycled materials and energy-efficient designs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-leaf text-primary"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 17 2c0 6-8 8-8 16 0 .7.09 1.36.26 2H2"></path>
        <path d="M6 13c1.25-2.5 2.5-3 4-3"></path>
        <path d="M18 21c-4.5-1-8-2.5-9.5-4"></path>
      </svg>
    ),
  },
  {
    title: "Limited Edition Collaborations",
    description: "Special releases created in partnership with designers and artists.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-star text-primary"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
  {
    title: "Pro Series",
    description: "Professional-grade products designed for content creators and power users.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-badge-check text-primary"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
  },
]

