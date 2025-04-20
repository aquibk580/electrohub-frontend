import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface FooterProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function TFooter({ activeTab, setActiveTab }: FooterProps) {
  const navigate = useNavigate();

  const handleClick = (tab: string) => {
    setActiveTab?.(tab); 
    navigate(`/user/info/${tab}`);
    console.log("clicked");
  };
  return (
    <footer className="border-t bg-muted">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  onClick={() => handleClick("warranty")}
                  className={`text-sm hover:underline ${activeTab === "warranty" ? "font-medium" : ""}`}
                >
                  Warranty Information
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("privacy")}
                  className={`text-sm hover:underline ${activeTab === "privacy" ? "font-medium" : ""}`}
                >
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("terms")}
                  className={`text-sm hover:underline ${activeTab === "terms" ? "font-medium" : ""}`}
                >
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("financing")}
                  className={`text-sm hover:underline ${activeTab === "financing" ? "font-medium" : ""}`}
                >
                  Financing Options
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  onClick={() => handleClick("faqs")}
                  className={`text-sm hover:underline ${activeTab === "faqs" ? "font-medium" : ""}`}
                >
                  FAQs
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("careers")}
                  className={`text-sm hover:underline ${activeTab === "careers" ? "font-medium" : ""}`}
                >
                  Careers
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("news")}
                  className={`text-sm hover:underline ${activeTab === "news" ? "font-medium" : ""}`}
                >
                  News & Blog
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("help")}
                  className={`text-sm hover:underline ${activeTab === "help" ? "font-medium" : ""}`}
                >
                  Help
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About ElectroHub</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  onClick={() => handleClick("press")}
                  className={`text-sm hover:underline ${activeTab === "press" ? "font-medium" : ""}`}
                >
                  Press Center
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("locations")}
                  className={`text-sm hover:underline ${activeTab === "locations" ? "font-medium" : ""}`}
                >
                  Shop By Location
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("brands")}
                  className={`text-sm hover:underline ${activeTab === "brands" ? "font-medium" : ""}`}
                >
                  ElectroHub Brands
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Partners & Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  onClick={() => handleClick("affiliate")}
                  className={`text-sm hover:underline ${activeTab === "affiliate" ? "font-medium" : ""}`}
                >
                  Affiliate & Partners
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("ideas")}
                  className={`text-sm hover:underline ${activeTab === "ideas" ? "font-medium" : ""}`}
                >
                  Ideas & Guides
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} ElectroHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

