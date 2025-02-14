"use client"

import { useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SearchFilterProps } from "@/types/dashboard"
import debounce from "lodash/debounce"

export function SearchFilterSort({
  onSearch,
  onSort,
  onFilter,
  placeholder = "Search here...",
  filterOptions = [],
  sortOptions = [],
  className = "",
}: SearchFilterProps & { className?: string }) {
  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 300),
    [],
  )

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className} `}>
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-8 w-full order-border bg-background text-foreground placeholder:text-muted-foreground"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2  flex-row">
        {sortOptions.length > 0 && (
          <Select onValueChange={onSort}>
            <SelectTrigger className="w-full sm:w-[180px] border-border bg-background text-foreground">
              <SelectValue placeholder="Sort by" className="text-muted-foreground" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border" >
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-foreground hover:bg-secondary">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filterOptions.length > 0 && (
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}
