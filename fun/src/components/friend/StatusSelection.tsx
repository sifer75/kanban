import { StatusSelectionProps } from "@/lib/cards.utils";

function StatusSelection({ title, description }: StatusSelectionProps) {
  return (
    <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-full">
      <h1 className="text-xl h-fit w-32">{title}</h1>
      <span className="w-full flex h-full items-center justify-center">
        {description}
      </span>
    </div>
  );
}

export default StatusSelection;
