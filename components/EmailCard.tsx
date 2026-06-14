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
      <article className="border rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-semibold text-base">
            {subject}
          </h3>

          <span className="text-xs border rounded-full px-2 py-1 whitespace-nowrap">
            {priority}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {from}
        </p>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
          {summary}
        </p>

        <div className="flex gap-2 mt-4">
          <span className="text-xs border rounded-full px-2 py-1">
            {category}
          </span>

          {actionRequired && (
            <span className="text-xs border rounded-full px-2 py-1">
              Action Required
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}