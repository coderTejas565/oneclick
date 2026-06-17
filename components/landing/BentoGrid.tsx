"use client"

import { Card } from "@/components/ui/card"

import {
Inbox,
Calendar,
Sparkles,
Zap,
Mail,
Clock,
CheckCircle2
} from "lucide-react"

import { motion } from "framer-motion"



const items=[

{
title:"Smart Inbox",
text:"AI organizes your emails by importance, urgency and intent so you always know what needs attention.",
icon:Inbox,
info:"Priority detection • Auto sorting",
className:"md:col-span-2"
},


{
title:"AI Replies",
text:"Generate replies that understand your conversation history and writing style.",
icon:Sparkles,
info:"Context aware responses",
className:""
},


{
title:"Calendar Actions",
text:"Turn scheduling emails into meetings without leaving your inbox.",
icon:Calendar,
info:"Automatic event creation",
className:""
},


{
title:"Action Center",
text:"Track every pending request, follow-up and important task from one workspace.",
icon:Zap,
info:"Tasks • Follow ups • Reminders",
className:"md:col-span-2"
}


]





export default function BentoGrid(){


return (

<section

className="
py-28
px-6
relative
"

>

<div className="
max-w-6xl
mx-auto
"

>





<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
text-center
max-w-3xl
mx-auto
"

>


<p className="
text-xs
uppercase
tracking-[0.3em]
text-muted-foreground
"

>

Capabilities

</p>



<h2 className="
mt-5
text-5xl
md:text-6xl
font-bold
tracking-tight
"

>

Everything your inbox needs.

</h2>



<p className="
mt-5
text-lg
text-muted-foreground
"

>

A complete AI workspace that turns communication into completed work.

</p>


</motion.div>









<div className="
mt-14

grid

md:grid-cols-3

gap-5

"

>


{

items.map((item,index)=>(


<motion.div

key={item.title}

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*.1
}}

whileHover={{
y:-8
}}

className={item.className}

>


<Card

className="
relative
overflow-hidden

min-h-[230px]

p-7

rounded-3xl

bg-card/50

border

backdrop-blur-xl

transition

hover:shadow-xl

"

>





<motion.div

animate={{
x:["-120%","120%"]
}}

transition={{
duration:6,
repeat:Infinity,
ease:"linear",
delay:index
}}

className="
absolute
top-0
left-0

h-px
w-full

bg-gradient-to-r

from-transparent

via-foreground/30

to-transparent

"

/>







<div className="
relative
"

>



<div className="
flex
items-center
justify-between
"

>


<div className="
h-12
w-12

rounded-2xl

bg-foreground/10

border

flex
items-center
justify-center

"

>


<item.icon size={22}/>


</div>



<div className="
h-8
w-8
rounded-full
border
flex
items-center
justify-center
"

>

<CheckCircle2 size={15}/>

</div>



</div>








<h3 className="
mt-7

text-xl

font-semibold

tracking-tight

"

>

{item.title}

</h3>






<p className="
mt-3

text-sm

leading-relaxed

text-muted-foreground

"

>

{item.text}

</p>






<div className="
mt-6

flex
items-center
gap-2

text-xs

text-muted-foreground

"

>


<Mail size={13}/>

{item.info}


</div>







<div className="
mt-6

flex
items-center
gap-2

text-xs

text-muted-foreground

"

>


<Clock size={13}/>

Runs automatically in background


</div>





</div>





</Card>



</motion.div>


))

}



</div>






</div>


</section>


)

}