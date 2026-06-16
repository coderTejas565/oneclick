import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq } from "drizzle-orm";

import { sendReply } from "@/core/email/sendReply";
import { EMAIL_STATUS } from "@/constants/email-status";

export async function POST(req: Request) {
  try {
    const {
      emailId,
      subject,
      body,
    } = await req.json();

    if (!emailId || !subject || !body) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // 1. Fetch email from DB
    const emailResult = await db
      .select()
      .from(emails)
      .where(eq(emails.id, emailId))
      .limit(1);

    const email = emailResult[0];

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing threadId",
        },
        { status: 400 }
      );
    }

    if (email.replied) {
        return NextResponse.json(
            {
                success: false,
                error: "Email already replied",
            },
            { status: 400 }
        );
    }

    // 2. Send reply via Gmail adapter
    const result = await sendReply({
      messageId: email.id,
      threadId: email.threadId!,
      to: email.from,
      subject,
      body,
    });

    // 3. Update DB state
    await db
      .update(emails)
      .set({
        replied: true,
        repliedAt: new Date(),
        status: EMAIL_STATUS.REPLIED
      })
      .where(eq(emails.id, emailId));

    // 4. Return success
    return NextResponse.json({
      success: true,
      message: "Reply sent successfully",
      data: result,
    });
  } catch (error) {
    console.error("Reply API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send reply",
      },
      { status: 500 }
    );
  }
}