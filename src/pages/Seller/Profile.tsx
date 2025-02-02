import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function SellerProfile() {
  const seller = useSelector((state: RootState) => state.seller.seller);
  return (
    <div className="">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Seller Info</h2>

        {/* Profile Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={seller?.pfp} alt="Seller Avatar" />
              <AvatarFallback className="text-2xl">XYZ</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 rounded-full bg-white"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Personal Info Card */}
        <Card className="w-full">
          <CardHeader className="p-3 sm:p-5">
            <CardTitle className="text-[#0B9B0B] text-xl">
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-5">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-row w-fit">
                <h1 className="font-semibold">Name :</h1>
                <p className="">{seller?.name}</p>
              </div>
              <div className="flex flex-row w-fit">
                <h1 className="font-semibold">Mobile No :</h1>
                <p className="">{seller?.phone}</p>
              </div>
              <div className="flex flex-row w-fit">
                <h1 className="font-semibold">E-mail ID :</h1>
                <p className="">{seller?.email}</p>
              </div>
              <div className="flex flex-row w-fit">
                <h1 className="font-semibold">Address :</h1>
                <p className="">{seller?.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
