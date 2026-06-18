import { NextResponse } from "next/server";
import { getAllEmails } from "@/db/repositories/email.repository";
import { groupEmails } from "@/core/inbox/groupEmails";
import { formatInboxResponse } from "@/core/inbox/formatInboxResponse";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function GET() {

  try {

    const session =
      await auth.api.getSession({
        headers: await headers()
      });


    if(!session){
      return NextResponse.json(
        {
          success:false,
          error:"Unauthorized"
        },
        {
          status:401
        }
      );
    }


    const userId =
      session.user.id;



    const emails =
      await getAllEmails(
        userId
      );


    console.log(
      "DB emails:",
      emails.length
    );


    const grouped =
      groupEmails(emails);


    const response =
      formatInboxResponse(grouped);


    return NextResponse.json({
      success:true,
      ...response,
    });


  } catch(error){

    console.error(
      "Inbox error",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:String(error),
      },
      {
        status:500
      }
    );

  }
}