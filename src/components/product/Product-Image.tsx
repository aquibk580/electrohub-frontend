import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lens } from "../ui/lens";

interface ProductImageProps {
  images: string[];
  title: string;
}

export default function ProductImage({ images, title }: ProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4 flex flex-col">
      {/* Main Image */}
      <div className="relative w-full max-w-fit overflow rounded-lg bg-gray-100 dark:bg-gray-900 place-self-center">
        <Lens hovering={hovering} setHovering={setHovering}>
          <div className="bg-primary/50 flex justify-center items-center w-fit h-fit">
            <img
              src={images[currentIndex]}
              alt={title}
              className="w-auto h-[400px] object-contain cursor-pointer"
            />
          </div>
        </Lens>
        {/* <Button
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
        </Button> */}
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-left gap-2">
  {images
    .filter((_, index) => index !== currentIndex)
    .map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index}`}
        className="w-14 sm:w-20 lg:w-28 h-auto rounded-lg border border-transparent cursor-pointer"
        onClick={() => setCurrentIndex(images.indexOf(img))} 
      />
    ))}
</div>

    </div>
  );
}

