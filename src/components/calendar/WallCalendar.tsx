import { useState, useCallback } from "react";
import HeroImage from "./HeroImage";
import SpiralBinding from "./SpiralBinding";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useCalendarSelection } from "@/hooks/useCalendarSelection";
import { useCalendarNotes } from "@/hooks/useCalendarNotes";
import { addMonths, subMonths } from "date-fns";

const WallCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [animKey, setAnimKey] = useState(0);
  const selection = useCalendarSelection();
  const { notes, addNote, updateNote, deleteNote, hasNoteOnDate } = useCalendarNotes();

  const changeMonth = useCallback((d: Date) => {
    setCurrentMonth(d);
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 sm:py-10">
      {/* Calendar card — stacked vertical like a real wall calendar */}
      <div className="calendar-shadow rounded-xl overflow-hidden bg-card relative">
        {/* Hero image on top */}
        <HeroImage currentMonth={currentMonth} />

        {/* Spiral binding between image and grid */}
        <SpiralBinding />

        {/* Notes section + calendar grid side by side on larger, stacked on mobile */}
        <div className="flex flex-col sm:flex-row">
          {/* Notes sidebar */}
          <div className="sm:w-28 sm:border-r border-border/40 px-3 py-3 sm:py-4">
            <p className="text-[10px] font-body text-muted-foreground tracking-wider uppercase mb-1">Notes</p>
            <div className="h-px bg-border/40 mb-2" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-px bg-border/30" />
              ))}
            </div>
          </div>

          {/* Calendar grid */}
          <div className="flex-1">
            <CalendarGrid
              currentMonth={currentMonth}
              setCurrentMonth={changeMonth}
              selection={selection}
              hasNoteOnDate={hasNoteOnDate}
              animKey={animKey}
            />
          </div>
        </div>
      </div>

      {/* Notes panel below */}
      <div className="mt-4">
        <NotesPanel
          currentMonth={currentMonth}
          startDate={selection.startDate}
          endDate={selection.endDate}
          notes={notes}
          onAdd={addNote}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      </div>
    </div>
  );
};

export default WallCalendar;
