"use client";

import Link from "next/link";
import { useState } from "react";

import {
 Card,
 CardContent
} from "@/components/ui/card";

import {
 Button
} from "@/components/ui/button";

import {
 Reply,
 ArrowRight
} from "lucide-react";

import { ReplyModal } from "./reply-modal";
import { ScheduleModal } from "./schedule-modal";


type EmailCardProps = {
 id:string;
 subject:string;
 from:string;
 summary:string;
 category:string;
 priority:string;
 actionRequired:boolean;
};


export function EmailCard({
 id,
 subject,
 from,
 summary,
 priority,
 actionRequired,
}:EmailCardProps){


const [replyOpen,setReplyOpen] =
useState(false);


const [scheduleOpen,setScheduleOpen] =
useState(false);



const email = {
 id,
 subject,
 from,
 summary
};



const priorityStyle =
priority==="high"
?
"bg-red-500/10 text-red-600"

:
priority==="medium"
?
"bg-yellow-500/10 text-yellow-600"

:
"bg-muted text-muted-foreground";




return (

<>

<Card

className="
group
rounded-xl
border
bg-card
transition-all
duration-200
hover:shadow-md
hover:-translate-y-[2px]
"

>


<CardContent
className="
p-3
space-y-2
"
>



<div className="
flex
justify-between
gap-3
">


<div className="min-w-0">


<h3 className="
text-sm
font-medium
truncate
">

{subject}

</h3>



<p className="
text-xs
text-muted-foreground
truncate
">

{from}

</p>


</div>



<div className="
flex
gap-1.5
">

<span
className={`
text-[10px]
px-2
py-0.5
rounded-full
${priorityStyle}
`}
>

{priority}

</span>


{
actionRequired &&
<span
className="
text-[10px]
px-2
py-0.5
rounded-full
bg-blue-500/10
text-blue-600
"
>
Action
</span>
}


</div>


</div>





<div
className="
max-h-0
overflow-hidden
group-hover:max-h-28
transition-all
duration-300
"
>


<p className="
text-xs
text-muted-foreground
line-clamp-2
">

{summary}

</p>




<div className="
flex
gap-2
pt-3
">


<Button

size="sm"

variant="outline"

className="h-7 text-xs"

onClick={()=>setReplyOpen(true)}

>

<Reply className="h-3 w-3 mr-1"/>

Reply

</Button>





<Button

size="sm"

className="h-7 text-xs"

onClick={()=>setScheduleOpen(true)}

>

Schedule

</Button>





<Link href={`/app/inbox/${id}`}>

<Button

size="sm"

variant="ghost"

className="h-7 text-xs"

>

Open

<ArrowRight className="h-3 w-3 ml-1"/>

</Button>


</Link>


</div>


</div>



</CardContent>

</Card>



<ReplyModal

email={email}

open={replyOpen}

onOpenChange={setReplyOpen}

/>



<ScheduleModal

email={email}

open={scheduleOpen}

onOpenChange={setScheduleOpen}

/>



</>

)

}