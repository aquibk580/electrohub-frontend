import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { assets } from "@/assets/assets";

export default function ProductCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-10"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <img src={assets.laptop} alt="Products" />
                  <p>Lenovo Legion 5</p>
                  <h1 className="font-semibold">From ₹44990</h1>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0" />
      <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/30 p-[0.6rem] rounded-full hover:bg-white transition focus-visible:ring-0" />
    </Carousel>
  );
}
