import { EmailCard } from "./EmailCard";


type InboxSectionProps = {
 title:string;
 items:any[];
};



export function InboxSection({
 title,
 items
}:InboxSectionProps){


if(!items?.length)
return null;



return (

<section className="
space-y-4
">


<div className="
flex
justify-between
items-center
px-1
">


<h2 className="
text-sm
font-semibold
">

{title}

</h2>



<span className="
text-xs
text-muted-foreground
">

{items.length}

</span>


</div>





<div className="
space-y-3
">


{
items.map(item=>(


<EmailCard

key={item.id}

id={item.id}

subject={item.subject}

from={item.from}

summary={item.summary}

category={item.category}

priority={item.priority}

actionRequired={item.actionRequired}


/>


))

}



</div>


</section>

)

}