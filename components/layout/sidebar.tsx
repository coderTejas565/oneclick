"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Inbox,
  Calendar,
  Settings,
  Command,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
} from "lucide-react";

const links = [
  {
    href: "/app",
    label: "Command Center",
    icon: Command,
  },
  {
    href: "/app/inbox",
    label: "Inbox",
    icon: Inbox,
  },
  {
    href: "/app/calendar",
    label: "Calendar",
    icon: Calendar,
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "oneclick-sidebar"
      );

    if (saved) {
      setCollapsed(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "oneclick-sidebar",
      JSON.stringify(collapsed)
    );
  }, [collapsed]);

  function toggleSidebar() {
    setCollapsed((prev) => !prev);
  }

  return (
    <aside
      className={`flex flex-col border-r bg-background transition-all duration-300 ${
        collapsed
          ? "w-16"
          : "w-64"
      }`}
    >
      {/* HEADER */}

      <div className="flex h-16 items-center border-b px-4">

        {!collapsed ? (
          <>
            <div className="flex items-center gap-2">

              <Zap className="h-5 w-5" />

              <div>
                <h2 className="font-semibold">
                  OneClick
                </h2>

                <p className="text-xs text-muted-foreground">
                  AI Assistant
                </p>
              </div>

            </div>

            <button
              onClick={toggleSidebar}
              className="ml-auto"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">

            <button
              onClick={toggleSidebar}
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>

          </div>
        )}

      </div>

      {/* NAV */}

      <nav className="p-2">

        {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed
                ? link.label
                : undefined}
              className={`mb-1 flex items-center rounded-lg py-2 text-sm transition-colors ${
                collapsed
                  ? "justify-center px-0"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-muted font-medium"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />

              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  collapsed
                    ? "w-0 opacity-0"
                    : "w-auto opacity-100"
                }`}
              >
                {link.label}
              </span>

            </Link>
          );
        })}

      </nav>

      {/* FOOTER */}

      <div className="mt-auto p-3">

        {!collapsed ? (
          <div className="rounded-lg border p-3 text-xs text-muted-foreground">

            <div className="font-medium mb-1">
              Quick Tip
            </div>

            Press ⌘K to open the
            Command Center.

          </div>
        ) : (
          <div className="flex justify-center">

            <Zap className="h-4 w-4 text-muted-foreground" />

          </div>
        )}

      </div>

    </aside>
  );
}