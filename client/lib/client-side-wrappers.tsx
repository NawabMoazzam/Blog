"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "./utils";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  loading: () => <Skeleton className="h-[42px] w-[114px] rounded-full" />,
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
    <div className={cn("w-max", className)} {...props}>
      <ThemeToggle />
    </div>
  );
}

export function NavBarWrapper() {
  return <NavBar />;
}
