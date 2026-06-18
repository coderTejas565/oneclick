import { InboxSection } from "@/components/InboxSection";
import { SyncStatusCard } from "@/components/sync-status-card";
import { ActionDashboard } from "@/components/action-dashboard";
import { ChatBox } from "@/components/chat/chat-box";

import {
 Card,
 CardContent,
} from "@/components/ui/card";

import {
 Mail,
 Clock,
 Sparkles,
 CheckCircle,
} from "lucide-react";


import { headers } from "next/headers";


async function getInbox(){

const res =
await fetch(
`${process.env.APP_URL}/api/inbox`,
{
  cache:"no-store",
  headers:{
    cookie:
      (await headers())
      .get("cookie") ?? ""
  }
}
);


if(!res.ok){
  throw new Error(
    "Failed to fetch inbox"
  );
}


return res.json();

}



export default async function InboxPage(){


const inbox =
await getInbox();



return (

<main className="
max-w-6xl
mx-auto
p-6
space-y-8
">



{/* HEADER */}


<div className="
flex
items-center
justify-between
">


<div>


<h1 className="
text-3xl
font-bold
flex
gap-2
items-center
">

<Sparkles className="h-7 w-7"/>

Command Center

</h1>


<p className="
text-muted-foreground
mt-2
">

Your AI executive assistant for emails.

</p>


</div>



<SyncStatusCard/>


</div>





{/* COMMAND BAR */}


<Card className="border-muted">

<CardContent className="p-3">

<ChatBox/>

</CardContent>

</Card>






{/* STATS */}


<div className="
grid
grid-cols-2
md:grid-cols-4
gap-4
">


<StatCard

icon={<Clock/>}

title="Pending"

value={
inbox.actionRequired.length
}

/>


<StatCard

icon={<CheckCircle/>}

title="Replied"

value={
inbox.replied?.length ?? 0
}

/>



<StatCard

icon={<Mail/>}

title="Newsletters"

value={
inbox.newsletter.length
}

/>



<StatCard

icon={<Sparkles/>}

title="Priority"

value={
inbox.highPriority.length
}

/>



</div>







{/* ACTION CENTER */}


<ActionDashboard

emails={
inbox.actionRequired
}

/>






{/* EMAIL GROUPS */}



<div className="space-y-6">


<InboxSection

title="🔥 High Priority"

items={
inbox.highPriority
}

/>



<InboxSection

title="✅ Replied"

items={
inbox.replied
}

/>




<InboxSection

title="📩 Newsletters"

items={
inbox.newsletter
}

/>




<InboxSection

title="📬 Others"

items={
inbox.others
}

/>


</div>





</main>

)

}





function StatCard({
icon,
title,
value
}:any){


return (

<Card>

<CardContent className="
p-5
flex
items-center
justify-between
">


<div>


<p className="
text-sm
text-muted-foreground
">

{title}

</p>


<p className="
text-3xl
font-bold
">

{value}

</p>


</div>



{icon}


</CardContent>


</Card>

)

}