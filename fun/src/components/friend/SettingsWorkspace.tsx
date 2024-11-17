import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List, Network } from "iconoir-react";
import DeleteWorkspace from "../card/workspace/DeleteWorkspace";
import { WorkspaceProps } from "@/lib/cards.utils";
import EditWorkspace from "../card/workspace/EditWorkspace";
function SettingsWorkspace({ workspace }: { workspace: WorkspaceProps }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full p-0 w-10 h-10">
          <List className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          <span>Lier un ami</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <EditWorkspace
            titleCard={workspace.title}
            descriptionCard={workspace.description}
            id={workspace.id ?? 0}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <DeleteWorkspace title={workspace.title} id={workspace.id ?? 0} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingsWorkspace;
