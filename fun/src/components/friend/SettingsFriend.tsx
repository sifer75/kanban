import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteFriend } from "@/lib/user.request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatLines, List, UserXmark } from "iconoir-react";
import { useNavigate } from "react-router-dom";

interface SettingsFriendProps {
  id: number;
  setSpeaking: (index: boolean) => void;
}
function SettingsFriend({ id, setSpeaking }: SettingsFriendProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: DeleteFriend,
    mutationKey: ["deleteFriend"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full p-0 w-10 h-10">
          <List className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            navigate(`/message/${id}`);
            setSpeaking(true);
          }}
        >
          <ChatLines className="w-5 h-5" />
          <span>Message</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            mutation.mutate(id), setSpeaking(false);
          }}
        >
          <UserXmark className="w-5 h-5" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingsFriend;
