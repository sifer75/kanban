import { Check } from "iconoir-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { AddFriend } from "@/lib/user.request";

interface FriendCardAddProps {
  userId: number;
}
function FriendCardAdd({ userId }: FriendCardAddProps) {
  const mutation = useMutation({
    mutationFn: AddFriend,
    mutationKey: ["friend"],
  });
  return (
    <Button
      className="rounded-full w-12 h-12 bg-green-400"
      onClick={() => mutation.mutate(userId)}
    >
      <Check className="w-full h-full" />
    </Button>
  );
}

export default FriendCardAdd;
