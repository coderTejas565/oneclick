import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

async function getEmail(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/email/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch email");
  }

  return res.json();
}

function getPriorityVariant(priority: string) {
  switch (priority?.toLowerCase()) {
    case "high":
      return "destructive";

    case "medium":
      return "secondary";

    default:
      return "outline";
  }
}

export default async function EmailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getEmail(id);

  const email = data.email;

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {email.subject}
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          {email.from}
        </p>
      </div>

      {/* Email Meta */}
      <Card>
        <CardHeader>
          <CardTitle>Email Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              From
            </p>

            <p>{email.from}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              To
            </p>

            <p>{email.to}</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="leading-7 mb-5">
            {email.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {email.category}
            </Badge>

            <Badge
              variant={
                getPriorityVariant(
                  email.priority
                ) as any
              }
            >
              {email.priority}
            </Badge>

            {email.actionRequired && (
              <Badge variant="destructive">
                Action Required
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Original Email */}
      <Card>
        <CardHeader>
          <CardTitle>
            Original Email
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap leading-7 text-sm">
            {email.body}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}