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



async function getInbox(){

const res =
await fetch(
"http://localhost:3000/api/inbox",
{
cache:"no-store"
}
);


if(!res.ok)
throw new Error();


return res.json();

}




export default async function InboxPage(){


const inbox =
await getInbox();



return (

<main className="
max-w-6xl
mx-auto
p-5
space-y-5
">



{/* TOP BAR */}

<div className="
flex
gap-3
items-center
">


{/* SMALL COMMAND */}

<Card className="
flex-1
">

<CardContent className="
p-2
">

<ChatBox/>

</CardContent>

</Card>




{/* SYNC */}

<div className="
shrink-0
">

<SyncStatusCard/>

</div>



</div>






{/* SMALL STATS */}


<div className="
grid
grid-cols-2
md:grid-cols-4
gap-3
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

title="News"

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






<div className="
space-y-4
">


<InboxSection

title="🔥 Priority"

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

title="📩 News"

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
p-3
flex
items-center
justify-between
">


<div>


<p className="
text-xs
text-muted-foreground
">

{title}

</p>



<p className="
text-xl
font-semibold
">

{value}

</p>


</div>


<div className="
h-4
w-4
">

{icon}

</div>



</CardContent>

</Card>

)

}