import RecentCard from "@/components/card/dashboard/RecentCard";
import WorkspaceCard from "@/components/card/dashboard/WorkspaceCard";
import { WorkspaceProps } from "@/lib/cards.utils";
import { getAllWorkspaces } from "@/lib/workspace.request";
import { useQuery } from "@tanstack/react-query";
import Agenda from "@/components/card/dashboard/Agenda";
import { colors, recent } from "../lib/dashboard.utils";
import {
  Calendar,
  NavArrowRight,
  Page,
  Presentation,
  Table2Columns,
  TaskList,
} from "iconoir-react";
function Dashboard() {
  const {
    data: workspaces,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workspace"],
    queryFn: getAllWorkspaces,
  });

  if (isLoading || isError) return;

  const getIcons = (title: string) => {
    switch (title) {
      case "Calendrier":
        return <Calendar className="w-4 h-4" />;
      case "Presentation":
        return <NavArrowRight className="w-4 h-4" />;
      case "Document":
        return <Page className="w-4 h-4" />;
      case "Tableau":
        return <Presentation className="w-4 h-4" />;
      case "Liste de tâches":
        return <Table2Columns className="w-4 h-4" />;
      case "excalidraw":
        return <TaskList className="w-4 h-4" />;
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col gap-8 ">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">Dashboard</h1>
          <p className="text-[#71717A] text-sm">
            Fuga nam voluptatibus ullam excepturi consectetur iusto blanditiis
            in. Deleniti dolore pariatur excepturi ullam facilis. Atque
            laudantium laudantium inventore assumenda natus. Voluptas atque
            sequi officiis commodi esse illo animi. Reiciendis esse ex error
            temporibus cupiditate quia quam.
          </p>
        </div>
        <div className="w-full h-full flex gap-5">
          <div className="w-fit flex flex-col gap-6 h-full">
            <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-fit">
              <h1 className="text-xl h-8 w-32">Workspaces</h1>
              <div className="flex gap-2 flex-wrap min-h-64">
                {workspaces.length === 0 ? (
                  <div className="w-full flex items-center justify-center">
                    Aucun workspace trouvé
                  </div>
                ) : (
                  workspaces.map((workspace: WorkspaceProps, index: number) => (
                    <WorkspaceCard
                      title={workspace.title}
                      id={workspace.id!}
                      key={index}
                      color={colors[index % colors.length]}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="w-full bg-[#FAFBFD] rounded-xl p-3">
              <h1 className="text-xl h-8 w-32">Recents</h1>
              <div className="flex gap-2 flex-wrap">
                {recent.map((title: string) => (
                  <RecentCard
                    title={title}
                    icon={getIcons(title)}
                    key={title}
                  />
                ))}
              </div>
            </div>
          </div>
          <Agenda />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
