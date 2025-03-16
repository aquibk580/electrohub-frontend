import { useState, useEffect, useMemo, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { mockData, tableHeaders } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Seller as S } from "@/components/product/productTypes";

const Seller = () => {
  const [sellers, setSellers] = useState<S[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const location = useLocation();
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [activeTab, setActiveTab] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  interface TableWrapperProps {
    children: ReactNode;
  }
  // Get initial page from URL params or default to 1
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const sellerData = sellers.map((seller, index) => {
    return {
      id: seller.id,
      srNumber: index + 1,
      name: seller.name,
      email: seller.email,
      phone: seller.phone ? seller.phone : "-",
      address: seller.address ? seller.address.substring(0, 40) + "..." : "-",
    };
  });

  const filteredData = useMemo(() => {
    let result = activeTab === "top" ? mockData.topsellers : mockData.sellers;

    if (searchTerm) {
      result = result.filter((seller) =>
        seller.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      result = result.filter((seller) => seller.sellerNiche === filterBy);
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "Profits") {
          return (
            parseFloat(b.totalProfits.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.totalProfits.replace(/[^0-9.-]+/g, ""))
          );
        }
        if (sortBy === "Items Sold") {
          return (
            parseInt(b.totalItemsSold.replace(/,/g, "")) -
            parseInt(a.totalItemsSold.replace(/,/g, ""))
          );
        }
        return 0;
      });
    }

    return result;
  }, [activeTab, searchTerm, sortBy, filterBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Handle row click with current page in URL
  const handleRowClick = (row: any) => {
    navigate(`/admin/sellerinfo/${row.id}?returnPage=${currentPage}`);
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

  useEffect(() => {
    const getAllSellers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/sellers`
        );

        if (response.status === 200) {
          setSellers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllSellers();
  }, []);

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

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Tabs
        defaultValue="top"
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger
              value="top"
              className="flex-1 sm:flex-none text-sm sm:text-base"
            >
              Top Sellers
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="flex-1 sm:flex-none text-sm sm:text-base"
            >
              All Sellers
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="top" className="mt-2">
          <Card className="shadow-md rounded-lg py-4">
            <CardHeader className="px-4 py-2 sm:p-5">
              <CardTitle className="text-xl sm:text-2xl">Top Sellers</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-3">
              <SearchFilterSort
                onSearch={setSearchTerm}
                onSort={setSortBy}
                onFilter={setFilterBy}
                sortOptions={[
                  { value: "Profits", label: "Profits" },
                  { value: "Items Sold", label: "Items Sold" },
                ]}
                filterOptions={[
                  { value: "Electronics", label: "Electronics" },
                  { value: "Clothing", label: "Clothing" },
                ]}
              />
              <TableWrapper>
                <DataTable
                  headers={[
                    { key: "srNumber", label: "Sr No." },
                    { key: "name", label: "Seller Name" },
                    { key: "email", label: "Seller Email" },
                    { key: "phone", label: "Contact" },
                    { key: "address", label: "Location" },
                    { key: "id", label: "ID" }
                  ]}
                  data={sellerData}
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
        </TabsContent>
        <TabsContent value="all" className="mt-2">
          <Card className="shadow-md rounded-lg py-4">
            <CardHeader className="px-4 py-2 sm:p-5">
              <CardTitle className="text-xl sm:text-2xl">All Sellers</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-3">
              <SearchFilterSort
                onSearch={setSearchTerm}
                onSort={setSortBy}
                onFilter={setFilterBy}
                sortOptions={[
                  { value: "Profits", label: "Profits" },
                  { value: "Items Sold", label: "Items Sold" },
                ]}
                filterOptions={[
                  { value: "Electronics", label: "Electronics" },
                  { value: "Clothing", label: "Clothing" },
                ]}
              />
              <TableWrapper>
                <DataTable
                  headers={tableHeaders.topSeller}
                  data={sellers}
                  type="topSeller"
                  onRowClick={handleRowClick}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Seller;
