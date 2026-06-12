import { NextResponse } from "next/server";
import { corsair } from "@/corsair";

export async function GET() {
  try {
const { messages = [], nextPageToken } =
  await corsair.gmail.api.messages.list({
    maxResults: 10,
  });

  const email = await corsair.gmail.api.messages.get({
  id: "19eb76f19582dd0b",
});

return NextResponse.json({
  success: true,
  email,
  // count: messages.length,
  // nextPageToken,
  // messages,
});
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}