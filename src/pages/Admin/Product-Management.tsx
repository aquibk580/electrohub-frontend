
import { useState, useEffect, useMemo, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { mockData, tableHeaders } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Box, TagIcon, CheckCircle2, XCircle, SquareMenu } from "lucide-react";
import { DashboardStats } from "@/components/Admin/dashboard-stats";
// import { mockData } from "@/data/mock-data";

// Inside ProductManagement component

const breadcrumbs = [{ href: "/admin/productmanage", label: "Products Management" }];

interface ProductStatsProps {
  stats: {
    totalProducts: string;
    newProducts: string;
    inStock: string;
    outOfStock: string;
    categories: string;
  };
}


const ProductManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  interface TableWrapperProps {
    children: ReactNode;
  }
  // Get initial page from URL params or default to 1
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page') || '1');

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
    let result = mockData.products;

    if (categoryFilter !== "ALL") {
      result = result.filter(product => product.category === categoryFilter);
    }

    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "Price") {
          return (
            parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
          );
        }
        return 0;
      });
    }

    return result.map(product => ({
      ...product,
      image: formatImageCell(product.image)
    }));
  }, [categoryFilter, searchTerm, sortBy, filterBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [categoryFilter, searchTerm, sortBy, filterBy]);

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Handle row click with current page in URL
  const handleRowClick = (row: any) => {
    navigate(`/admin/productsmanage/${row.id}?returnPage=${currentPage}`);
  };

  // Reset to stored page when returning from detail view
  useEffect(() => {
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      setCurrentPage(parseInt(returnPage));
      // Clean up the return page parameter
      searchParams.delete('returnPage');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
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
    // <SidebarLayout breadcrumbs={breadcrumbs}>
      <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
        {/* <Card className="shadow-md rounded-lg py-4">
          <CardContent className="p-4">
            <ProductStats stats={mockData.productStats} />
          </CardContent>
        </Card>
        <Tabs defaultValue="ALL" className="w-full" onValueChange={setCategoryFilter}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="ALL">ALL</TabsTrigger>
                <TabsTrigger value="Phones">Phones</TabsTrigger>
                <TabsTrigger value="PCs">PCs</TabsTrigger>
                <TabsTrigger value="Headphones">Headphones</TabsTrigger>
                <TabsTrigger value="Smart Watches">Smart Watches</TabsTrigger>
                <TabsTrigger value="Gadgets">Gadgets</TabsTrigger>
              </TabsList>
        </Tabs> */}
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
                onRowClick={handleRowClick}              />
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