import { InboxSection } from "@/components/InboxSection";
import { SyncStatusCard } from "@/components/sync-status-card";
import { ActionDashboard } from "@/components/action-dashboard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Smart Inbox
        </h1>

        <p className="text-muted-foreground mt-2">
          AI-powered email triage and
          prioritization.
        </p>
      </div>

      <div className="mb-10">
        <SyncStatusCard />
        </div>

        <ActionDashboard
  emails={inbox.actionRequired}
/>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Action Required
            </p>

            <p className="text-2xl font-bold">
              {inbox.actionRequired.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              High Priority
            </p>

            <p className="text-2xl font-bold">
              {inbox.highPriority.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Newsletters
            </p>

            <p className="text-2xl font-bold">
              {inbox.newsletter.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Others
            </p>

            <p className="text-2xl font-bold">
              {inbox.others?.length ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

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