import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type EmailCardProps = {
  id: string;
  subject: string;
  from: string;
  summary: string;
  category: string;
  priority: string;
  actionRequired: boolean;
};

export function EmailCard({
  id,
  subject,
  from,
  summary,
  category,
  priority,
  actionRequired,
}: EmailCardProps) {
  const getPriorityVariant = () => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";

      case "medium":
        return "secondary";

      default:
        return "outline";
    }
  };

  return (
    <Link href={`/inbox/${id}`}>
      <Card className="cursor-pointer transition hover:shadow-md hover:border-primary">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-semibold text-base line-clamp-2">
              {subject}
            </h3>

            <Badge variant={getPriorityVariant()}>
              {priority}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            {from}
          </p>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {summary}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline">
              {category}
            </Badge>

            {actionRequired && (
              <Badge variant="destructive">
                Action Required
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}