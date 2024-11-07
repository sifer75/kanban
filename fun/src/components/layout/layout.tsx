import { ReactNode, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import ButtonUser from "./ButtonUser";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/user.request";
import {
  HomeSimple,
  NavArrowDown,
  NavArrowRight,
  Search,
  Settings,
} from "iconoir-react";
import { Link, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import MenuListWorkspace from "./MenuListWorkspace";
import MenuListElements from "./MenuListElements";

function MenuAction() {
  const { workspaceId } = useParams<{ workspaceId: string | undefined }>();
  const [selectMenu, setSelectMenu] = useState<"WORKSPACES" | "ELEMENTS">(
    workspaceId ? "ELEMENTS" : "WORKSPACES"
  );
  useEffect(() => {
    if (!workspaceId) {
      setSelectMenu("WORKSPACES");
    } else {
      setSelectMenu("ELEMENTS");
    }
  }, [workspaceId]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className={`w-[200%] h-full grid grid-cols-2 transition-all duration-500 ease-in-out ${
          selectMenu === "WORKSPACES" ? "translate-x-0" : "-translate-x-1/2"
        }`}
      >
        <MenuListWorkspace setSelectMenu={setSelectMenu} />
        <MenuListElements setSelectMenu={setSelectMenu} />
      </div>
    </div>
  );
}
function Sidebar() {
  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  if (userError || userLoading) return <div>chargement...</div>;

  return (
    <div className="h-screen w-60 self-center border flex flex-col gap-12  items-center p-4">
      <h1 className="text-center text-xl font-medium w-full flex flex-start">
        renotion
      </h1>
      <div className="w-full relative rounded-xl flex flex-row items-center focus:border-4">
        <Search className="absolute left-2 w-4 h-4" />
        <Input
          className="h-10 w-full py-2 pl-7 pr-2.5 rounded-xl"
          type="text"
          placeholder="Search..."
          //   value={searchTitle}
          //   onChange={(e) => {
          //     setSearchTitle(e.target.value);
          //   }}
        />
      </div>
      <div className="flex flex-col gap-3 w-full text-sm">
        <div className="flex flex-row justify-between">
          <Link to="/workspace" className="flex flex-row gap-2 items-center">
            <HomeSimple className="w-4 h-4" />
            <h2>Home</h2>
          </Link>
          <NavArrowRight className="w-4 h-4" />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Settings className="w-4 h-4" />
            <h2>Settings</h2>
          </div>
          <NavArrowRight className="w-4 h-4" />
        </div>
      </div>
      <MenuAction />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center gap-2.5">
            <Avatar className="w-8 h-8 rounded-xl">
              <AvatarImage src={user.avatarUrl} alt="image de l'utilisateur" />
            </Avatar>
            <p className="w-full text-left">{user.name}</p>
            <div className="w-4 h-4">
              <NavArrowDown className="w-4 h-4" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <ButtonUser />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-row ">
      <Sidebar />
      <main className="flex-1 p-5 overflow-hidden">{children}</main>
    </div>
  );
}
