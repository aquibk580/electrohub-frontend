import { useState, useEffect, useMemo, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Box, CheckCircle2, XCircle, SquareMenu, Ban } from "lucide-react";
import { DashboardStats } from "@/components/Admin/dashboard-stats";
import { Category, Product } from "@/types/entityTypes";
import axios from "@/lib/axios";
import { formatPrice } from "@/utils/FormatPrice";
import { Helmet } from "react-helmet-async";
import { AdminDashboardSkeleton } from "@/components/Admin/Skeletons";

interface TableWrapperProps {
  children: ReactNode;
}

interface ProductStats {
  totalProducts: number;
  inStock: number;
  discontinued: number;
  outOfStock: number;
  categories: number;
}

const ProductManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [productsStats, setProductsStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geAllProductsAndStats = async () => {
      try {
        const [productRes, statsRes, categoryRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/products/productStats`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/cms/categories`),
        ]);

        if (productRes.status === 200) {
          setProducts(productRes.data);
        }
        if (statsRes.status === 200) {
          setProductsStats(statsRes.data);
        }
        if (categoryRes.status === 200) {
          setCategories(categoryRes.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    geAllProductsAndStats();
  }, []);

  // Get initial page from URL params or default to 1
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const formatImageCell = (imageUrl: string) => {
    return (
      <div className="w-12 h-12 relative">
        <img
          src={imageUrl}
          alt="Product"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    );
  };

  const filteredData = useMemo(() => {
    let result = products;

    if (categoryFilter !== "All") {
      result = result.filter(
        (product) => product.categoryName === categoryFilter
      );
    }

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result.map((product) => ({
      id: product.id,
      name: product.name.substring(0, 30) + "...",
      image: formatImageCell(product.images[0].url),
      price:
        "₹" +
        formatPrice(
          product.price - (product.offerPercentage / 100) * product.price
        ),
      stock: product.stock,
      status: product.status,
      discount: product.offerPercentage + "%",
    }));
  }, [products, categoryFilter, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Handle row click with current page in URL
  const handleRowClick = (row: any) => {
    navigate(`/admin/productsmanage/${row.id}?returnPage=${currentPage}`);
  };

  // Reset to stored page when returning from detail view
  useEffect(() => {
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      setCurrentPage(parseInt(returnPage));
      // Clean up the return page parameter
      searchParams.delete("returnPage");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [location.search]);

  const TableWrapper = ({ children }: TableWrapperProps) => {
    if (isMobile) {
      return (
        <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
          <div className="min-w-[600px]">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      );
    }
    return <>{children}</>;
  };

  const productStats = [
    {
      icon: <Box className="w-6 h-6 text-primary" />,
      label: "Total Products",
      value: productsStats?.totalProducts ? productsStats.totalProducts : 0,
    },

    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      label: "In Stock",
      value: productsStats?.inStock || 0,
    },
    {
      icon: <XCircle className="w-6 h-6 text-primary" />,
      label: "Out of Stock",
      value: productsStats?.outOfStock || 0,
    },
    {
      icon: <Ban className="w-6 h-6 text-primary" />,
      label: "Discountinued",
      value: productsStats?.discontinued || 0,
    },
    {
      icon: <SquareMenu className="w-6 h-6 text-primary" />,
      label: "Categories",
      value: productsStats?.categories || 0,
    },
  ];
  const categoryOptions = categories?.map((category) => {
    return {
      label: category.name,
      value: category.name,
    };
  });
  categoryOptions.unshift({ label: "All", value: "All" });

  if (loading) {
    return <AdminDashboardSkeleton type="products" />;
  }

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
      <Helmet
        title="Products | Admin"
        meta={[
          {
            name: "description",
            content: "All Products By Sellers",
          },
        ]}
      />
      <Card className="shadow-md rounded-xl border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/20 via-slate-900/20 to-primary/10 py-4">
        <CardContent className="p-4 ">
          <DashboardStats
            stats={productStats}
            filterOptions={categoryOptions}
            onFilterChange={setCategoryFilter}
            activeFilter={categoryFilter}
            showFilters={true}
          />
        </CardContent>
      </Card>

      <Card className="shadow-md bg-primary/5 rounded-xl border-primary/75 dark:bg-gradient-to-br from-primary/10 via-slate-900/15 to-primary/10 py-4">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">
            Products Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          <SearchFilterSort onSearch={setSearchTerm} />

          <TableWrapper>
            {paginatedData.length > 0 ? (
              <DataTable
                headers={[
                  { key: "id", label: "ID" },
                  { key: "image", label: "image" },
                  { key: "name", label: "Name" },
                  { key: "price", label: "Price" },
                  { key: "stock", label: "Stock" },
                  { key: "status", label: "Status" },
                  { key: "discount", label: "Discount" },
                ]}
                data={paginatedData}
                type="products"
                onRowClick={handleRowClick}
              />
            ) : (
              <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                Products not available
              </div>
            )}
          </TableWrapper>

          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={setItemsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
