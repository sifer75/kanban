import { Check } from "iconoir-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddFriend } from "@/lib/user.request";
import { Dispatch, SetStateAction } from "react";

interface FriendCardAddProps {
  userId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function FriendCardAdd({ userId, setOpen }: FriendCardAddProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AddFriend,
    mutationKey: ["addFriend"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  return (
    <Button
      className="rounded-full w-12 h-12 bg-green-400"
      onClick={() => {
        mutation.mutate(userId);
        setOpen(false);
      }}
    >
      <Check className="w-full h-full" />
    </Button>
  );
}

export default FriendCardAdd;
