import { Suspense } from "react"
import AllProducts from "@/components/Home/AllProducts"
import BannerCarousel from "@/components/Home/BannerCarousel"
import TopSellers from "@/components/Home/Brand-Selector"
import ProductCarousel from "@/components/Home/ProductCarousel"
import ServiceSection from "@/components/Home/ServiceSection"
import { Loader2 } from "lucide-react"
import "animate.css"

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

const Home = () => {
  return (
    <div className="flex flex-col space-y-12 md:space-y-1 lg:space-y-8 mx-auo px-4 sm:px-6 lg:px-5  md:py-2">
      {/* Hero Banner */}
      <section className="w-full animate__animated animate__fadeIn">
        <Suspense fallback={<LoadingFallback />}>
          <BannerCarousel />
        </Suspense>
      </section>

      {/* Featured Products */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-1s">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Discover our handpicked selection of premium products</p>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <ProductCarousel />
        </Suspense>
        
      </section>
      <hr className="h-1 bg-black rounded-full" />
      {/* All Products */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-2s">
      
        <Suspense fallback={<LoadingFallback />}>
          <AllProducts />
        </Suspense>
      </section>

<hr  className="bg-black h-1"/>
      {/* Top Sellers */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-3s">
        <Suspense fallback={<LoadingFallback />}>
          <TopSellers />
        </Suspense>
      </section>
      <hr  className="bg-black h-1"/>
      {/* Services */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-4s">
        <Suspense fallback={<LoadingFallback />}>
          <ServiceSection />
        </Suspense>
      </section>
    </div>
  )
}

export default Home

