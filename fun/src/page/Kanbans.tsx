import KanbanCard from "@/components/card/kanban/KanbanCard";
import { getAllKanban } from "@/lib/kanban.request";
import { KanbanProps, WorkspaceProps } from "@/lib/cards.utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderKanban from "@/components/header/HeaderKanban";

function Kanban() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const {
    data: kanbans,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["kanban", workspaceId],
    queryFn: () => getAllKanban(Number(workspaceId)),
  });

  const [searchTitle] = useState<string>("");

  if (isError || isLoading) return <div>chargement...</div>;

  const filteredKanbans = kanbans.filter((kanban: WorkspaceProps) =>
    kanban.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 justify-between sm:flex-row sm:justify-between">
        <HeaderKanban />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredKanbans.map((kanban: KanbanProps, index: number) => (
          <KanbanCard
            title={kanban.title}
            workspaceId={kanban.workspaceId}
            id={kanban.id}
            key={index}
            description={kanban.description}
            updateAt={kanban.updateAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Kanban;
