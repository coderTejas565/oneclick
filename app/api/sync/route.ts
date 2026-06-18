import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { syncInbox } from "@/core/sync/syncInbox";


export async function POST() {

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



    const result =
      await syncInbox(
        session.user.id
      );



    return NextResponse.json(
      result
    );


  } catch(error){


    console.error(
      "sync inbox error",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:"Sync failed"
      },
      {
        status:500
      }
    );

  }

}