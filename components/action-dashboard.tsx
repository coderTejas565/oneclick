import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  return (
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
                {/* Header Row */}
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

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm">
                    Reply
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
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
  );
}