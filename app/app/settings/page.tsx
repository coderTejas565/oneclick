import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { ProfileCard } from "@/components/settings/profile-card";
import { IntegrationsCard } from "@/components/settings/integrations-card";
import { AIPreferences } from "@/components/settings/ai-preferences";
import { DangerZone } from "@/components/settings/danger-zone";

import { getConnection } from "@/db/repositories/integration.repository";



export default async function SettingsPage() {


const session =
await auth.api.getSession({
  headers: await headers()
});


if(!session){
  redirect("/login");
}



const gmail =
await getConnection(
 session.user.id,
 "gmail"
);



const calendar =
await getConnection(
 session.user.id,
 "googlecalendar"
);



return (

<div className="
max-w-5xl
mx-auto
p-6
space-y-8
">



{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
">

Settings

</h1>


<p className="
text-muted-foreground
mt-2
">

Manage your OneClick account and preferences.

</p>

</div>






{/* Profile */}

<ProfileCard

name={session.user.name}

email={session.user.email}

/>






{/* Integrations */}

<IntegrationsCard

gmailConnected={
 gmail?.connected ?? false
}

calendarConnected={
 calendar?.connected ?? false
}

/>






{/* AI */}

<AIPreferences />







{/* Danger */}

<DangerZone />





</div>

);

}