import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { AppDispatch, RootState } from "@/redux/store";
import axios from "@/lib/axios";
import { setSeller } from "@/redux/slices/seller";
import { sellerSchema, type SellerFormData } from "./FormSchema";

export function SellerEditDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const seller = useSelector((state: RootState) => state.seller.seller);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: seller?.name || "",
      email: seller?.email || "",
      phone: seller?.phone || "",
      address: seller?.address || "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        name: seller?.name || "",
        email: seller?.email || "",
        phone: seller?.phone || "",
        address: seller?.address || "",
      });
    }
  }, [open, seller, form]);

  const onSubmit = async (data: SellerFormData) => {
    setIsSaving(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/${seller!.id}`,
        data
      );

      if (response.status === 200) {
        dispatch(
          setSeller({
            ...seller!,
            ...response.data.seller,
          })
        );
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary shadow-none text-accent-foreground/80 mt-20 rounded-full"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Update your profile details below. Click <strong>Save</strong> when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter company address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5">
              <Button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
