import WallCalendar from "@/components/calendar/WallCalendar";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex items-start justify-center relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <WallCalendar />
    </main>
  );
};

export default Index;
