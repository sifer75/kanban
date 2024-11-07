import CreateTask from "@/components/card/task/CreateTask";
import DndColumn from "@/components/dragAndDrop.tsx/DndColumn";
import { TaskProps } from "@/lib/cards.utils";
import { getAllTask, updateTask } from "@/lib/task.request";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { TaskList } from "iconoir-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type columnsProps = {
  to_do: TaskProps[];
  in_progress: TaskProps[];
  finished: TaskProps[];
  [key: string]: TaskProps[];
};

function Tasks() {
  const { elementId } = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const { data: tasks = [] } = useQuery<TaskProps[]>({
    queryKey: ["task"],
    queryFn: () => getAllTask(Number(elementId)),
  });

  const [columns, setColumns] = useState<columnsProps>({
    to_do: [],
    in_progress: [],
    finished: [],
  });

  function findContainer(id: string) {
    if (id in columns) return id;
    return Object.keys(columns).find((key) =>
      columns[key].some((column: TaskProps) => column.id === id)
    );
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if (!over || !active) return;

    const oldColumnId = findContainer(active.id as string);
    const newColumnId = findContainer(over.id as string);
    if (!oldColumnId || !newColumnId) return;

    const oldColumnTasks = columns[oldColumnId];
    const newColumnTasks = columns[newColumnId];
    const oldIndex = oldColumnTasks.findIndex((task) => task.id === active.id);
    const newIndex = newColumnTasks.findIndex((task) => task.id === over.id);

    if (oldColumnId === newColumnId && active.id !== over.id) {
      const updateOldColumn = arrayMove(oldColumnTasks, oldIndex, newIndex);
      setColumns({ ...columns, [oldColumnId]: updateOldColumn });
    } else if (oldColumnId !== newColumnId) {
      const movedTask = oldColumnTasks[oldIndex];

      const updateOldColumn = oldColumnTasks.filter(
        (task) => task.id !== active.id
      );
      const updateNewColumn = [
        ...newColumnTasks.slice(0, newIndex),
        movedTask,
        ...newColumnTasks.slice(newIndex),
      ];
      setColumns({
        ...columns,
        [oldColumnId]: updateOldColumn,
        [newColumnId]: updateNewColumn,
      });
      updateTask(movedTask, newColumnId);
    }
  };

  // function handleDragMove({ active, over }: DragMoveEvent) {
  //   if (!active || !over) return;
  //   const activeColumn = findContainer(active.id as string);
  //   const overColumn = findContainer(over.id as string);

  //   if (!overColumn || !activeColumn) return;

  //   const activeTask = columns[activeColumn];
  //   const overTask = columns[overColumn];

  //   const draggedTask = activeTask.find((task) => task.id === active.id);
  //   if (!draggedTask) return;

  //   if (activeColumn !== overColumn) {
  //     const overIndex = overTask.findIndex((task) => task.id === over.id);
  //     const newIndex = overIndex >= 0 ? overIndex : overTask.length;

  //     const updateActiveTask = activeTask.filter(
  //       (task) => task.id !== active.id
  //     );

  //     const updateOverTask = [
  //       ...overTask.slice(0, newIndex),
  //       draggedTask,
  //       ...overTask.slice(newIndex),
  //     ];

  //     setColumns({
  //       ...columns,
  //       [activeColumn]: updateActiveTask,
  //       [overColumn]: updateOverTask,
  //     });
  //   }
  // }

  useEffect(() => {
    if (tasks.length > 0) {
      setColumns({
        to_do: tasks.filter((task) => task.status === "to_do"),
        in_progress: tasks.filter((task) => task.status === "in_progress"),
        finished: tasks.filter((task) => task.status === "finished"),
      });
    }
  }, [tasks]);

  return (
    <div className="w-full h-full flex flex-col gap-8 overflow-hidden">
      <div className="w-full gap-4 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 w-fit">
            <TaskList className="w-8 h-8" />
            <h1 className="font-medium text-3xl">title</h1>
          </div>
          <p className="text-[#71717A] text-sm">
            Quos blanditiis ipsa et veritatis eveniet repudiandae. Error dolore
            id. Quasi maxime reprehenderit ipsa fugit.
          </p>
        </div>
        <div className="w-full flex justify-end">
          <CreateTask />
        </div>
      </div>
      <DndContext
        onDragEnd={handleDragEnd}
        // onDragMove={handleDragMove}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <div className="h-full flex flex-row gap-8 overflow-x-scroll">
          {Object.entries(columns).map(([key, columnTasks]) => {
            return (
              <DndColumn
                key={key}
                id={key}
                title={key}
                columnTasks={columnTasks}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}

export default Tasks;
