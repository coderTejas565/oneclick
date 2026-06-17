"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Input
} from "@/components/ui/input";

import {
  Button
} from "@/components/ui/button";

import {
Card,
CardContent
}
from "@/components/ui/card";


import {
Mail,
Calendar,
ExternalLink
}
from "lucide-react";


import {
  Loader2,
  Send,
  Bot,
  User,
  Sparkles,
} from "lucide-react";



type Message = {
  role:"user" | "assistant";
  content:string;

  data?:{

    output?:string;

    action?:{
      type:
      | "email"
      | "calendar";

      data:any;
    };

  };
};



export function ChatBox(){


const [message,setMessage] =
useState("");


const [loading,setLoading] =
useState(false);



const [status,setStatus] =
useState("");



const [messages,setMessages] =
useState<Message[]>([]);



const [history,setHistory] =
useState<string[]>([]);



const inputRef =
useRef<HTMLInputElement>(null);


const messagesEndRef =
useRef<HTMLDivElement>(null);





useEffect(()=>{

inputRef.current?.focus();

},[]);





// auto scroll

useEffect(()=>{

messagesEndRef.current?.scrollIntoView({
 behavior:"smooth"
});

},[messages,status]);





// cmd + k shortcut

useEffect(()=>{


function handler(e:KeyboardEvent){


if(
(e.metaKey || e.ctrlKey)
&&
e.key.toLowerCase()==="k"
){

e.preventDefault();

inputRef.current?.focus();

}


}


window.addEventListener(
"keydown",
handler
);



return ()=>{

window.removeEventListener(
"keydown",
handler
);

};


},[]);






async function handleSend(){


if(
!message.trim()
||
loading
)
return;



const text =
message;



setMessages(prev=>[

...prev,

{
role:"user",
content:text
}

]);



setHistory(prev=>[
text,
...prev.slice(0,4)
]);



setMessage("");

setLoading(true);

setStatus("Thinking...");





setMessages(prev=>[
...prev,
{
role:"assistant",
content:""
}
]);



try{


const res =
await fetch(
"/api/chat",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
message:text
})

}
);





const reader =
res.body?.getReader();


if(!reader)
throw new Error();



const decoder =
new TextDecoder();





while(true){


const {
done,
value
}
=
await reader.read();



if(done)
break;



const chunk =
decoder.decode(value);



const events =
chunk
.split("\n")
.filter(Boolean);




for(
const item of events
){


const data =
JSON.parse(item);





if(
data.type==="status"
){


const event =
data.event;



const statusMap:any = {


searching_emails:
"Searching emails...",


generating_reply:
"Generating reply...",


creating_calendar:
"Creating calendar...",


thinking:
"Thinking...",


completed:
"Done"

};



setStatus(
statusMap[event] ??
event
);


}








if(
data.type==="result"
){


setMessages(prev=>{


const copy =
[...prev];



copy[
copy.length-1
]
.content =
data.data.output;



copy[
copy.length-1
]
.data =
data.data;



return copy;


});


}



}


}



}catch(error){


console.error(error);



setMessages(prev=>{

const copy=[...prev];


copy[
copy.length-1
]=
{

role:"assistant",

content:
"Something went wrong."

};


return copy;

});



}
finally{


setLoading(false);

setStatus("");

}


}









const suggestions=[

"Reply to recruiter email",

"Find interview email",

"Schedule meeting",

"Summarize latest email"

];






function ResultCard({
 data
}:any){


if(!data?.action)
return null;




if(
data.action.type==="email"
){


const email =
data.action.data;



return (

<Card className="mt-3">


<CardContent className="p-4 space-y-3">



<div className="flex gap-2 items-center">

<Mail className="h-4 w-4"/>

<p className="font-medium">
Email Found
</p>

</div>




<p className="font-medium">

{email.subject}

</p>



<p className="text-sm text-muted-foreground">

{email.from}

</p>




<div className="flex gap-2">


<Button size="sm">
Reply
</Button>


<Button
variant="outline"
size="sm"
>
Open
</Button>


<Button
variant="outline"
size="sm"
>
Archive
</Button>



</div>


</CardContent>

</Card>


)

}






if(
data.action.type==="calendar"
){


const calendar =
data.action.data;



return (

<Card className="mt-3">


<CardContent className="p-4 space-y-3">


<div className="flex gap-2 items-center">


<Calendar className="h-4 w-4"/>


<p className="font-medium">
Calendar Created
</p>


</div>



<p>
{calendar.title}
</p>



<p className="text-sm text-muted-foreground">

{calendar.time}

</p>





<div className="flex gap-2">


<Button size="sm">

Change time

</Button>



<Button
variant="outline"
size="sm"
>

Open Calendar

</Button>



<Button
variant="outline"
size="sm"
>

Cancel

</Button>



</div>



</CardContent>

</Card>

)

}


return null;


}









return (

<div className="
max-w-2xl
mx-auto
mb-8
">





<div className="
space-y-3
mb-4
max-h-[300px]
overflow-y-auto
">





{
messages.map((msg,i)=>(


<div

key={i}

className={
msg.role==="user"
?
"flex justify-end"
:
"flex justify-start"
}


>


<div

className={
msg.role==="user"

?
"bg-primary text-primary-foreground px-4 py-2 rounded-2xl max-w-[80%]"

:

"bg-muted px-4 py-2 rounded-2xl max-w-[80%]"
}

>



{/* FIXED LAYOUT */}

<div className="
flex
flex-col
gap-3
">



<div className="
flex
gap-2
items-start
">



{

msg.role==="user"

?

<User className="h-4 w-4 mt-1"/>

:

<Bot className="h-4 w-4 mt-1"/>

}



<p className="
text-sm
whitespace-pre-wrap
">

{msg.content}

</p>



</div>



<ResultCard
data={msg.data}
/>



</div>



</div>


</div>


))

}





<div ref={messagesEndRef}/>





{
loading && (

<div className="
flex
items-center
gap-2
text-sm
text-muted-foreground
">


<Loader2
className="
h-4 w-4
animate-spin
"
/>


{status}


</div>

)

}



</div>







{
messages.length===0 && (

<div className="
space-y-3
mb-4
">


<div className="
flex
flex-wrap
gap-2
">


{
suggestions.map(item=>(


<Button


key={item}

variant="outline"

size="sm"

className="rounded-full"



onClick={()=>{

setMessage(item);

inputRef.current?.focus();

}}


>


<Sparkles
className="h-3 w-3 mr-2"
/>


{item}


</Button>


))

}


</div>





{
history.length>0 && (

<div className="
text-xs
text-muted-foreground
">

Recent:

{
history.map((h,i)=>(

<span
key={i}
className="ml-2"
>

{h}

</span>

))
}

</div>

)

}



</div>

)

}







<div className="relative">


<Input


ref={inputRef}


value={message}


onChange={(e)=>
setMessage(e.target.value)
}



onKeyDown={(e)=>{

if(e.key==="Enter")
handleSend();

}}



placeholder="Ask OneClick..."

className="
h-14
rounded-2xl
pr-14
"

/>




<Button

size="icon"

className="
absolute
right-2
top-2
"


onClick={handleSend}


disabled={loading}


>


{

loading

?

<Loader2
className="h-4 w-4 animate-spin"
/>

:

<Send
className="h-4 w-4"
/>

}


</Button>



</div>



</div>


)

}