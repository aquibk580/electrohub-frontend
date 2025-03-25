import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shield, Eye, Share2, Bell, FileText, HelpCircle } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last Updated: March 21, 2025</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4 space-y-8">
          <Card className="border-muted/30">
            <CardHeader className="bg-muted/10">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                ElectroHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile
                application, or make purchases in our stores.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="collect" className="w-full">
            <div className="mb-6 overflow-x-auto">
              <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
                <TabsTrigger value="collect" className="rounded-md data-[state=active]:bg-background">
                  <Eye className="h-4 w-4 mr-2" />
                  Information We Collect
                </TabsTrigger>
                <TabsTrigger value="use" className="rounded-md data-[state=active]:bg-background">
                  <FileText className="h-4 w-4 mr-2" />
                  How We Use Information
                </TabsTrigger>
                <TabsTrigger value="share" className="rounded-md data-[state=active]:bg-background">
                  <Share2 className="h-4 w-4 mr-2" />
                  Information Sharing
                </TabsTrigger>
                <TabsTrigger value="rights" className="rounded-md data-[state=active]:bg-background">
                  <Bell className="h-4 w-4 mr-2" />
                  Your Rights
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="collect" className="space-y-6">
              <Card className="border-muted/30">
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <p>We may collect information about you in a variety of ways:</p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Personal Data</h4>
                      <p className="text-muted-foreground mb-2">
                        When you create an account, place an order, or participate in promotions, we may collect:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>Name, email address, postal address, and phone number</li>
                        <li>Payment information (credit card numbers, billing address)</li>
                        <li>Purchase history and product preferences</li>
                        <li>Demographic information</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Device Information</h4>
                      <p className="text-muted-foreground mb-2">
                        When you access our website or mobile app, we may collect:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>Device type, operating system, and browser information</li>
                        <li>IP address and geographic location</li>
                        <li>Browsing behavior and interaction with our platforms</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Cookies and Tracking Technologies</h4>
                      <p className="text-muted-foreground mb-2">We use cookies and similar tracking technologies to:</p>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>Remember your preferences and settings</li>
                        <li>Understand how you interact with our website</li>
                        <li>Personalize your shopping experience</li>
                        <li>Analyze the effectiveness of our marketing campaigns</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="use" className="space-y-6">
              <Card className="border-muted/30">
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground mb-4">We may use the information we collect about you to:</p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {usageCategories.map((category, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/10 space-y-2 border border-muted/30">
                        <h4 className="font-medium flex items-center gap-2">
                          {category.icon}
                          {category.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 mt-4 rounded-lg bg-muted/10 border border-muted/30">
                    <h4 className="font-medium mb-2">Legal Basis for Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      We process your personal information based on legitimate business interests, the fulfillment of
                      our contract with you, compliance with our legal obligations, and/or your consent. When we process
                      your personal information for our legitimate business interests, we make sure to consider and
                      balance any potential impact on you and your rights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <Card className="border-muted/30">
                <CardHeader>
                  <CardTitle>Sharing Your Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground mb-4">We may share your information with:</p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Service Providers</h4>
                      <p className="text-muted-foreground">
                        We share information with third-party vendors, consultants, and other service providers who
                        perform services on our behalf, such as payment processing, shipping, data analytics, email
                        delivery, hosting services, customer service, and marketing assistance.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Business Partners</h4>
                      <p className="text-muted-foreground">
                        We may share your information with our business partners to offer you certain products,
                        services, or promotions. We will only share personal information that is necessary for the third
                        party to provide the requested service.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Legal Requirements</h4>
                      <p className="text-muted-foreground">
                        We may disclose your information where required to do so by law or subpoena or if we believe
                        that such action is necessary to comply with the law and the reasonable requests of law
                        enforcement or to protect the security or integrity of our services.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/10 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Business Transfers</h4>
                      <p className="text-muted-foreground">
                        If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your
                        information may be transferred as part of that transaction. We will notify you via email and/or
                        a prominent notice on our website of any change in ownership or uses of your personal
                        information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rights" className="space-y-6">
              <Card className="border-muted/30">
                <CardHeader>
                  <CardTitle>Your Privacy Rights</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Depending on your location, you may have rights regarding your personal information, including:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {privacyRights.map((right, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/10 space-y-2 border border-muted/30">
                        <h4 className="font-medium">{right.title}</h4>
                        <p className="text-sm text-muted-foreground">{right.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 mt-4 rounded-lg bg-warning/10 border border-warning/20">
                    <h4 className="font-medium text-warning-foreground mb-2">How to Exercise Your Rights</h4>
                    <p className="text-sm text-muted-foreground">
                      To exercise your rights, please contact our Privacy Office using the contact information provided
                      below. We may need to verify your identity before responding to your request. In certain
                      circumstances, we may decline to process your request where we are legally permitted to do so.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at:
              </p>

              <div className="p-4 rounded-lg bg-muted/10 border border-muted/30">
                <p className="text-muted-foreground">
                  ElectroHub Privacy Office
                  <br />
                  123 Tech Street
                  <br />
                  San Francisco, CA 94105
                  <br />
                  privacy@electrohub.com
                  <br />
                  1-800-PRIVACY
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline" className="mr-2">
                  Download Privacy Policy PDF
                </Button>
                <Button>Contact Privacy Team</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/4 space-y-4">
          <Card className="border-muted/30 sticky top-4">
            <CardHeader className="bg-muted/10">
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <a href="#collect" className="flex items-center p-2 text-sm rounded-md hover:bg-muted/20 text-primary">
                  <Eye className="h-4 w-4 mr-2" />
                  Information We Collect
                </a>
                <a href="#use" className="flex items-center p-2 text-sm rounded-md hover:bg-muted/20 text-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  How We Use Information
                </a>
                <a href="#share" className="flex items-center p-2 text-sm rounded-md hover:bg-muted/20 text-primary">
                  <Share2 className="h-4 w-4 mr-2" />
                  Information Sharing
                </a>
                <a href="#rights" className="flex items-center p-2 text-sm rounded-md hover:bg-muted/20 text-primary">
                  <Bell className="h-4 w-4 mr-2" />
                  Your Rights
                </a>
                <a href="#contact" className="flex items-center p-2 text-sm rounded-md hover:bg-muted/20 text-primary">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </nav>

              <div className="mt-6 p-4 bg-muted/10 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Need Help?</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  If you have questions about your privacy or need assistance, our privacy team is here to help.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Privacy Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Data for the component
const usageCategories = [
  {
    title: "Process Orders",
    description: "Process and fulfill your orders, send order confirmations, and provide customer support.",
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
        className="lucide lucide-shopping-cart text-primary"
      >
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
    ),
  },
  {
    title: "Personalize Experience",
    description: "Personalize your shopping experience and provide recommendations based on your preferences.",
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
        className="lucide lucide-sparkles text-primary"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        <path d="M5 3v4"></path>
        <path d="M19 17v4"></path>
        <path d="M3 5h4"></path>
        <path d="M17 19h4"></path>
      </svg>
    ),
  },
  {
    title: "Improve Services",
    description: "Analyze usage patterns to improve our website, products, and services.",
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
        className="lucide lucide-bar-chart text-primary"
      >
        <line x1="12" x2="12" y1="20" y2="10"></line>
        <line x1="18" x2="18" y1="20" y2="4"></line>
        <line x1="6" x2="6" y1="20" y2="16"></line>
      </svg>
    ),
  },
  {
    title: "Marketing",
    description: "Send promotional emails, newsletters, and updates about new products and services.",
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
        className="lucide lucide-mail text-primary"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
  },
]

const privacyRights = [
  {
    title: "Access",
    description: "You can request access to the personal information we have about you.",
  },
  {
    title: "Correction",
    description: "You can request that we correct inaccurate or incomplete information.",
  },
  {
    title: "Deletion",
    description: "You can request that we delete your personal information from our records.",
  },
  {
    title: "Restriction",
    description: "You can request that we restrict the processing of your personal information.",
  },
  {
    title: "Data Portability",
    description: "You can request a copy of your personal information in a structured, machine-readable format.",
  },
  {
    title: "Objection",
    description: "You can object to our processing of your personal information for direct marketing purposes.",
  },
]

