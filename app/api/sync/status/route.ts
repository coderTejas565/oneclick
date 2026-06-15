import { NextResponse } from "next/server";

import {
  getSyncState,
} from "@/db/repositories/sync.repository";

export async function GET() {
  const state = await getSyncState();

  return NextResponse.json(state);
}