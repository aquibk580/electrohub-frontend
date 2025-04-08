import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Edit,
  ExternalLink,
  ImagePlus,
  Loader2,
} from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import { ProductCrousel } from "@/pages/Admin/ContentManagement";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const productCarouselSchema = z.object({
  name: z.string().min(1, "Banner name is required").optional(),
  image: z.custom<FileList>().optional(),
  href: z.string().min(1, "Link URL is required").optional(),
  price: z
    .union([
      z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
      z.number(),
    ])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .optional(),
  isActive: z.boolean().optional().default(true),
});

type ProductCarouselSchemaType = z.infer<typeof productCarouselSchema>;

export default function EditProductCarouselButton({
  productCarousel,
  setProductCarousels,
}: {
  setProductCarousels: React.Dispatch<React.SetStateAction<ProductCrousel[]>>;
  productCarousel: ProductCrousel;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    productCarousel.imageUrl
  );

  const form = useForm<ProductCarouselSchemaType>({
    resolver: zodResolver(productCarouselSchema),
    defaultValues: {
      name: productCarousel.name,
      href: productCarousel.href,
      price: productCarousel.price,
      isActive: productCarousel.isActive,
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const imageFile = form.watch("image");
  const isActive = form.watch("isActive");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  useEffect(() => {
    if (open) {
      setPreview(productCarousel.imageUrl);
    }
  }, [open, productCarousel.imageUrl]);

  const handleClose = () => {
    form.reset();
    setPreview(productCarousel.imageUrl);
    setOpen(false);
  };

  const onSubmit = async (data: ProductCarouselSchemaType) => {
    try {
      const formData = new FormData();
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.price) {
        formData.append("price", String(data.price));
      }
      if (data.href) {
        formData.append("href", data.href);
      }
      formData.append("isActive", String(data.isActive));

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels/${
          productCarousel.id
        }`,
        formData
      );

      if (response.status === 200) {
        setProductCarousels((prev) =>
          prev.map((b) =>
            b.id === productCarousel.id ? response.data.productCarousel : b
          )
        );

        toast.success("Product updated successfully", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.error("Failed to update product:", error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      handleClose();
    }
  };

  return (  
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 text-primary hover:text-primary hover:bg-primary/10 rounded-lg border-primary/20"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Product</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Update the product details for
            <Badge variant="outline" className="font-semibold text-xs">
              {productCarousel.name}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 py-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        {...field}
                        className="h-10 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" />
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter price"
                        {...field}
                        className="h-10 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium flex items-center gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    Link URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product URL"
                      {...field}
                      className="h-10 focus-visible:ring-offset-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-3">
              <h3 className="text-base font-medium">Current Image</h3>
              <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex items-center justify-center p-2">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Product Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <ImagePlus className="h-10 w-10" />
                    <span>No image available</span>
                  </div>
                )}
              </Card>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Upload New Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChange(e.target.files);
                      }}
                      {...fieldProps}
                      className={cn(
                        "cursor-pointer file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-primary-foreground file:font-medium hover:file:bg-primary/90",
                        !value && "text-muted-foreground"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>
                      Enable or disable this product in the carousel
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
