import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface BreadcrumbItemProps {
    href: string;
    label: string;
}

interface BreadcrumbHeaderProps {
    items: BreadcrumbItemProps[];
}

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ items }) => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b sticky top-0 bg-background z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-6" />
            <Breadcrumb>
                <BreadcrumbList >
                    {items.map((item, index) => (
                        <React.Fragment key={item.href}>
                            <BreadcrumbItem className="hidden md:block">
                                {index === items.length - 1 ? (
                                    <BreadcrumbLink href={item.href} className="font-semibold">
                                        {item.label}
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbLink  href={item.href}>{item.label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < items.length - 1 && (
                                <BreadcrumbSeparator className="hidden md:block" />
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
};
