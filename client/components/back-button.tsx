"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-2 pb-2">
      <Button
        variant={"ghost"}
        onClick={() => {
          router.back();
        }}
        className="flex space-x-2 items-center"
      >
        <IconArrowLeft className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Back</span>
      </Button>
    </div>
  );
}
