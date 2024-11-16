import CreateWorkspace from "../card/workspace/CreateWorkspace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "iconoir-react";
import { getAllWorkspaces } from "@/lib/workspace.request";
import { WorkspaceProps } from "@/lib/cards.utils";

import { useNavigate } from "react-router-dom";
import EditWorkspace from "../card/workspace/EditWorkspace";
import DeleteWorkspace from "../card/workspace/DeleteWorkspace";
import { Ellipsis } from "lucide-react";
import { SetStateAction } from "react";
function WorkspaceElement({
  workspace,
  setSelectMenu,
}: {
  workspace: WorkspaceProps;
  setSelectMenu: React.Dispatch<SetStateAction<"WORKSPACES" | "ELEMENTS">>;
}) {
  const navigate = useNavigate();

  const handleNavigateWorkspace = (id: number) => {
    navigate(`/workspace/${id}`);
    setSelectMenu("ELEMENTS");
  };
  return (
    <button
      className="w-full rounded-xl flex items-center gap-2.5 px-3 py-2 hover:bg-buttonHover"
      onClick={() => handleNavigateWorkspace(workspace.id as number)}
    >
      <div className="w-3.5 h-3.5">
        <Plus className="w-3.5 h-3.5 aspect-square" />
      </div>
      <span className="truncate w-full font-normal text-sm text-left">
        {workspace.title}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-4 h-4">
            <Ellipsis className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-50">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <EditWorkspace
                titleCard={workspace.title}
                id={workspace.id as number}
                descriptionCard={workspace.description}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteWorkspace
                title={workspace.title}
                id={workspace.id as number}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </button>
  );
}

interface MenuListWorkspaceProps {
  setSelectMenu: React.Dispatch<SetStateAction<"WORKSPACES" | "ELEMENTS">>;
}
function MenuListWorkspace({ setSelectMenu }: MenuListWorkspaceProps) {
  const {
    data: workspaces,
    isError: workspaceError,
    isLoading: workspaceLoading,
  } = useQuery({ queryKey: ["workspace"], queryFn: getAllWorkspaces });

  if (workspaceError || workspaceLoading) return <div>chargement...</div>;

  return (
    <div className="w-full min-w-full h-full gap-5 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h2 className="font-medium">Workspaces</h2>
        </div>
        <CreateWorkspace />
      </div>
      <div className="h-full overflow-auto">
        {workspaces.map((workspace: WorkspaceProps) => (
          <WorkspaceElement
            key={workspace.id}
            workspace={workspace}
            setSelectMenu={setSelectMenu}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuListWorkspace;
