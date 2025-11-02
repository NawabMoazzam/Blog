"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by mounting the component only on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side and first client-side render
  }

  return (
    <span className="flex items-center gap-1 border border-border px-2 py-1 rounded-full">
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        onClick={() => setTheme("dark")}
        className="rounded-full size-6"
        aria-label="Dark"
      >
        <Moon />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        onClick={() => setTheme("system")}
        className="rounded-full size-6"
        aria-label="System"
      >
        <Monitor />
      </Button>
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        onClick={() => setTheme("light")}
        className="rounded-full size-6"
        aria-label="Light"
      >
        <Sun />
      </Button>
    </span>
  );
}
