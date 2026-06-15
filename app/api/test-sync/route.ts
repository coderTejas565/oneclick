import { NextResponse } from "next/server";

import {
  getSyncState,
  createSyncState,
} from "@/db/repositories/sync.repository";

export async function GET() {
  let state = await getSyncState();

  if (!state) {
    state = await createSyncState();
  }

  return NextResponse.json(state);
}