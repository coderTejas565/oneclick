import { generateOAuthUrl } from "corsair/oauth";
import { corsair } from "@/corsair";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    return NextResponse.redirect(
      new URL("/login", process.env.APP_URL)
    );
  }

  const { url, state } =
    await generateOAuthUrl(
      corsair,
      "googlecalendar",
      {
        tenantId: session.user.id,
        redirectUri:
          `${process.env.APP_URL}/api/oauth/callback`,
      }
    );

  const response =
    NextResponse.redirect(url);

  response.cookies.set(
    "oauth_state",
    state,
    {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 600,
    }
  );

  return response;
}