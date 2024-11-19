import { User } from "@/lib/cards.utils";
import FriendCardAdd from "./FriendCardAdd";
import FriendCardDelete from "./FriendCardDelete";
import { Dispatch, SetStateAction } from "react";

interface FriendCardProps {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function FriendCard({ user, setOpen }: FriendCardProps) {
  return (
    <div
      className="w-full h-full flex  p-2 items-center justify-between border-y border-black"
      key={user.name}
    >
      <div className="flex items-center gap-5">
        <img
          src={user.avatarUrl}
          alt={`${user.name}-avatar`}
          className="w-16 h-16 rounded-full"
        ></img>
        <span>{user.name}</span>
      </div>
      <div className="gap-3 flex">
        <FriendCardAdd userId={user.id} setOpen={setOpen} />
        <FriendCardDelete userId={user.id} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default FriendCard;
