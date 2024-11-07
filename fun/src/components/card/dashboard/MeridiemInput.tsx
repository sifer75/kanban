import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Meridiem } from "@/lib/cards.utils";

import { Input } from "@/components/ui/input";

interface TimeProp {
  hour: string;
  min: string;
  period: Meridiem;
}

interface TimeInputProps {
  time: TimeProp;
  setTime: (time: TimeProp) => void;
  handleMeridiem: () => void;
}
function MeridiemInput({ time, setTime, handleMeridiem }: TimeInputProps) {
  return (
    <div className="flex items-center gap-3 w-full justify-end">
      <Input
        id="start"
        placeholder="00"
        className="w-1/2"
        value={time.hour}
        onChange={(e) => setTime({ ...time, hour: e.target.value })}
        maxLength={2}
      />
      <p>H</p>
      <Input
        id="end"
        placeholder="00"
        className="w-1/2"
        value={time.min}
        onChange={(e) => setTime({ ...time, min: e.target.value })}
        maxLength={2}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{time.period}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Meridiem</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleMeridiem}>AM</DropdownMenuItem>
            <DropdownMenuItem onClick={handleMeridiem}>PM</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MeridiemInput;
