import { StatusSelectionProps } from "@/lib/cards.utils";

function StatusSelection({ title, description }: StatusSelectionProps) {
  return (
    <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-full">
      <h1 className="text-xl h-8 w-32">{title}</h1>
      <div className="w-full h-full flex items-center justify-center">
        {description}
      </div>
    </div>
  );
}

export default StatusSelection;
