import { Button } from "../ui/button";
import { Xmark } from "iconoir-react";
import { useMutation } from "@tanstack/react-query";
import { DeleteRequestFriend } from "@/lib/user.request";

interface FriendCardDeleteProps {
  userId: number;
}
function FriendCardDelete({ userId }: FriendCardDeleteProps) {
  const mutation = useMutation({
    mutationFn: DeleteRequestFriend,
    mutationKey: ["friend"],
  });
  return (
    <Button
      className="rounded-full w-12 h-12 bg-red-600"
      onClick={() => mutation.mutate(userId)}
    >
      <Xmark className="w-full h-full" />
    </Button>
  );
}

export default FriendCardDelete;
