import { useState, useEffect, useMemo } from "react";
import { SearchFilterSort } from "@/components/Admin/search-filter-sort";
import { DataTable } from "@/components/Admin/data-table";
import { PaginationControls } from "@/components/Admin/pagination-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Seller as S } from "@/types/entityTypes";
import { TableWrapper } from "@/components/Admin/table-wrapper";
import { SellerSkeleton } from "@/components/Admin/Skeletons";
import { Helmet } from "react-helmet-async";

const Seller = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sellers, setSellers] = useState<S[]>([]);
  const [topSellers, setTopSellers] = useState<S[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [activeTab, setActiveTab] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");

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

    return result;
  }, [activeTab, searchTerm, topSellerData, sellerData]);

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
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/sellers/topsellers`
          ),
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

  if (loading) {
    return <SellerSkeleton />;
  }

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Helmet
        title="Sellers | Admin"
        meta={[
          {
            name: "description",
            content: "List of all Sellers",
          },
        ]}
      />

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
              <SearchFilterSort onSearch={setSearchTerm} />
              <TableWrapper>
                {paginatedData.length > 0 ? (
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
                ) : (
                  <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                    Sellers not available
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
        </TabsContent>
        <TabsContent value="all" className="mt-2">
          <Card className="shadow-md rounded-xl bg-primary/5  dark:bg-gradient-to-br from-primary/15 via-slate-900/20 to-primary/10 border-primary/50 py-4">
            <CardHeader className="px-4 py-2 sm:p-5">
              <CardTitle className="text-xl sm:text-2xl">All Sellers</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-3">
              <SearchFilterSort onSearch={setSearchTerm} />
              <TableWrapper>
                {paginatedData.length > 0 ? (
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
                    type="allSeller"
                    onRowClick={handleRowClick}
                  />
                ) : (
                  <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
                    Sellers not available
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Seller;
