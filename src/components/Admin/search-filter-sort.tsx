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
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground dark:text-white" />
        <Input
          placeholder={placeholder}
          className="pl-8 w-full  border-primary/50 rounded-full bg-background text-foreground placeholder:text-muted-foreground"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2  flex-row">
        {sortOptions.length > 0 && (
          <Select onValueChange={onSort}>
            <SelectTrigger className="w-full rounded-full border-primary/50 sm:w-[180px]  bg-background text-foreground">
              <SelectValue placeholder="Sort by" className="text-muted-foreground" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border rounded-xl" >
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-foreground rounded-lg hover:bg-secondary">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filterOptions.length > 0 && (
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-full rounded-full border-primary/50 bg-background  sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border rounded-xl" >
              {filterOptions.map((option) => (
                <SelectItem className="rounded-lg" key={option.value} value={option.value}>
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
