import { useState } from "react";
import { motion } from "framer-motion";
import { serviceContain, BackContent } from "@/assets/assets";

// Card component
const ServiceCard = ({ item }: { item: typeof serviceContain[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Get the mock content based on the item id
  const backContent = BackContent[item.id as keyof typeof BackContent];

  return (
    <div className="h-96 hidden sm:block" style={{ perspective: "1000px" }}>
      <div
        className="relative w-72 md:w-80 lg:w-96 h-fit cursor-pointer mx-auto"
        onClick={handleFlip}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-72 md:w-80 lg:w-96 h-fit rounded-xl bg-card shadow-lg border border-border overflow-hidden"
          style={{ backfaceVisibility: "hidden", zIndex: 10 }}
        >
          <div className="px-4 md:px-6 py-5 md:py-7">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-card-foreground">
              {item.title}
            </h1>
            <h2 className="mt-2 md:mt-3 text-xs md:text-sm lg:text-lg font-normal text-muted-foreground">
              {item.desc}
            </h2>
          </div>
          <div className="w-72 md:w-80 lg:w-96 mt-4 rounded-b-xl overflow-hidden">
            <img
              src={item.img}
              className="hover:scale-105 transition-transform duration-300 ease-in-out object-cover w-72 md:w-80 lg:w-96 h-48 md:h-56 lg:h-64"
              alt={item.title}
            />
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-72 md:w-80 lg:w-96 h-96 rounded-xl bg-card shadow-lg border border-border overflow-y-auto px-4 md:px-6 py-5 md:py-7"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-card-foreground mb-3 md:mb-4">
            {item.title}
          </h1>

          {backContent.additionalInfo && (
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-3 md:mb-4">
              {backContent.additionalInfo}
            </p>
          )}

          {backContent.faqs && backContent.faqs.length > 0 && (
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-base md:text-lg font-medium">Frequently Asked Questions</h2>
              {backContent.faqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-2 md:pb-3 mb-2 md:mb-3">
                  <h3 className="font-medium text-sm md:text-base text-card-foreground">{faq.question}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          <button
            className="mt-4 md:mt-6 text-xs md:text-sm text-primary hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            Back to service
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <div className="px-4 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10 rounded-lg bg-background">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
        Services to help you shop
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
        {serviceContain.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;