import { Button } from "../ui/button";
import { Xmark } from "iconoir-react";
import { useMutation } from "@tanstack/react-query";
import { DeleteRequestFriend } from "@/lib/user.request";
import { Dispatch, SetStateAction } from "react";

interface FriendCardDeleteProps {
  userId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function FriendCardDelete({ userId, setOpen }: FriendCardDeleteProps) {
  const mutation = useMutation({
    mutationFn: DeleteRequestFriend,
    mutationKey: ["deleteFriend"],
  });
  return (
    <Button
      className="rounded-full w-12 h-12 bg-red-600"
      onClick={() => {
        mutation.mutate(userId);
        setOpen(false);
      }}
    >
      <Xmark className="w-full h-full" />
    </Button>
  );
}

export default FriendCardDelete;
