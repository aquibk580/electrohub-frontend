import { Edit, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const socialLinks = [
  { platform: "Website", url: "amazonia.in" },
  { platform: "Instagram", url: "@amazonia" },
  { platform: "Facebook", url: "fb.com/amazonia" },
  { platform: "Reddit", url: "r/amazonia" },
  { platform: "Email", url: "amazonia@techub.com" },
];

const salesMetrics = [
  { label: "items", value: "12,000 items" },
  { label: "Sale", value: "5,28,593/-" },
  { label: "items return", value: "567 items return" },
  { label: "Not delivered", value: "3 Items Not delivered" },
];

export default function Profile() {
  const seller = useSelector((state: RootState) => state.seller.seller);
  return (
    <div>
      <header className="bg-teal-800 h-48 relative">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-6 -mt-16">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-end gap-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white relative">
              <img src={seller?.pfp} alt="" className="absolute rounded-full" />
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {seller?.name}
                <span className="text-blue-500">✓</span>
              </h1>
              <div className="text-muted-foreground">{seller?.email}</div>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">📞</span>
            +91 {seller?.phone}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">📍</span>
            {seller?.address}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <div key={link.platform} className="flex items-center gap-2">
                  <span className="text-blue-500">🌐</span>
                  {link.url}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Sales & Revenue</h2>
            <div className="space-y-3">
              {salesMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-2">
                  <span>📈</span>
                  {metric.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <div className="text-sm text-muted-foreground mb-4">
            *Note: Deleting your account is permanent and cannot be undone. All
            your data will be lost.
          </div>
          <Button variant="destructive" className="w-full">
            Delete Account Permanent
          </Button>
        </div>
      </div>
    </div>
  );
}
