import {
  Pencil,
  Mail,
  Phone,
  Building2,
  EllipsisVertical,
  MoveUp,
  IndianRupee,
  RotateCw,
  PackageMinus,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { assets } from "@/assets/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { SellerEditDialog } from "@/components/Seller/SellerEditDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "@/lib/axios";
import { clearSeller, setSeller } from "@/redux/slices/seller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/utils/FormatPrice";

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
      <header className="bg-teal-800 rounded-xl  h-44 relative">
        <img
          className="w-full h-full object-fit"
          src={assets.banner}
          alt="Banner"
        />

        <div className="absolute  rounded-full  right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white border rounded-full "
          >
            <EllipsisVertical />
          </Button>
        </div>
      </header>

      <div className="px-6 -mt-16">
        <div className="flex justify-between  items-start mb-8">
          <div className="flex items-end gap-4   ">
            <div className="w-32 h-32  rounded-full border-[3px] bg-white border-white relative">
              <img
                className="w-full h-full object-cover  rounded-full"
                src={profilePic ?? assets.account_icon}
                alt="Profile_Picture"
              />
              <label
                htmlFor="profile-pic-input"
                className="absolute  top-1  cursor-pointer right-2 p-1 bg-white rounded-full shadow-sm"
              >
                <Pencil className="h-5 w-5 text-black" />
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

        <div className="space-y-3 mt-5">
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
        </div>

        <div className="grid md:grid-cols-1 mt-8 gap-2">
          {!loading ? (
            <>
              <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold">Sales & Revenue</h2>
                <Button
                  onClick={getProfileStatistics}
                  className="transition-colors duration-300 px-4 py-2 rounded-md flex items-center gap-2  
             bg-white text-black hover:bg-gray-200 
             dark:bg-black dark:text-white dark:hover:bg-gray-800"
                >
                  <RefreshCcw /> Refresh
                </Button>
              </div>

              <div className="space-y-3">
                {salesMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-center gap-2">
                    {metric.img}
                    {metric.value}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[200px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading Sales Metrics...</p>
            </div>
          )}
        </div>

        <div className="mt-12 mb-8">
          <div className="text-xs text-muted-foreground mb-4">
            *Note: Deleting your account is permanent and cannot be undone. All
            your data will be lost.
          </div>

          {/* Button that shows loading when clicked */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="md:px-24 py-5 bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center gap-2">
                {!isDeleting ? " Delete Account Permanent" : "Deleting..."}
              </Button>
            </AlertDialogTrigger>

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
                  className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                  onClick={handleAccountDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Delete Account"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
