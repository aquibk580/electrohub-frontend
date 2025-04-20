import ThemeToggle from "@/components/Common/Theme-Toggle";
import { Helmet } from "react-helmet-async";

export default function Settings() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <Helmet
        title="Settings | Admin"
        meta={[
          {
            name: "description",
            content: "Set and change Theme according to your Fit",
          },
        ]}
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
