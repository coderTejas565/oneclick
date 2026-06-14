import Link from "next/link";

async function getInbox() {
  const res = await fetch("http://localhost:3000/api/inbox", {
    cache: "no-store",
  });

  return res.json();
}

function EmailCard({ item }: any) {
  const email = item?.email;
  const analysis = item?.analysis;

  // HARD GUARD (important)
  if (!email?.id) return null;

  return (
    <Link
      href={`/inbox/${email.id}`}
      className="block border rounded-lg p-4 hover:bg-gray-50 transition"
    >
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-base">
          {email.subject}
        </h2>

        <span className="text-xs px-2 py-1 rounded border">
          {analysis?.priority ?? "Low"}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        {email.from}
      </p>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {analysis?.summary}
      </p>
    </Link>
  );
}

function Section({ title, items }: any) {
  const safeItems = Array.isArray(items)
    ? items.filter((i: any) => i?.email?.id)
    : [];

  if (!safeItems.length) return null;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-3">
        {title} ({safeItems.length})
      </h2>

      <div className="space-y-3">
        {safeItems.map((item: any) => (
          <EmailCard key={item.email.id} item={item} />
        ))}
      </div>
    </div>
  );
}
export default async function InboxPage() {
  const inbox = await getInbox();

  const highPriority = inbox?.highPriority ?? [];
  const actionRequired = inbox?.actionRequired ?? [];
  const newsletter = inbox?.newsletter ?? [];
  const all = inbox?.all ?? inbox?.emails ?? [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">
        Smart Inbox
      </h1>

      {/* Priority Section */}
      <Section
        title="🔥 High Priority"
        items={highPriority}
      />

      {/* Action Required */}
      <Section
        title="⚡ Action Required"
        items={actionRequired}
      />

      {/* Newsletter */}
      <Section
        title="📩 Newsletter"
        items={newsletter}
      />

      {/* All Emails (fallback) */}
      <Section
        title="All Emails"
        items={all}
      />
    </div>
  );
}