import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faqs() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

      <p>
        Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact our
        customer support team.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What are your store hours?</AccordionTrigger>
          <AccordionContent>
            Most ElectroHub stores are open Monday through Saturday from 10:00 AM to 9:00 PM, and Sunday from 11:00 AM
            to 6:00 PM. Hours may vary by location, especially during holidays. Please check our Store Locator for
            specific hours at your nearest location.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your ElectroHub account and visiting the "Order History" section.
            Alternatively, you can use the tracking number provided in your shipping confirmation email. If you checked
            out as a guest, you can track your order using the order number and email address on our Order Tracking
            page.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            Most items can be returned within 30 days of purchase with the original receipt and packaging. Some
            products, such as opened software, digital downloads, and certain personal care items, may have different
            return policies. Restocking fees may apply to certain items. Please see our full Return Policy for details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do you price match?</AccordionTrigger>
          <AccordionContent>
            Yes, ElectroHub offers price matching against local retail competitors and select online retailers. The item
            must be identical (same model number and color), in stock at the competitor, and we must be able to verify
            the price. Price matching requests must be made at the time of purchase or within our return period if
            you've already purchased the item.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How do I cancel or modify an order?</AccordionTrigger>
          <AccordionContent>
            If you need to cancel or modify an order, please contact our customer service team as soon as possible at
            1-800-ELECTRO. We process orders quickly, so there's a limited window to make changes. Once an order has
            shipped, it cannot be canceled, but you can return it according to our return policy once received.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
          <AccordionContent>
            Currently, ElectroHub ships to addresses within the United States, including Alaska, Hawaii, and Puerto
            Rico. We also ship to Canada and Mexico. We do not offer shipping to other international destinations at
            this time, but we're working to expand our shipping options in the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>How do I redeem a gift card?</AccordionTrigger>
          <AccordionContent>
            You can redeem an ElectroHub gift card in-store at checkout or online by entering the gift card number and
            PIN during the payment step of checkout. Gift cards never expire and can be used for any purchase. If your
            purchase amount exceeds the gift card balance, you'll need to pay the difference with another payment
            method.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>What is ElectroHub's price adjustment policy?</AccordionTrigger>
          <AccordionContent>
            If an item you purchased goes on sale within 14 days of your purchase, we'll refund the difference between
            what you paid and the sale price. You'll need to bring your original receipt to any ElectroHub store or
            contact customer service with your order number if you purchased online. Some exclusions apply, including
            clearance items and limited-time offers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="bg-muted p-4 rounded-lg mt-8">
        <h3 className="font-medium mb-2">Still have questions?</h3>
        <p>Our customer support team is available to help you:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Phone: 1-800-ELECTRO (1-800-353-2876)</li>
          <li>Email: support@electrohub.com</li>
          <li>Live Chat: Available on our website 24/7</li>
          <li>In-Store: Visit any ElectroHub location</li>
        </ul>
      </div>
    </div>
  )
}

