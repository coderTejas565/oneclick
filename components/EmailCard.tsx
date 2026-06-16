import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Link href={`/inbox/${id}`}>
      <Card className="group relative rounded-xl border bg-card p-4 space-y-3 hover:shadow-sm transition-all cursor-pointer">

        <h3 className="font-medium text-base leading-snug line-clamp-2">
          {subject}
        </h3>

        <p className="text-xs text-muted-foreground">
          {from}
        </p>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {summary}
        </p>

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>{category}</span>

          <span>•</span>

          <span
            className={
              priority === "high"
                ? "text-red-500 font-medium"
                : priority === "medium"
                ? "text-yellow-500"
                : ""
            }
          >
            {priority}
          </span>

          {actionRequired && (
            <>
              <span>•</span>
              <span className="text-blue-500 font-medium">
                Action
              </span>
            </>
          )}
        </div>

        {actionRequired && (
          <p className="text-[11px] text-muted-foreground mt-2 opacity-70">
            AI: Suggested action available
          </p>
        )}
      </Card>
    </Link>
  );
}