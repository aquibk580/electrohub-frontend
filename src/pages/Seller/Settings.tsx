import ThemeToggle from "@/components/Common/Theme-Toggle";
import { Helmet } from "react-helmet-async";

export default function Settings() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <Helmet
        title="Settings - Seller"
        meta={[
          {
            name: "description",
            content: "Electrohub Seller Settings Page",
          },
          {
            property: "og:title",
            content: "Settings - Seller",
          },
          {
            property: "og:description",
            content: "Electrohub Seller Settings Page",
          },
        ]}
      ></Helmet>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
