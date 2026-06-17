"use client";

import {
  Mail,
  Calendar,
  Command,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">

        {/* LEFT */}
        <div>

          <h1 className="text-lg font-semibold">
            OneClick
          </h1>

          <p className="text-xs text-muted-foreground">
            AI Executive Assistant
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* COMMAND SHORTCUT */}
          <div className="hidden md:flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs text-muted-foreground">

            <Command className="h-3.5 w-3.5" />

            <span>Command Center</span>

            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>

          </div>

          {/* GMAIL */}
          <Badge
            variant="secondary"
            className="gap-2"
          >
            <Mail className="h-3 w-3" />
            Gmail
          </Badge>

          {/* CALENDAR */}
          <Badge
            variant="secondary"
            className="gap-2"
          >
            <Calendar className="h-3 w-3" />
            Calendar
          </Badge>

          {/* USER */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium">
            T
          </div>

        </div>

      </div>
    </header>
  );
}