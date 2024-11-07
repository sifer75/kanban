import { TaskProps } from "@/lib/cards.utils";
import { Plus } from "iconoir-react";
import TaskCard from "../card/task/TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function DndColumn({
  title,
  columnTasks,
  id,
}: {
  title: string;
  columnTasks: TaskProps[];
  id: string;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext
      items={columnTasks
        .map((task) => task.id)
        .filter((id): id is string => id !== undefined)}
      strategy={verticalListSortingStrategy}
    >
      <div
        className="h-full w-fit bg-[#E9E9E9]/20 rounded-xl p-3 gap-6 flex flex-col"
        ref={setNodeRef}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <p className="text-sm font-medium">{title}</p>
            <div className="bg-[#D9D9D9] p- w-4 h-4 flex items-center justify-center rounded-sm text-sm">
              {columnTasks.length}
            </div>
          </div>
          <Plus className="w-5 h-5" />
        </div>

        <div className="h-full w-fit flex flex-col gap-3 rounded-xl">
          {columnTasks.map((task: TaskProps) => (
            <TaskCard {...task} key={task.id} id={task.id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}

export default DndColumn;
