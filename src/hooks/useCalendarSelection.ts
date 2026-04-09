import { useState, useCallback } from "react";
import { isBefore, isSameDay, isWithinInterval } from "date-fns";

export function useCalendarSelection() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!startDate || (startDate && endDate)) {
        // Start fresh selection
        setStartDate(date);
        setEndDate(null);
      } else {
        // Set end date, ensure correct order
        if (isSameDay(date, startDate)) {
          setEndDate(date);
        } else if (isBefore(date, startDate)) {
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      }
    },
    [startDate, endDate]
  );

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  const isInRange = useCallback(
    (date: Date) => {
      if (!startDate) return false;
      const end = endDate || hoverDate;
      if (!end) return false;
      const [s, e] = isBefore(startDate, end) ? [startDate, end] : [end, startDate];
      return isWithinInterval(date, { start: s, end: e });
    },
    [startDate, endDate, hoverDate]
  );

  const isStart = useCallback(
    (date: Date) => !!startDate && isSameDay(date, startDate),
    [startDate]
  );

  const isEnd = useCallback(
    (date: Date) => !!endDate && isSameDay(date, endDate),
    [endDate]
  );

  return {
    startDate,
    endDate,
    hoverDate,
    setHoverDate,
    handleDateClick,
    clearSelection,
    isInRange,
    isStart,
    isEnd,
  };
}
