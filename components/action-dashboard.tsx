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

export function ActionDashboard({
  emails,
}: {
  emails: Email[];
}) {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>⚡ Action Center</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {emails.length === 0 ? (
              <p className="text-muted-foreground">
                No actions required 🎉
              </p>
            ) : (
              emails.map((email) => (
                <div
                  key={email.id}
                  className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium">
                      {email.subject}
                    </h3>

                    <Badge>
                      {email.priority}
                    </Badge>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {email.summary}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-2">
                    {/* 🔥 REAL ACTION */}
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedEmail(email);
                        setOpen(true);
                      }}
                    >
                      Reply
                    </Button>

                    {/* Future feature */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        alert("Schedule feature next step");
                      }}
                    >
                      Schedule
                    </Button>

                    <Link href={`/inbox/${email.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      {selectedEmail && (
        <ReplyModal
          email={selectedEmail}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}