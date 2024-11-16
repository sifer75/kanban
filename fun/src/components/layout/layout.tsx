import { ReactNode, useEffect, useState } from "react";
import { HomeSimple, Search, Settings, BookLock } from "iconoir-react";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import MenuListWorkspace from "./MenuListWorkspace";
import MenuListElements from "./MenuListElements";
import ButtonUserSettings from "./ButtonUserSettings";
import Elements from "./Elements";

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
        />
      </div>
      <div className="flex flex-col gap-3 w-full text-sm">
        <Elements
          title={"Home"}
          link={"/workspace"}
          logo={<HomeSimple className="w-4 h-4" />}
        />
        <Elements title={"Settings"} logo={<Settings className="w-4 h-4" />} />
        <Elements
          title={"Friends"}
          link={"/friend"}
          logo={<BookLock className="w-4 h-4" />}
        />
      </div>
      <div className="flex flex-col gap-3 w-full text-sm h-full">
        <MenuAction />
        <ButtonUserSettings />
      </div>
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
