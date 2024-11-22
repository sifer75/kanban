import Decoration from "./Decoration";
import { MissionProps } from "@/lib/cards.utils";
import Fusee from "../../../assets/fusee.jpg";

function AgendaCard({
  title,
  tasks,
  timeStartHour,
  timeStartMin,
  timeStartMeridiem,
  timeEndMeridiem,
  timeEndHour,
  timeEndMin,
}: MissionProps) {
  return (
    <div className="bg-[#4F894A]/40 w-full rounded-lg flex items-start gap-3 p-5">
      <img
        src={Fusee}
        alt="fusee"
        className="min-w-8 h-8 flex justify-center bg-white items-center rounded border border-[#D9D9D9]"
      />
      <div className="w-full flex flex-col gap-2.5 overflow-hidden">
        <p className="text-sm w-full h-8 inline-flex items-center font-bold overflow-hidden">
          {title}
        </p>
        {tasks === null ? null : (
          <ul className="list-disc text-sm w-full text-[#71717A] pl-5 flex flex-col">
            {tasks.map((task: string, index: number) => (
              <li className="truncate overflow-hidden" key={index}>
                {task}
              </li>
            ))}
          </ul>
        )}

        <Decoration style={"w-9 h-9 text-sm"} margin={"-ml-4"} />
      </div>
      <div className="min-w-16 flex flex-col">
        <p className="text-sm w-full flex justify-end">
          {timeStartHour}:{timeStartMin} {timeStartMeridiem}
        </p>
        <p className="text-sm w-full flex justify-end">
          {timeEndHour}:{timeEndMin} {timeEndMeridiem}
        </p>
      </div>
    </div>
  );
}

export default AgendaCard;
