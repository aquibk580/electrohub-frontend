import { MoreHorizontal } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


interface DataPoint {
  month: string
  sales: number
  revenue: number
}

interface ChartBarProps {
  data: DataPoint[]
  title: string
  total: string
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-lg">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            <div className="h-2 w-2 rounded-full" 
                 style={{ backgroundColor: item.color }} />
            <span className="text-xs font-medium uppercase text-black">{item.name}</span>
            <span className="text-xs">₹{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function ChartBar({ data, title, total }: ChartBarProps) {
  return (
    <Card className="w-full overflow-hidden rounded-[24px] bg-background p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-2 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-base font-normal text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-2xl font-bold">
            {total}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barGap={0}
            >
              <Tooltip 
                content={<CustomTooltip />}
                cursor={false}
              />
              <Bar
                dataKey="sales"
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              />
              <Bar
                dataKey="revenue"
                fill="#BFDBFE"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      {/* <CustomCursor/> */}
    </Card>
  )
}

export default ChartBar