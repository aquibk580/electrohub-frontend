"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ExternalLink, ShoppingBag, Store, TrendingUp, Users } from "lucide-react"
import { Helmet } from "react-helmet-async"

// Counter animation component
const AnimatedCounter = ({ end, duration = 2000, label }: { end: string; duration?: number; label: string }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLHeadingElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Extract the numeric part from the end value (e.g., "5,000+" -> 5000)
  const numericValue = Number.parseInt(end.replace(/,/g, "").replace(/\+/g, "").replace(/%/g, ""))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const startTime = performance.now()
          const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)

            // Easing function for smoother animation
            const easeOutQuad = (t: number) => t * (2 - t)
            const easedProgress = easeOutQuad(progress)

            setCount(Math.floor(easedProgress * numericValue))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [numericValue, duration, hasAnimated])

  // Format the count with commas and add any suffix from the original end value
  const formattedCount = count.toLocaleString()
  const suffix = end.match(/[+%]/) ? end.match(/[+%]/)![0] : ""

  return (
    <Card className="border-primary/10 overflow-hidden">
      <CardContent className="pt-6 text-center relative">
        <h3 ref={countRef} className="text-3xl md:text-4xl font-bold text-primary transition-all duration-300">
          {formattedCount}
          {suffix}
        </h3>
        <p className="text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

export default function AboutUs() {
  const founders = [
    {
      name: "Raihan Shaikh",
      role: "Co-Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Raihan brings over 10 years of experience in e-commerce and technology. His vision drives ElectroHub's mission to revolutionize the electronics marketplace.",
    },
    {
      name: "Aquib Khan",
      role: "Co-Founder & CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With a background in software engineering, Aquib leads ElectroHub's technical development and innovation, ensuring a seamless platform experience.",
    },
    {
      name: "Adarsh Mishra",
      role: "Co-Founder & COO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Adarsh oversees operations and seller relationships, leveraging his expertise in supply chain management and business development.",
    },
    {
      name: "Sumit Mishra",
      role: "Tester",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Adarsh oversees operations and seller relationships, leveraging his expertise in supply chain management and business development.",
    },
  ]

  const stats = [
    { label: "Active Sellers", value: "5,000+" },
    { label: "Product Categories", value: "200+" },
    { label: "Monthly Visitors", value: "1M+" },
    { label: "Customer Satisfaction", value: "96%" },
  ]

  return (
    <div className="container mx-auto px-4 pt-20 md:py-12">
      <Helmet>
        <title>About us</title>
        <meta name="description" content="Electrohub About us Page" />
      </Helmet>
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="px-3.5 py-1.5 text-sm font-medium">
          About ElectroHub
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Connecting Electronics Buyers & Sellers
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          India's premier marketplace for electronics, empowering sellers and providing customers with quality products
          since 2020.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 items-center">
        <div className="space-y-6">
          <Badge className="mb-2">Our Mission</Badge>
          <h2 className="text-3xl font-bold text-primary">Revolutionizing Electronics Commerce</h2>
          <p className="text-muted-foreground">
            Founded in 2020 by Raihan Shaikh, Aquib Khan, and Adarsh Mishra, ElectroHub was born from a shared vision to
            create a specialized marketplace that connects electronics enthusiasts with trusted sellers across India.
          </p>
          <p className="text-muted-foreground">
            What began as a startup with just 50 sellers has grown into India's leading electronics platform, serving
            millions of customers and empowering thousands of businesses to reach new markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Shop Now
            </Button>
            <Button variant="outline" className="gap-2">
              <Store className="h-4 w-4" />
              Become a Seller
            </Button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden h-[400px] bg-muted">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="ElectroHub marketplace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Separator className="my-16" />

      {/* How It Works */}
      <div className="py-12">
        <div className="text-center mb-12">
          <Badge className="mb-2">How It Works</Badge>
          <h2 className="text-3xl font-bold text-primary">A Platform That Works For Everyone</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            ElectroHub creates value for both buyers and sellers through our innovative marketplace model.
          </p>
        </div>

        <Tabs defaultValue="buyers" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyers">For Buyers</TabsTrigger>
            <TabsTrigger value="sellers">For Sellers</TabsTrigger>
          </TabsList>
          <TabsContent value="buyers" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Verified Products</h3>
                        <p className="text-sm text-muted-foreground">
                          Every product undergoes quality verification before listing
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Competitive Pricing</h3>
                        <p className="text-sm text-muted-foreground">
                          Compare prices across multiple sellers to get the best deal
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Secure Payments</h3>
                        <p className="text-sm text-muted-foreground">
                          Multiple payment options with buyer protection guarantee
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Fast Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          Nationwide shipping with express delivery options
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Easy Returns</h3>
                        <p className="text-sm text-muted-foreground">
                          Hassle-free 30-day return policy on most products
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">24/7 Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Dedicated customer service team available round the clock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sellers" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Easy Onboarding</h3>
                        <p className="text-sm text-muted-foreground">
                          Simple registration process with dedicated seller support
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Powerful Dashboard</h3>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive tools to manage inventory, orders, and analytics
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Marketing Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Promotional opportunities and featured product placements
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Logistics Network</h3>
                        <p className="text-sm text-muted-foreground">
                          Access to nationwide shipping partners at discounted rates
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Quick Payments</h3>
                        <p className="text-sm text-muted-foreground">
                          Regular settlement cycles with transparent fee structure
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Growth Opportunities</h3>
                        <p className="text-sm text-muted-foreground">
                          Expand your business with access to millions of customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-16" />

      {/* Founders Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <Badge className="mb-2">Our Founders</Badge>
          <h2 className="text-3xl font-bold text-primary">Meet The Team Behind ElectroHub</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            Three visionaries with a shared passion for technology and entrepreneurship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <img
                  src={founder.image || "/placeholder.svg"}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <h3 className="font-bold text-xl">{founder.name}</h3>
                  <p className="text-primary font-medium">{founder.role}</p>
                  <p className="text-muted-foreground text-sm">{founder.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Stats Section */}
      <div className="py-12 bg-primary/5 rounded-2xl">
        <div className="text-center mb-12">
          <Badge className="mb-2">Our Impact</Badge>
          <h2 className="text-3xl font-bold text-primary">ElectroHub By The Numbers</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            Growing stronger every day with the support of our community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedCounter key={index} end={stat.value} label={stat.label} duration={1500} />
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Values Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <Badge className="mb-2">Our Values</Badge>
          <h2 className="text-3xl font-bold text-primary">What Drives Us</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            The core principles that guide everything we do at ElectroHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Community First</h3>
                <p className="text-muted-foreground">
                  We build technology that empowers both buyers and sellers, creating a thriving electronics ecosystem.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly evolve our platform with cutting-edge technology to deliver the best possible
                  experience.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <ExternalLink className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest business practices, clear communication, and building trust with every
                  interaction.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 rounded-lg p-8 my-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Join the ElectroHub Revolution</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're looking to shop the latest electronics or grow your business by reaching new customers,
          ElectroHub is the platform for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Store className="h-4 w-4" />
            Become a Seller
          </Button>
        </div>
      </div>
    </div>
  )
}

