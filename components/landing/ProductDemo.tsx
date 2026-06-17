"use client"

import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
Mail,
Sparkles,
Calendar,
CheckCircle2,
Reply,
Clock,
ArrowRight
} from "lucide-react"



export default function ProductDemo(){

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
">


{/* heading */}

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
text-sm
text-muted-foreground
uppercase
tracking-[0.3em]
">

Workflow

</p>



<h2 className="
mt-5
text-4xl
md:text-6xl
font-bold
tracking-tight
">

Your inbox.

<br/>

<span className="text-gradient">

Now executes.

</span>


</h2>



<p className="
mt-5
text-lg
text-muted-foreground
">

OneClick transforms emails into decisions,
actions and completed work.

</p>


</motion.div>







<motion.div

initial={{
opacity:0,
scale:.96
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

transition={{
duration:.7
}}

className="
mt-16

glass

rounded-[40px]

border

p-6
md:p-8

relative

overflow-hidden
"

>


{/* scanner */}


<motion.div

animate={{
x:["-100%","100%"]
}}

transition={{
duration:6,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
top-0
h-px
w-full

bg-gradient-to-r
from-transparent
via-foreground/40
to-transparent
"

/>







<div className="
grid
md:grid-cols-3
gap-5
"

>






{/* email */}


<DemoCard>

<Mail size={22}/>


<h3 className="
mt-5
font-semibold
text-lg
">

Email received

</h3>


<p className="
mt-3
text-sm
text-muted-foreground
">

Customer request detected.
Important context extracted.

</p>


<div className="
mt-5
rounded-xl
border
p-3
text-sm
text-muted-foreground
">

"Can we schedule a meeting tomorrow?"

</div>


</DemoCard>









{/* AI */}



<div className="
flex
flex-col
justify-center
items-center
gap-4
"

>


<motion.div

animate={{
scale:[1,1.15,1]
}}

transition={{
duration:3,
repeat:Infinity
}}

className="
h-20
w-20
rounded-full
border

bg-foreground/10

flex
items-center
justify-center
"

>


<Sparkles/>


</motion.div>



<div className="
text-center
"

>

<p className="
font-semibold
">

AI processing

</p>


<p className="
text-sm
text-muted-foreground
mt-2
">

Understanding intent,
priority and next action.

</p>


</div>



</div>









{/* action */}



<DemoCard>


<CheckCircle2/>


<h3 className="
mt-5
font-semibold
text-lg
">

Work completed

</h3>



<div className="
mt-5
space-y-3
text-sm
text-muted-foreground
">


<div className="
flex
gap-2
items-center
">

<Reply size={16}/>

Reply prepared

</div>



<div className="
flex
gap-2
items-center
">

<Calendar size={16}/>

Calendar updated

</div>



<div className="
flex
gap-2
items-center
">

<Clock size={16}/>

Reminder created

</div>



</div>





<div className="
mt-6
flex
gap-3
">


<Button

size="sm"

className="
rounded-full
bg-foreground
text-background
"

>

Open

<ArrowRight
size={14}
className="ml-2"
/>

</Button>


<Button

size="sm"

variant="outline"

className="
rounded-full
"

>

Edit

</Button>


</div>



</DemoCard>






</div>





{/* bottom stats */}


<div className="
mt-8
grid
grid-cols-3
gap-4
"

>


<Stat
title="98%"
text="Intent accuracy"
/>


<Stat
title="3.2s"
text="Average action time"
/>


<Stat
title="24/7"
text="Inbox monitoring"
/>


</div>





</motion.div>





</div>

</section>

)

}






function DemoCard({
children
}:{
children:React.ReactNode
}){

return (

<motion.div

whileHover={{
y:-8
}}

transition={{
type:"spring",
stiffness:180
}}

>

<Card

className="
p-6

rounded-3xl

bg-card/50

border

backdrop-blur-xl

"

>

{children}

</Card>

</motion.div>

)

}




function Stat({
title,
text
}:{
title:string,
text:string
}){

return (

<div className="
rounded-2xl
border
p-5
bg-card/40
text-center
"

>

<p className="
text-2xl
font-bold
">

{title}

</p>


<p className="
text-sm
text-muted-foreground
mt-1
">

{text}

</p>


</div>

)

}