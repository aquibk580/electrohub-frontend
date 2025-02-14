import { Link } from "react-router-dom";
import {
    LayoutGrid,
    Users,
    Store,
    User,
    ShoppingBag,
    ClipboardList,
    Wallet,
    BarChart2,
    Bell,
    Settings,
    Shield,
    LogOut,
    ChevronDown,
    Menu,
    FileText,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState("buyer");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative">
            <button className="p-2 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-6 w-6" />
            </button>

            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-background p-4 transition-transform md:relative md:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <Link to="/" className="mb-8 text-2xl font-bold text-green-800 hover:text-green-700">
                    Electrohub
                </Link>
                <nav className="flex-1 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <LayoutGrid className="h-4 w-4" />
                        Dashboard
                    </Link>

                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent">
                            <div className="flex items-center gap-3">
                                <Users className="h-4 w-4" />
                                User Management
                            </div>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 px-6 py-1">
                            <Link
                                to="/users/seller"
                                onClick={() => setSelectedItem("seller")}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent",
                                    selectedItem === "seller" && "bg-accent"
                                )}
                            >
                                <Store className="h-4 w-4" />
                                Seller
                            </Link>
                            <Link
                                to="/users/buyer"
                                onClick={() => setSelectedItem("buyer")}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent",
                                    selectedItem === "buyer" && "bg-accent"
                                )}
                            >
                                <User className="h-4 w-4" />
                                Buyer
                            </Link>
                        </CollapsibleContent>
                    </Collapsible>

                    <Link to="/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <ShoppingBag className="h-4 w-4" />
                        Product Management
                    </Link>

                    <Link to="/orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <ClipboardList className="h-4 w-4" />
                        Orders Management
                    </Link>

                    <Link to="/payments" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <Wallet className="h-4 w-4" />
                        Payments & Transactions
                    </Link>

                    <Link to="/reports" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <BarChart2 className="h-4 w-4" />
                        Reports & Analytics
                    </Link>

                    <Link to="/notifications" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <Bell className="h-4 w-4" />
                        Notifications & Messages
                    </Link>

                    <Link to="/cms" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <FileText className="h-4 w-4" />
                        CMS
                    </Link>

                    <Link to="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>

                    <Link to="/security" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                        <Shield className="h-4 w-4" />
                        Logs & Security
                    </Link>
                </nav>

                <button
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent mt-auto"
                    onClick={() => console.log("Logging out...")}
                >
                    <LogOut className="h-4 w-4" />
                    Log Out
                </button>
            </div>
        </div>
    );
}