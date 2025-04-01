import { Pencil, Mail, Phone, Building2, EllipsisVertical, MoveUp, IndianRupee, RotateCw, PackageMinus, Loader2, RefreshCcw } from "lucide-react";
import { assets } from "@/assets/assets";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useMemo, useState } from "react";
import { SellerEditDialog } from "@/components/Seller/SellerEditDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "@/lib/axios";
import { clearSeller, setSeller } from "@/redux/slices/seller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/utils/FormatPrice";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const seller = useSelector((state: RootState) => state.seller.seller);
  const [profilePic, setProfilePic] = useState(seller?.pfp ?? "");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<{
    orderItems: number;
    totalSales: number;
    returnedItems: number;
    notDeliveredItems: number;
  } | null>(null);

  // Your existing functions
  const getProfileStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/seller/profilestatistics`
      );
      if (response.status === 200) {
        const data = {
          orderItems: response.data?.orderItems,
          totalSales: response.data?.totalSales,
          returnedItems: response.data?.returnedItems,
          notDeliveredItems: response.data?.notDeliveredItems,
        };
        sessionStorage.setItem("profileData", JSON.stringify(data));
        setProfileData(data);
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("profileData");
    if (cachedData) {
      setProfileData(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    getProfileStatistics();
  }, []);

  const handleProfilePicChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      try {
        const formData = new FormData();
        formData.append("pfp", file as File);

        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/seller/${seller!.id}`,
          formData
        );

        if (response.status === 200) {
          dispatch(
            setSeller({
              ...seller!,
              pfp: response.data?.seller?.pfp,
            })
          );
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
        console.log(error);
      } finally {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  const handleAccountDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/seller/${seller!.id}`
      );

      if (response.status === 200) {
        dispatch(clearSeller());
        toast.success(
          `Seller account of ${response.data?.seller?.name} deleted successfully`
        );
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const salesMetrics = useMemo(() => {
    if (!profileData) return [];
    return [
      {
        img: (
          <span className="bg-green-100 p-2 rounded-full">
            <MoveUp className="text-green-700 w-5 h-5" />
          </span>
        ),
        label: "items",
        value: `${profileData?.orderItems} items`,
      },
      {
        img: (
          <span className="bg-orange-100 p-2 rounded-full">
            <IndianRupee className="text-orange-500 w-5 h-5" />
          </span>
        ),
        label: "Sale",
        value: `${formatPrice(profileData?.totalSales || 0)}/-`,
      },
      {
        img: (
          <span className="bg-pink-50 p-2 rounded-full">
            <RotateCw className="text-red-500 w-5 h-5" />
          </span>
        ),
        label: "items return",
        value: `${profileData?.returnedItems} items return`,
      },
      {
        img: (
          <span className="bg-red-100 p-2 rounded-full">
            <PackageMinus className="text-red-700 w-5 h-5" />
          </span>
        ),
        label: "Not delivered",
        value: `${profileData?.notDeliveredItems} Items Not delivered`,
      },
    ];
  }, [profileData]);

  return (
    <div className="animate__animated animate__fadeIn">
      <Helmet>
        <title>Profile - Seller</title> 
        <meta name="description" content="Electrohub Seller Profile Page" />
        <meta name="og:url" property="og:url" content={`${import.meta.env.VITE_APP_URL}/seller/profile`} />
      </Helmet>

      {/* Banner section */}
      <header className="bg-teal-700 rounded-2xl h-44 relative">
        {loading ? (
          <Skeleton className="w-full h-full rounded-xl" />
        ) : (
          <img
            className="w-full h-full object-fit  rounded-xl"
            src={assets.banner}
            alt="Banner"
          />
        )}

        <div className="absolute rounded-full right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white border  rounded-full"
          >
            <EllipsisVertical />
          </Button>
        </div>
      </header>

      {/* Profile section */}
      <div className="px-1 md:px-4 lg:px-6 -mt-16">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-end gap-4">
            <div className="w-32 h-32 rounded-full border-[5px] bg-white border-white dark:border-black relative">
              {loading ? (
                <Skeleton className="w-full h-full rounded-full " />
              ) : (
                <Avatar className="w-full h-full ">
                  <AvatarImage  
                    src={profilePic ?? assets.account_icon} 
                    alt="Profile_Picture" 
                    className="object-cover "
                  />
                  <AvatarFallback>
                    {seller?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <label
                htmlFor="profile-pic-input"
                className="absolute top-1 border cursor-pointer right-2 p-1 bg-white rounded-full shadow-sm"
              >
                <Pencil className="h-5 w-5 b text-black" />
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
          </div>
          <SellerEditDialog />
        </div>

        {loading ? (
          <Skeleton className="h-8 w-64 -mt-6 mb-4" />
        ) : (
          <h1 className="text-3xl -mt-6 font-bold flex items-center gap-2">
            {seller!.name}
            <span className="text-blue-500">
              <img
                className="w-8 -mt-3 mr-3"
                src={assets.verify}
                alt="Verify_Icon"
              />
            </span>
          </h1>
        )}

        <div className="space-y-3 mt-5">
          {loading ? (
            <>
              <Skeleton className="h-6 w-full max-w-md mb-2" />
              <Skeleton className="h-6 w-full max-w-md mb-2" />
              <Skeleton className="h-6 w-full max-w-md" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  <Mail />
                </span>
                {seller!.email}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  <Phone />
                </span>
                +91 {seller!.phone}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  <Building2 />
                </span>
                {seller!.address}
              </div>
            </>
          )}
        </div>

        {/* Sales metrics section */}
        <Card className="mt-8 border-primary/75 bg-primary/5 rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Sales & Revenue</CardTitle>
              <Button
                variant="outline"
                onClick={getProfileStatistics}
                className="flex items-center border-primary rounded-xl gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 text-primary" />
                )}
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-3">
                {salesMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {metric.img}
                    <span>{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete account section */}
        <div className="mt-12 mb-8">
          <div className="text-xs text-muted-foreground mb-4">
            *Note: Deleting your account is permanent and cannot be undone. All
            your data will be lost.
          </div>

          <AlertDialog>
            <div className="flex  justify-center md:justify-start">
            <AlertDialogTrigger  asChild>
              <Button 
                variant="destructive" 
                className="w-[100%] md:w-80 place-content-center rounded-xl md:px-24 py-5"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </div>
                ) : (
                  "Delete Account Permanent"
                )}
              </Button>
            </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button
                  variant="destructive"
                  onClick={handleAccountDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Delete Account
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}