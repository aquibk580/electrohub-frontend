import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "@/lib/axios";
import { Product } from "../product/productTypes";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(searchRef, () => {
    setIsFocused(false);
  });

  // Fetch search results when debounced search term changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.length < 2) {
        setFilteredProducts([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/user/products/search?query=${encodeURIComponent(
            debouncedSearchTerm
          )}`
        );
        setFilteredProducts(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  // Highlight matching text in search results
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-primary/20 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-muted-foreground">
          <Search size={18} />
        </div>

        <Input
          type="text"
          placeholder="Search products..."
          className="pl-10 pr-10 h-11 rounded-full border-muted-foreground/20 focus-visible:ring-primary/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />

        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 h-7 w-7"
            onClick={handleClearSearch}
          >
            <X size={16} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && (searchTerm.length > 1 || filteredProducts.length > 0) && (
        <div className="absolute mt-1 w-full bg-background rounded-lg border border-border shadow-lg z-50 overflow-hidden transition-all duration-200 ease-in-out">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                Searching...
              </span>
            </div>
          ) : filteredProducts.length > 0 ? (
            <ul className="max-h-[70vh] overflow-auto py-2">
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center px-4 py-2 hover:bg-muted transition-colors duration-150 ease-in-out"
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="h-12 w-12 rounded-md bg-muted flex-shrink-0 overflow-hidden border">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {highlightMatch(product.name, debouncedSearchTerm)}
                      </p>
                      {product.categoryName && (
                        <p className="text-xs text-muted-foreground">
                          {product.categoryName}
                        </p>
                      )}
                    </div>
                    <div className="ml-2 text-sm font-medium text-primary">
                      ${product.price.toFixed(2)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchTerm.length > 1 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">No products found for "{searchTerm}"</p>
            </div>
          ) : null}

          {filteredProducts.length > 0 && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                className="w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  window.location.href = `/search?q=${encodeURIComponent(
                    searchTerm
                  )}`;
                  setIsFocused(false);
                }}
              >
                View all results
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
