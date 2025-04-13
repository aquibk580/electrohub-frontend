import { useState } from "react";
import { Lens } from "../ui/lens";
import { Skeleton } from "../ui/skeleton";
import { ThumbnailSkeleton } from "./productSkeletons";

interface ProductImageProps {
  images: string[];
  title: string;
  loading: boolean;
}

export default function ProductImage({
  images,
  title,
  loading,
}: ProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <div className="space-y-4 flex flex-col">
      {/* Main Image */}
      <div className="relative w-full max-w-fit overflow rounded-lg bg-gray-100 dark:bg-gray-900 place-self-center">
        <Lens hovering={hovering} setHovering={setHovering}>
          <div className="bg-muted dark:bg-black flex justify-center items-center w-fit h-fit">
            <img
              src={images[currentIndex]}
              alt={title}
              className="w-auto h-[450px] object-contain cursor-pointer"
            />
          </div>
        </Lens>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-left gap-2">
        {loading ? (
          <ThumbnailSkeleton />
        ) : (
          images
            .filter((_, index) => index !== currentIndex)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-14 sm:w-20 lg:w-28 h-auto rounded-lg border cursor-pointer"
                onClick={() => setCurrentIndex(images.indexOf(img))}
              />
            ))
        )}
      </div>
    </div>
  );
}
