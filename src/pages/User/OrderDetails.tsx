import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import OrderProgress from "@/components/User/ProgressBar";
import { useLocation, useParams } from "react-router-dom";
import { OrderItem } from "@/components/product/productTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const OrderDetails = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const [orderItem, setOrderItem] = useState<OrderItem>(
    location.state?.orderItem
  );
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/orders/${id}`
        );
        if (response.status === 200) {
          setOrderItem(response.data);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    };
    getAllOrders();
  }, []);

  const getorderTrackingSteps = (): number => {
    let result = 0;
    switch (orderItem.status) {
      case "OrderConfirmed":
        result = 0;
        break;
      case "Shipped":
        result = 1;
        break;
      case "Delivered":
        result = 3;
        break;
      default:
        result = 0;
    }
    return result;
  };

  const handleSubmitReview = () => {
    console.log({ rating, review });

    setRating(0);
    setReview("");
  };

  useEffect(() => {
    console.log(orderItem); // Check if it's correctly received
  }, [orderItem]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Order Details */}
      <Card>
        <CardContent className="pt-6 grid grid-cols-2">
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-4">
              {orderItem.product.name.substring(0,100) + "..."}
            </h2>

            <div className="text-sm mb-4">
              Seller: {orderItem.product.seller.name}
            </div>
            <div className="text-xl font-bold mb-6">
              ₹
              {formatPrice(
                orderItem.product.price -
                  (orderItem.product.price / 100) *
                    orderItem.product.offerPercentage
              )}
            </div>
          </div>
          <img
            src={orderItem.product.images[0].url}
            alt=""
            className="object-contain w-52 xl:place-self-end"
          />
        </CardContent>
        <CardFooter className="grid grid-rows-1">
          <OrderProgress step={getorderTrackingSteps()} />
          {orderItem.status === "Delivered" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-300">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-full sm:max-w-lg md:max-w-2xl w-full">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <StarIcon
                            className={`sm:w-8 sm:h-8 w-6 h-6 m-1 ${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Your Review</Label>
                    <Textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="mt-2 h-24 sm:h-28 w-full"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button
                    onClick={handleSubmitReview}
                    disabled={!rating}
                    className="bg-primary text-primary-foreground w-full sm:w-auto"
                  >
                    Submit Review
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{user?.name}</p>
              <p>{user?.address}</p>
              <p className="mt-4">Phone number: {user?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Price Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{orderItem.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>List Price</span>
                <span className="line-through text-gray-500">
                  ₹${orderItem.product.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Selling Price</span>
                <span>
                  ₹
                  {formatPrice(
                    orderItem.product.price -
                      (orderItem.product.price / 100) *
                        orderItem.product.offerPercentage
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-semibold">
                <span>Total Amount</span>
                <span>
                  ₹
                  {formatPrice(
                    (orderItem.product.price -
                      (orderItem.product.price / 100) *
                        orderItem.product.offerPercentage) *
                      orderItem.quantity
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
