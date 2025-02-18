"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: { title: string; url: string; icon?: LucideIcon }[];
  }[];
  
}) {
  const location = useLocation(); // Get current path
  const navigate = useNavigate(); // React Router navigation

  return (
    <SidebarGroup >
      <SidebarMenu className="pt-5">
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={location.pathname.startsWith(item.url)}
              className="group/collapsible font-medium"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="relative flex items-center w-full h-14 p-8 transition-all duration-200" 
                  
                    onClick={() => navigate(item.url)}
                  >
                    {item.icon && (
                      <item.icon  />
                    )}
                   <span className="whitespace-nowrap">{item.title}</span>
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <button
                            onClick={() => navigate(subItem.url)}
                            className={`flex items-center w-full  pl-14 rounded-md transition-all duration-200
                              ${location.pathname === subItem.url ? "bg-accent text-black" : "hover:bg-accent"}
                            `}
                          >
                            {subItem.icon && <subItem.icon  />}
                           <span className="ml-2">{subItem.title}</span>
                          </button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild  >
              <button
  onClick={() => navigate(item.url)}
  className={`flex w-full py-5  rounded-lg transition-all duration-200 
    ${location.pathname === item.url ? "bg-accent text-black" : "hover:bg-accent"}`}
>
  {item.icon && <item.icon className=" min-h-[1.1rem] min-w-[1.1rem] " />}
  <span className="ml-1 font-medium">{item.title}</span>
</button>

              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
