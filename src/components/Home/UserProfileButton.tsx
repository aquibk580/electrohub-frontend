import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ShoppingCart, User, Heart } from "lucide-react";
import { useMemo } from "react";
import axios from "../../lib/axios";
import { clearUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

interface UserProfileButtonProps {
  name: string;
  imageUrl: string;
}

function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function UserProfileButton({
  name,
  imageUrl,
}: UserProfileButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const initials = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);

  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/logout"
      );
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success("Logged out successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-4 py-2">
          <Avatar>
            <AvatarImage src={imageUrl} alt="User" />
            <AvatarFallback className={`${bgColor} text-white font-bold`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <User size={16} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={16} /> Cart
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Heart size={16} /> Wishlist
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-500"
          onClick={handleLogOut}
        >
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
