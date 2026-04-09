import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

export interface CalendarNote {
  id: string;
  text: string;
  type: "month" | "range";
  monthKey?: string; // "2026-04"
  startDate?: string; // "2026-04-01"
  endDate?: string; // "2026-04-05"
  createdAt: number;
}

const STORAGE_KEY = "wall-calendar-notes";

function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useCalendarNotes() {
  const [notes, setNotes] = useState<CalendarNote[]>(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = useCallback(
    (note: Omit<CalendarNote, "id" | "createdAt">) => {
      const newNote: CalendarNote = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
    },
    []
  );

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNotesForMonth = useCallback(
    (date: Date) => {
      const key = format(date, "yyyy-MM");
      return notes.filter((n) => n.monthKey === key);
    },
    [notes]
  );

  const getNotesForDate = useCallback(
    (date: Date) => {
      const ds = format(date, "yyyy-MM-dd");
      return notes.filter((n) => {
        if (n.type === "range" && n.startDate && n.endDate) {
          return ds >= n.startDate && ds <= n.endDate;
        }
        return false;
      });
    },
    [notes]
  );

  const hasNoteOnDate = useCallback(
    (date: Date) => getNotesForDate(date).length > 0,
    [getNotesForDate]
  );

  return { notes, addNote, updateNote, deleteNote, getNotesForMonth, getNotesForDate, hasNoteOnDate };
}
