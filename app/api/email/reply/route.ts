import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq } from "drizzle-orm";

import { sendReply } from "@/core/email/sendReply";
import { EMAIL_STATUS } from "@/constants/email-status";
import { auth } from "@/lib/auth";


export async function POST(req: Request) {
  try {

    const session =
      await auth.api.getSession({
        headers: await headers(),
      });


    if (!session) {
      return NextResponse.json(
        {
          success:false,
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );
    }


    const userId =
      session.user.id;



    const {
      emailId,
      subject,
      body,
    } = await req.json();



    if (!emailId || !subject || !body) {
      return NextResponse.json(
        {
          success:false,
          error:"Missing required fields",
        },
        {
          status:400,
        }
      );
    }



    // user scoped query
    const emailResult =
      await db
      .select()
      .from(emails)
      .where(
        eq(emails.id,emailId)
      )
      .limit(1);



    const email =
      emailResult[0];



    if(!email){

      return NextResponse.json(
        {
          success:false,
          error:"Email not found",
        },
        {
          status:404
        }
      );

    }



    if(email.userId !== userId){

      return NextResponse.json(
        {
          success:false,
          error:"Forbidden",
        },
        {
          status:403
        }
      );

    }



    if(email.replied){

      return NextResponse.json(
        {
          success:false,
          error:"Email already replied",
        },
        {
          status:400
        }
      );

    }



const result =
  await sendReply(
    userId,
    {
      messageId:
        email.id,

      threadId:
        email.threadId ?? "",

      to:
        email.to,

      subject,

      body,
    }
  );





    await db
      .update(emails)
      .set({

        replied:true,

        repliedAt:
          new Date(),

        status:
          EMAIL_STATUS.REPLIED,

      })
      .where(
        eq(
          emails.id,
          emailId
        )
      );





    return NextResponse.json({

      success:true,

      message:
        "Reply sent successfully",

      data:
        result,

    });



  } catch(error){

    console.error(
      "Reply API Error:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:"Failed to send reply",
      },
      {
        status:500
      }
    );

  }
}