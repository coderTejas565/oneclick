import { processOAuthCallback } from "corsair/oauth";
import { corsair } from "@/corsair";
import { NextRequest, NextResponse } from "next/server";

import {
  markConnected
} from "@/db/repositories/integration.repository";


export async function GET(
 request: NextRequest
) {

  const code =
    request.nextUrl.searchParams.get("code");

  const state =
    request.nextUrl.searchParams.get("state");


  const storedState =
    request.cookies.get("oauth_state")
      ?.value;


  if (
    !code ||
    !state ||
    state !== storedState
  ) {
    return NextResponse.json(
      {
        error:"Invalid state"
      },
      {
        status:400
      }
    );
  }


  try {

    const result =
      await processOAuthCallback(
        corsair,
        {
          code,
          state,
          redirectUri:
            `${process.env.APP_URL}/api/oauth/callback`,
        }
      );


    /**
     * IMPORTANT
     * result has tenantId from Corsair state
     */

    await markConnected(
      result.tenantId,
      result.plugin
    );



    const response =
      NextResponse.redirect(
        new URL(
          `/app/dashboard?connected=${result.plugin}`,
          request.url
        )
      );


    response.cookies.delete(
      "oauth_state"
    );


    return response;


  } catch(error){

    console.error(
    "OAUTH CALLBACK ERROR:",
    error
  );

  return NextResponse.json(
    {
      error: "oauth_failed",
      details:
        error instanceof Error
          ? error.message
          : String(error)
    },
    {
      status:500
    }
  );
  }
}