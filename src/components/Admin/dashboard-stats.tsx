// dashboard-stats.tsx
import type { ReactNode } from "react"
import { SelectorWrapper } from "./table-wrapper"
import { cn } from "@/lib/utils"

interface StatItem {
  icon?: ReactNode
  label: string
  value: string | number
  change?: {
    value: number
    label?: string
  }
  variant?: "default" | "payment"
}

interface FilterOption {
  label: string
  value: string
}

interface DashboardStatsProps {
  stats: StatItem[]
  filterOptions?: FilterOption[]
  onFilterChange?: (value: string) => void
  activeFilter?: string
  showFilters?: boolean
  variant?: "default" | "payment"
}

const StatCard = ({ icon, label, value, change, variant = "default" }: StatItem) => {
  if (variant === "payment") {
    return (
      <div className="bg-background border-border rounded-lg p-4 shadow-sm flex-1 min-w-fit my-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-foreground truncate">{label}</p>
          <div className="flex items-baseline gap-2 flex-col">
            <p className="text-2xl font-semibold truncate text-primary">{value}</p>
            {change && (
              <div
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  change.value > 0 ? "text-green-600" : "text-destructive",
                )}
              >
                <span>{change.value > 0 ? "↑" : "↓"}</span>
                <span>{Math.abs(change.value)}%</span>
                <span className="text-muted-foreground text-xs">{change.label || "VS Last Month"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" bg-secondary text-secondary-foreground flex items-center gap-4  rounded-lg p-4 min-w-[180px] sm:min-w-[200px]">
      {icon && <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>}
      <div>
        <p className="text-sm text-muted-foreground-foreground truncate">{label}</p>
        <p className="text-2xl font-semibold truncate text-primary">{value}</p> 
      </div>
    </div>
  )
}

export const DashboardStats = ({
  stats,
  filterOptions,
  onFilterChange,
  activeFilter,
  showFilters,
  variant = "default",
}: DashboardStatsProps) => {
  return (
    <div className="space-y-6">
      <SelectorWrapper>
        <div className={cn("flex gap-4", variant === "payment" ? "flex" : "flex-row overflow-x-auto")}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} variant={variant} />
          ))} 
        </div>
      </SelectorWrapper>

      {showFilters && filterOptions && filterOptions.length > 0 && onFilterChange && (
        <SelectorWrapper>
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
                  activeFilter === option.value
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary/50",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SelectorWrapper>
      )}
    </div>
  )
}

export default DashboardStats