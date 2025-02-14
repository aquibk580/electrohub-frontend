"use client"

import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartBar } from "@/components/Admin/Chart-Bar"
import { mockData } from "@/data/mock-data"
import { ChartPie } from "@/components/Admin/Chart-Pie"
import MostSearchedProducts from "@/components/Admin/Most-Searched-Products"

const breadcrumbs = [{ href: "/admin/reports", label: "Reports & Analytics" }]

export default function Reports() {
  const [currentChart, setCurrentChart] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const charts = [
    {
      data: mockData.chartData.monthlySales.data,
      title: mockData.chartData.monthlySales.title,
      total: mockData.chartData.monthlySales.total,
    },
    {
      data: mockData.chartData.monthlyRevenue.data,
      title: mockData.chartData.monthlyRevenue.title,
      total: mockData.chartData.monthlyRevenue.total,
    },
  ]

  const handleNext = () => {
    setCurrentChart((prev) => (prev + 1) % charts.length)
  }

  const handlePrevious = () => {
    setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length)
  }

  return (
    // <SidebarLayout breadcrumbs={breadcrumbs}>
    <div className="p-4 md:p-6 pt-6">
      {isMobile ? (
        <>
          <div className="relative w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="mx-auto max-w-md px-8">
              <ChartBar {...charts[currentChart]} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-9 p-9">
            <div className="max-w-md mx-auto">
              <ChartPie />
            </div>
            <div className="max-w-md  mx-auto">
              <MostSearchedProducts data={mockData.mostSearchedProducts} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 p-9 ">
            {charts.map((chart, index) => (
              <div key={index} className="max-w-lg">
                <ChartBar {...chart} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-9 p-9">
            <div className="max-w-lg">
              <ChartPie />
            </div>
            <div className="max-w-lg h-[500px]">
              <MostSearchedProducts data={mockData.mostSearchedProducts} />
            </div>
          </div>
        </div>
      )}
    </div>
    // </SidebarLayout>
  )
}

