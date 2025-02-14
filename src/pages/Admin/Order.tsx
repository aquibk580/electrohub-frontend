import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { mockData, tableHeaders } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, RotateCcw, CheckCircle, ListOrdered } from "lucide-react";
import { DashboardStats } from "@/components/Admin/dashboard-stats";
import { TableWrapper } from "@/components/Admin/table-wrapper";
const breadcrumbs = [{ href: "/admin/ordersmanage", label: "Orders Management" }];


const orderStats = [
  { icon: <Calendar className="w-6 h-6 text-primary" />, label: "", value: "Today" },
  { icon: <ListOrdered className="w-6 h-6 text-primary" />, label: "Orders", value: "48" },
  { icon: <Package className="w-6 h-6 text-primary" />, label: "Order Items overtime", value: "420" },
  { icon: <RotateCcw className="w-6 h-6 text-primary" />, label: "Returns", value: "9" },
  { icon: <CheckCircle className="w-6 h-6 text-primary" />, label: "Fulfilled orders overtime", value: "389" },
];

const orderFilterOptions = [
  { label: "ALL", value: "ALL" },
  { label: "Pending", value: "Pending" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancellation", value: "Cancelled" },
  { label: "Returns", value: "Returns" },
];
const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");


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
    let result = mockData.orders;

    // Apply status filter
    if (statusFilter !== "ALL") {
      result = result.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      result = result.filter((order) =>
        order.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "Price") {
          return (
            parseFloat(b.total.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.total.replace(/[^0-9.-]+/g, ""))
          );
        }
        return 0;
      });
    }

    return result.map(order => ({
      ...order,
      image: formatImageCell(order.image)
    }));
  }, [statusFilter, searchTerm, sortBy, filterBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [statusFilter, searchTerm, sortBy, filterBy]);

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Handle row click with current page in URL
  const handleRowClick = (row: any) => {
    navigate(`/admin/ordersmanage/${row.id}?returnPage=${currentPage}`);
  };
 
  useEffect(() => {
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      setCurrentPage(parseInt(returnPage));
      // Clean up the return page parameter
      searchParams.delete('returnPage');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location.search]);

  
  return (
    // <SidebarLayout breadcrumbs={breadcrumbs}>
      <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
        
        <DashboardStats
          stats={orderStats}
          filterOptions={orderFilterOptions}
          onFilterChange={setStatusFilter}
          activeFilter={statusFilter}
        />

        <Card className="shadow-md rounded-lg py-4">
          <CardHeader className="px-4 py-2 sm:p-5">
            <CardTitle className="text-xl sm:text-2xl">Orders Management</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 space-y-3">
            <SearchFilterSort
              onSearch={setSearchTerm}
              onSort={setSortBy}
              onFilter={setFilterBy}
              sortOptions={[
                { value: "Price", label: "Price" },
                { value: "Purchased", label: "Purchased" },
              ]}
              filterOptions={[
                { value: "Electronics", label: "Electronics" },
                { value: "Clothing", label: "Clothing" },
              ]}
            />
            <TableWrapper>
              <DataTable
                headers={tableHeaders.order}
                data={paginatedData}
                type="orders"
                onRowClick={handleRowClick}
                // onRowClick={(row) => navigate(`/admin/ordersmanage/${row.id}`)}
              />
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

export default Order;