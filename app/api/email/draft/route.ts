import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq } from "drizzle-orm";

import { generateReply } from "@/core/ai/generateReply";

export async function POST(req: Request) {
  const { emailId } = await req.json();

  const email = await db
    .select()
    .from(emails)
    .where(eq(emails.id, emailId))
    .limit(1);

  if (!email[0]) {
    return NextResponse.json(
      { error: "Email not found" },
      { status: 404 }
    );
  }

  const draft = await generateReply(email[0]);
  console.log("DRAFT:", draft);

  return NextResponse.json({
    success: true,
    draft: {
      subject: `Re: ${email[0].subject}`,
      body: draft,
    },
  });
}