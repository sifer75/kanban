// import RecentCard from "@/components/card/dashboard/RecentCard";
// import WorkspaceCard from "@/components/card/dashboard/WorkspaceCard";
// import { colors, recent } from "../lib/dashboard.utils";

import { useState } from "react";
import FriendList from "@/components/friend/FriendList";
import WorkspaceList from "@/components/friend/WorkspaceList";
import { SearchCategory } from "@/lib/cards.utils";
import SearchInput from "@/components/friend/SearchInput";

function Friend() {
  const [searchFriends, setSearchFriends] = useState<string>("");
  const [selectedInput, setSelectedInput] = useState<SearchCategory>(
    SearchCategory.Ami
  );

  return (
    <div className="w-full h-full flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-2xl">Amis</h1>
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
