import * as React from "react"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import {assets} from "../../../assets/assets.ts";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem className="hover:bg-transparent">
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent bg-none focus-visible:ring-0"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                {/* <activeTeam.logo className="size-4" /> */}
                <img src={assets.logo1} alt="Team Logo" className="h-full w-full text-white" />
                {/* <ShoppingCart className="text-green-500"/> */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-2xl ">{activeTeam.name}</span>
                {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
              </div>
              {/* <ChevronsUpDown className="ml-auto" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

