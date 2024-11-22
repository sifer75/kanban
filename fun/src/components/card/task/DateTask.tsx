import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

interface DateTaskProps {
  id?: number;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
const DateTask = React.forwardRef<HTMLButtonElement, DateTaskProps>(
  ({ date, setDate }, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleDateSelected = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      setOpen(false);
    };
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"ghost"}
            className={cn(
              "w-2/3 border rounded-lg justify-start text-left font-normal p-2 z-50",
              !date && "text-muted-foreground"
            )}
            ref={ref}
            onClick={() => setOpen(true)}
          >
            <p className="text-[#71717A]">
              {date ? format(date, "dd/MM/yyyy") : "choisis une date"}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelected}
            className="rounded-md border shadow"
          />
        </PopoverContent>
      </Popover>
    );
  }
);

export default DateTask;
