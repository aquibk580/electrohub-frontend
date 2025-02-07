import { assets } from "@/assets/assets";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderProgress from "@/components/User/ProgressBar";

const OrderDetails = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Order Details */}
      <Card>
        <CardContent className="pt-6 grid grid-cols-2">
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-4">
              SAMSUNG Evo Plus 64 GB MicroSDXC Class 10 130 MB/s Memory Card
            </h2>

            <div className="text-sm text-gray-500 mb-2">White</div>
            <div className="text-sm mb-4">Seller: Affordla</div>
            <div className="text-xl font-bold mb-6">₹799</div>

            {/* Order Timeline */}
          </div>
          <img src={assets.laptop} alt="" className="object-contain w-52 xl:place-self-end" />
        </CardContent>
        <CardFooter className="">
          <OrderProgress step={2} />
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
              <p className="font-medium">Aquib Khan</p>
              <p>Akshya Nagar 1st Block 1st Cross,</p>
              <p>Rammurthy nagar,</p>
              <p>Thane</p>
              <p>Maharashtra - 400605</p>
              <p className="mt-4">Phone number: 9090909090</p>
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
                <span>List Price</span>
                <span className="line-through text-gray-500">₹1,899</span>
              </div>
              <div className="flex justify-between">
                <span>Selling Price</span>
                <span>₹799</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-semibold">
                <span>Total Amount</span>
                <span>₹799</span>
              </div>
              <div className="pt-2 text-sm">Cash on Delivery: ₹799</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
