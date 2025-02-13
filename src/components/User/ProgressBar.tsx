import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Ellipsis } from "lucide-react";

const steps = [
  { title: "Order Confirmed", description: "Your order has been placed" },
  { title: "Shipped", description: "Your order has been shipped" },
  {
    title: "Out for Delivery",
    description:
      "Your order is out for delivery",
  },
  { title: "Delivered", description: "Your order has been delivered" },
];

const OrderProgress = ({ step }: { step: number }) => {
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressHeight((step / (steps.length - 1)) * 100);
    }, 0); // Delay for smooth effect

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full bg-white md:p-4 rounded-lg">
      <div className="relative">
        {/* Animated Gray Background Line */}
        <motion.div
          className="absolute left-[13px] top-0 w-[3px] bg-gray-300 rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: "calc(100% - 40px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>

        {/* Animated Green Progress Line */}
        <motion.div
          className="absolute left-[13px] top-0 w-[3px] bg-green-500 rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: `${progressHeight}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ maxHeight: "calc(100% - 36px)" }}
        ></motion.div>

        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start mb-6 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: index <= step ? 1 : 0.5, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: (index / steps.length) * 1, // Delays each step
            }}
          >
            {/* Step Indicator */}
            <motion.div
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ease-in-out",
                index <= step
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 bg-white text-gray-400"
              )}
            initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              {index <= step ? <Check size={20}/> : <><Clock/></>}
            </motion.div>

            {/* Step Details */}
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <h3
                className={cn(
                  "font-medium",
                  index <= step ? "text-green-500" : "text-gray-500"
                )}
              >
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
