import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render nothing meaningful until mounted
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return (
      <button
        className="theme-toggle-btn"
        aria-label="Toggle theme"
        disabled
      >
        <span className="theme-toggle-track">
          <span className="theme-toggle-thumb" />
        </span>
      </button>
    );
  }

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      className="theme-toggle-btn group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={`theme-toggle-track ${isDark ? "is-dark" : "is-light"}`}>
        {/* Stars (visible in dark mode) */}
        <span className="theme-stars">
          <span className="star star-1" />
          <span className="star star-2" />
          <span className="star star-3" />
        </span>

        {/* Cloud puffs (visible in light mode) */}
        <span className="theme-clouds">
          <span className="cloud cloud-1" />
          <span className="cloud cloud-2" />
        </span>

        {/* The sliding thumb with sun/moon icon */}
        <span className={`theme-toggle-thumb ${isDark ? "is-dark" : "is-light"}`}>
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-indigo-200" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-amber-500" />
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
