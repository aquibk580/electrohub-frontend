"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { ForgotPasswordFormSchema, type ForgotPasswordFormSchemaType } from "@/components/Auth/FormSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MailIcon, ArrowLeftIcon, Loader2 } from "lucide-react"

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormSchemaType) => void
  isSubmitting: boolean
  navigateUrl: string
  userType: "user" | "seller"
}

export function ForgotPasswordForm({ onSubmit, isSubmitting, navigateUrl, userType }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return (
    <Card className="border shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
          <MailIcon className="w-6 h-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Link
          to={navigateUrl}
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  )
}
