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
import { Edit, StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { ReviewType } from "@/pages/User/Review";

// Schema validation using Zod
const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  content: z.string().min(5, "Review must be at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewEditProps {
  reviewId: number;
  oldRating: number;
  content: string;
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

const ReviewEditModel = ({
  reviewId,
  oldRating,
  content,
  setReviews,
}: ReviewEditProps) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      rating: oldRating,
      content: content,
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsEditing(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/products/review/${reviewId}`,
        data
      );
      if (response.status === 200) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? response.data.review : r))
        );
        toast.success("Review Updated successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.messgae, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsEditing(false);
      reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 dark:text-destructive-foreground dark:bg-blue-800/30 border border-blue-500 rounded-xl hover:bg-gray-100 ">
          Edit <Edit className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full sm:max-w-lg md:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
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
              {isEditing ? "Updating..." : "Update Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewEditModel;
