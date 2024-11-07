import { Plus, Suggestion } from "iconoir-react";
import imgTest from "../../../assets/téléchargement.jpeg";
import { TaskProps } from "@/lib/cards.utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Decoration from "../dashboard/Decoration";

function TaskCard({ title, description, id }: TaskProps) {
  const safeId = id ?? "default-id";
  const { attributes, transform, transition, setNodeRef, listeners } =
    useSortable({ id: safeId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="border border-[#D9D9D9] rounded-xl w-80 p-3 flex flex-col gap-5"
      data-swapy-item={id}
      draggable="true"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="w-full flex flex-row gap-4">
        <div className="w-full flex flex-wrap gap-1">
          <span className="text-[#D12525] text-sm bg-[#D12525]/20 w-fit px-3 rounded inline-flex items-center">
            Development
          </span>
          <span className="text-[#9052FC] text-sm bg-[#9052FC]/20 w-fit px-3 rounded inline-flex items-center">
            Product
          </span>
          <span className="text-[#E3E700] text-sm bg-[#E3E700]/20 w-fit px-3 rounded inline-flex items-center">
            Marketing
          </span>
          <span className="text-[#E3E700] text-sm bg-[#E3E700]/20 w-fit px-3 rounded inline-flex items-center">
            Marketing
          </span>
        </div>
        <div>
          <Plus className="w-5 h-5 bg-[#D9D9D9] rounded-md" />
        </div>
      </div>
      <div className="w-full h-32">
        <img src={imgTest} alt="imgTask" className="w-full h-32"></img>
      </div>
      <div className="flex flex-col gap-2.5 overflow-hidden">
        <h2 className="leading-5 text-xl font-bold text-[#000000] overflow-hidden">
          {title}
        </h2>
        <p className="text-sm text-[#71717A] whitespace-normal">
          {description}
        </p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <Decoration style={"w-9 h-9 text-sm text-black"} margin={"-ml-4"} />
        <div className="flex flex-row items-center gap-1.5">
          <Suggestion className="w-4 h-4" />
          <span className="text-sm leading-3">2</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
