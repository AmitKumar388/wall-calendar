import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import DateCell from "./DateCell";
import { useCalendarSelection } from "@/hooks/useCalendarSelection";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  selection: ReturnType<typeof useCalendarSelection>;
  hasNoteOnDate: (date: Date) => boolean;
  animKey: number;
}

const CalendarGrid = ({
  currentMonth,
  setCurrentMonth,
  selection,
  hasNoteOnDate,
  animKey,
}: CalendarGridProps) => {
  const [direction, setDirection] = useState<"left" | "right">("right");

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handlePrev = () => {
    setDirection("left");
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="p-4 sm:p-6">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
        onReset={selection.clearSelection}
        hasSelection={!!selection.startDate}
      />

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1 border-b border-border/50 pb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className={cn(
              "text-center text-[10px] sm:text-xs font-body font-semibold tracking-wider py-1",
              d === "SAT" ? "text-accent" : d === "SUN" ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid with slide animation */}
      <div
        key={animKey}
        className={`grid grid-cols-7 gap-y-0.5 ${
          direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
        }`}
      >
        {days.map((date) => (
          <DateCell
            key={date.toISOString()}
            date={date}
            currentMonth={currentMonth}
            isStart={selection.isStart(date)}
            isEnd={selection.isEnd(date)}
            isInRange={selection.isInRange(date)}
            hasNote={hasNoteOnDate(date)}
            onClick={() => selection.handleDateClick(date)}
            onMouseEnter={() => {
              if (selection.startDate && !selection.endDate) {
                selection.setHoverDate(date);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default CalendarGrid;
