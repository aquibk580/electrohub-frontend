import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import axios from "@/lib/axios";
import { ContactSkeleton } from "@/components/Seller/Skeletons";
import { Suspense, useEffect, useState } from "react";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export default function SellerContact(){
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      {isLoading ? (
        <>
        <Helmet>
        <title>Contact Support - Seller</title>
        <meta
          name="description"
          content="Electrohub Seller Support Contact Page"
        />
      </Helmet>
        <ContactSkeleton />
        </>
      ) : (
        <Suspense fallback={<ContactSkeleton />}>
          <MainSellerContact />
        </Suspense>
      )}
    </div>
  )


}

 function MainSellerContact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        { userType: "Seller", ...data }
      );
      if (response.status === 201) {
        toast.success("Your inquiry has been sent successfully!", {
          position: "top-center",
          theme: "dark",
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again later.", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Contact Support - Seller</title>
        <meta
          name="description"
          content="Electrohub Seller Support Contact Page"
        />
      </Helmet>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Seller Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Need assistance with your seller account, product listings, or
            orders? Our support team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          <Card className="border-primary/75 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">
                  Seller Support Hotline
                </h3>
                <p className="text-muted-foreground">
                  Available Monday to Friday, 9 AM - 6 PM.
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-primary font-medium block hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/75">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Email Support</h3>
                <p className="text-muted-foreground">
                  Reach out for seller-related inquiries, technical support, or
                  account issues.
                </p>
                <a
                  href="mailto:sellersupport@electrohub.com"
                  className="text-primary font-medium block hover:underline"
                >
                  sellersupport@electrohub.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/75 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">
                  Our headquarters is located in the heart of the city.
                </p>
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
          <Card className="border-primary/75  ">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary text-center mb-6">
                Submit a Support Request
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder="Issue with order, listing, etc."
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Describe your issue in detail..."
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
