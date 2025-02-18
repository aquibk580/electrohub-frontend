import { useState, useEffect, useMemo, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { mockData, tableHeaders } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";

const breadcrumbs = [
  { href: "#", label: "User Management" },
  { href: "/admin/buyer", label: "Buyer" },
];

const Seller = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [activeTab, setActiveTab] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  interface TableWrapperProps {
    children: ReactNode;
  }
  const filteredData = useMemo(() => {
    let result = mockData.buyers;

    if (searchTerm) {
      result = result.filter((buyers) =>
        buyers.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // if (filterBy) {
    //   result = result.filter((buyers) => buyers.totalItemsPurchased === filterBy);
    // }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "Spend") {
          return (
            parseFloat(b.totalSpend.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.totalSpend.replace(/[^0-9.-]+/g, ""))
          );
        }
        if (sortBy === "Purchased") {
          return (
            parseInt(b.totalItemsPurchased.replace(/,/g, "")) -
            parseInt(a.totalItemsPurchased.replace(/,/g, ""))
          );
        }
        return 0;
      });
    }

    return result;
  }, [activeTab, searchTerm, sortBy, filterBy]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Handle row click with current page in URL
  const handleRowClick = (row: any) => {
    navigate(`/admin/buyer/${row.id}?returnPage=${currentPage}`);
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
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [activeTab, searchTerm, sortBy, filterBy]);

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

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/users`
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    // <SidebarLayout breadcrumbs={breadcrumbs}>
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Card className="shadow-md rounded-lg py-4">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">Buyers</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          <SearchFilterSort
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilterBy}
            sortOptions={[
              { value: "Spend", label: "Spend" },
              { value: "Purchased", label: "Purchased" },
            ]}
            filterOptions={[
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
            ]}
          />
          <TableWrapper>
            <DataTable
              headers={tableHeaders.buyer}
              data={users}
              type="topSeller"
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

export default Seller;
