"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

import {
ArrowRight,
Sparkles,
CheckCircle2
} from "lucide-react"

import Link from "next/link"



export default function Footer(){

return (

<footer

className="
relative
overflow-hidden
py-32
px-6
"

>





{/* background grid */}

<motion.div

animate={{
x:["-20%","20%","-20%"]
}}

transition={{
duration:18,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
inset-0
opacity-[0.05]

bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)]

bg-[size:80px_80px]

"

/>







{/* soft light */}

<div

className="
absolute
top-0
left-1/2
-translate-x-1/2

w-[600px]
h-[600px]

rounded-full

bg-foreground/5

blur-[160px]

"

/>







<div className="
relative
max-w-5xl
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
glass

rounded-[40px]

p-8
md:p-16

text-center

relative

overflow-hidden

"

>





{/* top scanning line */}


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
left-0

h-px
w-full

bg-gradient-to-r

from-transparent
via-foreground/40
to-transparent

"

/>









<div className="
inline-flex
items-center
gap-2

rounded-full

border

px-5
py-2

text-sm

text-muted-foreground

"

>


<Sparkles size={15}/>

AI productivity layer


</div>









<h2

className="
mt-8

text-5xl
md:text-7xl

font-bold

tracking-[-0.08em]

leading-[0.9]

"

>


Your inbox.


<br/>


<span className="text-gradient">

works for you.

</span>


</h2>









<p

className="
mt-6

max-w-xl

mx-auto

text-lg

text-muted-foreground

"

>


OneClick understands your emails,
finds what matters and helps finish work.


</p>









<div className="
mt-10

flex

justify-center

gap-4

flex-wrap

"

>

<Link href="/signup">

<Button

size="lg"

className="
rounded-full

h-12

px-10

bg-foreground

text-background

hover:bg-foreground/90

shadow-xl

"

>


Start with Gmail


<ArrowRight
size={18}
className="ml-2"
/>


</Button>

</Link>

</div>








<div className="
mt-12

flex

justify-center

gap-6

flex-wrap

text-sm

text-muted-foreground

"

>


<div className="flex items-center gap-2">

<CheckCircle2 size={15}/>

Private by design

</div>



<div className="flex items-center gap-2">

<CheckCircle2 size={15}/>

Secure connection

</div>



<div className="flex items-center gap-2">

<CheckCircle2 size={15}/>

Fast execution

</div>



</div>





</motion.div>










<div

className="
mt-12

border-t

pt-8

flex

justify-between

flex-wrap

gap-4

text-sm

text-muted-foreground

"

>


<span>

© {new Date().getFullYear()} OneClick

</span>


<span>

AI workspace assistant

</span>


</div>






</div>






</footer>

)

}