import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  MinusCircleSolid,
} from "iconoir-react";
import DateTask from "@/components/card/task/DateTask";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MissionProps, Meridiem } from "@/lib/cards.utils";
import AgendaMission from "./AgendaMission";
import { CreateMission } from "@/lib/mission.request";
import MeridiemInput from "./MeridiemInput";
function Agenda() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [timeStart, setTimeStart] = useState<{
    hour: string;
    min: string;
    period: Meridiem;
  }>({
    hour: "",
    min: "",
    period: Meridiem.AM,
  });
  const [timeEnd, setTimeEnd] = useState<{
    hour: string;
    min: string;
    period: Meridiem;
  }>({
    hour: "",
    min: "",
    period: Meridiem.AM,
  });
  console.log(timeEnd, "start");
  const [fetchedDate, setFetchedDate] = useState<Date | undefined>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const getFormatedDate = () => {
    if (!fetchedDate) return;
    return fetchedDate.toLocaleDateString("fr-FR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleNewTask = () => {
    setTasks([...tasks, ""]);
  };

  const handleMeridiemStart = () => {
    setTimeStart((prev) => ({
      ...prev,
      period: prev.period === Meridiem.AM ? Meridiem.PM : Meridiem.AM,
    }));
  };
  const handleMeridiemEnd = () => {
    setTimeEnd((prev) => ({
      ...prev,
      period: prev.period === Meridiem.AM ? Meridiem.PM : Meridiem.AM,
    }));
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, task) => task !== index));
  };

  const handlePreviousDay = () => {
    if (fetchedDate) {
      const previousDate = new Date(fetchedDate);
      previousDate.setDate(previousDate.getDate() - 1);
      setFetchedDate(previousDate);
    }
  };

  const handleNextDay = () => {
    if (fetchedDate) {
      const nextDate = new Date(fetchedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      setFetchedDate(nextDate);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: MissionProps) => CreateMission(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["mission", fetchedDate] });
      setOpen(false);
      setTitle("");
      setTasks([]);
      setTimeStart({ hour: "", min: "", period: Meridiem.AM });
      setTimeEnd({ hour: "", min: "", period: Meridiem.AM });
    },
  });

  const handleSubmit = () => {
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const formatedStartTimeHour =
        timeStart.hour.length === 0
          ? "00"
          : timeStart.hour.length === 1
          ? "0" + timeStart.hour.slice(0)
          : timeStart.hour;

      const formatedStartTimeMin =
        timeStart.min.length === 0
          ? "00"
          : timeStart.min.length === 1
          ? "0" + timeStart.min.slice(0)
          : timeStart.min;

      const formatedEndTimeHour =
        timeEnd.hour.length === 0
          ? "00"
          : timeEnd.hour.length === 1
          ? "0" + timeEnd.hour.slice(0)
          : timeEnd.hour;

      const formatedEndTimeMin =
        timeEnd.min.length === 0
          ? "00"
          : timeEnd.min.length === 1
          ? "0" + timeEnd.min.slice(0)
          : timeEnd.min;

      const data = {
        date: formattedDate,
        timeStartHour: formatedStartTimeHour,
        timeStartMin: formatedStartTimeMin,
        timeEndHour: formatedEndTimeHour,
        timeEndMin: formatedEndTimeMin,
        timeStartMeridiem: timeStart.period,
        timeEndMeridiem: timeEnd.period,
        title,
        tasks,
      };
      mutation.mutate(data);
    }
  };

  return (
    <div className="min-w-[340px] max-w-[340px] h-full gap-5 rounded-xl p-3 bg-[#FAFBFD]">
      <div className="flex items-center justify-between min-w-[262px]d">
        <div className="flex gap-2.5 items-center w-fit">
          <p className="font-bold truncate flex-grow">{getFormatedDate()}</p>
          <div className="w-10 flex justify-between">
            <ArrowLeft
              className="w-4 h-4 hover:shadow-2xl hover:scale-125 hover:border hover:border-black rounded-sm"
              onClick={handlePreviousDay}
            />
            <ArrowRight
              className="w-4 h-4 hover:shadow-2xl hover:scale-125 hover:border hover:border-black rounded-sm"
              onClick={handleNextDay}
            />
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-0 min-w-5 max-h-5 min-h-5 hover:scale-125"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agenda</DialogTitle>
              <DialogDescription>
                Ajoute une Mission à faire dans ton calendrier
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-3 w-full justify-end">
                <Label htmlFor="name" className="text-right">
                  Mission
                </Label>
                <Input
                  id="name"
                  placeholder="nom de la mission"
                  className="w-2/3"
                  value={title}
                  maxLength={18}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full justify-end">
                <Label htmlFor="username" className="text-right">
                  Liste de tâches
                </Label>
                <div className="w-2/3 flex mr-0 .scroll-hidden flex-col gap-2 h-10 overflow-y-scroll overflow-hidden">
                  {tasks.map((task: string, index: number) => (
                    <div key={index} className="relative">
                      <Input
                        id={`task-${index}`}
                        key={index}
                        placeholder={`tâche ${index}`}
                        className="w-full min-h-fit relative"
                        value={task}
                        onChange={(e) => {
                          const updatedTask = [...tasks];
                          updatedTask[index] = e.target.value;
                          setTasks(updatedTask);
                        }}
                      />
                      <Button
                        onClick={() => handleDeleteTask(index)}
                        variant="ghost"
                        className="w-4 p-0 top-3 h-4 right-3 absolute"
                      >
                        <MinusCircleSolid className="min-w-4 min-h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full justify-end">
                <Label htmlFor="username" className="text-right">
                  Date
                </Label>
                <DateTask date={date} setDate={setDate} />
              </div>
              <div className="flex items-center gap-3 w-full justify-end">
                <Label htmlFor="username" className="text-right">
                  Heure
                </Label>
                <div className="w-2/3 gap-2 flex flex-col">
                  <MeridiemInput
                    time={timeStart}
                    setTime={(updatedPeriod) =>
                      setTimeStart((prev) => ({ ...prev, ...updatedPeriod }))
                    }
                    handleMeridiem={handleMeridiemStart}
                  />

                  <MeridiemInput
                    time={timeEnd}
                    setTime={(updatedPeriod) =>
                      setTimeEnd((prev) => ({ ...prev, ...updatedPeriod }))
                    }
                    handleMeridiem={handleMeridiemEnd}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                className="inline-flex gap-3 w-1/2"
                onClick={() => handleNewTask()}
              >
                <PlusCircle />
                <p>Ajouter une tâche</p>
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <AgendaMission fetchedDate={fetchedDate} />
    </div>
  );
}

export default Agenda;
