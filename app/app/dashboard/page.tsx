import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { getConnection } from "@/db/repositories/integration.repository";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  Mail,
  Calendar,
  RefreshCw,
  Bot,
} from "lucide-react";


export default async function DashboardPage() {


  const session =
    await auth.api.getSession({
      headers: await headers()
    });


  if (!session) {
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


const gmailConnected =
 gmail?.connected ?? false;


const calendarConnected =
 calendar?.connected ?? false;




  return (

<div className="max-w-6xl mx-auto p-6 space-y-8">


{/* Header */}

<div className="flex justify-between items-start">

<div>

<h1 className="text-3xl font-bold">
Welcome back, {session.user.name}
</h1>

<p className="text-muted-foreground mt-2">
Your AI executive assistant is ready.
</p>

</div>


<div className="
rounded-full 
bg-primary/10 
px-4 py-2 
text-sm
font-medium
">

AI Online

</div>


</div>





{/* Integration Cards */}

<div className="grid gap-6 md:grid-cols-2">


<Card className="border">

<CardHeader>

<CardTitle className="flex items-center justify-between">

<span className="flex items-center gap-2">
<Mail className="h-5 w-5"/>
Gmail
</span>


<span className={
gmailConnected
? "text-green-600 text-sm"
: "text-muted-foreground text-sm"
}>

{gmailConnected
? "● Connected"
: "● Not connected"}

</span>


</CardTitle>

</CardHeader>


<CardContent className="space-y-4">


<p className="text-sm text-muted-foreground">

{gmailConnected

? "Your inbox is connected. OneClick can analyze and organize emails."

: "Connect Gmail to enable AI email workflows."}

</p>



{!gmailConnected && (

<Button asChild className="w-full">

<a href="/api/connect/gmail">
Connect Gmail
</a>

</Button>

)}



{gmailConnected && (

<Button asChild>
  <Link href="/app/inbox">
    Open Inbox
  </Link>
</Button>

)}



</CardContent>


</Card>






<Card>


<CardHeader>


<CardTitle className="flex items-center justify-between">


<span className="flex items-center gap-2">

<Calendar className="h-5 w-5"/>

Calendar

</span>



<span className={
calendarConnected
? "text-green-600 text-sm"
: "text-muted-foreground text-sm"
}>


{calendarConnected
? "● Connected"
: "● Not connected"}


</span>


</CardTitle>


</CardHeader>



<CardContent className="space-y-4">


<p className="text-sm text-muted-foreground">


{calendarConnected

? "Calendar access enabled for scheduling workflows."

: "Connect calendar to enable meeting automation."}


</p>



{!calendarConnected && (

<Button asChild className="w-full">

<a href="/api/connect/calendar">
Connect Calendar
</a>

</Button>

)}


{calendarConnected && (

<Button asChild>
  <Link href="/app/calendar">
    Open Calendar
  </Link>
</Button>

)}


</CardContent>


</Card>


</div>





{/* Dashboard Stats */}


<div className="grid gap-4 md:grid-cols-3">


<Card>

<CardHeader>

<CardTitle className="text-sm">
Emails Processed
</CardTitle>

</CardHeader>


<CardContent>

<p className="text-3xl font-bold">
0
</p>

</CardContent>

</Card>





<Card>

<CardHeader>

<CardTitle className="text-sm">
Pending Actions
</CardTitle>

</CardHeader>


<CardContent>

<p className="text-3xl font-bold">
0
</p>

</CardContent>

</Card>





<Card>

<CardHeader>

<CardTitle className="text-sm">
AI Decisions
</CardTitle>

</CardHeader>


<CardContent>

<p className="text-3xl font-bold">
0
</p>

</CardContent>

</Card>


</div>





{/* Inbox */}


<Card>


<CardHeader>

<CardTitle className="flex items-center gap-2">

<RefreshCw className="h-5 w-5"/>

Inbox Sync

</CardTitle>


</CardHeader>



<CardContent className="flex justify-between items-center">


<div>

<p className="font-medium">

Inbox ready

</p>


<p className="text-sm text-muted-foreground">

Sync your Gmail inbox and let AI categorize emails.

</p>

</div>




<Button variant="outline">
<a href="/api/sync/gmail">


Sync Inbox

</a>

</Button>



</CardContent>


</Card>







{/* AI Assistant */}


<Card className="bg-muted/30">


<CardHeader>


<CardTitle className="flex items-center gap-2">

<Bot className="h-5 w-5"/>

OneClick AI Assistant

</CardTitle>


</CardHeader>



<CardContent>


<p className="text-muted-foreground">


{gmailConnected

? "Your assistant can now help prioritize emails, summarize conversations, and prepare actions."

: "Connect integrations to unlock AI workflows."}


</p>


</CardContent>


</Card>



</div>

);
}