import Link from "next/link";

import {
  Inbox,
  Calendar,
  Settings,
  Command,
} from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/app"
            className="text-xl font-semibold"
          >
            OneClick
          </Link>
        </div>

        <nav className="p-4">
          <div className="space-y-1">

            <Link
              href="/app"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              <Command className="h-4 w-4" />
              Command Center
            </Link>

            <Link
              href="/app/inbox"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              <Inbox className="h-4 w-4" />
              Inbox
            </Link>

            <Link
              href="/app/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </Link>

            <Link
              href="/app/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
}