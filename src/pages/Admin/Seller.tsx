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
import { Seller as S } from "@/types/entityTypes";
import { Loader2 } from "lucide-react";

const Seller = () => {
  const [sellers, setSellers] = useState<S[]>([]);
  const [topSellers, setTopSellers] = useState<S[]>([]);
  const [loading, setLoading] = useState(true);
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

  const sellerData = sellers?.map(
    (seller: S & { productsCount?: number }, index) => {
      return {
        id: seller.id,
        srNumber: index + 1,
        name: seller.name,
        email: seller.email,
        phone: seller.phone ? seller.phone : "-",
        address: seller.address ? seller.address.substring(0, 20) + "..." : "-",
        productsCount: seller.productsCount,
      };
    }
  );

  const topSellerData = topSellers?.map(
    (seller: S & { productsCount?: number }, index) => {
      return {
        id: seller.id,
        srNumber: index + 1,
        name: seller.name,
        email: seller.email,
        phone: seller.phone ? seller.phone : "-",
        address: seller.address ? seller.address.substring(0, 20) + "..." : "-",
        productsCount: seller.productsCount,
      };
    }
  );

  const filteredData = useMemo(() => {
    let result = activeTab === "top" ? topSellerData : sellerData;
  
    if (searchTerm) {
      result = result.filter((seller) =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (filterBy) {
     
      result = result.filter((seller) => 
        seller.address && seller.address.includes(filterBy)
      );
    }
  
    if (sortBy) {
      // Adjust sorting based on your actual data
      result.sort((a, b) => {
        if (sortBy === "Profits") {
          console.log("Profits");
        }
        if (sortBy === "Items Sold") {
          console.log("Items Sold");
        }
        return 0;
      });
    }
  
    return result;
  }, [activeTab, searchTerm, sortBy, filterBy, topSellerData, sellerData]);
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

  const handleRowClick = (row: any) => {
    navigate(`/admin/sellerinfo/${row.id}?returnPage=${currentPage}`);
  };

  // Reset to stored page when returning from detail view
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

  useEffect(() => {
    const getAllSellers = async () => {
      try {
        const [sellerRes, topSellerRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/sellers`),
          axios.get( `${import.meta.env.VITE_API_URL}/api/admin/sellers/topsellers`),
        ]);

        if (sellerRes.status === 200) {
          setSellers(sellerRes.data);
        }
        if (topSellerRes.status === 200) {
          setTopSellers(topSellerRes.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Sellers...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Tabs
        defaultValue="top"
        onValueChange={setActiveTab}
        className="space-y-4 "
      >
        <div className="w-full">
          <TabsList className="w-full rounded-xl sm:w-auto">
            <TabsTrigger
              value="top"
              className="flex-1 sm:flex-none rounded-xl text-sm sm:text-base"
            >
              Top Sellers
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="flex-1 sm:flex-none rounded-xl text-sm sm:text-base"
            >
              All Sellers
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="top" className="mt-2">
          <Card className="shadow-md rounded-xl border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/40 to-primary/10 py-4">
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
                    { key: "productsCount", label: "Products" },
                    { key: "id", label: "ID" },
                  ]}
                  data={paginatedData}
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
          <Card className="shadow-md rounded-xl bg-primary/5  dark:bg-gradient-to-br from-primary/15 via-slate-900/20 to-primary/10 border-primary/50 py-4">
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
                  headers={[
                    { key: "srNumber", label: "Sr No." },
                    { key: "name", label: "Seller Name" },
                    { key: "email", label: "Seller Email" },
                    { key: "phone", label: "Contact" },
                    { key: "address", label: "Location" },
                    { key: "productsCount", label: "Products" },
                    { key: "id", label: "ID" },
                  ]}
                  data={sellerData}
                  type="allSeller"
                  onRowClick={handleRowClick}
                />
              </TableWrapper>
              <PaginationControls
                currentPage={currentPage}
                totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange} // This was incorrectly set to setCurrentPage
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
