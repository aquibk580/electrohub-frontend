import React, { ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Box, TagIcon, CheckCircle2, XCircle, SquareMenu, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import debounce from "lodash.debounce";

// ==========================================
// Mock Data 
// ==========================================
const mockData = {
  products: Array.from({ length: 50 }, (_, i) => ({
    id: `PRD${1000 + i}`,
    image: `/orders/img-${Math.floor(Math.random() * 7) + 1}.jpg`,
    title: `${
      ["iPhone 15 Pro", "MacBook Pro", "Sony WH-1000XM4", "Apple Watch Series 8", "Samsung Galaxy S23", 
       "Dell XPS 13", "AirPods Pro", "Galaxy Watch 5", "iPad Pro", "Surface Laptop"][i % 10]
    } ${["128GB", "256GB", "512GB"][i % 3]}`,
    seller: `Seller ${i + 1}`,
    price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
    quantity: Math.floor(Math.random() * 100),
    category: ["Phones", "PCs", "Headphones", "Smart Watches", "Gadgets"][i % 5],
    status: ["In Stock", "Out of Stock"][i % 5 === 0 ? 1 : 0],
    details: {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      specifications: {
        "Display": ["6.7-inch Super Retina XDR", "6.1-inch Liquid Retina", "15.6-inch 4K UHD", "1.9-inch AMOLED"][i % 4],
        "Processor": ["A17 Pro chip", "M2 Pro", "Intel Core i7", "Exynos 2200"][i % 4],
        "RAM": ["8GB", "16GB", "32GB"][i % 3],
        "Storage": ["128GB", "256GB", "512GB", "1TB"][i % 4],
        "Battery": ["4000mAh", "5000mAh", "6000mAh"][i % 3],
        "OS": ["iOS 17", "macOS Sonoma", "Windows 11", "Android 14"][i % 4]
      },
      variants: [
        {
          color: ["Space Black", "Silver", "Gold", "Blue"][i % 4],
          storage: ["128GB", "256GB", "512GB"][i % 3],
          price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
          quantity: Math.floor(Math.random() * 50)
        },
        {
          color: ["Space Black", "Silver", "Gold", "Blue"][(i + 1) % 4],
          storage: ["128GB", "256GB", "512GB"][(i + 1) % 3],
          price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
          quantity: Math.floor(Math.random() * 50)
        }
      ],
      reviews: Array.from({ length: 5 }, (_, j) => ({
        rating: Math.floor(Math.random() * 2) + 4,
        comment: "Great product! Exactly as described.",
        userName: `User ${j + 1}`,
        date: `Feb ${Math.floor(Math.random() * 28) + 1}, 2024`
      })),
      warranty: "1 Year Manufacturer Warranty",
      returnPolicy: "30 Days Return Policy"
    }
  })),
  productStats: {
    totalProducts: "4,65,053",
    newProducts: "65",
    inStock: "4,65,000",
    outOfStock: "53",
    categories: "7"
  },
}
const tableHeaders= {
  product: [
    { key: "image", label: "Image" },
    { key: "id", label: "ID" },
    { key: "title", label: "Product Name" },
    { key: "seller", label: "Seller" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "category", label: "Category" },
  ],
}

// ==========================================
// Table Wrapper Component
// ==========================================
interface WrapperProps {
  children: ReactNode;
}

 const TableWrapper = ({ children }: WrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
        <div className="min-w-[600px]">{children}</div>
        <ScrollBar className="mt-9" orientation="horizontal" />
      </ScrollArea>
    );
  }
  return <>{children}</>;
};

// ==========================================
// Selector Wrapper Component
// ==========================================
 const SelectorWrapper = ({ children }: WrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
        <div className="flex space-x-4">{children}</div>
        <ScrollBar className="mt-72" orientation="horizontal" />
      </ScrollArea>
    );
  }
  return <>{children}</>;
};

// ==========================================
// Mobile Tab Select Component
// ==========================================
interface MobileTabSelectProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

 const MobileTabSelect: React.FC<MobileTabSelectProps> = ({ activeTab, onTabChange }) => {
  return (
    <Select value={activeTab} onValueChange={onTabChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select tab" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="allPayments">All Transactions</SelectItem>
        <SelectItem value="withdrawlRequest">Withdrawal Requests</SelectItem>
        <SelectItem value="customerRefunds">Refund Requests</SelectItem>
      </SelectContent>
    </Select>
  );
};

// ==========================================
// Most Searched Products Component
// ==========================================
interface Product {
  name: string;
  searches: number;
}

interface MostSearchedProductsProps {
  data: Product[];
}

 const MostSearchedProducts: React.FC<MostSearchedProductsProps> = ({ data }) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((item) => item.searches));

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Most Searched Products</CardTitle>
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((product, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.searches}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${(product.searches / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// ==========================================
// Dashboard Stats Component
// ==========================================
interface StatItem {
  icon?: ReactNode;
  label: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
  };
  variant?: "default" | "payment";
}

interface FilterOption {
  label: string;
  value: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  activeFilter?: string;
  showFilters?: boolean;
  variant?: "default" | "payment";
}

const StatCard = ({ icon, label, value, change, variant = "default" }: StatItem) => {
  if (variant === "payment") {
    return (
      <div className="bg-white dark:bg-slate-950 rounded-lg p-4 shadow-sm flex-1 min-w-fit my-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground truncate">{label}</p>
          <div className="flex items-baseline gap-2 flex-col">
            <p className="text-2xl font-semibold truncate">{value}</p>
            {change && (
              <div className={`text-sm font-medium flex items-center gap-1 ${
                change.value > 0 ? "text-green-600" : "text-red-600"
              }`}>
                <span>{change.value > 0 ? "↑" : "↓"}</span>
                <span>{Math.abs(change.value)}%</span>
                <span className="text-muted-foreground text-xs">
                  {change.label || "VS Last Month"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-primary/10 dark:bg-primary/5 rounded-lg p-4 min-w-[180px] sm:min-w-[200px]">
      {icon && (
        <div className="p-2 bg-primary/20 dark:bg-primary/10 rounded-full">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground truncate">{label}</p>
        <p className="text-2xl font-semibold truncate">{value}</p>
      </div>
    </div>
  );
};

 const DashboardStats = ({
  stats,
  filterOptions = [],
  onFilterChange,
  activeFilter = "",
  showFilters = true,
  variant = "default",
}: DashboardStatsProps) => {
  return (
    <div className="space-y-6">
      <SelectorWrapper>
        <div className={`flex gap-4 ${variant === "payment" ? "flex" : "flex-row overflow-x-auto"}`}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} variant={variant} />
          ))}
        </div>
      </SelectorWrapper>

      {showFilters && filterOptions.length > 0 && (
        <SelectorWrapper>
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange?.(option.value)}
                className={`px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeFilter === option.value
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SelectorWrapper>
      )}
    </div>
  );
};

// ==========================================
// Data Table Component
// ==========================================
interface TableProps {
  headers: Array<{ key: string; label: string }>;
  data: any[];
  type: string;
  onRowClick?: (row: any) => void;
}

 const DataTable = ({ headers, data, type, onRowClick }: TableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="w-full">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead className="pl-3 sticky top-0 bg-background text-base min-w-32 whitespace-nowrap" key={header.key}>
                    {header.label}
                  </TableHead>
                ))}
                {onRowClick && <TableHead className="w-[50px] sticky top-0 bg-background" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={index} 
                  className={onRowClick ? "cursor-pointer whitespace-nowrap" : ""} 
                  onClick={() => onRowClick?.(row)}
                >
                  {headers.map((header) => (
                    <TableCell className="pl-3 text-base whitespace-nowrap" key={header.key}>
                      {row[header.key]}
                    </TableCell>
                  ))}
                  {onRowClick && (
                    <TableCell>
                      <ChevronRight className="h-5 w-5" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Pagination Controls Component
// ==========================================
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

 const PaginationControls = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground whitespace-nowrap mr-2">Items per page</span>
        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue>{itemsPerPage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Pagination className="ml-auto">
        <PaginationContent className="flex items-center gap-1">
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          {totalPages <= 5 ? (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page} className="hidden sm:block">
                <PaginationLink 
                  onClick={() => onPageChange(page)} 
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              {[1, 2, totalPages - 1, totalPages].map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink 
                    onClick={() => onPageChange(page)} 
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </>
          )}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

// ==========================================
// Search Filter Sort Component
// ==========================================
interface SearchFilterProps {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onFilter: (value: string) => void;
  placeholder?: string;
  filterOptions?: Array<{ label: string; value: string }>;
  sortOptions?: Array<{ label: string; value: string }>;
}

 const SearchFilterSort = ({
  onSearch,
  onSort,
  onFilter,
  placeholder = "Search here...",
  filterOptions = [],
  sortOptions = [],
  className = "",
}: SearchFilterProps & { className?: string }) => {
  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 300),
    []
  );

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-8 w-full"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-row">
        {sortOptions.length > 0 && (
          <Select onValueChange={onSort}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filterOptions.length > 0 && (
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

// ==========================================
// Product Management Component
// ==========================================
interface ProductStatsProps {
  stats: {
    totalProducts: string;
    newProducts: string;
    inStock: string;
    outOfStock: string;
    categories: string;
  };
}

export default function SellerProduct ()  {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

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
    let result = mockData.products;

    if (categoryFilter !== "ALL") {
      result = result.filter((product: { category: string; }) => product.category === categoryFilter);
    }

    if (searchTerm) {
      result = result.filter((product: { title: string; }) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a: { price: string; }, b: { price: string; }) => {
        if (sortBy === "Price") {
          return (
            parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
          );
        }
        return 0;
      });
    }

    return result.map((product: { image: string; }) => ({
      ...product,
      image: formatImageCell(product.image)
    }));
  }, [categoryFilter, searchTerm, sortBy, filterBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchTerm, sortBy, filterBy]);

  const productStats = [
    {
      icon: <Box className="w-6 h-6 text-primary" />,
      label: "Total Products",
      value: mockData.productStats.totalProducts
    },
    {
      icon: <TagIcon className="w-6 h-6 text-primary" />,
      label: "New Products",
      value: mockData.productStats.newProducts
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      label: "In Stock",
      value: mockData.productStats.inStock
    },
    {
      icon: <XCircle className="w-6 h-6 text-primary" />,
      label: "Out of Stock",
      value: mockData.productStats.outOfStock
    },
    {
      icon: <SquareMenu className="w-6 h-6 text-primary" />,
      label: "Categories",
      value: mockData.productStats.categories
    }
  ];

  const categoryOptions = [
    { label: "ALL", value: "ALL" },
    { label: "Phones", value: "Phones" },
    { label: "PCs", value: "PCs" },
    { label: "Headphones", value: "Headphones" },
    { label: "Smart Watches", value: "Smart Watches" },
    { label: "Gadgets", value: "Gadgets" }
  ];

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
      <Card className="shadow-md rounded-lg py-4">
        <CardContent className="p-4">
          <DashboardStats
            stats={productStats}
            filterOptions={categoryOptions}
            onFilterChange={setCategoryFilter}
            activeFilter={categoryFilter}
            showFilters={true}
          />
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-lg py-4">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">Products Management</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          <SearchFilterSort
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilterBy}
            sortOptions={[
              { value: "Price", label: "Price" },
              { value: "Quantity", label: "Quantity" },
            ]}
            filterOptions={[
              { value: "In Stock", label: "In Stock" },
              { value: "Out of Stock", label: "Out of Stock" },
            ]}
          />

          <TableWrapper>
            <DataTable
              headers={tableHeaders.product}
              data={paginatedData}
              type="products"
              onRowClick={(row) => navigate(`/admin/productsmanage/${row.id}`)}
            />
          </TableWrapper>

          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Export all components
export {
  // TableWrapper,
  // SelectorWrapper,
  // MobileTabSelect,
  // MostSearchedProducts,
  // DashboardStats,
  // DataTable,
  // PaginationControls,
  // SearchFilterSort,
  // SellerProduct
};