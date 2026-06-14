import { NextResponse } from "next/server";
import { processInbox } from "@/core/pipeline/processInbox";
import { groupEmails } from "@/core/inbox/groupEmails";
import { formatInboxResponse } from "@/core/inbox/formatInboxResponse";

export async function GET() {
  try {
    const emails = await processInbox();

    const grouped = groupEmails(emails);

    const response = formatInboxResponse(grouped)


    return NextResponse.json({
      success: true,
       ...response,
        emails: emails ?? []
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