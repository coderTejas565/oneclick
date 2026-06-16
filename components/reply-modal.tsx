"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  email: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReplyModal({
  email,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

async function generateAIReply() {
  setStreaming(true);
  setBody("");
  setSubject("");

  try {
    const res = await fetch(
      "/api/email/draft",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email.id,
        }),
      }
    );

    const data = await res.json();

    console.log("Draft Response:", data);

    if (!data.success) {
      throw new Error(
        "Failed to generate draft"
      );
    }

    setSubject(data.draft.subject);

    setBody(data.draft.body);
  } catch (err) {
    console.error(err);
    alert("Failed to generate AI reply");
  } finally {
    setStreaming(false);
  }
}

  // 📤 SEND EMAIL
  async function handleSend() {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/email/reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: email.id,
            subject,
            body,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            ✉️ AI Reply Assistant
          </DialogTitle>
        </DialogHeader>

        {/* EMAIL CONTEXT */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <span className="font-medium">
              From:
            </span>{" "}
            {email.from}
          </p>

          <p>
            <span className="font-medium">
              Original Subject:
            </span>{" "}
            {email.subject}
          </p>
        </div>

        {/* AI GENERATE BUTTON */}
        <div className="pt-2">
          <Button
            onClick={generateAIReply}
            disabled={streaming || loading}
          >
            {streaming
              ? "Generating reply..."
              : "✨ Generate AI Reply"}
          </Button>
        </div>

        {/* SUBJECT */}
        <div className="space-y-2 pt-4">
          <label className="text-sm font-medium">
            Subject
          </label>

          <Input
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            disabled={streaming}
          />
        </div>

        {/* BODY */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Message
          </label>

          <Textarea
            className="min-h-[200px]"
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
            disabled={streaming}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={handleSend}
            disabled={loading || streaming}
          >
            {loading
              ? "Sending..."
              : "Send Reply"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}