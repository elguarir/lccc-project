import React, { useState, useEffect } from "react";
import { DateInput, DateSegment, TimeField } from "react-aria-components";
import { Label } from "../ui/label";
import { Time, now } from "@internationalized/date";
import { Calendar } from "../ui/calendar";
import { Matcher } from "react-day-picker";

interface DateWithTimeProps {
  value: Date;
  onChange: (newValue: Date) => void;
  disabled?: Matcher | Matcher[] | undefined;
}

const DateWithTime: React.FC<DateWithTimeProps> = ({ value, onChange, disabled }) => {
  const [time, setTime] = useState<Time | null>(null);

  useEffect(() => {
    if (new Date(value)) {
      const dateWithTime = new Time(new Date(value).getHours(), new Date(value).getMinutes());
      setTime(dateWithTime);
    } else {
      const currentTime = now("UTC");
      setTime(new Time(currentTime.hour, currentTime.minute));
    }
  }, [value]);

  const handleTimeChange = (newTime: Time) => {
    setTime(newTime);
    const updatedDate = new Date(new Date(value) || Date.now());
    updatedDate.setHours(newTime.hour, newTime.minute);
    onChange(updatedDate);
  };

  return (
    <div className="w-full">
      <Calendar
        className="p-3"
        mode="single"
        selected={new Date(value)}
        onSelect={(date) => {
          const updatedDate = new Date(date || Date.now());
          if (time) {
            updatedDate.setHours(time.hour, time.minute);
          }
          onChange(updatedDate);
        }}
        defaultMonth={new Date(new Date(value) || Date.now())}
        disabled={disabled}
      />
      <TimeField
        value={time}
        onChange={(newTime) => {
          handleTimeChange(newTime);
        }}
        className={"px-4 pt-0 pb-4"}
      >
        <Label>Time</Label>
        <DateInput>
          {(segment) => {
            return <DateSegment segment={segment} />;
          }}
        </DateInput>
      </TimeField>
    </div>
  );
};

export default DateWithTime;
