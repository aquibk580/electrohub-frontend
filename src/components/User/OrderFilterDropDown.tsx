import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Ellipsis,
  Truck,
  PackageCheck,
  BookX,
  Undo2,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export function FilterDropDown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-xl " variant="outline">
          {" "}
          <Filter size={16} /> <span className="hidden  sm:block">Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl mr-1">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order Status</DropdownMenuLabel>
          <DropdownMenuItem>
            <Checkbox /> Pending
            <DropdownMenuShortcut>
              <Ellipsis />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> Shipped
            <DropdownMenuShortcut>
              <Truck />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> Delivered
            <DropdownMenuShortcut>
              <PackageCheck />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> Cancelled
            <DropdownMenuShortcut>
              <BookX />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> Returned
            <DropdownMenuShortcut>
              <Undo2 />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order Time</DropdownMenuLabel>
          <DropdownMenuItem>
            <Checkbox /> Last 30 days
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> 2024
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> 2023
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> 2022
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox /> Other
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
