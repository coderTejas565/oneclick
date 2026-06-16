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
  Calendar,
  Clock,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


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

const router = useRouter();


const [loading,setLoading]=useState(false);
const [creating,setCreating]=useState(false);
const [checking,setChecking]=useState(false);

const [meeting,setMeeting]=useState<any>(null);

const [created,setCreated]=useState(false);

const [error,setError]=useState("");

const [date,setDate]=useState("");
const [startTime,setStartTime]=useState("");
const [endTime,setEndTime]=useState("");

const [slots,setSlots]=useState<any[]>([]);



useEffect(()=>{

 if(!open){

  setMeeting(null);
  setCreated(false);
  setError("");

  setDate("");
  setStartTime("");
  setEndTime("");

  setSlots([]);
 }

},[open]);




async function extractMeeting(){

try{

setLoading(true);
setError("");

const res = await fetch(
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


const data = await res.json();


setMeeting(data.meeting);



if(data.meeting?.date){
 setDate(data.meeting.date);
}

if(data.meeting?.startTime){
 setStartTime(data.meeting.startTime);
}

if(data.meeting?.endTime){
 setEndTime(data.meeting.endTime);
}



}catch(err){

console.error(err);

setError(
"Could not extract meeting details"
);


}
finally{

setLoading(false);

}

}






async function checkAvailability(){

if(!date){

setError("Select date first");

return;

}


try{

setChecking(true);
setError("");

const res = await fetch(
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


const data = await res.json();


setSlots(
data.slots || []
);



}catch(err){

console.error(err);

setError(
"Failed checking availability"
);


}
finally{

setChecking(false);

}

}






async function createEvent(){

if(!meeting)return;


try{

setCreating(true);
setError("");


if(
!date ||
!startTime ||
!endTime
){

setError(
"Please select date and time"
);

return;

}



const start =
new Date(
`${date}T${startTime}`
).toISOString();



const end =
new Date(
`${date}T${endTime}`
).toISOString();



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

},1200);



}catch(err){

console.error(err);

setError(
"Failed to create event"
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

<DialogContent className="max-w-xl">


<DialogHeader>

<DialogTitle className="flex items-center gap-2">

<Calendar className="h-5 w-5"/>

Schedule Meeting

</DialogTitle>

</DialogHeader>



<div className="space-y-5">



<Card>

<CardContent className="p-4">

<p className="font-medium">

{email.subject || "Email"}

</p>


<p className="text-sm text-muted-foreground">

AI extracts meeting details automatically.

</p>


</CardContent>

</Card>





{error && (

<div className="flex gap-2 text-sm text-destructive">

<AlertCircle className="h-4 w-4"/>

{error}

</div>

)}





{created && (

<div className="flex gap-2 text-sm">

<CheckCircle className="h-4 w-4"/>

Added to Google Calendar

</div>

)}







{
!meeting && !created && (

<Button
className="w-full"
onClick={extractMeeting}
disabled={loading}
>

{
loading ?

<>

<Loader2 className="mr-2 h-4 w-4 animate-spin"/>

Analyzing

</>

:

<>

<Sparkles className="mr-2 h-4 w-4"/>

Extract Meeting

</>

}

</Button>

)
}







{
meeting && !created && (


<Card>

<CardContent className="p-4 space-y-5">



<div>

<p className="text-sm text-muted-foreground">

Title

</p>

<p className="font-medium">

{meeting.title || "Meeting"}

</p>

</div>






<div className="space-y-3">


<div>

<label className="text-sm">
Date
</label>

<Input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

</div>





<div className="grid grid-cols-2 gap-3">


<div>

<label className="text-sm">
Start
</label>

<Input
type="time"
value={startTime}
onChange={(e)=>setStartTime(e.target.value)}
/>

</div>



<div>

<label className="text-sm">
End
</label>

<Input
type="time"
value={endTime}
onChange={(e)=>setEndTime(e.target.value)}
/>

</div>


</div>



<Button
variant="outline"
onClick={checkAvailability}
disabled={checking}
>

{
checking
?
"Checking..."
:
"Find Available Slots"
}

</Button>



</div>






{
slots.length>0 && (

<div className="space-y-2">

<p className="text-sm font-medium">
Available slots
</p>


<div className="grid grid-cols-2 gap-2">


{
slots.map((slot)=>(
<Button
key={slot.start}
variant="secondary"
onClick={()=>{

setStartTime(slot.start);
setEndTime(slot.end);

}}
>

{slot.start}
-
{slot.end}

</Button>
))

}


</div>

</div>

)
}







<div className="flex justify-end gap-2">


<Button
variant="outline"
onClick={()=>setMeeting(null)}
>

Re-analyze

</Button>



<Button
onClick={createEvent}
disabled={creating}
>

{
creating ?

<>

<Loader2 className="mr-2 h-4 w-4 animate-spin"/>

Creating

</>

:

"Create Event"

}

</Button>


</div>




</CardContent>

</Card>

)

}





</div>


</DialogContent>

</Dialog>

)

}