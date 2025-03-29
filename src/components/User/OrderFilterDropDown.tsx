import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { Filter } from "lucide-react";

export function FilterDropDown({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [selectedFilters, setSelectedFilters] = useState({
    status: [] as string[],
    orderTime: "",
  });

  const handleStatusChange = (status: string) => {
    setSelectedFilters((prev) => {
      const updatedStatus = prev.status.includes(status)
        ? prev.status.filter((s) => s !== status) // Remove if already selected
        : [...prev.status, status]; // Add if not selected

      const newFilters = { ...prev, status: updatedStatus };
      onFilterChange(newFilters); // Pass filters to parent
      return newFilters;
    });
  };

  const handleOrderTimeChange = (time: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, orderTime: time };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-xl" variant="outline">
          <Filter size={16} /> <span className="hidden sm:block">Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl mr-1">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Order Status Filters */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order Status</DropdownMenuLabel>
          {["Pending", "Shipped", "Delivered", "Cancelled", "Returned"].map(
            (status, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={(e) => e.preventDefault()}
              >
                <Checkbox
                  checked={selectedFilters.status.includes(status)}
                  onCheckedChange={() => handleStatusChange(status)}
                />
                {status}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>

        {/* Order Time Filters */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order Time</DropdownMenuLabel>
          {["Newest", "Oldest"].map((time, index) => (
            <DropdownMenuItem key={index} onSelect={(e) => e.preventDefault()}>
              <Checkbox
                checked={selectedFilters.orderTime === time}
                onCheckedChange={() => handleOrderTimeChange(time)}
              />
              {time}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
