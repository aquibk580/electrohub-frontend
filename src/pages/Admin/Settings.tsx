import UserManagement from "@/components/Admin/User-Manage"
import ThemeToggle from "@/components/Common/Theme-Toggle"

export default function Settings() {

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <ThemeToggle />
      <UserManagement />
    </div>
  )
}