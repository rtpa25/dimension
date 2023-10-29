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
import { gtWalsheim } from "~/styles/fonts";

interface DatePickerProps {
  currentDate?: Date;
  onSetDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSetDate, currentDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={cn(
            "w-fit justify-between rounded-lg px-3",
            !currentDate && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-1 text-xs font-light text-text-default">
            <CalendarIcon />
            {currentDate ? (
              format(currentDate, "PPP")
            ) : (
              <span className="">Due Date</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-lg p-0"
        style={gtWalsheim.style}
      >
        <Calendar
          mode="single"
          className="text-text-default"
          selected={currentDate}
          onSelect={(data) => {
            if (data) onSetDate(data);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
