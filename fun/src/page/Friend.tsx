import { useState } from "react";
import FriendList from "@/components/friend/FriendList";
import WorkspaceList from "@/components/friend/WorkspaceList";
import { SearchCategory } from "@/lib/cards.utils";
import SearchInput from "@/components/friend/SearchInput";
import ButtonFindFriend from "@/components/friend/ButtonFindFriend";

function Friend() {
  const [searchFriends, setSearchFriends] = useState<string>("");
  const [selectedInput, setSelectedInput] = useState<SearchCategory>(
    SearchCategory.Ami
  );

  return (
    <div className="w-full h-full flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="font-medium text-2xl">Amis</h1>
          <ButtonFindFriend />
        </div>
        <SearchInput
          setSearchFriends={setSearchFriends}
          setSelectedInput={setSelectedInput}
          selectedInput={selectedInput}
          searchFriends={searchFriends}
        />
      </div>
      <div className="w-full h-full flex gap-5">
        <FriendList
          selectedInput={selectedInput}
          setSearchFriends={setSearchFriends}
          searchFriends={searchFriends}
        />
        <WorkspaceList
          selectedInput={selectedInput}
          setSearchFriends={setSearchFriends}
          searchFriends={searchFriends}
        />
      </div>
    </div>
  );
}

export default Friend;
