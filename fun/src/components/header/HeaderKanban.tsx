import { Search, TaskList } from "iconoir-react";
import CreateKanban from "../card/kanban/CreateKanban";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpecificWorkspace } from "@/lib/workspace.request";
import { useEffect, useRef } from "react";

function HeaderKanban() {
  const { workspaceId } = useParams();
  const {
    data: workspace,
    isError: workspaceError,
    isLoading: workspaceLoading,
  } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getSpecificWorkspace(Number(workspaceId)),
  });

  const startFocus = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (startFocus.current) {
      startFocus.current.focus();
    }
  }, []);

  if (workspaceError || workspaceLoading)
    return <div>workspace non trouvé...</div>;

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 w-fit">
          <TaskList className="w-8 h-8" />
          <h1 className="font-medium text-2xl">{workspace.title}</h1>
        </div>
        <p className="text-[#71717A] text-sm">{workspace.description}</p>
      </div>
      <div className="flex w-full justify-between">
        <div className="grid gap-3 grid-cols-6 ">
          <button
            ref={startFocus}
            className="text-sm px-1 py-2 m-0  focus:bg-selectionButton focus:text-white rounded-xl"
          >
            Tout
          </button>
          <button className="text-sm px-1 py-2 m-0 focus:bg-selectionButton focus:text-white rounded-xl">
            Liste
          </button>
          <button className="text-sm px-1 py-2 m-0 focus:bg-selectionButton focus:text-white rounded-xl">
            Documents
          </button>
          <button className="text-sm px-1 py-2 m-0 focus:bg-selectionButton focus:text-white rounded-xl">
            Calendrier
          </button>
          <button className="text-sm px-1 py-2 m-0 focus:bg-selectionButton focus:text-white rounded-xl">
            Presentation
          </button>
          <button className="text-sm px-1 py-2 m-0 focus:bg-selectionButton focus:text-white rounded-xl">
            Tableau
          </button>
        </div>
        <div className="flex gap-2.5">
          <div className="w-72 relative flex flex-row items-center focus:border-4 rounded-xl">
            <Search className="absolute left-2 w-4 h-4" />
            <Input
              className="w-full pl-7 pr-2.5 rounded-xl"
              type="text"
              placeholder="Search..."
              //   value={searchTitle}
              //   onChange={(e) => {
              //     setSearchTitle(e.target.value);
              //   }}
            />
          </div>
          <CreateKanban />
        </div>
      </div>
    </div>
  );
}

export default HeaderKanban;
