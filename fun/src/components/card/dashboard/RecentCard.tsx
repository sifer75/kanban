import { Expand } from "iconoir-react";
import { MoveUpRight } from "lucide-react";
import { ReactNode } from "react";
function RecentCard({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="bg-white min-w-[248px] flex flex-col p-3 rounded-xl gap-1">
      <div className="flex">
        <div className="flex flex-col w-full">
          <p className="min-w-4 min-h-4 font-bold">{title}</p>
          <p className="leading-4 text-xs">Workspace1</p>
        </div>
        <div className="w-4 h-4">{icon}</div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2 text-white">
          <MoveUpRight className="w-4 h-4" />
        </div>
        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#D9D9D9]/20">
          <Expand className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

export default RecentCard;
