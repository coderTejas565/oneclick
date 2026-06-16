import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { emails } from "@/db/email-schema";

import { eq } from "drizzle-orm";

import { extractMeeting } from "@/core/calendar/extractMeeting";
import { json } from "stream/consumers";


export async function POST(req: Request) {

  try {

    const rawBody = await req.text()

    console.log("EXTRACT BODY:", rawBody);

        const {
      emailId
    } = JSON.parse(rawBody);
    

    // const body = await req.json();

    // const {
    //   emailId
    // } = body;


    if(!emailId){

      return NextResponse.json(
        {
          success:false,
          error:"emailId is required"
        },
        {
          status:400
        }
      );

    }



    const result = await db
      .select()
      .from(emails)
      .where(
        eq(
          emails.id,
          emailId
        )
      )
      .limit(1);



    const email = result[0];


    if(!email){

      return NextResponse.json(
        {
          success:false,
          error:"Email not found"
        },
        {
          status:404
        }
      );

    }



    const meeting =
      await extractMeeting(email);

      console.log(
 "EXTRACTED MEETING:",
 meeting
);

    return NextResponse.json(
      {
        success:true,
        meeting,
      }
    );



  } catch(error){


    console.error(
      "CALENDAR EXTRACT ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:"Failed to extract meeting",
      },
      {
        status:500
      }
    );

  }

}