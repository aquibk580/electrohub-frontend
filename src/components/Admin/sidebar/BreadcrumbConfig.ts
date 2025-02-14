const breadcrumbConfig: Record<string, { href: string; label: string }[]> = {
    "/admin/dashboard": [{ href: "/admin/dashboard", label: "Dashboard" }],
    "/admin/seller": [{ href: "#", label: "User Management" }, { href: "/admin/seller", label: "Seller" }],
    "/admin/sellerinfo/:id": [{ href: "#", label: "User Management" }, { href: "/admin/seller", label: "Seller Management" }, { href: "#", label: "Seller Details" }],
    "/admin/buyer": [{ href: "#", label: "User Management" }, { href: "/admin/buyer", label: "Buyer" }],
    "/admin/productmanage": [{ href: "/admin/productmanage", label: "Products Management" }],
    "/admin/productsmanage/:id": [{ href: "/admin/productmanage", label: "Products Management" }, { href: "#", label: "Product Details" }],
    "/admin/ordersmanage": [{ href: "/admin/ordersmanage", label: "Orders Management" }],
    "/admin/ordersmanage/:id": [{ href: "/admin/ordersmanage", label: "Orders Management" }, { href: "#", label: "Order Details" }],
    "/admin/payments": [{ href: "#", label: "User Management" }, { href: "/admin/payments", label: "Payments & Transaction" }],
    "/admin/reports": [{ href: "/admin/reports", label: "Reports & Analytics" }],
    "/admin/messages": [{ href: "/admin/messages", label: "Notification & Messages" }],
    "/admin/messages/chat/:id": [{ href: "/admin/messages", label: "Notification & Messages" },{ href: "/admin/messages/chats", label: "Chats" }],
    "/admin/cms": [{ href: "/admin/cms", label: "Content Management System" }],
    "/admin/settings": [{ href: "/admin/settings", label: "Settings" }],
    "/admin/logs": [{ href: "/admin/logs", label: "Logs And Security" }]
  };
  
  export default breadcrumbConfig;
  