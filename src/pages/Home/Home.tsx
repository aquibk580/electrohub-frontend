import { Suspense } from "react"
import AllProducts from "@/components/Home/AllProducts"
import BannerCarousel from "@/components/Home/BannerCarousel"
import TopSellers from "@/components/Home/Brand-Selector"
import ProductCarousel from "@/components/Home/ProductCarousel"
import ServiceSection from "@/components/Home/ServiceSection"
import { Loader2 } from "lucide-react"
import { Helmet } from "react-helmet-async"
import "animate.css"

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

const Home = () => {
  return (

    <div className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20 mx-auo px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Helmet>
        <title>Electrohub</title>
        <meta name="description" content="Powering Your Tech Life!" />
      </Helmet>
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

      {/* All Products */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-2s">
        <Suspense fallback={<LoadingFallback />}>
          <AllProducts />
        </Suspense>
      </section>

      {/* Top Sellers */}
      <section className="w-full animate__animated animate__fadeIn animate__delay-3s">
        <Suspense fallback={<LoadingFallback />}>
          <TopSellers />
        </Suspense>
      </section>

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

