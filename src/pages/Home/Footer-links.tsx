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

      <main className="  overflow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
          <div className="flex flex-col md:flex-row gap-6">
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