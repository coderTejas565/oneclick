"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"


export default function FeatureCard({
title,
children,
icon: Icon,
className="",
points=[]
}:any){


return (

<motion.div

whileHover={{
y:-6
}}

transition={{
type:"spring",
stiffness:200
}}

className={className}

>


<Card

className="
relative
overflow-hidden

p-7

rounded-3xl

glass

group

"

>


{/* moving shine */}

<motion.div

animate={{
x:["-100%","100%"]
}}

transition={{
duration:7,
repeat:Infinity,
ease:"linear"
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
">


<div className="
flex
items-start
justify-between
"


>


<div className="
h-11
w-11

rounded-xl

bg-foreground/10

border

flex
items-center
justify-center

">


<Icon size={21}/>


</div>



<span className="
text-xs

text-muted-foreground

border

rounded-full

px-3
py-1

">

AI

</span>



</div>







<h3 className="
mt-6

text-xl

font-semibold

">

{title}

</h3>




<p className="
mt-3

text-sm

leading-relaxed

text-muted-foreground

">

{children}

</p>







<div className="
mt-5

grid

gap-2

"

>

{

points.map((p:string)=>(

<div

key={p}

className="
flex
items-center
gap-2

text-xs

text-muted-foreground

"

>

<div className="
h-1.5
w-1.5
rounded-full

bg-foreground

"/>

{p}

</div>

))

}


</div>





</div>



</Card>


</motion.div>


)

}