import { ListProps, SearchCategory, User } from "@/lib/cards.utils";
import { getAllFriends } from "@/lib/user.request";
import { useQuery } from "@tanstack/react-query";
import SettingsFriend from "./SettingsFriend";
import StatusSelection from "./StatusSelection";

function FriendList({ selectedInput, searchFriends }: ListProps) {
  const {
    data: friends = [],
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: getAllFriends,
    retry: false,
  });

  if (isLoading)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Chargement de la liste de tes amis..."}
      />
    );

  const friendsList =
    selectedInput === SearchCategory.Ami
      ? friends.filter((friend) =>
          friend.name.toLowerCase().includes(searchFriends.toLowerCase())
        )
      : friends;

  if (friendsList.length === 0) {
    return <StatusSelection title={"Amis"} description={"Aucun amis trouvé"} />;
  }

  if (isError)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Erreur lors du chargement de tes amis..."}
      />
    );

  console.log(friends, "d");
  return (
    <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-full">
      <h1 className="text-xl h-8 w-32">{SearchCategory.Ami}s</h1>
      <ul>
        {friendsList.map((friend, index) => (
          <li
            key={index}
            className={`border-b py-3 flex justify-between ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              <span>{friend.name}</span>
              <img
                src={friend.avatarUrl}
                alt={`${friend.name}'s avatar_url`}
                className="w-10 h-10 rounded-full"
              ></img>
            </div>
            <SettingsFriend />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
