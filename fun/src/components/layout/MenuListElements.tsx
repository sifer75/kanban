import CreateWorkspace from "../card/workspace/CreateWorkspace";
import {
  ArrowLeft,
  Calendar,
  NavArrowRight,
  Page,
  Presentation,
  Table2Columns,
  TaskList,
} from "iconoir-react";
import { useQuery } from "@tanstack/react-query";
import { getSpecificWorkspace } from "@/lib/workspace.request";
import { ReactNode, SetStateAction, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { getAllKanban } from "@/lib/kanban.request";
import { KanbanProps } from "@/lib/cards.utils";
import EditKanban from "../card/kanban/EditKanban";
import DeleteKanban from "../card/kanban/DeleteKanban";
function ButtonWorkspace({
  icon,
  title,
  description,
  url,
  id,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  url: string;
  id?: number;
}) {
  const navigate = useNavigate();
  return (
    <button
      className="w-full rounded-xl flex items-center gap-2.5 px-3 py-2 hover:bg-buttonHover"
      onClick={() => navigate(url)}
    >
      <div className="w-3.5 h-3.5">{icon}</div>
      <span className="truncate w-full font-normal text-sm text-left">
        {title}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-4 h-4">
            <Ellipsis className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-50">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild></DropdownMenuItem>
            <EditKanban
              titleCard={title}
              id={id as number}
              descriptionCard={description}
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild></DropdownMenuItem>
            <DeleteKanban title={title} id={id as number} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </button>
  );
}

function TaskWorkspace({ icon, title }: { icon: ReactNode; title: string }) {
  const [openFolder, setOpenFolder] = useState<boolean>(false);
  const { workspaceId } = useParams();
  const {
    data: kanbans,
    isLoading: kanbanLoading,
    isError: kanbanError,
  } = useQuery({
    queryKey: ["kanban"],
    queryFn: () => getAllKanban(Number(workspaceId)),
  });

  if (kanbanError || kanbanLoading) return <div>kanban non trouvé</div>;
  return (
    <div className="flex gap-1 flex-col">
      <button
        className="flex flex-row gap-2.5 items-center px-1 py-2 hover:bg-buttonHover rounded-xl"
        onClick={() => setOpenFolder(!openFolder)}
      >
        {icon}
        <h2 className="w-full truncate text-left">{title}</h2>
        <NavArrowRight className="w-4 h-4" />
      </button>
      {openFolder ? (
        <div className="h-fit w-full flex flex-col gap-2 pl-3">
          {kanbans.map((kanban: KanbanProps) => (
            <ButtonWorkspace
              key={kanban.id}
              title={kanban.title}
              description={kanban.description}
              icon={<NavArrowRight className="w-4 h-4" />}
              url={`/workspace/${workspaceId}/${kanban.id}`}
              id={kanban.id as number}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
function ElementWorkspace({ icon, title }: { icon: ReactNode; title: string }) {
  const [openFolder, setOpenFolder] = useState<boolean>(false);

  return (
    <div className="flex gap-1 flex-col">
      <button
        className="flex flex-row gap-2.5 items-center px-1 py-2 hover:bg-buttonHover rounded-xl"
        onClick={() => setOpenFolder(!openFolder)}
      >
        {icon}
        <h2 className="w-full truncate text-left">{title}</h2>
        <NavArrowRight className="w-4 h-4" />
      </button>
      {openFolder ? (
        <div className="h-fit w-full flex flex-col gap-2 pl-3">
          <ButtonWorkspace
            title="bonjour"
            description="bonjour2"
            icon={<NavArrowRight className="w-4 h-4" />}
            url={`/workspace/${2}`}
          />
        </div>
      ) : null}
    </div>
  );
}
interface MenuListElementsProps {
  setSelectMenu: React.Dispatch<SetStateAction<"WORKSPACES" | "ELEMENTS">>;
}
function MenuListElements({ setSelectMenu }: MenuListElementsProps) {
  const { workspaceId } = useParams();
  const {
    data: workspace,
    isError: workspaceError,
    isLoading: workspaceLoading,
  } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getSpecificWorkspace(Number(workspaceId)),
    enabled: Boolean(workspaceId),
  });

  if (!workspace) return <div>workspace non trouvé</div>;
  if (workspaceError || workspaceLoading) return <div>chargement...</div>;

  return (
    <div className="w-full min-w-full h-full gap-5 flex flex-col overflow-hidden">
      <div className="flex flex-row w-full items-center gap-0.5">
        <ArrowLeft
          className="w-4 h-4"
          onClick={() => setSelectMenu("WORKSPACES")}
        />
        <div className="gap-2 flex flex-row items-center w-full">
          <TaskList className="w-3.5 h-3.5" />
          <h2 className="font-medium text-sm">{workspace.title}</h2>
        </div>
        <CreateWorkspace />
      </div>
      <div className="text-sm h-full flex flex-col gap-2 overflow-y-scroll">
        <TaskWorkspace
          title="Tableau de tâches"
          icon={<TaskList className="w-4 h-4" />}
        />
        <ElementWorkspace
          title="Calendrier"
          icon={<Calendar className="w-4 h-4" />}
        />
        <ElementWorkspace
          title="Tableau"
          icon={<Table2Columns className="w-4 h-4" />}
        />
        <ElementWorkspace
          title="Documents"
          icon={<Page className="w-4 h-4" />}
        />
        <ElementWorkspace
          title="Presentation"
          icon={<Presentation className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}

export default MenuListElements;
