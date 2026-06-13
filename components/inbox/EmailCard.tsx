import Link from "next/link";

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
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
        <div className="flex justify-between">
          <h3 className="font-semibold">{subject}</h3>
          <span>{priority}</span>
        </div>

        <p className="text-sm mt-1">{from}</p>

        <p className="text-sm mt-2">{summary}</p>

        <div className="flex gap-2 mt-3">
          <span>{category}</span>

          {actionRequired && (
            <span>Action Required</span>
          )}
        </div>
      </div>
    </Link>
  );
}