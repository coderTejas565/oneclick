"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Loader2,
  Sparkles,
  Mail,
  Calendar,
  CheckCircle,
  Search,
} from "lucide-react";

export function ChatBox() {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState<any>(null);

  async function handleSend() {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setResponse(null);

      const res = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      setResponse(data.result);

      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getIntentIcon(
    intent: string
  ) {
    switch (intent) {
      case "EMAIL_REPLY":
        return <Mail className="h-4 w-4" />;

      case "SCHEDULE_MEETING":
        return (
          <Calendar className="h-4 w-4" />
        );

      case "MARK_DONE":
        return (
          <CheckCircle className="h-4 w-4" />
        );

      case "EMAIL_SEARCH":
        return (
          <Search className="h-4 w-4" />
        );

      default:
        return (
          <Sparkles className="h-4 w-4" />
        );
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-4">
        {/* COMMAND INPUT */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask OneClick to work for you..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <Button
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Thinking
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>

{/* EXAMPLES */}
{!response && (
  <div className="space-y-3">

    <p className="text-xs text-muted-foreground">
      Try asking:
    </p>

    <div className="flex flex-wrap gap-2">

      <Button
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={() =>
          setMessage(
            "Reply to recruiter email"
          )
        }
      >
        Reply to recruiter email
      </Button>

      <Button
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={() =>
          setMessage(
            "Find interview email"
          )
        }
      >
        Find interview email
      </Button>

      <Button
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={() =>
          setMessage(
            "Summarize my latest email"
          )
        }
      >
        Summarize latest email
      </Button>

      <Button
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={() =>
          setMessage(
            "Schedule interview meeting"
          )
        }
      >
        Schedule interview
      </Button>

      <Button
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={() =>
          setMessage(
            "Mark recruiter email done"
          )
        }
      >
        Mark email done
      </Button>

    </div>

  </div>
)}

{/* RESPONSE */}
{response && (
  <Card className="border-border">
    <CardContent className="p-5 space-y-5">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">

          {getIntentIcon(response.type)}

          <span className="font-medium">
            {response.type
              .replaceAll("_", " ")
              .toLowerCase()}
          </span>

        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setResponse(null)}
        >
          Clear
        </Button>
      </div>

      {/* MESSAGE */}
      {response.message && (
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm">
            {response.message}
          </p>
        </div>
      )}

      {/* EMAIL CARD */}
      {response.email && (
        <Card>
          <CardContent className="p-4 space-y-3">

            <div>
              <p className="text-xs text-muted-foreground">
                Subject
              </p>

              <p className="font-medium">
                {response.email.subject}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                From
              </p>

              <p className="text-sm">
                {response.email.from}
              </p>
            </div>

            {response.email.summary && (
              <div>
                <p className="text-xs text-muted-foreground">
                  Summary
                </p>

                <p className="text-sm">
                  {response.email.summary}
                </p>
              </div>
            )}

          </CardContent>
        </Card>
      )}

      {/* REPLY DRAFT */}
      {response.draft && (
        <Card>
          <CardContent className="p-4 space-y-3">

            <div className="flex items-center justify-between">

              <p className="font-medium">
                AI Reply Draft
              </p>

              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(
                    response.draft.body
                  )
                }
              >
                Copy
              </Button>

            </div>

            <div className="rounded-lg bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {response.draft.body}
              </pre>
            </div>

          </CardContent>
        </Card>
      )}

      {/* ERROR */}
      {response.error && (
        <div className="rounded-lg border border-destructive p-3 text-sm text-destructive">
          {response.error}
        </div>
      )}

    </CardContent>
  </Card>
)}
      </CardContent>
    </Card>
  );
}