

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
  Separator
} from "@/components/ui/separator";

import {
  Reply,
  Calendar,
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";

import Link from "next/link";
import { EmailActions } from "@/components/email-actions";


async function getEmail(id:string){

const res =
await fetch(
`http://localhost:3000/api/email/${id}`,
{
cache:"no-store",
}
);


if(!res.ok)
throw new Error();


return res.json();

}




function priorityStyle(
priority:string
){

switch(
priority?.toLowerCase()
){

case "high":

return "bg-red-500/10 text-red-600";


case "medium":

return "bg-yellow-500/10 text-yellow-600";


default:

return "bg-muted text-muted-foreground";

}

}





export default async function EmailPage({
params,
}:{
params:Promise<{id:string}>
}){


const {id}=await params;


const data =
await getEmail(id);


const email =
data.email;



return (

<main className="
max-w-5xl
mx-auto
p-6
space-y-6
">





{/* TOP BAR */}


<div className="
flex
items-center
justify-between
">


<Link href="/app/inbox">

<Button
variant="ghost"
size="sm"
>

<ArrowLeft
className="h-4 w-4 mr-2"
/>

Inbox

</Button>

</Link>




<EmailActions
email={email}
/>


</div>








{/* EMAIL HEADER */}



<Card>

<CardContent
className="
p-6
space-y-4
"
>


<div>


<h1 className="
text-2xl
font-semibold
leading-tight
">

{email.subject}

</h1>



<p className="
text-sm
text-muted-foreground
mt-2
">

{email.from}

</p>


</div>





<div className="
flex
gap-2
flex-wrap
">


<span
className={`
text-xs
px-3
py-1
rounded-full
${priorityStyle(email.priority)}
`}
>

{email.priority}

</span>



<Badge
variant="outline"
>

{email.category}

</Badge>




{
email.actionRequired && (

<Badge
variant="destructive"
>

Action Required

</Badge>

)

}



</div>



</CardContent>

</Card>









<div className="
grid
md:grid-cols-3
gap-6
">





{/* EMAIL BODY */}



<Card
className="
md:col-span-2
"
>


<CardContent
className="
p-6
"
>


<div className="
flex
items-center
gap-2
mb-4
font-medium
">

<Clock
className="h-4"
/>

Email Content

</div>



<Separator
className="mb-5"
/>



<div
className="
whitespace-pre-wrap
text-sm
leading-7
"
>

{email.body}

</div>



</CardContent>


</Card>









{/* AI PANEL */}



<Card>

<CardContent
className="
p-5
space-y-5
"
>



<div className="
flex
items-center
gap-2
font-medium
">

<Sparkles
className="h-4"
/>

AI Summary

</div>




<p className="
text-sm
text-muted-foreground
leading-6
">

{email.summary}

</p>





<Separator />





<div className="
space-y-2
">


<p className="
text-xs
text-muted-foreground
">

Suggested next step

</p>



<EmailActions
email={email}
/>


</div>





</CardContent>

</Card>






</div>







</main>

)

}