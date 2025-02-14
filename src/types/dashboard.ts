export type TableHeader = {
    key: string
    label: string
  }
  
  export type TableData = {
    [key: string]: any
  }
  
  export type TableProps = {
    headers: TableHeader[]
    data: TableData[]
    type: "seller" | "topSeller" | "allSeller" | "allBuyer" | "orders" | "products" | "allPayments" | "withdrawlRequest" | "customerRefunds"| "allTransactions"
    onRowClick?: (row: TableData) => void
  }
  
  export interface SearchFilterProps {
    onSearch: (value: string) => void
    onSort: (value: string) => void
    onFilter: (value: string) => void
    placeholder?: string  
    filterOptions?: { value: string; label: string }[]
    sortOptions?: { value: string; label: string }[]
}

  
  export type PaginationControlsProps = {
    currentPage: number
    totalPages: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (items: number) => void
  }
  
  