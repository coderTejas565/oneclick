"use client";

import Link from "next/link";
import { useState } from "react";

import {
 Card,
 CardContent,
} from "@/components/ui/card";

import {
 Badge
} from "@/components/ui/badge";

import {
 Button
} from "@/components/ui/button";


import {
 ReplyModal
} from "./reply-modal";

import {
 ScheduleModal
} from "./schedule-modal";


type Email = {

id:string;

subject:string|null;

summary:string|null;

priority:string|null;

from?:string|null;

body?:string|null;

};



function getPriorityColor(
priority:string|null
){

switch(priority?.toLowerCase()){

case "high":
return "destructive";


case "medium":
return "secondary";


default:
return "outline";

}

}





export function ActionDashboard({
emails
}:{
emails:Email[];
}){


const [
selectedEmail,
setSelectedEmail
]=useState<any>(null);



const [
replyOpen,
setReplyOpen
]=useState(false);



const [
scheduleOpen,
setScheduleOpen
]=useState(false);



const [
openingId,
setOpeningId
]=useState<string|null>(null);





function handleReply(
email:Email
){

setOpeningId(email.id);


setTimeout(()=>{

setSelectedEmail(email);

setReplyOpen(true);

setOpeningId(null);


},150);

}





function handleSchedule(
email:Email
){

setSelectedEmail(email);

setScheduleOpen(true);

}





return (

<>


<Card className="
border-muted
">


<CardContent className="
p-4
space-y-3
">


<div className="
flex
items-center
justify-between
">


<p className="
font-medium
text-sm
">

Action Required

</p>



<Badge variant="outline">

{emails.length}

</Badge>



</div>





{
emails.length===0 ?


<div className="
text-center
py-6
text-sm
text-muted-foreground
">

No pending actions

</div>


:


<div className="
space-y-2
">


{
emails.map(email=>(



<div
key={email.id}
className="
rounded-xl
border
p-3
hover:bg-muted/40
transition
"
>




<div className="
flex
justify-between
gap-3
">


<div
className="
min-w-0
"
>


<p className="
font-medium
text-sm
truncate
">

{
email.subject ??
"No Subject"
}

</p>



<p className="
text-xs
text-muted-foreground
mt-1
line-clamp-1
">

{
email.summary
}

</p>


</div>




<Badge

variant={
getPriorityColor(
email.priority
) as any
}

className="
h-fit
text-xs
"

>

{
email.priority ??
"low"
}

</Badge>




</div>







<div className="
flex
gap-2
mt-3
">


<Button

size="sm"

onClick={()=>
handleReply(email)
}

disabled={
openingId===email.id
}

>

{
openingId===email.id
?
"..."
:
"Reply"
}

</Button>





<Button

size="sm"

variant="outline"

onClick={()=>
handleSchedule(email)
}

>

Schedule

</Button>




<Link href={`/app/inbox/${email.id}`}>

<Button

size="sm"

variant="ghost"

>

Open

</Button>

</Link>



</div>





</div>



))

}



</div>


}



</CardContent>


</Card>








{
selectedEmail && (

<ReplyModal

email={selectedEmail}

open={replyOpen}

onOpenChange={(val)=>{

setReplyOpen(val);

if(!val)
setSelectedEmail(null);

}}

/>

)

}





{
selectedEmail && (

<ScheduleModal

email={selectedEmail}

open={scheduleOpen}

onOpenChange={(val)=>{

setScheduleOpen(val);

if(!val)
setSelectedEmail(null);

}}

/>

)

}



</>

)

}