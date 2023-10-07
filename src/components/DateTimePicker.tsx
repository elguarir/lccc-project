import * as React from "react";
import { parse, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(date);

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const modifiedDay = new Date(
      selected.setHours(
        selectedDateTime.getHours(),
        selectedDateTime.getMinutes(),
      ),
    );
    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const [hours, minutes] = value.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const modifiedDay = new Date(selectedDateTime);
      modifiedDay.setHours(hours, minutes);
      setSelectedDateTime(modifiedDay);
      setDate(modifiedDay);
    }
  };

  const formatDateWithSuffix = (inputDate: Date) => {
    const formattedDate = format(inputDate, "PPP");
    return formattedDate;
  };

  const footer = (
    <>
      <div className="px-4 pt-0 pb-4">
        <Label>Time</Label>
        <Input
          type="time"
          onChange={handleTimeChange}
          value={format(new Date(selectedDateTime), "HH:mm")}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        />
      </div>
      {!selectedDateTime && <p>Please pick a day.</p>}
    </>
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={"outline"}
          size={"sm"}
          className={cn(
            "w-full flex gap-2 items-center justify-start pl-3 font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="w-4 h-4 opacity-50" />
          {date ? (
            format(new Date(date), "PPP") +
            " at " +
            format(new Date(selectedDateTime), "h:mm a")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => date < new Date()}
        />
        {footer}
      </PopoverContent>
    </Popover>
  );
}
