import { EmailCard } from "@/components/inbox/EmailCard";

async function getInbox() {
  const res = await fetch(
    "http://localhost:3000/api/inbox",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch inbox");
  }

  return res.json();
}

export default async function InboxPage() {
  const inbox = await getInbox();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        AI Inbox
      </h1>

      {/* High Priority */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          🔥 High Priority
        </h2>

        <div className="space-y-4">
          {inbox.highPriority?.length === 0 ? (
            <p className="text-gray-500">
              No high priority emails
            </p>
          ) : (
            inbox.highPriority?.map(
              (email: any) => (
                <EmailCard
                  key={email.id}
                  {...email}
                />
              )
            )
          )}
        </div>
      </section>

      {/* Action Required */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          ⚡ Action Required
        </h2>

        <div className="space-y-4">
          {inbox.actionRequired?.length === 0 ? (
            <p className="text-gray-500">
              No action required emails
            </p>
          ) : (
            inbox.actionRequired?.map(
              (email: any) => (
                <EmailCard
                  key={email.id}
                  {...email}
                />
              )
            )
          )}
        </div>
      </section>

      {/* Newsletters */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          📰 Newsletters
        </h2>

        <div className="space-y-4">
          {inbox.newsletter?.length === 0 ? (
            <p className="text-gray-500">
              No newsletters
            </p>
          ) : (
            inbox.newsletter?.map(
              (email: any) => (
                <EmailCard
                  key={email.id}
                  {...email}
                />
              )
            )
          )}
        </div>
      </section>
    </main>
  );
}