"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ChatBox() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4 mb-6">
      <div className="flex gap-2">
        <Input
          placeholder="Ask: 'Reply to recruiter email' or 'Schedule meeting'"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <Button
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </Card>
  );
}