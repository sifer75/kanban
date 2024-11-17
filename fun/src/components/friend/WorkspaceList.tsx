import { ListProps, SearchCategory, WorkspaceProps } from "@/lib/cards.utils";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspaces } from "@/lib/workspace.request";
import SettingsWorkspace from "./SettingsWorkspace";
import StatusSelection from "./StatusSelection";

function WorkspaceList({ selectedInput, searchFriends }: ListProps) {
  const {
    data: workspaces = [],
    isError,
    isLoading,
  } = useQuery<WorkspaceProps[]>({
    queryKey: ["workspace", selectedInput],
    queryFn: getAllWorkspaces,
  });
  if (isLoading)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Erreur lors du chargement de tes workspaces..."}
      />
    );

  if (isError)
    return (
      <StatusSelection
        title={"Amis"}
        description={"Erreur lors du chargement de tes workspaces..."}
      />
    );

  const workspacesList: WorkspaceProps[] =
    selectedInput === SearchCategory.Workspace
      ? workspaces.filter((workspace) =>
          workspace.title.toLowerCase().includes(searchFriends.toLowerCase())
        )
      : workspaces;

  if (workspacesList.length === 0) {
    return (
      <StatusSelection
        title={"Workspaces"}
        description={"Aucun workspaces trouvé"}
      />
    );
  }

  return (
    <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-full">
      <h1 className="text-xl h-8 w-32">Workspaces</h1>
      <ul className="w-full flex-grow overflow-y-scroll">
        {workspacesList.map((workspace, index) => (
          <li
            key={index}
            className={`border-b py-3 flex justify-between ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <span className="w-72 truncate">{workspace.title}</span>
            <SettingsWorkspace workspace={workspace} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkspaceList;
