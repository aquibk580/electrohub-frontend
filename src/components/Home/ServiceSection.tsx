"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { serviceContain, BackContent } from "@/assets/assets"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle  } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Card component for desktop
const ServiceCard = ({ item }: { item: (typeof serviceContain)[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Get the mock content based on the item id
  const backContent = BackContent[item.id as keyof typeof BackContent]

  return (
    <div className="h-[370px] hidden md:block perspective-1000">
      <motion.div
        className="relative w-full h-full cursor-pointer preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleFlip}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full max-w-2xl h-full rounded-xl bg-card shadow-md border border-border overflow-hidden backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="px-6 py-6">
            <h1 className="text-xl font-semibold text-card-foreground">{item.title}</h1>
            <h2 className="mt-2 text-sm text-muted-foreground">{item.desc}</h2>
          </div>
          <div className="w-full mt-4 rounded-b-xl overflow-hidden">
            <img
              src={item.img || "/placeholder.svg"}
              className="hover:scale-105 transition-transform duration-300 ease-in-out object-cover w-full h-64"
              alt={item.title}
            />
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full rounded-xl bg-card shadow-md border border-border overflow-y-auto px-6 py-6 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h1 className="text-xl font-semibold text-card-foreground mb-4">{item.title}</h1>

          {backContent.additionalInfo && (
            <p className="text-sm text-muted-foreground mb-4">{backContent.additionalInfo}</p>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Frequently Asked Questions</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={openItem || undefined}
              onValueChange={setOpenItem}
            >
              {backContent.faqs.map((faq, index) => {
                const itemValue = `item-${index}`;
                return (
                  <AccordionItem
                    key={index}
                    value={itemValue}
                    onMouseEnter={() => setOpenItem(itemValue)}
                    onMouseLeave={() => setOpenItem(undefined)}
                  >
                    <AccordionTrigger className="text-sm font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Mobile version using Tabs
const MobileServiceSection = () => {
  return (
    <div className="md:hidden">
      <Tabs defaultValue={serviceContain[0].id.toString()} className="w-full">
        <TabsList className="grid grid-cols-3 rounded-xl gap-1 mb-4">
          {serviceContain.map((item) => (
            <TabsTrigger key={item.id} value={item.id.toString()} className="flex items-center hover:bg-primary/30  rounded-xl gap-">
              {/* Icon visible on mobile only */}
              <item.icon className="h-5 w-5 "/> {/* Render icon */}
             

              {/* Text visible on larger screens */}
              <span className="hidden sm:inline">{item.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {serviceContain.map((item) => {
          const backContent = BackContent[item.id as keyof typeof BackContent]

          return (
            <TabsContent key={item.id} value={item.id.toString()}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md overflow-hidden">
                    <img src={item.img || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  </div>

                  {backContent.additionalInfo && (
                    <p className="text-sm text-muted-foreground">{backContent.additionalInfo}</p>
                  )}

                  {backContent.faqs && backContent.faqs.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <HelpCircle className="h-4 w-4" />
                        FAQs
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {backContent.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-sm">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-xs">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

const ServiceSection = () => {
  return (
    <div className="rounded-lg bg-background">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Services to help you shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Desktop version */}
        {serviceContain.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}

        {/* Mobile version */}
        <MobileServiceSection />
      </div>
    </div>
  )
}

export default ServiceSection

