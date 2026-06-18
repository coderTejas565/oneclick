import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import {
  getSyncState,
} from "@/db/repositories/sync.repository";


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



    const state =
      await getSyncState(
        session.user.id
      );



    return NextResponse.json(
      state
    );


  } catch(error){


    console.error(
      "sync status error",
      error
    );


    return NextResponse.json(
      {
        error:"Failed getting sync status"
      },
      {
        status:500
      }
    );

  }

}