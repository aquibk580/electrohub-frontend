import { cn, formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

interface OrderProgressProps {
  trackingSteps: {
    steps: Array<{ title: string; description: string }>;
    step: number;
    date: Date;
  };
}

const OrderProgress = ({ trackingSteps }: OrderProgressProps) => {
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressHeight(
        (trackingSteps.step / (trackingSteps.steps.length - 1)) * 100
      );
    }, 0); // Delay for smooth effect

    return () => clearTimeout(timer);
  }, [trackingSteps.step]);

  return (
    <div className="w-full bg-background md:p-4 rounded-lg">
      <div className="relative">
        {/* Animated Background Line */}
        <motion.div
          className="absolute left-[13px] top-0 w-[3px] bg-muted rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: "calc(100% - 40px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
  
        {/* Animated Progress Line */}
        <motion.div
          className="absolute left-[13px] top-0 w-[3px] bg-primary rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: `${progressHeight}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ maxHeight: "calc(100% - 36px)" }}
        ></motion.div>
  
        {trackingSteps.steps.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start mb-6 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: index <= trackingSteps.step ? 1 : 0.5, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: (index / trackingSteps.steps.length) * 1, // Delays each step
            }}
          >
            {/* Step Indicator */}
            <motion.div
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ease-in-out",
                index <= trackingSteps.step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 bg-background text-muted-foreground"
              )}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              {index <= trackingSteps.step ? (
                <Check size={20} />
              ) : (
                <>
                  <Clock size={16} />
                </>
              )}
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
              <div>
                <h3
                  className={cn(
                    "font-medium",
                    index <= trackingSteps.step
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground/70">{item.description}</p>
              </div>
              {index <= trackingSteps.step && (
                <h1 className="text-foreground">{formatDate(trackingSteps.date)}</h1>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
