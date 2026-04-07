"use client";

import { Sun } from "lucide-react";

import { Moon } from "lucide-react";

import { VscColorMode, VscCircleFilled } from "react-icons/vsc";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center p-2 rounded-full hover:bg-primary/10 group relative outline-none"
      aria-label="Toggle Theme"
    >
      {/* Icon Switch Logic */}
      <div className="relative flex items-center justify-center">
        {theme === "dark" ? (
          <Sun
            suppressHydrationWarning
            size={24}
            className="transition-all duration-500 rotate-0 scale-100"
          />
        ) : (
          <Moon
            size={24}
            className="transition-all duration-500 rotate-180 scale-100"
          />
        )}
      </div>

      {/* Matching Desktop Tooltip Style */}
      <span
        suppressHydrationWarning
        className="absolute left-14 scale-0 group-hover:scale-100 transition-all bg-card border border-border text-foreground text-[10px] px-2 py-1 rounded-md hidden lg:block uppercase tracking-widest font-bold whitespace-nowrap z-50"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
