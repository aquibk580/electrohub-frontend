"use client"

import * as React from "react"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import CustomSVG from "@/components/Admin/logo"
import { ShoppingCart } from "lucide-react"

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
                {/* <img src="/e.svg" alt="Team Logo" className="size-4 text-white" /> */}
                <ShoppingCart className="text-green-500"/>
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

