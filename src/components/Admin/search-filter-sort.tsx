import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SearchFilterProps } from "@/types/dashboard";
import debounce from "lodash/debounce";

export function SearchFilterSort({
  onSearch,
  placeholder = "Search here...",
  className = "",
}: SearchFilterProps & { className?: string }) {
  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 300),
    []
  );

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className} `}
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground dark:text-white" />
        <Input
          placeholder={placeholder}
          className="pl-8 w-full sm:w-80 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] border-primary/50 rounded-full bg-background text-foreground placeholder:text-muted-foreground"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
