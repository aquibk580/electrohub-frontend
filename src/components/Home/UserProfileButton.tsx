import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ShoppingCart, User, Heart, Settings } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import axios from "../../lib/axios";
import { clearUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserProfileButtonProps {
  name: string;
  imageUrl: string;
  email: string;
}

export function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-red-600",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-gray-500",
    "bg-stone-500",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export default function UserProfileButton({
  name,
  imageUrl,
  email,
}: UserProfileButtonProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initials = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`
      );
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "light",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const navigateTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 300);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center  px-0 hover:bg-transparent md:pl-6 lg:p-5 py-6"
          onMouseEnter={() => {
            // clearTimeout(closeTimeout); // Prevents immediate closing
            setOpen(true);
          }}
        >
          <Avatar>
            <AvatarImage
              src={imageUrl}
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback
              className={`${bgColor}  to-black text-white font-extrabold`}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden lg:block">{name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo("/user/profile")}
        >
          <User size={16} className="text-primary" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo("/user/cart")}
        >
          <ShoppingCart size={16} className="text-primary" />
          <span>Cart</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo("/user/wishlist")}
        >
          <Heart size={16} className="text-primary" />
          <span>Wishlist</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo("/user/settings")}
        >
          <Settings size={16} className="text-primary" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-500 focus:text-red-500"
          onClick={handleLogOut}
        >
          <LogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
