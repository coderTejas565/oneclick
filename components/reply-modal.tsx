"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import {
 Textarea
} from "@/components/ui/textarea";

import {
 Input
} from "@/components/ui/input";

import {
 Button
} from "@/components/ui/button";


import {
 Sparkles,
 Send,
 Loader2,
 Mail
} from "lucide-react";



type Props = {
 email:any;
 open:boolean;
 onOpenChange:(open:boolean)=>void;
};



export function ReplyModal({
 email,
 open,
 onOpenChange,
}:Props){


const router =
useRouter();



const [subject,setSubject] =
useState("");


const [body,setBody] =
useState("");


const [loading,setLoading] =
useState(false);


const [streaming,setStreaming] =
useState(false);




async function generateAIReply(){


setStreaming(true);

setSubject("");

setBody("");



try{


const res =
await fetch(
"/api/email/draft",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
emailId:email.id
})

}

);



const data =
await res.json();



if(!data.success)
throw new Error();



setSubject(
data.draft.subject
);


setBody(
data.draft.body
);



}catch(err){

console.error(err);

alert(
"Failed to generate reply"
);

}
finally{

setStreaming(false);

}

}






async function handleSend(){


setLoading(true);


try{


const res =
await fetch(
"/api/email/reply",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

emailId:email.id,

subject,

body

})

}

);



if(!res.ok)
throw new Error();



onOpenChange(false);

router.refresh();



}catch(err){

console.error(err);

alert(
"Failed to send"
);


}
finally{

setLoading(false);

}

}




return (


<Dialog
open={open}
onOpenChange={onOpenChange}
>


<DialogContent
className="
max-w-xl
rounded-2xl
p-6
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

<Mail
className="
h-5
w-5
"
/>


Reply Email


</DialogTitle>


</DialogHeader>





{/* CONTEXT */}


<div
className="
rounded-xl
bg-muted/50
p-3
text-sm
space-y-1
"
>


<p className="font-medium truncate">

{email.subject}

</p>



<p className="
text-xs
text-muted-foreground
">

To: {email.from}

</p>


</div>








{/* AI ACTION */}


<Button


onClick={generateAIReply}


disabled={
streaming ||
loading
}


className="
w-full
"


>


{

streaming

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

Generating...

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

Generate AI Reply

</>

}


</Button>







{/* COMPOSER */}


<div
className="
space-y-3
pt-2
"
>


<Input


placeholder="Subject"

value={subject}

onChange={(e)=>
setSubject(e.target.value)
}


/>





<Textarea


placeholder="Write your reply..."

value={body}

onChange={(e)=>
setBody(e.target.value)
}


className="
min-h-[220px]
resize-none
rounded-xl
"


/>



</div>








{/* FOOTER */}


<div
className="
flex
justify-between
items-center
pt-3
"
>


<Button

variant="ghost"

onClick={()=>
onOpenChange(false)
}

>

Cancel

</Button>




<Button

onClick={handleSend}

disabled={
loading ||
streaming ||
!body.trim()
}

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

Sending

</>


:

<>

<Send
className="
h-4
w-4
mr-2
"
/>

Send Reply

</>

}



</Button>



</div>




</DialogContent>


</Dialog>


)

}