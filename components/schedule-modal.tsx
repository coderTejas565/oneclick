"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  email: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ScheduleModal({
  email,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(
    `Meeting - ${email.subject}`
  );

  const [date, setDate] = useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleCreateEvent() {
    try {
      setLoading(true);

      const start = new Date(
        `${date}T${startTime}`
      ).toISOString();

      const end = new Date(
        `${date}T${endTime}`
      ).toISOString();

      const res = await fetch(
        "/api/calendar/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            start,
            end,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create event"
        );
      }

      onOpenChange(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            📅 Schedule Meeting
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Title"
          />

          <Input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <Input
            type="time"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
          />

          <Input
            type="time"
            value={endTime}
            onChange={(e) =>
              setEndTime(e.target.value)
            }
          />

          <Button
            className="w-full"
            onClick={handleCreateEvent}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Event"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}