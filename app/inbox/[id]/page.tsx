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

export default async function EmailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getEmail(id);

  const email = data.email.email;
  const analysis = data.email.analysis;

  return (
    <main className="max-w-4xl mx-auto p-8">
      {/* Subject */}
      <h1 className="text-3xl font-bold mb-6">
        {email.subject}
      </h1>

      {/* Sender */}
      <div className="mb-6 rounded-lg border p-4">
        <p>
          <span className="font-semibold">
            From:
          </span>{" "}
          {email.from}
        </p>

        <p>
          <span className="font-semibold">
            To:
          </span>{" "}
          {email.to}
        </p>
      </div>

      {/* AI Analysis */}
      <div className="mb-6 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Summary
        </h2>

        <p className="mb-4">
          {analysis.summary}
        </p>

        <div className="flex gap-3">
          <span className="rounded-full border px-3 py-1 text-sm">
            {analysis.category}
          </span>

          <span className="rounded-full border px-3 py-1 text-sm">
            {analysis.priority}
          </span>

          {analysis.actionRequired && (
            <span className="rounded-full border px-3 py-1 text-sm">
              Action Required
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {analysis.actions?.length > 0 && (
        <div className="mb-6 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Suggested Actions
          </h2>

          <ul className="space-y-2">
            {analysis.actions.map(
              (action: any, index: number) => (
                <li key={index}>
                  • {action.title}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Original Email */}
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Original Email
        </h2>

        <p className="whitespace-pre-wrap leading-7">
          {email.body}
        </p>
      </div>
    </main>
  );
}