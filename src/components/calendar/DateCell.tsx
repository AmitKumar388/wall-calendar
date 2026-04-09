import { isToday, isWeekend, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface DateCellProps {
  date: Date;
  currentMonth: Date;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  hasNote: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const DateCell = ({
  date,
  currentMonth,
  isStart,
  isEnd,
  isInRange,
  hasNote,
  onClick,
  onMouseEnter,
}: DateCellProps) => {
  const inMonth = isSameMonth(date, currentMonth);
  const today = isToday(date);
  const weekend = isWeekend(date);
  const isSunday = date.getDay() === 0;
  const isSaturday = date.getDay() === 6;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative flex items-center justify-center h-9 sm:h-10 w-full text-sm font-body font-medium select-none",
        "transition-all duration-200 ease-out",
        !inMonth && "text-muted-foreground/20 pointer-events-none",
        inMonth && !isStart && !isEnd && !isInRange && "hover:bg-calendar-hover hover:scale-110 active:scale-95 rounded-md",
        inMonth && isSaturday && !isStart && !isEnd && !isInRange && "text-accent font-semibold",
        inMonth && isSunday && !isStart && !isEnd && !isInRange && "text-destructive font-semibold",
        isInRange && !isStart && !isEnd && "bg-calendar-range-bg text-foreground",
        isStart && "bg-calendar-range text-primary-foreground rounded-l-md rounded-r-none scale-105 shadow-md",
        isEnd && "bg-calendar-range text-primary-foreground rounded-r-md rounded-l-none scale-105 shadow-md",
        isStart && isEnd && "rounded-md",
        today && !isStart && !isEnd && "ring-2 ring-calendar-today text-calendar-today font-bold"
      )}
      aria-label={date.toDateString()}
    >
      <span className={cn(
        "relative z-10 transition-transform duration-150",
        (isStart || isEnd) && "animate-[bounceIn_0.3s_ease-out]"
      )}>
        {date.getDate()}
      </span>
      {hasNote && inMonth && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-calendar-note-indicator animate-pulse-dot shadow-sm" />
      )}
    </button>
  );
};

export default DateCell;
