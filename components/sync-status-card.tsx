"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RefreshCw } from "lucide-react";

import { useRouter } from "next/navigation";

type SyncState = {
  status: string;
  lastSyncedAt: string | null;
};

export function SyncStatusCard() {

    const router = useRouter();
  const [loading, setLoading] =
    useState(false);

  const [syncState, setSyncState] =
    useState<SyncState | null>(null);

  async function loadStatus() {
    const res = await fetch(
      "/api/sync/status"
    );

    const data = await res.json();

    setSyncState(data);
  }

  async function handleSync() {
    try {
      setLoading(true);

    const res = await fetch("/api/sync", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Sync failed");
    }

    await loadStatus();

    router.refresh();
    } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Inbox Sync
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p className="font-medium">
            {syncState?.status ??
              "Loading..."}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Last Synced
          </p>

          <p>
            {syncState?.lastSyncedAt
              ? new Date(
                  syncState.lastSyncedAt
                ).toLocaleString()
              : "Never"}
          </p>
        </div>

        <Button
          onClick={handleSync}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              loading
                ? "animate-spin"
                : ""
            }`}
          />

          {loading
            ? "Syncing..."
            : "Sync Inbox"}
        </Button>
      </CardContent>
    </Card>
  );
}