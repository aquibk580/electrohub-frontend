import {
  Pencil,
  Mail,
  Phone,
  Building2,
  Globe,
  Instagram,
  EllipsisVertical,
  Facebook,
  MailOpen,
  Github,
  MoveUp,
  IndianRupee,
  RotateCw,
  PackageMinus,
  Loader2,
} from "lucide-react";
import { assets } from "@/assets/assets";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SellerEditDialog } from "@/components/Seller/SellerEditDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { clearSeller, setSeller } from "@/redux/slices/seller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const socialLinks = [
  {
    img: <Globe className="text-blue-500" />,
    platform: "Website",
    url: "amazonia.in",
  },
  {
    img: <Instagram className="text-red-500" />,
    platform: "Instagram",
    url: "@amazonia",
  },
  {
    img: <Facebook className="text-blue-700" />,
    platform: "Facebook",
    url: "fb.com/amazonia",
  },
  { img: <Github />, platform: "Reddit", url: "r/amazonia" },
  {
    img: <MailOpen className="text-gray-500" />,
    platform: "Email",
    url: "amazonia@techub.com",
  },
];

const salesMetrics = [
  {
    img: (
      <span className="bg-green-100 p-2 rounded-full">
        <MoveUp className="text-green-700 w-5 h-5" />
      </span>
    ),
    label: "items",
    value: "12,000 items",
  },
  {
    img: (
      <span className="bg-orange-100 p-2 rounded-full">
        <IndianRupee className="text-orange-500 w-5 h-5" />
      </span>
    ),
    label: "Sale",
    value: "5,28,593/-",
  },
  {
    img: (
      <span className="bg-pink-50 p-2 rounded-full">
        <RotateCw className="text-red-500 w-5 h-5" />
      </span>
    ),
    label: "items return",
    value: "567 items return",
  },
  {
    img: (
      <span className="bg-red-100 p-2 rounded-full">
        <PackageMinus className="text-red-700 w-5 h-5" />
      </span>
    ),
    label: "Not delivered",
    value: "3 Items Not delivered",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const seller = useSelector((state: RootState) => state.seller.seller);
  const [profilePic, setProfilePic] = useState(seller!.pfp);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
                src={profilePic}
                alt=""
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
          {/* {editProfile == true ? (<Button className="border shadow-none text-white mt-20 hover:bg-green-950 bg-green-900 rounded-full " onClick={() => seteditProfile(false)}>Save Changes</Button>) : (
            <Button variant="outline" className="border shadow-none text-gray-600 mt-20 rounded-full " onClick={() => seteditProfile(true)}>Edit Profile</Button>
          )} */}
          <SellerEditDialog />
        </div>

        <h1 className="text-3xl -mt-6 font-bold flex items-center gap-2">
          {seller!.name}
          <span className="text-blue-500">
            <img className="w-8 -mt-3 mr-3" src={assets.verify} alt="" />
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

        <div className="grid md:grid-cols-2 mt-8 gap-8">
          {/* <div>
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <div key={link.platform} className="flex items-center gap-2">
                  <span className="">{link.img}</span>
                  {link.url}
                </div>
              ))}
            </div>
          </div> */}

          <div>
            <h2 className="text-xl font-semibold mb-4">Sales & Revenue</h2>
            <div className="space-y-3">
              {salesMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-2">
                  {metric.img}
                  {metric.value}
                </div>
              ))}
            </div>
          </div>
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
                >
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
