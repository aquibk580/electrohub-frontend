import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Product {
  id: number
  title: string
  price: number
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

const RelatedProducts = ({ category, currentProductId, }: { category: { id: number; name: string; image: string }; currentProductId: number }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category.id}/products`)
        const relatedProducts = response.data.filter((product: Product) => product.id !== currentProductId).slice(0, 4)
        setProducts(relatedProducts)
        setLoading(false)
      } catch (err) {
        setError("An error occurred while fetching related products.")
        setLoading(false)
        console.error("Error fetching related products:", err)
      }
    }

    fetchRelatedProducts()
  }, [category.id, currentProductId])

  if (loading) {
    return <div>Loading related products...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="relative">
      <h2 className="mb-4 text-xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-48 object-cover group-hover:opacity-75"
            />
            <h3 className="mt-2 text-lg font-medium">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts

