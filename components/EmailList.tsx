import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Email = {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
};

export default function EmailList({
  emails,
  selectedEmail,
  onSelectEmail,
}: {
  emails: Email[];
  selectedEmail: Email;
  onSelectEmail: (email: Email) => void;
}) {


return (

<div className="
w-[380px]
border-r
bg-background
">



{/* HEADER */}

<div className="
p-4
border-b
">

<h2 className="
font-semibold
text-base
">

Inbox

</h2>


<p className="
text-xs
text-muted-foreground
mt-1
">

{emails.length} emails

</p>


</div>





<ScrollArea
className="
h-[calc(100vh-80px)]
"
>


<div className="
p-3
space-y-3
">



{
emails.map((email)=>{


const isSelected =
selectedEmail?.id === email.id;



return (

<Card

key={email.id}

onClick={()=>onSelectEmail(email)}

className={`
cursor-pointer
p-4
rounded-xl
transition-all
border
shadow-none

hover:bg-muted/40
hover:shadow-sm

${
isSelected

?

"border-primary bg-muted"

:

"border-border bg-card"

}
`}

>



<div className="
space-y-2
">



<div className="
flex
justify-between
gap-3
">


<h3 className="
font-medium
text-sm
line-clamp-1
">

{email.subject}

</h3>



<span className="
text-[10px]
text-muted-foreground
shrink-0
">

now

</span>


</div>





<p className="
text-xs
text-muted-foreground
truncate
">

{email.from}

</p>





<p className="
text-xs
text-muted-foreground
line-clamp-2
leading-relaxed
">

{email.body}

</p>



</div>



</Card>

)


})

}



</div>


</ScrollArea>



</div>

)

}