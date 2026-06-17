"use client"

import { Card } from "@/components/ui/card"

import {
  X,
  Check,
  ArrowRight,
  Clock,
  Sparkles,
  Zap
} from "lucide-react"

import { motion } from "framer-motion"



export default function Productivity(){


return (

<section

className="
relative
py-28
px-6
overflow-hidden
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

Productivity

</p>



<h2 className="
mt-5
text-5xl
md:text-6xl
font-bold
tracking-tight
"

>

Less inbox.

<br/>

<span className="text-gradient">
More progress.
</span>

</h2>



<p className="
mt-5
text-lg
text-muted-foreground
"

>

OneClick removes repetitive email work and
turns conversations into completed outcomes.

</p>


</motion.div>







<div className="
mt-16
grid
md:grid-cols-[1fr_auto_1fr]
gap-6
items-center
"

>








{/* before */}



<CompareCard>

<h3 className="
text-xl
font-semibold
">

Before OneClick

</h3>


<p className="
mt-2
text-sm
text-muted-foreground
">

Manual inbox management slows everything down.

</p>



<div className="
mt-8
space-y-5
"

>


<Item
icon={<X/>}
text="Hundreds of unread emails"
/>


<Item
icon={<X/>}
text="Searching for important messages"
/>


<Item
icon={<X/>}
text="Repeating the same replies"
/>


<Item
icon={<X/>}
text="Missing deadlines and meetings"
/>



</div>



<div className="
mt-8
rounded-2xl
border
p-4
bg-background/50
"

>


<p className="
text-sm
text-muted-foreground
">

Time lost every day

</p>


<p className="
text-3xl
font-bold
mt-1
">

2+ hrs

</p>


</div>



</CompareCard>










{/* arrow */}



<motion.div

animate={{
x:[-5,5,-5]
}}

transition={{
duration:2,
repeat:Infinity
}}

className="
hidden
md:flex
justify-center
"

>

<ArrowRight/>

</motion.div>










{/* after */}



<CompareCard>


<h3 className="
text-xl
font-semibold
">

With OneClick

</h3>



<p className="
mt-2
text-sm
text-muted-foreground
">

AI handles the busy work automatically.

</p>






<div className="
mt-8
space-y-5
"

>



<Item
icon={<Check/>}
text="AI detects priority tasks"
/>



<Item
icon={<Check/>}
text="Replies created instantly"
/>



<Item
icon={<Check/>}
text="Meetings organized"
/>



<Item
icon={<Check/>}
text="Actions completed faster"
/>



</div>







<div className="
mt-8
grid
grid-cols-2
gap-3
"

>


<MiniStat
icon={<Zap size={15}/>}
value="10x"
text="faster"
/>


<MiniStat
icon={<Clock size={15}/>}
value="24/7"
text="automation"
/>


</div>





</CompareCard>







</div>





</div>

</section>

)

}









function CompareCard({
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
relative
overflow-hidden

p-7

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









function Item({
icon,
text
}:{
icon:React.ReactNode,
text:string
}){


return (

<div className="
flex
items-center
gap-3
"

>


<div className="
h-8
w-8

rounded-full

bg-foreground/10

border

flex
items-center
justify-center
"

>


{icon}


</div>



<span className="
text-sm
text-muted-foreground
"

>

{text}

</span>



</div>

)

}









function MiniStat({
icon,
value,
text
}:{
icon:React.ReactNode,
value:string,
text:string
}){


return (

<div className="
rounded-xl
border
p-3
bg-background/40
"

>

<div className="
flex
items-center
gap-2
text-muted-foreground
"

>

{icon}

<span className="text-xs">
{text}
</span>

</div>


<p className="
mt-2
font-bold
"

>

{value}

</p>


</div>

)

}