import { InboxSection } from "@/components/InboxSection";

async function getInbox() {
  const res = await fetch(
    "http://localhost:3000/api/inbox",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function InboxPage() {
  const inbox = await getInbox();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Smart Inbox
      </h1>

      <InboxSection
        title="⚡ Action Required"
        items={inbox.actionRequired}
      />

      <InboxSection
        title="🔥 High Priority"
        items={inbox.highPriority}
      />

      <InboxSection
        title="📩 Newsletters"
        items={inbox.newsletter}
      />

      <InboxSection
        title="📬 Others"
        items={inbox.others}
      />
    </main>
  );
}