import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "iPhone 13 Plus",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%20List-X6UdstlIn5jfKMIX38uQHBce1PEOwS.png",
    price: "$2",
    stock: 10,
    status: "Active",
  },
  // Repeated for demonstration
]

export default function ProductList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">All Product Lists</h2>
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-[#004D00] text-white">
              <th className="py-3 px-4 text-left">Sr.No</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-t">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.price}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">
                  <span className="text-green-600 font-medium">{product.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

