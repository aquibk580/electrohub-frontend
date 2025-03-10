import { Link } from 'react-router-dom'
import { ShoppingCart, Gift, HelpCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-8 px-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">ElectroHub</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your one-stop shop for all electronics and tech gadgets. We offer the latest products with competitive prices and excellent customer service.
            </p>
  
            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Accepted Payments</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "visa",
                  "mastercard",
                  "paypal",
                  "apple-pay",
                  "google-pay",
                  "amex",
                  "maestro",
                  "jcb",
                  "mir",
                  "unionpay",
                  "upi"
                ].map((payment) => (
                  <div key={payment} className="bg-muted rounded-lg p-2 flex items-center justify-center">
                    <img
                      src={`/payments/${payment}.svg`}
                      alt={payment}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Department Links */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Department</h2>
            <ul className="space-y-3">
              {[
                'Smartphones',
                'Televisions',
                'Laptops',
                'Tablets',
                'Keyboards',
                'Mice',
                'Device Covers',
                'Gaming Laptops',
                'Electronics & Gadgets',
                'Smartwatches',
                'Earbuds',
                'Accessories',
              ].map((item) => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(/ /g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          {/* About Us Links */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-foreground">About Us</h2>
            <ul className="space-y-3 grid">
              {[
                'About TechHub',
                'Careers',
                'News & Blog',
                'Help',
                'Press Center',
                'Shop By Location',
                'TechHub Brands',
                'Affiliate & Partners',
                'Ideas & Guides'
              ].map((item) => (
                <li key={item}>
                  <Link to={`/about/${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Customer Service */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Customer Service</h2>
            <ul className="space-y-3 grid">
              {[
                'Contact Us',
                'FAQs',
                'Shipping & Delivery',
                'Returns & Exchanges',
                'Order Tracking',
                'Warranty Information',
                'Privacy Policy',
                'Terms of Service',
                'Financing Options'
              ].map((item) => (
                <li key={item}>
                  <Link to={`/customer-service/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Newsletter</h2>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest products, deals, and tech news.
            </p>
            <form className="space-y-3">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
  
        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            {/* Quick Links */}
            <div className="flex flex-wrap gap-6">
              <Link to="/become-seller" className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Become Seller</span>
              </Link>
              <Link to="/gift-cards" className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                <Gift className="h-5 w-5 mr-2" />
                <span>Gift Cards</span>
              </Link>
              <Link to="/help-center" className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>Help Center</span>
              </Link>
            </div>
  
            {/* Terms and Privacy */}
            <div className="flex space-x-6 justify-center">
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy & Policy
              </Link>
            </div>
  
            {/* Copyright */}
            <div className="text-muted-foreground text-right">
              &copy; {new Date().getFullYear()} TechHub. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
