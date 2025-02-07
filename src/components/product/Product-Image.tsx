import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Lens } from "@/components/ui/lens";

interface ProductImageProps {
  image: string;
  title: string;
  prevImage: () => void;
  nextImage: () => void;
}

export default function ProductImage({
  image,
  title,
  prevImage,
  nextImage,
}: ProductImageProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
      <Lens hovering={hovering} setHovering={setHovering}>
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-contain w-full h-full cursor-pointer hover:cursor-pointer"
        />
      </Lens>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black/80 cursor-pointer hover:cursor-pointer"
        onClick={prevImage}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black/80 cursor-pointer hover:cursor-pointer"
        onClick={nextImage}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
          
    </div>
  );
}
