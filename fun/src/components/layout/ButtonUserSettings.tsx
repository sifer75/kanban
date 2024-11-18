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
import { User } from "@/lib/cards.utils";
import React from "react";

const ButtonUserSettings = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUserInfo,
    retry: false,
  });

  if (userError || userLoading) return <div>chargement...</div>;

  if (!user) return;

  const { name, avatarUrl } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-full flex items-center gap-2.5"
          ref={ref}
          aria-label="Menu utilisateur"
          {...props}
        >
          <Avatar className="w-8 h-8 rounded-xl">
            <AvatarImage src={avatarUrl} alt="image de l'utilisateur" />
          </Avatar>
          <p className="w-full text-left">{name}</p>
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
});

export default ButtonUserSettings;
