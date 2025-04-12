import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type { TableProps } from "@/types/dashboard";
import { ChevronRight } from "lucide-react";
export function DataTable({ headers, data, type, onRowClick }: TableProps) {
  const handleDoubleClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Card className="rounded-xl ">
      <CardContent className="p-0">
        <div className="w-full">
          <Table className="min-w-[800px]  rounded-xl overflow-hidden ">
            <TableHeader className=" bg-primary/75     ">
              <TableRow className="   hover:bg-transparent">
                {headers.map((header) => (
                  <TableHead
                    className="pl-3 sticky top-0  border-b-2 border-primary/50 text-white/95 text-base min-w-32 whitespace-nowrap"
                    key={header.key} 
                  >
                    {header.label}
                  </TableHead>
                ))}
                {onRowClick && (
                  <TableHead className="w-[50px] sticky top-0  border-b-2  border-primary/50" />
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={
                    onRowClick
                      ? "border-border hover:bg-primary/5 cursor-pointer"
                      : ""
                  }
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  {headers.map((header) => (
                    <TableCell
                      className="pl-3 text-base whitespace-nowrap"
                      key={header.key}
                    >
                      {row[header.key]}
                    </TableCell>
                  ))}
                  {onRowClick && (
                    <TableCell >
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
  );
}
