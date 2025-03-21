"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingCart,
  Gift,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const footerLinks = {
    department: [
      "Smartphones",
      "Televisions",
      "Laptops",
      "Tablets",
      "Keyboards",
      "Mice",
      "Device Covers",
      "Gaming Laptops",
      "Electronics & Gadgets",
      "Smartwatches",
      "Earbuds",
      "Accessories",
    ],
    aboutUs: [
      "About ElectroHub",
      "Careers",
      "News & Blog",
      "Help",
      "Press Center",
      "Shop By Location",
      "ElectroHub Brands",
      "Affiliate & Partners",
      "Ideas & Guides",
    ],
    customerService: [
      "Contact Us",
      "FAQs",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Order Tracking",
      "Warranty Information",
      "Privacy Policy",
      "Terms of Service",
      "Financing Options",
    ],
  }

  const paymentMethods = [
    "visa",
    "mastercard",
    "paypal",
    "apple-pay",
    "google-pay",
    "amex",
    "maestro",
    "jcb",
    "mir",
    "unionpay",
    "upi",
  ]

  return (
    <footer className="w-full border-t border-border bg-background pt-10 pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Logo and Description Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">ElectroHub</span>
            </div>
            <p className="text-muted-foreground text-base mb-4 max-w-md">
              Your one-stop shop for all electronics and tech gadgets. We offer the latest products with competitive
              prices and excellent customer service.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>

            {/* Newsletter - Desktop */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Newsletter</h3>
              <p className="text-base text-muted-foreground mb-3">
                Subscribe for the latest products, deals, and tech news.
              </p>
              <form className="flex space-x-2">
                <Input type="email" placeholder="Your email" className="h-10 text-sm" />
                <Button className="h-10">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Mobile Collapsible Sections */}
          <div className="lg:hidden col-span-1 space-y-2">
            {/* Department Links - Mobile */}
            <Collapsible
              open={openSections["department"]}
              onOpenChange={() => toggleSection("department")}
              className="border-b border-border pb-2"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-medium text-base">Department</span>
                  {openSections["department"] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 pb-3">
                  {footerLinks.department.map((item) => (
                    <li key={item} className="text-sm">
                      <Link
                        to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* About Us Links - Mobile */}
            <Collapsible
              open={openSections["aboutUs"]}
              onOpenChange={() => toggleSection("aboutUs")}
              className="border-b border-border pb-2"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-medium text-base">About Us</span>
                  {openSections["aboutUs"] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 pb-3">
                  {footerLinks.aboutUs.map((item) => (
                    <li key={item} className="text-sm">
                      <Link
                        to={`/about/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Customer Service - Mobile */}
            <Collapsible
              open={openSections["customerService"]}
              onOpenChange={() => toggleSection("customerService")}
              className="border-b border-border pb-2"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-medium text-base">Customer Service</span>
                  {openSections["customerService"] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 pb-3">
                  {footerLinks.customerService.map((item) => (
                    <li key={item} className="text-sm">
                      <Link
                        to={`/customer-service/${item.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Newsletter - Mobile */}
            <div className="pt-4 pb-2">
              <h3 className="text-base font-semibold mb-3 text-foreground">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Subscribe for the latest products, deals, and tech news.
              </p>
              <form className="flex space-x-2">
                <Input type="email" placeholder="Your email" className="h-10 text-sm" />
                <Button className="h-10">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Desktop Footer Links */}
          <div className="hidden lg:block lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Department</h2>
            <ul className="space-y-2">
              {footerLinks.department.slice(0, 6).map((item) => (
                <li key={item} className="text-base">
                  <Link
                    to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">More Categories</h2>
            <ul className="space-y-2">
              {footerLinks.department.slice(6).map((item) => (
                <li key={item} className="text-base">
                  <Link
                    to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">About Us</h2>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((item) => (
                <li key={item} className="text-base">
                  <Link
                    to={`/about/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Customer Service</h2>
            <ul className="space-y-2">
              {footerLinks.customerService.map((item) => (
                <li key={item} className="text-base">
                  <Link
                    to={`/customer-service/${item.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-foreground">Accepted Payments</h3>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-11 gap-2">
            {paymentMethods.map((payment) => (
              <div
                key={payment}
                className="bg-muted/50 rounded-md p-2 flex items-center justify-center h-fit sm:h-14 md:h-16"
              >
                <img
                  src={`/payments/${payment}.svg`}
                  alt={payment}
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to="/become-seller"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              <span>Become Seller</span>
            </Link>
            <Link
              to="/gift-cards"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Gift className="h-4 w-4 mr-1.5" />
              <span>Gift Cards</span>
            </Link>
            <Link
              to="/help-center"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <HelpCircle className="h-4 w-4 mr-1.5" />
              <span>Help Center</span>
            </Link>
          </div>

          {/* Terms and Privacy */}
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy & Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ElectroHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

