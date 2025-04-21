const breadcrumbConfig: Record<string, { href: string; label: string }[]> = {
  "/admin/auth/signin":[{href: "/admin/auth/signin", label:"Sign in"}],
  "/admin/auth/signup":[{href: "/admin/auth/signup", label:"Sign up"}],
  "/admin/auth/forgot-password":[{href: "/admin/auth/forgot-password", label:"Forgot Password"}],
  "/admin/dashboard": [{ href: "/admin/dashboard", label: "Dashboard" }],
  "/admin/seller": [{ href: "#", label: "User Management" }, { href: "/admin/seller", label: "Seller" }],
  "/admin/sellerinfo/:id": [{ href: "#", label: "User Management" }, { href: "/admin/seller", label: "Seller Management" }, { href: "#", label: "Seller Details" }],
  "/admin/buyer": [{ href: "#", label: "User Management" }, { href: "/admin/buyer", label: "Buyer" }],
  "/admin/buyer/:id": [{ href: "#", label: "User Management" }, { href: "/admin/buyer", label: "Buyer" }, {href: "#", label:"Buyer Details"}],
  "/admin/productmanage": [{ href: "/admin/productmanage", label: "Products Management" }],
  "/admin/productsmanage/:id": [{ href: "/admin/productmanage", label: "Products Management" }, { href: "#", label: "Product Details" }],
  "/admin/ordersmanage": [{ href: "/admin/ordersmanage", label: "Orders Management" }],
  "/admin/ordersmanage/:id": [{ href: "/admin/ordersmanage", label: "Orders Management" }, { href: "#", label: "Order Details" }],
  "/admin/payments": [ { href: "/admin/payments", label: "Payments & Transaction" }],
  "/admin/payments/:id": [ { href: "/admin/payments", label: "Payments & Transaction" }, {href: "#", label: "Payment Info"}],
  "/admin/reports": [{ href: "/admin/reports", label: "Reports & Analytics" }],
  "/admin/messages": [{ href: "/admin/messages", label: "Notification & Messages" }],
  "/admin/messages/chat/:id": [{ href: "/admin/messages", label: "Notification & Messages" }, { href: "/admin/messages/chats", label: "Chats" }],
  "/admin/cms": [{ href: "/admin/cms", label: "Content Management System" }],
  "/admin/settings": [{ href: "/admin/settings", label: "Settings" }],
  "/admin/logs": [{ href: "/admin/logs", label: "Logs And Security" }],

  "/seller/auth/signin": [{ href: "/seller/auth/signin", label: "Sign In" }],
  "/seller/auth/signup": [{ href: "/seller/auth/signup", label: "Sign Up" }],
  "/seller/auth/forgot-password": [{ href: "/seller/auth/forgot-password", label: "Forgot Password" }],
  "/seller/auth/seller-details": [{ href: "/seller/auth/seller-details", label: "Seller Details" }],
  "/seller/dashboard": [{ href: "/seller/dashboard", label: "Dashboard" }],
  "/seller/dashboard/order/:orderId": [{href: "/seller/dashboard", label:"Dashboard"},{ href: "/seller/dashboard/order/:orderId", label: "View Order" }],
  "/seller/dashboard/products": [{href: "/seller/dashboard", label:"Dashboard"},{ href: "/seller/dashboard/products", label: "Products" }],
  "/seller/dashboard/products/view-product/:id": [{href: "/seller/dashboard", label:"Dashboard"},{ href: "/seller/dashboard/products", label: "Products" },{ href: "/seller/dashboard/products/view-product/:id", label: "View Product" }],
  "/seller/dashboard/products/edit-product/:id": [{href: "/seller/dashboard", label:"Dashboard"},{ href: "/seller/dashboard/products", label: "Products" },{ href: "/seller/dashboard/products/edit-product/:id", label: "Edit Product" }],
  "/seller/dashboard/add-product": [{ href: "/seller/dashboard", label: "Dashboard" },{ href: "/seller/dashboard/add-product", label: "Add Product" }],
  "/seller/dashboard/profile": [{ href: "/seller/dashboard", label: "Dashboard" },{ href: "/seller/dashboard/profile", label: "Profile" }],
  "/seller/settings": [{ href: "/seller/dashboard", label: "Dashboard" },{ href: "/seller/settings", label: "Settings" }],


  "/user/auth/signin": [{ href: "/user/auth/signin", label: "Sign In" }],
  "/user/auth/signup": [{ href: "/user/auth/signup", label: "Sign Up" }],
  "/user/auth/forgot-password": [{ href: "/user/auth/forgot-password", label: "Forgot Password" }],
  "/user/auth/user-details": [{ href: "/user/auth/user-details", label: "User Details" }],
  "/user/wishlist": [{ href: "/user/wishlist", label: "Wishlist" }],
  "/user/cart": [{ href: "/user/cart", label: "Cart" }],
  "/user/profile": [{ href: "/user/profile", label: "Profile" }],
  "/user/orders": [{ href: "/user/orders", label: "Orders" }],
  "/user/orders/:id": [{ href: "/user/orders", label: "Orders" }, { href: "/user/orders/:id", label: "Order Details" }],
  "/user/reviews": [{ href: "/user/reviews", label: "Reviews" }],
};

export const findBreadcrumbConfig = (pathname: string): { href: string; label: string }[] => {
  // First try exact match
  if (breadcrumbConfig[pathname]) {
    return breadcrumbConfig[pathname];
  }

  // Split the pathname into segments
  const pathSegments = pathname.split('/');

  // Try to match dynamic routes
  for (const configPath of Object.keys(breadcrumbConfig)) {
    const configSegments = configPath.split('/');

    // Skip if segments length doesn't match
    if (pathSegments.length !== configSegments.length) {
      continue;
    }

    // Check if segments match, allowing :id to match any value
    const matches = configSegments.every((segment, index) => {
      if (segment.startsWith(':')) {
        return true; // Match any value for parameters
      }
      return segment === pathSegments[index];
    });

    if (matches) {
      // Replace dynamic segments in href with actual values
      return breadcrumbConfig[configPath].map(item => ({
        ...item,
        href: item.href === '#' ? '#' : replaceDynamicSegments(item.href, pathname)
      }));
    }
  }

  // Return a default breadcrumb for the root segment if no match found
  const rootSegment = '/' + pathSegments[1];
  if (pathSegments.length > 1) {
    return [{ href: rootSegment, label: capitalizeFirstLetter(pathSegments[1]) }];
  }

  return []; // Return empty array if no match found
};

// Helper function to replace :id with actual values
const replaceDynamicSegments = (href: string, actualPath: string): string => {
  if (href === '#') return href;

  const hrefSegments = href.split('/');
  const actualSegments = actualPath.split('/');

  return hrefSegments
    .map((segment, index) => {
      if (segment.startsWith(':')) {
        return actualSegments[index];
      }
      return segment;
    })
    .join('/');
};

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default breadcrumbConfig;