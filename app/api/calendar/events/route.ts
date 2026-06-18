import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { corsair } from "@/corsair";
import { auth } from "@/lib/auth";


export async function GET() {

  try {


    const session =
      await auth.api.getSession({
        headers: await headers()
      });


    if(!session){

      return NextResponse.json(
        {
          error:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const tenant =
      corsair.withTenant(
        session.user.id
      );



    const now =
      new Date();



    const next30Days =
      new Date();


    next30Days.setDate(
      next30Days.getDate()+30
    );



    const events =
      await tenant
      .googlecalendar
      .api
      .events
      .getMany({

        timeMin:
          now.toISOString(),

        timeMax:
          next30Days.toISOString(),

        singleEvents:true,

      });



    return NextResponse.json({

      success:true,

      events

    });



  } catch(error){


    console.error(
      "calendar events error",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:"Failed fetching events"
      },
      {
        status:500
      }
    );

  }

}