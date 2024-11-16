import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/user.request";
import { NavArrowDown } from "iconoir-react";
import ButtonUser from "./ButtonLogout";

function ButtonUserSettings() {
  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  if (userError || userLoading) return <div>chargement...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-2.5">
          <Avatar className="w-8 h-8 rounded-xl">
            <AvatarImage src={user.avatarUrl} alt="image de l'utilisateur" />
          </Avatar>
          <p className="w-full text-left">{user.name}</p>
          <div className="w-4 h-4">
            <NavArrowDown className="w-4 h-4" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ButtonUser />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ButtonUserSettings;
