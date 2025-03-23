import { useState, useEffect, useMemo, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Package,
  RotateCcw,
  CheckCircle,
  ListOrdered,
  Loader2,
} from "lucide-react";
import { DashboardStats } from "@/components/Admin/dashboard-stats";
import { TableWrapper } from "@/components/Admin/table-wrapper";
import { OrderItem } from "@/types/entityTypes";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";

type OrderStats = Array<{ label: string; value: string; icon: ReactElement }>;
type ExtendedOrderItem = Array<OrderItem & { customerName: string }>;

const date = new Date().getDate();
const now = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = monthNames[now.getMonth()];

const currentDate = `${currentMonth} ${date}`;

const orderFilterOptions = [
  { label: "All", value: "All" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Returned", value: "Returnred" },
];

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderItems, setOrderItems] = useState<ExtendedOrderItem>([]);
  const [orderStats, setOrderStats] = useState<OrderStats>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getOrdersData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/orders`
        );
        if (response.status === 200) {
          setOrderItems(response.data.orderItems);
          const stats: OrderStats = [
            {
              icon: <Calendar className="w-6 h-6 text-primary" />,
              label: "Today",
              value: currentDate,
            },
            {
              icon: <ListOrdered className="w-6 h-6 text-primary" />,
              label: "Orders",
              value: response.data.orders.toString(),
            },
            {
              icon: <Package className="w-6 h-6 text-primary" />,
              label: "Order Items overtime",
              value: response.data.orderItems.length.toString(),
            },
            {
              icon: <RotateCcw className="w-6 h-6 text-primary" />,
              label: "Returns",
              value: response.data.returns.toString(),
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-primary" />,
              label: "Fulfilled orders overtime",
              value: response.data.fulfilledOrders.toString(),
            },
          ];
          setOrderStats(stats);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrdersData();
  }, []);

  const filteredData = useMemo(() => {
    let result = orderItems;

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((orderItem) => orderItem.status === statusFilter);
    }

    if (searchTerm) {
      result = result.filter((order) =>
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "total") {
          return (
            parseFloat(String(b.product.price).replace(/[^0-9.-]+/g, "")) -
            parseFloat(String(a.product.price).replace(/[^0-9.-]+/g, ""))
          );
        }
        return 0;
      });
    }

    return result.map((order) => ({
      id: order?.id,
      productName: order?.product?.name.substring(0, 30),
      date: formatDate(order?.createdAt),
      customerName: order.customerName,
      total:
        "₹" +
        formatPrice(
          order?.product?.price -
            (order?.product?.offerPercentage / 100) * order?.product?.price
        ),
      status:
        order?.status === "OrderConfirmed" ? "Order Placed" : order?.status,
      image: formatImageCell(order?.product?.images[0]?.url),
    }));
  }, [statusFilter, searchTerm, sortBy, filterBy, orderItems]);

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
    navigate(`/admin/ordersmanage/${row.id}?returnPage=${currentPage}`);
  };

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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Orders...</p>
      </div>
    );
  }

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
          <CardTitle className="text-xl sm:text-2xl">
            Orders Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          <SearchFilterSort
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilterBy}
            sortOptions={[
              { value: "total", label: "Price" },
              { value: "Purchased", label: "Purchased" },
            ]}
            filterOptions={[
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
            ]}
          />
          <TableWrapper>
            <DataTable
              headers={[
                { key: "id", label: "ID" },
                { key: "image", label: "Image" },
                { key: "productName", label: "Product Name" },
                { key: "customerName", label: "Customer Name" },
                { key: "date", label: "Date" },
                { key: "total", label: "Total" },
                { key: "status", label: "Status" },
              ]}
              data={paginatedData}
              type="orders"
              onRowClick={handleRowClick}
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
