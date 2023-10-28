import * as React from "react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import CalendarIcon from "../icons/Calendar";

interface DatePickerProps {
  onSetDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSetDate }) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={cn(
            "w-fit justify-between rounded-lg px-3",
            !date && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-1 text-xs font-medium text-[#94989E]">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Due Date</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(data) => {
            setDate(data);
            if (data) onSetDate(data);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
