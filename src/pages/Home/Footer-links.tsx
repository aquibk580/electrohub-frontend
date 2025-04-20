import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import WarrantyInformation from "@/components/Footer-Links/warranty-information"
import PrivacyPolicy from "@/components/Footer-Links/privacy-policy"
import TermsOfService from "@/components/Footer-Links/terms-of-service"
import FinancingOptions from "@/components/Footer-Links/financing-options"
import Faqs from "@/components/Footer-Links/faqs"
import Careers from "@/components/Footer-Links/careers"
import NewsBlog from "@/components/Footer-Links/news-blog"
import Help from "@/components/Footer-Links/help"
import PressCenter from "@/components/Footer-Links/press-center"
import ShopByLocation from "@/components/Footer-Links/shop-by-location"
import ElectrohubBrands from "@/components/Footer-Links/electrohub-brands"
import AffiliatePartners from "@/components/Footer-Links/affiliate-partners"
import IdeasGuides from "@/components/Footer-Links/ideas-guides"
import { Helmet } from "react-helmet-async"

export default function InfoPage() {
  const { section } = useParams();
  const [activeTab, setActiveTab] = useState(section || "warranty-information");

  useEffect(() => {
    if (section) {
      setActiveTab(section);
      console.log(section)
    }
  }, [section]);

  const renderTitle = () => {
    switch (activeTab) {
      case "warranty-information":
        return "Warranty Information"
      case "privacy-policy":
        return "Privacy Policy"
      case "terms-of-service":
        return "Terms of Service"
      case "financing-options":
        return "Financing Options"
      case "faqs":
        return "Frequently Asked Questions"
      case "careers":
        return "Careers"
      case "news-blog":
        return "News & Blog"
      case "help-center":
        return "Help Center"
      case "press-center":
        return "Press Center"
      case "shop-by-location":
        return "Shop By Location"
      case "electrohub-brands":
        return "ElectroHub Brands"
      case "affiliate-partners":
        return "Affiliate & Partners"
      case "ideas-guides":
        return "Ideas & Guides"
      default:
        return "Information"
    }
  }

  return (
    <div className="h-full flex flex-col justify-center align-middle overflow-y-auto">
      <Helmet>
        <title>{renderTitle()}</title>
        <meta name="description" content="Powering Your Tech Life!" />
      </Helmet>
      {/* <header className="sticky top-0 z-10 border-b bg-background rounded-lg">
        <div className="container flex h-16 mx-5  items-center justify-between py-4">
          <h1 className="text-2xl font-bold">{renderTitle()}</h1>
        </div>
      </header> */}

      <main className="  overflow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
          <div className="flex flex-col md:flex-row gap-6">
            {/* <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Information</CardTitle>
                  <CardDescription>Browse different sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsList className="flex flex-col h-auto items-start justify-start display:none">
                    <TabsTrigger value="warranty-information" className="w-full justify-start">
                      Warranty Information
                    </TabsTrigger>
                    <TabsTrigger value="privacy-policy" className="w-full justify-start">
                      Privacy Policy
                    </TabsTrigger>
                    <TabsTrigger value="terms-of-service" className="w-full justify-start">
                      Terms of Service
                    </TabsTrigger>
                    <TabsTrigger value="financing-options" className="w-full justify-start">
                      Financing Options
                    </TabsTrigger>
                    <TabsTrigger value="faqs" className="w-full justify-start">
                      FAQs
                    </TabsTrigger>
                    <TabsTrigger value="careers" className="w-full justify-start">
                      Careers
                    </TabsTrigger>
                    <TabsTrigger value="news-blog" className="w-full justify-start">
                      News & Blog
                    </TabsTrigger>
                    <TabsTrigger value="help-center" className="w-full justify-start">
                      Help
                    </TabsTrigger>
                    <TabsTrigger value="press-center" className="w-full justify-start">
                      Press Center
                    </TabsTrigger>
                    <TabsTrigger value="locations" className="w-full justify-start">
                      Shop By Location
                    </TabsTrigger>
                    <TabsTrigger value="brands" className="w-full justify-start">
                      ElectroHub Brands
                    </TabsTrigger>
                    <TabsTrigger value="affiliate" className="w-full justify-start">
                      Affiliate & Partners
                    </TabsTrigger>
                    <TabsTrigger value="ideas" className="w-full justify-start">
                      Ideas & Guides
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </div> */}

            <div className=" w-full">

              <Card>
                <CardContent className="pt-6">
                  <TabsContent value="warranty-information" className="mt-0">
                    <WarrantyInformation />
                  </TabsContent>
                  <TabsContent value="privacy-policy" className="mt-0">
                    <PrivacyPolicy />
                  </TabsContent>
                  <TabsContent value="terms-of-service" className="mt-0">
                    <TermsOfService />
                  </TabsContent>
                  <TabsContent value="financing-options" className="mt-0">
                    <FinancingOptions />
                  </TabsContent>
                  <TabsContent value="faqs" className="mt-0">
                    <Faqs />
                  </TabsContent>
                  <TabsContent value="careers" className="mt-0">
                    <Careers />
                  </TabsContent>
                  <TabsContent value="news-blog" className="mt-0">
                    <NewsBlog />
                  </TabsContent>
                  <TabsContent value="help-center" className="mt-0">
                    <Help />
                  </TabsContent>
                  <TabsContent value="press-center" className="mt-0">
                    <PressCenter />
                  </TabsContent>
                  <TabsContent value="locations" className="mt-0">
                    <ShopByLocation />
                  </TabsContent>
                  <TabsContent value="brands" className="mt-0">
                    <ElectrohubBrands />
                  </TabsContent>
                  <TabsContent value="affiliate" className="mt-0">
                    <AffiliatePartners />
                  </TabsContent>
                  <TabsContent value="ideas" className="mt-0">
                    <IdeasGuides />
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </main>

    </div>
  )
}