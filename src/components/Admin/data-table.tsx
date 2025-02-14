"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { TableProps } from "@/types/dashboard"

export function DataTable({ headers, data, type, onRowClick }: TableProps) {
  const handleDoubleClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="w-full"> 
          <Table className="min-w-[800px] border-border">
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                {headers.map((header) => (
                  <TableHead 
                    className="pl-3 sticky top-0 bg-background text-muted-foreground border-border text-base min-w-32 whitespace-nowrap" 
                    key={header.key}
                  >
                    {header.label}
                  </TableHead>
                ))}
                {onRowClick && <TableHead className="w-[50px] sticky top-0 bg-background" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={index} 
                  className={onRowClick ? "border-border hover:bg-primary/5 cursor-pointer" : ""}
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  {headers.map((header) => (
                    <TableCell className="pl-3 text-base whitespace-nowrap" key={header.key}>
                      {row[header.key]}
                    </TableCell>
                  ))}
                  {onRowClick && (
                    <TableCell>
                      <ChevronRight className="h-5 w-5" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}