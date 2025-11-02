"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "./utils";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  loading: () => <Skeleton className="h-9 w-24 rounded-full" />,
  ssr: false,
});

const NavBar = dynamic(() => import("@/components/navbar"), {
  loading: () => <Skeleton className="h-14 w-full" />,
  ssr: true,
});

export function ThemeToggleWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("h-9 w-24", className)} {...props}>
      <ThemeToggle />
    </div>
  );
}

export function NavBarWrapper() {
  return <NavBar />;
}
