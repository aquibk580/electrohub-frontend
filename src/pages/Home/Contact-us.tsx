"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/hooks/use-toast"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"


export default function ContactUs() {
  //   const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // toast({
    //   title: "Message Sent",
    //   description: "We'll get back to you as soon as possible.",
    // })
    toast.success("Product added successfully", {
      position: "top-center",
      theme: "dark",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Contact us</title>
        <meta name="description" content="Electrohub Contact Us Page" />
      </Helmet>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-muted-foreground">
                  Our customer support team is available Monday through Friday, 9am to 6pm.
                </p>
                <a href="tel:+1234567890" className="text-primary font-medium block hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">
                  For general inquiries, support requests, or business opportunities.
                </p>
                <a href="mailto:support@electrohub.com" className="text-primary font-medium block hover:underline">
                  support@electrohub.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">Our headquarters is located in the heart of the city.</p>
                <address className="not-italic text-primary font-medium">
                  123 Tech Avenue
                  <br />
                  Silicon Valley, CA 94043
                </address>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary text-center mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="py-8 mt-8">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What are your shipping options?",
                answer:
                  "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order ships, you'll receive a tracking number via email that you can use to monitor your delivery status.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy for most items. Products must be in original condition with all packaging.",
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden h-[400px] bg-muted">
          {/* Replace with actual map or embed Google Maps */}
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <div className="text-center">
              {/* <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-4" /> */}
              {/* <p className="text-muted-foreground">Interactive map would be displayed here</p> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2114.7998618700612!2d72.97680132885189!3d19.18886824421335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b90a6d3d1c2d%3A0x239d6bfd46240353!2sSahyog%20College%20of%20IT%20and%20Management!5e0!3m2!1sen!2sin!4v1742578033064!5m2!1sen!2sin" width="1250" height="400" style={{ border: 0 }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

