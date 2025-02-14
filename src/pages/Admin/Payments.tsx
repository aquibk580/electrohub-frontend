import { useState, useEffect, useMemo } from "react"
import { SearchFilterSort } from "@/components/Admin/search-filter-sort"
import { DataTable } from "@/components/Admin/data-table"
import { PaginationControls } from "@/components/Admin/pagination-controls"
import { mockData, tableHeaders } from "@/data/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableWrapper } from "@/components/Admin/table-wrapper"
import type { TableData } from "@/types/dashboard"
import DashboardStats from "@/components/Admin/dashboard-stats"
import MobileTabSelect from "@/components/Admin/MobileTabSelect"
import { useLocation, useNavigate } from "react-router-dom"

// Define interfaces extending TableData
interface Transaction extends TableData {
  id: string
  pid: string
  paymentMode: string
  status: string
  amount: string
  sender: string
  receiver: string
  date: string
}
interface WithdrawalRequest extends TableData {
  id: string
  sender: string
  paymentMode: string
  amount: string
  tenure: string
  identityProof: string
  date: string
}
interface RefundRequest extends TableData {
  id: string
  oid: string
  bid: string
  buyerName: string
  amount: string
  status: string
  phone: string
  date: string
}
interface TabData {
  allPayments: Transaction[]
  withdrawlRequest: WithdrawalRequest[]
  customerRefunds: RefundRequest[]
}
type ActiveTabType = keyof TabData

const breadcrumbs = [
  { href: "#", label: "User Management" },
  { href: "/admin/payments", label: "Payments & Transaction" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "amount-high", label: "Amount: High to Low" },
  { value: "amount-low", label: "Amount: Low to High" },
]

const filterOptions = {
  allPayments: [
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "On Hold", label: "On Hold" },
    { value: "Cancelled", label: "Cancelled" },
  ],
  withdrawlRequest: [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "UPI", label: "UPI" },
    { value: "Electrohub Wallet", label: "Electrohub Wallet" },
  ],
  customerRefunds: [
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ],
}

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation()
  // const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(7)
  const [activeTab, setActiveTab] = useState<ActiveTabType>("allPayments")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [filterBy, setFilterBy] = useState("")
  const [lastClickedRow, setLastClickedRow] = useState<TableData | null>(null)

  const getDataForTab = (tab: ActiveTabType): TableData[] => {
    switch (tab) {
      case "allPayments":
        return mockData.allPayments as Transaction[]
      case "withdrawlRequest":
        return mockData.withdrawlRequest as WithdrawalRequest[]
      case "customerRefunds":
        return mockData.customerRefunds as RefundRequest[]
    }
  }
  // Get initial page from URL params or default to 1
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page') || '1');

  const [currentPage, setCurrentPage] = useState(initialPage);
  const filteredData = useMemo(() => {
    let result = getDataForTab(activeTab)

    if (searchTerm) {
      result = result.filter((item) => {
        const searchFields = Object.values(item).join(" ").toLowerCase()
        return searchFields.includes(searchTerm.toLowerCase())
      })
    }

    if (filterBy) {
      result = result.filter((item) => {
        if (activeTab === "allPayments") {
          return (item as Transaction).status === filterBy
        }
        if (activeTab === "withdrawlRequest") {
          return (item as WithdrawalRequest).paymentMode === filterBy
        }
        if (activeTab === "customerRefunds") {
          return (item as RefundRequest).status === filterBy
        }
        return true
      })
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        const getAmount = (str: string) => Number.parseFloat(str.replace(/[^0-9.-]+/g, ""))
        const getDate = (str: string) => new Date(str).getTime()

        switch (sortBy) {
          case "newest":
            return getDate(b.date as string) - getDate(a.date as string)
          case "oldest":
            return getDate(a.date as string) - getDate(b.date as string)
          case "amount-high":
            return getAmount((b as any).amount) - getAmount((a as any).amount)
          case "amount-low":
            return getAmount((a as any).amount) - getAmount((b as any).amount)
          default:
            return 0
        }
      })
    }

    return result
  }, [activeTab, searchTerm, sortBy, filterBy, getDataForTab]) // Added getDataForTab to dependencies

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  // useEffect(() => {
  //   if (!lastClickedRow) {
  //     setCurrentPage(1)
  //   }
  // }, [activeTab, searchTerm, sortBy, filterBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTabType)
    setSearchTerm("")
    setSortBy("")
    setFilterBy("")
    setLastClickedRow(null)
  }

  const handleRowClick = (row: TableData) => {
    setLastClickedRow(row);
    navigate(`/admin/payments/${row.id}?returnPage=${currentPage}`);
  }
  
 useEffect(() => {
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      setCurrentPage(parseInt(returnPage));
      // Clean up the return page parameter
      searchParams.delete('returnPage');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location.search]);
  const stats = [
    {
      label: "Total Transactions",
      value: "1254",
    //   change: { value: 14 },
    },
    {
      label: "Sales",
      value: "₹1,32,42,400",
      change: { value: 14 },
    },
    {
      label: "Monthly Order",
      value: "42,400",
      change: { value: -7 },
    },
    {
      label: "Monthly Revenue",
      value: "₹32,42,400",
      change: { value: 14 },
    },
    {
      label: "Online Visitors",
      value: "1,43,649",
      change: { value: -7 },
    },
  ]

  return (
    // <SidebarLayout breadcrumbs={breadcrumbs}>

        <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
          <DashboardStats stats={stats} variant="payment" />
          <div className="w-full">
            <div className="sm:hidden">
              <MobileTabSelect activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="hidden sm:block">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="allPayments" className="flex-1 sm:flex-none text-sm sm:text-base">
                    All Transactions
                  </TabsTrigger>
                  <TabsTrigger value="withdrawlRequest" className="flex-1 sm:flex-none text-sm sm:text-base">
                    Withdrawal Requests
                  </TabsTrigger>
                  <TabsTrigger value="customerRefunds" className="flex-1 sm:flex-none text-sm sm:text-base">
                    Refund Requests
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="mt-2">
            {(activeTab === "allPayments" || activeTab === "withdrawlRequest" || activeTab === "customerRefunds") && (
              <Card className="shadow-md rounded-lg py-4">
                <CardHeader className="px-4 py-2 sm:p-5">
                  <CardTitle className="text-xl sm:text-2xl">
                    {activeTab === "allPayments" && "All Transactions"}
                    {activeTab === "withdrawlRequest" && "Withdrawal Requests"}
                    {activeTab === "customerRefunds" && "Refund Requests"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 space-y-3">
                  <div className="w-full">
                    <SearchFilterSort
                      onSearch={setSearchTerm}
                      onSort={setSortBy}
                      onFilter={setFilterBy}
                      sortOptions={sortOptions}
                      filterOptions={filterOptions[activeTab]}
                    />
                  </div>
                  <TableWrapper>
                    <DataTable
                      headers={tableHeaders[activeTab]}
                      data={paginatedData}
                      type={activeTab}
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
            )}
          </div>
        </div>
  )
}

export default Payments

