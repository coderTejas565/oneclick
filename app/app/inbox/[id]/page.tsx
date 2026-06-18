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
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";

import Link from "next/link";

import { EmailActions } from "@/components/email-actions";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
  getEmailById
} from "@/db/repositories/email.repository";



async function getEmail(
  userId:string,
  id:string
){

  const email =
    await getEmailById(
      userId,
      id
    );


  if(!email){
    throw new Error("Email not found");
  }


  return email;

}




function priorityStyle(
priority:string
){

switch(
priority.toLowerCase()
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


const session =
await auth.api.getSession({
 headers: await headers()
});


if(!session){
 redirect("/login");
}



const {id}=await params;



const email =
await getEmail(
 session.user.id,
 id
);




return (

<main className="
max-w-5xl
mx-auto
p-6
space-y-6
">



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
">

{email.subject ?? "No Subject"}

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
${priorityStyle(email.priority ?? "low")}
`}
>

{email.priority ?? "low"}

</span>





<Badge variant="outline">

{email.category ?? "Other"}

</Badge>





{
email.actionRequired && (

<Badge variant="destructive">

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

<Clock className="h-4"/>

Email Content

</div>




<Separator className="mb-5"/>





<div
className="
whitespace-pre-wrap
text-sm
leading-7
"
>

{email.body ?? "No content available"}

</div>


</CardContent>


</Card>







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

<Sparkles className="h-4"/>

AI Summary

</div>





<p className="
text-sm
text-muted-foreground
leading-6
">

{email.summary ?? "No AI summary generated"}

</p>





<Separator />





<p className="
text-xs
text-muted-foreground
">

Suggested next step

</p>



<EmailActions
email={email}
/>





</CardContent>


</Card>





</div>





</main>

)

}