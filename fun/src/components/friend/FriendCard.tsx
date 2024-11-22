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
      key={user.friendId}
    >
      <div className="flex items-center gap-5">
        <img
          src={user.friend.avatarUrl}
          alt={`${user.friend.name}-avatar`}
          className="w-16 h-16 rounded-full"
        ></img>
        <span>{user.friend.name}</span>
      </div>
      <div className="gap-3 flex">
        <FriendCardAdd userId={user.friendId} setOpen={setOpen} />
        <FriendCardDelete userId={user.friendId} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default FriendCard;
