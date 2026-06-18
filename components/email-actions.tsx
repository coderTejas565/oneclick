"use client";

import { useState } from "react";

import {
Button
} from "@/components/ui/button";

import {
Reply,
Calendar
} from "lucide-react";

import { ReplyModal } from "./reply-modal";
import { ScheduleModal } from "./schedule-modal";


export function EmailActions({
email
}:{
email:any
}){


const [replyOpen,setReplyOpen] =
useState(false);


const [scheduleOpen,setScheduleOpen] =
useState(false);



return (

<>


<div className="
flex
gap-2
">


<Button
variant="outline"
size="sm"
onClick={()=>setReplyOpen(true)}
>

<Reply
className="h-4 w-4 mr-2"
/>

Reply

</Button>



<Button
size="sm"
onClick={()=>setScheduleOpen(true)}
>

<Calendar
className="h-4 w-4 mr-2"
/>

Schedule

</Button>


</div>





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