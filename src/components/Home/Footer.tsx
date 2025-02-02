
import { Link } from 'react-router-dom';

import { ShoppingCart, Gift, HelpCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white pt-16 pb-8 px-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold">Shopcart</span>
            </div>
            <p className="text-gray-600 mb-6">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </p>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Accepted Payments</h3>
              <div className="grid grid-cols-4 gap-2">
                {['stripe', 'visa', 'mastercard', 'amazon', 'klarna', 'paypal', 'apple-pay', 'google-pay'].map((payment) => (
                  <div key={payment} className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    {/* img */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Links */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Department</h2>
            <ul className="space-y-3">
              {[
                'SmartPhone',
                'Television',
                'Laptop',
                'Tablet',
                'Keyboard',
                'Mouse',
                'Devices Cover',
                'Gaming Laptop',
                'Electronics & Gadget',
                'Watch',
                'Earbuds',
                'Sneakers',

              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Links */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <ul className="space-y-3 grid ">
              {[
                'About Shopcart',
                'Careers',
                'News & Blog',
                'Help',
                'Press Center',
                'Shop By Location',
                'Shopcart Brands',
                'Affiliate & Partners',
                'Ideas & Guides'
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>




        </div>

        {/* Bottom Footer */}
        <div className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            {/* Quick Links */}
            <div className="flex space-x-6">
              <Link to="#" className="flex items-center text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Become Seller</span>
              </Link>
              <Link to="#" className="flex items-center text-gray-600 hover:text-gray-900">
                <Gift className="h-5 w-5 mr-2" />
                <span>Gift Cards</span>
              </Link>
              <Link to="#" className="flex items-center text-gray-600 hover:text-gray-900">
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>Help Center</span>
              </Link>
            </div>

            {/* Terms and Privacy */}
            <div className="flex space-x-6 justify-center">
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                Privacy & Policy
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-right">
              All Right reserved by Musemind <Link to="#" className="underline">ui/ux design</Link> agency | 2022
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


