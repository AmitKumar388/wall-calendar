import { useState } from "react";
import { format } from "date-fns";
import { Plus, Trash2, Edit2, Check, X, StickyNote, ChevronDown, ChevronUp, CalendarDays, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CalendarNote } from "@/hooks/useCalendarNotes";

interface NotesPanelProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  notes: CalendarNote[];
  onAdd: (note: Omit<CalendarNote, "id" | "createdAt">) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const NotesPanel = ({
  currentMonth,
  startDate,
  endDate,
  notes,
  onAdd,
  onUpdate,
  onDelete,
}: NotesPanelProps) => {
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const monthKey = format(currentMonth, "yyyy-MM");
  const hasRange = !!startDate && !!endDate;

  const relevantNotes = notes.filter((n) => {
    if (n.monthKey === monthKey) return true;
    if (n.type === "range" && n.startDate && n.endDate) {
      const rangeMonth = n.startDate.substring(0, 7);
      return rangeMonth === monthKey;
    }
    return false;
  });

  const handleAdd = () => {
    if (!newText.trim()) return;
    if (hasRange) {
      onAdd({
        text: newText.trim(),
        type: "range",
        monthKey,
        startDate: format(startDate!, "yyyy-MM-dd"),
        endDate: format(endDate!, "yyyy-MM-dd"),
      });
    } else {
      onAdd({ text: newText.trim(), type: "month", monthKey });
    }
    setNewText("");
  };

  const startEdit = (note: CalendarNote) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      onUpdate(editingId, editText.trim());
    }
    setEditingId(null);
  };

  const label = hasRange
    ? `${format(startDate!, "MMM d")} – ${format(endDate!, "MMM d")}`
    : format(currentMonth, "MMMM yyyy");

  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border/60 shadow-lg">
      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-all duration-200 group"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <StickyNote className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <span className="font-display text-sm font-semibold text-foreground">Notes</span>
            <span className="text-xs text-muted-foreground ml-2">{label}</span>
          </div>
        </div>
        <div className={cn(
          "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
          "text-muted-foreground group-hover:bg-muted"
        )}>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-300",
            !collapsed && "rotate-180"
          )} />
        </div>
      </button>

      {!collapsed && (
        <div className="px-5 pb-5 animate-slide-up">
          {/* New note input */}
          <div className="flex gap-2.5 mb-4">
            <div className="flex-1 relative">
              <Textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder={hasRange ? "Add note for selected range…" : "Add note for this month…"}
                className="min-h-[48px] text-sm font-body resize-none rounded-xl bg-muted/50 border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 pr-3 placeholder:text-muted-foreground/60"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
                }}
              />
            </div>
            <Button
              size="icon"
              onClick={handleAdd}
              disabled={!newText.trim()}
              className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-lg transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:shadow-none"
              aria-label="Add note"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Notes list */}
          {relevantNotes.length === 0 ? (
            <div className="text-center py-8">
              <div className="h-12 w-12 mx-auto mb-3 rounded-2xl bg-muted/60 flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground/70 font-body">No notes yet</p>
              <p className="text-[10px] text-muted-foreground/40 mt-0.5">Select dates and add your first note</p>
            </div>
          ) : (
            <ul className="space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {relevantNotes.map((note, index) => (
                <li
                  key={note.id}
                  className="group rounded-xl border border-border/40 bg-gradient-to-r from-muted/30 to-transparent p-3.5 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {editingId === note.id ? (
                    <div className="flex gap-2">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-[40px] text-sm resize-none bg-background/80 rounded-lg"
                        autoFocus
                      />
                      <div className="flex flex-col gap-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary" onClick={saveEdit}>
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-body text-foreground/90 whitespace-pre-wrap leading-relaxed">{note.text}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3 text-primary/50" />
                          <span className="text-[10px] font-body text-muted-foreground/70 tracking-wide">
                            {note.type === "range" && note.startDate && note.endDate
                              ? `${note.startDate} → ${note.endDate}`
                              : "Month note"}
                          </span>
                        </div>
                        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary"
                            onClick={() => startEdit(note)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onDelete(note.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesPanel;
