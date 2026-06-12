"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/gmail-live");
      const data = await res.json();

      if (data.success) {
        setEmails(data.messages || []);
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Inbox</h1>

      {emails.map((email) => (
        <div key={email.id} style={{ marginBottom: 10 }}>
          <div><b>ID:</b> {email.id}</div>
          <div><b>Thread:</b> {email.threadId}</div>
        </div>
      ))}
    </div>
  );
}