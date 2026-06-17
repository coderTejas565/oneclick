"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  Clock,
  ExternalLink,
  CalendarDays,
  Activity,
} from "lucide-react";

export function CalendarEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const res = await fetch(
        "/api/calendar/events"
      );

      const data = await res.json();

      setEvents(
        data.events?.items || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const now = new Date();

    const today = events.filter((event) => {
      const start = new Date(
        event.start?.dateTime
      );

      return (
        start.toDateString() ===
        now.toDateString()
      );
    });

    const week = events.filter((event) => {
      const start = new Date(
        event.start?.dateTime
      );

      const diff =
        start.getTime() -
        now.getTime();

      const days =
        diff / (1000 * 60 * 60 * 24);

      return days >= 0 && days <= 7;
    });

    return {
      total: events.length,
      today: today.length,
      week: week.length,
    };
  }, [events]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="space-y-6">

          <div className="h-8 w-48 rounded bg-muted animate-pulse" />

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="h-28 animate-pulse" />
              </Card>
            ))}
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-semibold">
          Calendar
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage meetings extracted and
          scheduled by OneClick.
        </p>

      </div>

      {/* STATS */}

      <div className="grid gap-4 mb-8 md:grid-cols-3">

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Meetings
                </p>

                <p className="mt-1 text-3xl font-semibold">
                  {stats.total}
                </p>
              </div>

              <CalendarDays className="h-6 w-6 text-muted-foreground" />

            </div>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-muted-foreground">
                  Today
                </p>

                <p className="mt-1 text-3xl font-semibold">
                  {stats.today}
                </p>
              </div>

              <Clock className="h-6 w-6 text-muted-foreground" />

            </div>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-muted-foreground">
                  Next 7 Days
                </p>

                <p className="mt-1 text-3xl font-semibold">
                  {stats.week}
                </p>
              </div>

              <Activity className="h-6 w-6 text-muted-foreground" />

            </div>

          </CardContent>
        </Card>

      </div>

      {/* EMPTY */}

      {events.length === 0 && (
        <Card>

          <CardContent className="py-20 text-center">

            <Calendar className="mx-auto mb-5 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-medium">
              No meetings scheduled
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Meetings created from email
              actions will appear here.
            </p>

          </CardContent>

        </Card>
      )}

      {/* EVENTS */}

      {events.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {events.map((event) => {
            const start = new Date(
              event.start?.dateTime
            );

            return (
              <Card
                key={event.id}
                className="transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-5">

                  <div className="space-y-5">

                    <div>

                      <p className="line-clamp-2 font-medium text-base">
                        {event.summary ||
                          "Untitled Meeting"}
                      </p>

                    </div>

                    <div className="space-y-3">

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">

                        <Calendar className="h-4 w-4" />

                        {start.toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">

                        <Clock className="h-4 w-4" />

                        {start.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>

                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                    >
                      <a
                        href={event.htmlLink}
                        target="_blank"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Event
                      </a>
                    </Button>

                  </div>

                </CardContent>
              </Card>
            );
          })}

        </div>
      )}
    </div>
  );
}