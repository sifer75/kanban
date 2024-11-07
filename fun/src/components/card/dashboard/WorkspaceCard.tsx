import { ArrowUpRight, Suggestion } from "iconoir-react";
import Decoration from "./Decoration";
import { useNavigate } from "react-router-dom";

function WorkspaceCard({
  title,
  color,
  id,
}: {
  title: string;
  color: string;
  id: number;
}) {
  const navigate = useNavigate();
  const handleNavigateWorkspace = (id: number) => {
    navigate(`/workspace/${id}`);
  };

  return (
    <button
      className={`min-w-[248px] h-fit flex flex-col p-3 rounded-xl gap-1 ${color}`}
      onClick={() => handleNavigateWorkspace(id)}
    >
      <div className="flex w-full">
        <div className="text-white flex flex-col gap-3 w-full">
          <p className="font-bold flex items-start">{title}</p>
          <p className="leading-4 text-sm flex items-start">
            Completed Tasks: 200
          </p>
        </div>
        <div className="bg-[#D9D9D9]/20 rounded-full w-5 h-5 flex items-center justify-center">
          <ArrowUpRight className="min-w-3 h-3 text-white" />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2 text-white">
          <Suggestion className="w-4 h-4" />
          <p className="text-sm">2</p>
        </div>
        <Decoration style={"w-6 h-6 text-[10px]"} margin={"-ml-3"} />
      </div>
    </button>
  );
}

export default WorkspaceCard;
