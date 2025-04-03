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
import { Helmet } from "react-helmet-async";
import {  BuyerSkeleton } from "@/components/Admin/Skeletons";


const Buyer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  interface TableWrapperProps {
    children: ReactNode;
  }
  
  // Fix 1: Update filteredData to use the actual API data (users) instead of mockData
  const filteredData = useMemo(() => {
    // Use the actual users data from API
    let result = users;

    if (searchTerm) {
      result = result.filter((user: any) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      // Modify this filter based on your actual data structure
      // This is just an example
      result = result.filter((user: any) => 
        user.role === filterBy || user.status === filterBy
      );
    }

    if (sortBy) {
      result.sort((a: any, b: any) => {
        if (sortBy === "Spend") {
          // Replace with actual spend data if available or use a suitable property
          return (b.totalOrders || 0) - (a.totalOrders || 0);
        }
        if (sortBy === "Purchased") {
          return (b.totalOrders || 0) - (a.totalOrders || 0);
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortBy, filterBy, users]);

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


  useEffect(() => {
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      setCurrentPage(parseInt(returnPage));
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

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/users`
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  if(loading){
    return <BuyerSkeleton/>
  }

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Helmet
        title="Buyers | Admin"
        meta={[
          {
            name: "description",
            content: "Users List ",
          },
        ]}
      />
      <Card className="shadow-md rounded-xl bg-primary/5 border-primary/75 dark:bg-gradient-to-br from-primary/20 via-slate-900/20 to-primary/10 py-4">
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
              data={paginatedData}
              type="allBuyer"
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
export default Buyer;