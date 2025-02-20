import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

// Schema validation using Zod
const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  content: z.string().min(5, "Review must be at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/products/${productId}/review`,
        data
      );
      if (response.status === 201) {
        toast.success("Review added successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.messgae, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      reset();
      setRating(0);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-300">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full sm:max-w-lg md:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating Section */}
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star, { shouldValidate: true });
                  }}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`sm:w-8 sm:h-8 w-6 h-6 m-1 ${
                      star <= watch("rating")
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Review Textarea */}
          <div>
            <Label>Your Review</Label>
            <Textarea
              {...register("content")}
              placeholder="Share your experience with this product..."
              className="mt-2 h-24 sm:h-28 w-full"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={!watch("rating")}
              className="bg-primary text-primary-foreground w-full sm:w-auto"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
