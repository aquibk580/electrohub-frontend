import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MobileTabSelectProps {
  activeTab: string
  onTabChange: (value: string) => void
}

const MobileTabSelect: React.FC<MobileTabSelectProps> = ({ activeTab, onTabChange }) => {
  return (
    <Select value={activeTab} onValueChange={onTabChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select tab" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="allPayments">All Transactions</SelectItem>
        <SelectItem value="withdrawlRequest">Withdrawal Requests</SelectItem>
        <SelectItem value="customerRefunds">Refund Requests</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default MobileTabSelect

