import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Star } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.in/api/products');
        const result = await response.json();
        setProducts(result.products);
        console.log(result.products);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Filter products based on the selected category
  const filteredProducts =
    category === 'All' ? products : products.filter((p) => p.category === category.toLowerCase());


  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Our Products
      </h1>
      <ul className="mt-2 flex p-2 gap-2">
        {['All', 'Audio', 'Tv', 'Gaming', 'Mobile'].map((item, index) => (
          <li
            onClick={() => setCategory(item)}
            className={`px-2 py-1.5 cursor-pointer border rounded-full w-[80px] text-center ${
              category === item ? 'bg-green-900 text-white' : ''
            }`}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div className="w-full bg-[#9797970f] p-2 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full mix-blend-multiply h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-2">
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300 ease-in-out line-clamp-1">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-2 text-sm line-clamp-1">
                {product.description}
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-green-700 text-green-700 text-xs"
                    style={{ width: '14px', height: '14px' }}
                  />
                ))}
              </div>
              <div className="flex py-2 justify-between items-center">
                <button className="bg-white text-md font-medium border-black border px-3 py-1.5 hover:bg-green-900 hover:border-green-900 hover:text-white transition-all rounded-full">
                  Add to Cart
                </button>
                <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                {/* <span className="text-sm text-gray-500">{product.category}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
