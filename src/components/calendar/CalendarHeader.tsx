import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  hasSelection: boolean;
}

const CalendarHeader = ({ currentMonth, onPrev, onNext, onReset, hasSelection }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-1 pb-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-200 active:scale-90"
          onClick={onPrev}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-200 active:scale-90"
          onClick={onNext}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {hasSelection && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1 transition-all duration-200 active:scale-95"
          onClick={onReset}
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default CalendarHeader;
