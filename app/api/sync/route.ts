import { NextResponse } from "next/server";
import { syncInbox } from "@/core/sync/syncInbox";

export async function POST() {
  const result = await syncInbox();

  return NextResponse.json(result);
}