// export const mockData = {
//     sellers: [
//       {
//         id: "AHS56194",
//         sellerName: "Aquib Khan",
//         sellerNiche: "Toys",
//         totalProfits: "₹11,000,000",
//         totalItemsSold: "1,232,423",
//         originCountry: "India",
//       },
//       {
//         id: "AHS56195",
//         sellerName: "Aadharsh Mishra",
//         sellerNiche: "Phones",
//         totalProfits: "₹11,500,000",
//         totalItemsSold: "1,231,423",
//         originCountry: "United States",
//       },
//       // Add more sellers...
//     ],
//     buyers: [
//       {
//         id: "AHS56194",
//         buyerName: "Aquib Khan",
//         totalSpend: "₹17,000,000",
//         totalItemsPurchased: "1,232,423",
//         location: "India",
//       },
//       // Add more buyers...
//     ],
//     orders: [
//       {
//         id: "ORD123",
//         product: {
//           name: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//           image: "/placeholder.svg?height=50&width=50",
//         },
//         customer: "RS",
//         customerName: "Raihan Shaikh",
//         date: "Jan 30, 08:32 PM",
//         total: "₹1,48,000/-",
//         status: "Pending",
//       },
//       // Add more orders...
//     ],
//     // Add more mock data...
//   }

//   export const tableHeaders = {
//     topSeller: [
//       { key: "id", label: "ID" },
//       { key: "sellerName", label: "Seller Name" },
//       { key: "sellerNiche", label: "Seller Niche" },
//       { key: "totalProfits", label: "Total Profits" },
//       { key: "totalItemsSold", label: "Total Items Sold" },
//       { key: "originCountry", label: "Origin Country" },
//     ],
//     // Add more headers...
//   }

interface OrderTimeline {
  status: string;
  date: string;
  description: string;
}

interface BuyerDetails {
  id: string;
  personalInfo: {
    buyerName: string;
    email: string;
    phone: string;
    age: number;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
    profilePhoto: string;
    joinDate: string;
    status: "active" | "suspended";
  };
  statistics: {
    totalSpend: string;
    totalItemsPurchased: string;
    totalReturns: number;
    returnsRate: string;
    averageOrderValue: string;
    lastPurchaseDate: string;
  };
  paymentDetails: {
    preferredPaymentMethod: string;
    savedCards: Array<{
      cardType: string;
      lastFourDigits: string;
    }>;
    walletBalance: string;
  };
  purchaseHistory: Array<{
    orderId: string;
    date: string;
    items: Array<{
      productName: string;
      quantity: number;
      price: string;
    }>;
    total: string;
    status: string;
  }>;
  reviews: Array<{
    productId: string;
    productName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

// Add this to your mockData object
export const buyerDetails: Record<string, BuyerDetails> = {
  BUYER1: {
    id: "BUYER1",
    personalInfo: {
      buyerName: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      age: 32,
      address: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
      profilePhoto: "/api/placeholder/150/150",
      joinDate: "Jan 15, 2023",
      status: "active",
    },
    statistics: {
      totalSpend: "₹4,75,000",
      totalItemsPurchased: "156",
      totalReturns: 3,
      returnsRate: "1.92%",
      averageOrderValue: "₹3,046",
      lastPurchaseDate: "Feb 10, 2024",
    },
    paymentDetails: {
      preferredPaymentMethod: "UPI",
      savedCards: [
        { cardType: "VISA", lastFourDigits: "4321" },
        { cardType: "Mastercard", lastFourDigits: "8765" },
      ],
      walletBalance: "₹2,500",
    },
    purchaseHistory: [
      {
        orderId: "ORD1001",
        date: "Feb 10, 2024",
        items: [
          { productName: "iPhone 15 Pro", quantity: 1, price: "₹119,900" },
          { productName: "AirPods Pro", quantity: 1, price: "₹26,900" },
        ],
        total: "₹146,800",
        status: "Delivered",
      },
    ],
    reviews: [
      {
        productId: "PRD1001",
        productName: "iPhone 15 Pro",
        rating: 5,
        comment: "Excellent product, great camera quality!",
        date: "Feb 15, 2024",
      },
    ],
  },
  // Add more buyer details as needed...
};

export const mockData = {
  chartData: {
    monthlySales: {
      title: "Sales",
      total: "₹1,32,42,400",
      data: [
        { month: "1", sales: 85000, revenue: 62000 },
        { month: "2", sales: 115000, revenue: 89000 },
        { month: "3", sales: 125000, revenue: 98000 },
        { month: "4", sales: 75000, revenue: 58000 },
        { month: "5", sales: 95000, revenue: 72000 },
      ],
    },
    monthlyRevenue: {
      title: "Revenue",
      total: "₹98,31,800",
      data: [
        { month: "1", sales: 75000, revenue: 52000 },
        { month: "2", sales: 105000, revenue: 79000 },
        { month: "3", sales: 115000, revenue: 88000 },
        { month: "4", sales: 65000, revenue: 48000 },
        { month: "5", sales: 85000, revenue: 62000 },
      ],
    },
  },
  mostSearchedProducts: [
    { name: "Iphone 13 Pro Max", searches: 1560 },
    { name: "Motorola Edge 40", searches: 1460 },
    { name: "Ipad Mini", searches: 1560 },
    { name: "Macbook Pro 2024", searches: 1560 },
    { name: "Ipad M1", searches: 1560 },
  ],
  topsellers: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    sellerName: `Seller ${i + 1}`,
    sellerNiche: ["Electronics", "Clothing", "Toys", "Books", "Furniture"][
      i % 5
    ],
    totalProfits: `₹${(Math.random() * 10_000_000).toFixed(2)}`,
    totalItemsSold: `${Math.floor(Math.random() * 500_000)}`,
    originCountry: ["India", "United States", "China", "Germany", "Canada"][
      i % 5
    ],
  })),
  sellers: Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    sellerName: `Seller ${i + 1}`,
    sellerNiche: ["Electronics", "Clothing", "Toys", "Books", "Furniture"][
      i % 5
    ],
    totalProfits: `₹${(Math.random() * 10_000_000).toFixed(2)}`,
    totalItemsSold: `${Math.floor(Math.random() * 500_000)}`,
    originCountry: ["India", "United States", "China", "Germany", "Canada"][
      i % 5
    ],
  })),
  buyers: Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    buyerName: `Buyer ${i + 1}`,
    totalSpend: `₹${(Math.random() * 20_000_000).toFixed(2)}`,
    totalItemsPurchased: `${Math.floor(Math.random() * 500_000)}`,
    location: ["India", "United States", "France", "Japan", "UK"][i % 5],
  })),
  orders: Array.from({ length: 50 }, (_, i) => ({
    id: `ORD${1000 + i}`,
    image: `/orders/img-${Math.floor(Math.random() * 7) + 1}.jpg`,
    productName: `Product ${i + 1} (${
      ["Electronics", "Clothing", "Toys", "Books", "Furniture"][i % 5]
    })`,
    customer: `CUST${i + 1}`,
    customerName: `Customer ${i + 1}`,
    date: `Jan ${Math.floor(Math.random() * 30) + 1}, ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)} PM`,
    total: `₹${(Math.random() * 200_000).toFixed(2)}/-`,
    status: ["Pending", "Shipped", "Returns", "Delivered", "Cancelled"][i % 5],
    paymentStatus: ["Pending", "Completed"][i % 2],
    orderDetails: {
      orderTimeline: [
        {
          status: "Order Placed",
          date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024 ${
            Math.floor(Math.random() * 12) + 1
          }:${Math.floor(Math.random() * 60)} PM`,
          description: "Order has been placed successfully",
        },
        {
          status: "Order Confirmed",
          date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024 ${
            Math.floor(Math.random() * 12) + 1
          }:${Math.floor(Math.random() * 60)} PM`,
          description: "Order has been confirmed by the seller",
        },
        {
          status: "Shipped",
          date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024 ${
            Math.floor(Math.random() * 12) + 1
          }:${Math.floor(Math.random() * 60)} PM`,
          description: "Order has been shipped",
        },
        {
          status: "Out for Delivery",
          date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024 ${
            Math.floor(Math.random() * 12) + 1
          }:${Math.floor(Math.random() * 60)} PM`,
          description: "Order is out for delivery",
        },
        {
          status: "Delivered",
          date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024 ${
            Math.floor(Math.random() * 12) + 1
          }:${Math.floor(Math.random() * 60)} PM`,
          description: "Order has been delivered successfully",
        },
      ],
      sellerInfo: {
        id: `SELLER${i + 1}`,
        name: `Seller ${i + 1}`,
        rating: 4.5,
        totalOrders: Math.floor(Math.random() * 10000),
      },
      shippingAddress: {
        name: `Customer ${i + 1}`,
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 9876543210",
      },
      paymentDetails: {
        method: ["Credit Card", "UPI", "Net Banking"][i % 3],
        transactionId: `TXN${Math.random().toString(36).substring(7)}`,
        status: ["Pending", "Completed"][i % 2],
      },
    },
  })),
  products: Array.from({ length: 50 }, (_, i) => ({
    id: `PRD${1000 + i}`,
    image: `/orders/img-${Math.floor(Math.random() * 7) + 1}.jpg`,
    title: `${
      [
        "iPhone 15 Pro",
        "MacBook Pro",
        "Sony WH-1000XM4",
        "Apple Watch Series 8",
        "Samsung Galaxy S23",
        "Dell XPS 13",
        "AirPods Pro",
        "Galaxy Watch 5",
        "iPad Pro",
        "Surface Laptop",
      ][i % 10]
    } ${["128GB", "256GB", "512GB"][i % 3]}`,
    seller: `Seller ${i + 1}`,
    price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
    quantity: Math.floor(Math.random() * 100),
    category: ["Phones", "PCs", "Headphones", "Smart Watches", "Gadgets"][
      i % 5
    ],
    status: ["In Stock", "Out of Stock"][i % 5 === 0 ? 1 : 0],
    details: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      specifications: {
        Display: [
          "6.7-inch Super Retina XDR",
          "6.1-inch Liquid Retina",
          "15.6-inch 4K UHD",
          "1.9-inch AMOLED",
        ][i % 4],
        Processor: ["A17 Pro chip", "M2 Pro", "Intel Core i7", "Exynos 2200"][
          i % 4
        ],
        RAM: ["8GB", "16GB", "32GB"][i % 3],
        Storage: ["128GB", "256GB", "512GB", "1TB"][i % 4],
        Battery: ["4000mAh", "5000mAh", "6000mAh"][i % 3],
        OS: ["iOS 17", "macOS Sonoma", "Windows 11", "Android 14"][i % 4],
      },
      variants: [
        {
          color: ["Space Black", "Silver", "Gold", "Blue"][i % 4],
          storage: ["128GB", "256GB", "512GB"][i % 3],
          price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
          quantity: Math.floor(Math.random() * 50),
        },
        {
          color: ["Space Black", "Silver", "Gold", "Blue"][(i + 1) % 4],
          storage: ["128GB", "256GB", "512GB"][(i + 1) % 3],
          price: `₹${(Math.random() * 150000 + 10000).toFixed(2)}`,
          quantity: Math.floor(Math.random() * 50),
        },
      ],
      reviews: Array.from({ length: 5 }, (_, j) => ({
        rating: Math.floor(Math.random() * 2) + 4,
        comment: "Great product! Exactly as described.",
        userName: `User ${j + 1}`,
        date: `Feb ${Math.floor(Math.random() * 28) + 1}, 2024`,
      })),
      warranty: "1 Year Manufacturer Warranty",
      returnPolicy: "30 Days Return Policy",
    },
  })),
  productStats: {
    totalProducts: "4,65,053",
    newProducts: "65",
    inStock: "4,65,000",
    outOfStock: "53",
    categories: "7",
  },
  allPayments: Array.from({ length: 50 }, (_, i) => ({
    id: `UP${1000 + i}`,
    pid: `PRD${1000 + i}`,
    paymentMode: [
      "COD",
      "Bank Transfer",
      "Buy Now, Pay Later",
      "Credit/Debit Cards",
      "UPI",
      "Electrohub Wallet",
      "Digital Wallets",
    ][i % 7],
    status: ["Completed", "Pending", "Oh Hold", "Cancelled"][i % 4],
    amount: `₹${(Math.random() * 150000 + 100000).toFixed(2)}`,
    sender: `SELLER${i + 1}`,
    receiver: `BUYER${i + 1}`,
    date: `Jan ${Math.floor(Math.random() * 30) + 1}, ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)} PM`,
  })),
  withdrawlRequest: Array.from({ length: 50 }, (_, i) => ({
    id: `RE${1000 + i}`,
    sender: `SELLER${i + 1}`,
    paymentMode: [
      "COD",
      "Bank Transfer",
      "UPI",
      "Electrohub Wallet",
      "Digital Wallets",
    ][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    amount: `₹${(Math.random() * 150000 + 100000).toFixed(2)}`,
    tenure: `${Math.floor(Math.random() * 24) + 1}`,
    identityProof: ["PAN", "Adhaar", "Election Card"][i % 3],
    date: `Jan ${Math.floor(Math.random() * 30) + 1}, ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)} PM`,
  })),
  customerRefunds: Array.from({ length: 50 }, (_, i) => ({
    id: `REfund${1000 + i}`,
    oid: `ORD${1000 + i}`,
    bid: `BUYER${i + 1}`,
    buyerName: `Buyer ${i + 1}`,
    amount: `₹${(Math.random() * 150000 + 100000).toFixed(2)}`,
    status: ["Completed", "Pending", "Cancelled"][i % 3],
    phone: "+91 9876543210",
    date: `Jan ${Math.floor(Math.random() * 30) + 1}, ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)} PM`,
  })),
  messages: Array.from({ length: 50 }, (_, i) => ({
    id: `MSG${1000 + i}`,
    sender: `${["Seller", "Buyer"][i % 2]} ${i + 1}`,
    senderType: ["Seller", "Buyer"][i % 2],
    subject: [
      "Product Inquiry",
      "Shipping Question",
      "Payment Issue",
      "Return Request",
      "General Complaint",
      "Order Status",
      "Technical Support",
      "Feedback",
    ][i % 8],
    messageType: ["Question", "Complaint", "Support", "Feedback", "Request"][
      i % 5
    ],
    message: `Sample message content ${
      i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    timestamp: new Date(
      2024,
      0,
      Math.floor(Math.random() * 30) + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    ).toISOString(),
    unread: Math.random() > 0.5,
    priority: ["High", "Medium", "Low"][i % 3],
  })),
  messageStats: {
    totalMessages: "1,234",
    activeChats: "456",
    complaints: "89",
    unreadMessages: "45",
  },
};

export const tableHeaders = {
  topSeller: [
    { key: "id", label: "ID" },
    { key: "name", label: "Seller Name" },
    { key: "email", label: "Seller Email" },
    { key: "phone", label: "Contact" },
    { key: "address", label: "Location" },
  ],
  seller: [
    { key: "id", label: "ID" },
    { key: "name", label: "Seller Name" },
    { key: "email", label: "Seller Email" },
    { key: "phone", label: "Contact" },
    { key: "address", label: "Location" },
  ],
  buyer: [
    { key: "id", label: "ID" },
    { key: "name", label: "Buyer Name" },
    { key: "email", label: "Buyer Email" },
    { key: "phone", label: "Contact" },
    { key: "address", label: "Location" },
  ],
  order: [
    { key: "image", label: "Image" },
    { key: "id", label: "ID" },
    { key: "productName", label: "Product Name" },
    { key: "customerName", label: "Customer Name" },
    { key: "date", label: "Date" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
    { key: "paymentStatus", label: "Payment Status" },
  ],
  product: [
    { key: "image", label: "Image" },
    { key: "id", label: "ID" },
    { key: "title", label: "Product Name" },
    { key: "seller", label: "Seller" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "category", label: "Category" },
  ],
  allPayments: [
    { key: "id", label: "Transaction ID" },
    { key: "pid", label: "Product ID" },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Amount" },
    { key: "sender", label: "Sender" },
    { key: "receiver", label: "Receiver" },
    { key: "date", label: "Date" },
  ],
  withdrawlRequest: [
    { key: "id", label: "Request ID" },
    { key: "sender", label: "Sender" },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Amount" },
    { key: "tenure", label: "Tenure" },
    { key: "identityProof", label: "Identity Proof" },
    { key: "date", label: "Date" },
  ],
  customerRefunds: [
    { key: "id", label: "Refund ID" },
    { key: "oid", label: "Order ID" },
    { key: "bid", label: "Buyer ID" },
    { key: "buyerName", label: "Buyer Name" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "phone", label: "Phone" },
    { key: "date", label: "Date" },
  ],
};
