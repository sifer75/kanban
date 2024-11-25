import { ListProps, User } from "@/lib/cards.utils";
import { getAllFriends } from "@/lib/user.request";
import { useQuery } from "@tanstack/react-query";
import SettingsFriend from "./SettingsFriend";
import StatusSelection from "./StatusSelection";

function FriendList({ setSpeaking }: ListProps) {
  const {
    data: friends,
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: getAllFriends,
  });

  if (isLoading)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Chargement de la liste de tes amis..."}
      />
    );
  if (!friends) {
    return <StatusSelection title={"Amis"} description={"Aucun amis trouvé"} />;
  }

  if (isError)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Erreur lors du chargement de tes amis..."}
      />
    );

  return (
    <div className="w-full h-full bg-[#FAFBFD] rounded-xl p-3 overflow-y-scroll overflow-hidden">
      <h1 className="text-xl h-8 w-32">Amis</h1>
      <ul>
        {friends.map((friend, index) => (
          <li
            key={index}
            className={`border-b py-3 flex justify-between ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              <span>{friend.name}</span>
              <img
                src={friend.avatar_url}
                alt={`${friend.name}'s avatar_url`}
                className="w-10 h-10 rounded-full"
              ></img>
            </div>
            <SettingsFriend id={friend.id} setSpeaking={setSpeaking} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
