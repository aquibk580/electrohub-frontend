import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lens } from "../ui/lens";

interface ProductImageProps {
  images: string[];
  title: string;
}

export default function ProductImageTablet({ images, title }: ProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Vertical Thumbnail Stack */}
      <div className="flex flex-col gap-2 w-20 max-h-96 overflow-y-auto">
        <div className="my-auto">
          {images.map((img, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-full h-20 object-cover rounded-lg border 
                  ${index === currentIndex ? "border-blue-500" : "border-transparent"}
                  cursor-pointer transition-all hover:opacity-80`}
                onClick={() => setCurrentIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
          <Lens hovering={hovering} setHovering={setHovering}>
            <img
              src={images[currentIndex]}
              alt={title}
              className="object-contain w-full h-full cursor-pointer"
            />
          </Lens>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black/80"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black/80"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}