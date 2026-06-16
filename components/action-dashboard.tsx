"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ReplyModal } from "./reply-modal";

type Email = {
  id: string;
  subject: string | null;
  summary: string | null;
  priority: string | null;
};

function getPriorityColor(priority: string | null) {
  switch (priority?.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    default:
      return "outline";
  }
}

export function ActionDashboard({
  emails,
}: {
  emails: Email[];
}) {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openingId, setOpeningId] = useState<string | null>(null);

  function handleReply(email: Email) {
    setOpeningId(email.id);

    // small UX delay makes it feel “thinking”
    setTimeout(() => {
      setSelectedEmail(email);
      setOpen(true);
      setOpeningId(null);
    }, 150);
  }

  return (
    <>
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-xl">
            ⚡ Action Center
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {emails.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                🎉 No actions required
              </div>
            ) : (
              emails.map((email) => {
                const isOpening = openingId === email.id;

                return (
                  <div
                    key={email.id}
                    className="border rounded-xl p-4 space-y-3 transition hover:shadow-sm hover:border-muted-foreground/20 bg-card"
                  >
                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="font-medium leading-snug">
                          {email.subject || "No Subject"}
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Action required email
                        </p>
                      </div>

                      <Badge variant={getPriorityColor(email.priority)}>
                        {email.priority || "low"}
                      </Badge>
                    </div>

                    {/* SUMMARY */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {email.summary}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-2 pt-2">
                      {/* MAIN ACTION */}
                      <Button
                        size="sm"
                        onClick={() => handleReply(email)}
                        disabled={isOpening}
                      >
                        {isOpening ? "Thinking..." : "Reply"}
                      </Button>

                      {/* SECONDARY */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          alert("Schedule feature next step");
                        }}
                      >
                        Schedule
                      </Button>

                      {/* VIEW */}
                      <Link href={`/inbox/${email.id}`}>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      {selectedEmail && (
        <ReplyModal
          email={selectedEmail}
          open={open}
          onOpenChange={(val) => {
            setOpen(val);

            // reset state when closing
            if (!val) {
              setTimeout(() => {
                setSelectedEmail(null);
              }, 200);
            }
          }}
        />
      )}
    </>
  );
}