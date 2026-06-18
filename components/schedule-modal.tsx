"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import {
 Button
} from "@/components/ui/button";

import {
 Input
} from "@/components/ui/input";

import {
 Card,
 CardContent
} from "@/components/ui/card";


import {
 Calendar,
 Sparkles,
 Loader2,
 CheckCircle,
 Clock,
 AlertCircle
} from "lucide-react";



type Props = {
 email:any;
 open:boolean;
 onOpenChange:(open:boolean)=>void;
};



export function ScheduleModal({
 email,
 open,
 onOpenChange
}:Props){


const router =
useRouter();



const [loading,setLoading]=useState(false);
const [checking,setChecking]=useState(false);
const [creating,setCreating]=useState(false);



const [meeting,setMeeting]=useState<any>(null);

const [slots,setSlots]=useState<any[]>([]);

const [selected,setSelected]=useState<any>(null);


const [date,setDate]=useState("");

const [created,setCreated]=useState(false);

const [error,setError]=useState("");





useEffect(()=>{

if(!open){

setMeeting(null);
setSlots([]);
setSelected(null);
setCreated(false);
setError("");

}

},[open]);







async function extractMeeting(){


try{

setLoading(true);


const res =
await fetch(
"/api/calendar/extract",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
emailId:email.id
})

}

);


const data =
await res.json();


setMeeting(
data.meeting
);


if(data.meeting?.date)
setDate(data.meeting.date);



}catch{

setError(
"Could not analyze email"
);

}

finally{

setLoading(false);

}

}







async function findSlots(){


if(!date){

setError(
"Select date first"
);

return;

}


try{

setChecking(true);


const res =
await fetch(
"/api/calendar/availability",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
date
})

}

);


const data =
await res.json();



setSlots(
data.slots || []
);


}catch{

setError(
"Failed finding slots"
);

}
finally{

setChecking(false);

}

}







async function createEvent(){


if(!selected)
return;


try{

setCreating(true);


const start =
new Date(
`${date}T${selected.start}`
)
.toISOString();



const end =
new Date(
`${date}T${selected.end}`
)
.toISOString();



const res =
await fetch(
"/api/calendar/create",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:
meeting.title ||
"Meeting",

start,

end

})

}

);


if(!res.ok)
throw new Error();



setCreated(true);



setTimeout(()=>{

onOpenChange(false);

router.refresh();

},1000);



}catch{

setError(
"Failed creating event"
);

}
finally{

setCreating(false);

}

}






return (

<Dialog
open={open}
onOpenChange={onOpenChange}
>


<DialogContent
className="
max-w-lg
rounded-2xl
max-h-[85vh]
overflow-hidden
"
>


<DialogHeader>


<DialogTitle
className="
flex
items-center
gap-2
"
>

<Calendar
className="h-5 w-5"
/>


Schedule Meeting


</DialogTitle>


</DialogHeader>




<div
className="
space-y-4
overflow-y-auto
max-h-[65vh]
pr-2
"
>






<Card
className="
bg-muted/40
border-none
"
>

<CardContent
className="
p-4
"
>


<p className="font-medium text-sm">

{email.subject}

</p>


<p className="
text-xs
text-muted-foreground
mt-1
">

AI will find the best time.

</p>


</CardContent>

</Card>








{error && (

<div className="
flex gap-2
text-sm
text-destructive
">

<AlertCircle
className="h-4 w-4"
/>

{error}

</div>

)}





{created ? (

<div
className="
flex
items-center
gap-2
text-sm
text-green-600
py-4
"
>

<CheckCircle
className="h-4 w-4"
/>

Event added to calendar

</div>


) : (

<>


{!meeting && (

<Button

className="w-full"

onClick={extractMeeting}

disabled={loading}

>

{
loading

?

<>

<Loader2
className="
h-4
w-4
mr-2
animate-spin
"
/>

Analyzing

</>


:

<>

<Sparkles
className="
h-4
w-4
mr-2
"
/>

Analyze Email

</>

}

</Button>

)}





{meeting && (

<div className="space-y-4">


<div>

<p className="
font-medium
text-sm
">

{meeting.title}

</p>


<p className="
text-xs
text-muted-foreground
">

{meeting.date}

</p>


</div>





<div className="space-y-2">

<label className="text-sm">
Date
</label>


<Input

type="date"

value={date}

onChange={
(e)=>setDate(e.target.value)
}

/>


</div>





<Button

variant="outline"

className="w-full"

onClick={findSlots}

disabled={checking}

>


{
checking

?

"Finding slots..."

:

"Find Free Slots"

}


</Button>







{slots.length > 0 && (

<div className="space-y-2">


<p className="
text-sm
font-medium
flex
items-center
gap-2
">

<Clock
className="h-4 w-4"
/>

Available slots

</p>





<div className="grid gap-2">


{
slots.slice(0,6).map((slot)=>(


<button

key={slot.start}

onClick={()=>setSelected(slot)}

className={`

rounded-xl
border
p-3
text-left
transition

${
selected?.start === slot.start

?

"border-primary bg-primary/10"

:

"hover:bg-muted"

}

`}

>


{slot.start}
-
{slot.end}


</button>


))

}



</div>

</div>

)}







<Button

className="w-full"

disabled={
!selected ||
creating
}

onClick={createEvent}

>


{
creating

?

"Creating..."

:

"Create Calendar Event"

}


</Button>




</div>

)}



</>

)}




</div>



</DialogContent>

</Dialog>

)

}