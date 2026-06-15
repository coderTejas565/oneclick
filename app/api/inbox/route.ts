import { NextResponse } from "next/server";
import { getAllEmails } from "@/db/repositories/email.repository";
import { groupEmails } from "@/core/inbox/groupEmails";
import { formatInboxResponse } from "@/core/inbox/formatInboxResponse";

export async function GET() {
  try {
    const emails = await getAllEmails();
    console.log("DB emails:", emails.length);


console.log("RAW DB EMAILS:", emails[0]);

    const grouped = groupEmails(emails);

    const response = formatInboxResponse(grouped);

    return NextResponse.json({
      success: true,
      ...response,
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