"use client"

import { motion } from "framer-motion"

import {
Mail,
Brain,
Zap,
CheckCircle2
} from "lucide-react"



const steps=[

{
title:"Connect Gmail",
text:"Securely link your inbox and let OneClick understand your workflow.",
icon:Mail
},

{
title:"AI analyzes emails",
text:"Messages are processed and important context is discovered.",
icon:Brain
},

{
title:"Actions detected",
text:"Tasks, meetings and replies are automatically identified.",
icon:Zap
},

{
title:"Work completed",
text:"Your inbox turns into completed outcomes.",
icon:CheckCircle2
}

]




export default function Workflow(){


return (

<section

className="
py-32
px-6
relative
"

>


<div className="
max-w-4xl
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
"

>


<p className="
text-xs
uppercase
tracking-[0.3em]

text-muted-foreground

"

>

Process

</p>



<h2 className="
mt-5

text-5xl

font-bold

tracking-tight

"

>

How OneClick works

</h2>



<p className="
mt-5

text-muted-foreground

"

>

From email chaos to completed work.

</p>


</motion.div>









<div className="
relative
mt-20
"

>




{/* timeline */}

<motion.div

initial={{
height:0
}}

whileInView={{
height:"100%"
}}

viewport={{
once:true
}}

transition={{
duration:1.5
}}

className="
absolute

left-6

md:left-1/2

top-0

w-px

bg-border

"

/>







<div className="
space-y-8
"

>


{
steps.map((step,index)=>(


<motion.div

key={step.title}

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
delay:index*.15
}}

className="
relative

grid

md:grid-cols-2

gap-8

"

>







{/* timeline dot */}


<div className="
absolute

left-6

md:left-1/2

-translate-x-1/2

h-3

w-3

rounded-full

bg-foreground

shadow-[0_0_30px_rgba(0,0,0,0.25)]

dark:shadow-[0_0_30px_rgba(255,255,255,0.35)]

"

 />








<div

className={

`
ml-12

md:ml-0

${

index%2===0

?

"md:pr-12 md:text-right"

:

"md:col-start-2 md:pl-12"

}

`

}

>





<motion.div

whileHover={{
y:-8
}}

className="

rounded-3xl

border

border-border

bg-card/50

backdrop-blur-xl

p-7

shadow-sm

hover:shadow-xl

transition

"

>







<div className="
flex
items-center
gap-4

md:justify-start

"

>



<div className="

h-10

w-10


rounded-xl


bg-muted


border


flex

items-center

justify-center

"

>


<step.icon size={20}/>


</div>





<span className="
text-sm

text-muted-foreground

"

>

0{index+1}

</span>




</div>








<h3 className="
mt-6

text-xl

font-semibold

"

>

{step.title}

</h3>





<p className="
mt-3

text-sm

text-muted-foreground

leading-relaxed

"

>

{step.text}

</p>






</motion.div>







</div>








</motion.div>


))

}



</div>





</div>






</div>


</section>


)

}