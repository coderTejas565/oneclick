"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

import {
Mail,
Calendar,
Reply,
Sparkles,
CheckCircle2,
Clock,
Brain,
Zap
} from "lucide-react"

import Link from "next/link"



export default function Hero(){

return (

<section

className="
relative
min-h-screen
overflow-hidden
flex
items-center
justify-center
px-6
pt-32
"

>


{/* premium AI background */}

<div className="
absolute
inset-0
overflow-hidden
pointer-events-none
">


{/* main glow */}


<motion.div

animate={{
scale:[1,1.2,1],
opacity:[0.1,0.25,0.1]
}}

transition={{
duration:12,
repeat:Infinity
}}

className="
absolute
left-1/2
top-[10%]

-translate-x-1/2

w-[900px]
h-[900px]

rounded-full

bg-foreground/20

blur-[180px]

"

/>







{/* orbit rings */}



<motion.div

animate={{
rotate:360
}}

transition={{
duration:40,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

left-1/2
top-[35%]

-translate-x-1/2

w-[750px]
h-[750px]

rounded-full

border

border-border/40

"


/>





<motion.div

animate={{
rotate:-360
}}

transition={{
duration:25,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

left-1/2
top-[35%]

-translate-x-1/2

w-[520px]
h-[520px]

rounded-full

border

border-border/30

"


/>










{/* moving energy beams */}



<motion.div

animate={{
rotate:360
}}

transition={{
duration:15,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

left-1/2
top-[35%]

-translate-x-1/2
-translate-y-1/2

w-[600px]
h-[600px]

rounded-full


border-t

border-foreground/40


"

 />









{/* neural nodes */}



{

[
["18%","25%"],
["82%","22%"],
["12%","65%"],
["88%","70%"],
["50%","18%"],
["50%","75%"]

].map((p,i)=>(


<motion.div

key={i}

animate={{

scale:[1,1.6,1],

opacity:[0.3,1,0.3]

}}

transition={{

duration:3+i*.5,

repeat:Infinity

}}


style={{
left:p[0],
top:p[1]
}}


className="
absolute

h-2
w-2

rounded-full

bg-foreground

shadow-[0_0_35px_var(--foreground)]

"


/>


))


}









{/* floating AI cards */}



<motion.div

animate={{
y:[0,-20,0]
}}

transition={{
duration:6,
repeat:Infinity
}}

className="
absolute

left-[8%]

top-[35%]


glass

rounded-2xl

px-5
py-4

text-left

"


>


<p className="
text-xs
text-muted-foreground
">

AI detected

</p>


<p className="
mt-1
font-semibold
">

Important email

</p>


</motion.div>








<motion.div

animate={{
y:[0,20,0]
}}

transition={{
duration:7,
repeat:Infinity
}}

className="
absolute

right-[8%]

top-[30%]


glass

rounded-2xl

px-5
py-4

text-left

"


>


<p className="
text-xs
text-muted-foreground
">

Action created

</p>


<p className="
mt-1
font-semibold
">

Meeting scheduled

</p>


</motion.div>









{/* particles */}



{

Array.from({length:20}).map((_,i)=>(


<motion.span

key={i}

animate={{

y:[0,-80,0],

opacity:[0,.8,0]

}}

transition={{

duration:4+Math.random()*4,

repeat:Infinity,

delay:i*.2

}}


style={{

left:`${Math.random()*100}%`,

top:`${Math.random()*100}%`

}}


className="
absolute

h-[3px]

w-[3px]

rounded-full

bg-foreground/70

"

/>


))


}



</div>





{/* ambient glow */}


<motion.div

animate={{
opacity:[0.08,0.22,0.08],
scale:[1,1.2,1]
}}

transition={{
duration:10,
repeat:Infinity
}}

className="
absolute
top-[-250px]
left-1/2
-translate-x-1/2

w-[900px]
h-[900px]

rounded-full

bg-foreground/10

blur-[180px]

pointer-events-none
"
/>







{/* floating mails */}


{
[
{
x:"-40%",
y:"20%"
},
{
x:"40%",
y:"10%"
},
{
x:"55%",
y:"45%"
},
{
x:"-55%",
y:"50%"
}

].map((p,i)=>(

<motion.div

key={i}

animate={{
y:[0,-25,0],
opacity:[0.2,0.6,0.2]
}}

transition={{
duration:5+i,
repeat:Infinity
}}

style={{
left:p.x,
top:p.y
}}

className="
absolute

h-10
w-10

rounded-xl

glass

flex
items-center
justify-center

pointer-events-none

"
>

<Mail size={16}/>

</motion.div>

))

}









<div className="
relative
z-50
max-w-7xl
w-full
text-center
">







<motion.div

initial={{
opacity:0,
scale:.9
}}

animate={{
opacity:1,
scale:1
}}

className="
inline-flex
items-center
gap-2

glass

rounded-full

px-5
py-2

text-sm
text-muted-foreground
"

>


<Sparkles size={14}/>

AI execution layer for email


</motion.div>









<motion.h1

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.8
}}

className="

mt-10

text-6xl

md:text-[100px]

font-bold

tracking-[-0.09em]

leading-[0.85]

"

>

Emails go in.

<br/>


<span className="text-gradient">

Work comes out.

</span>


</motion.h1>










<p

className="
mt-8
max-w-2xl
mx-auto

text-lg
md:text-xl

text-muted-foreground
"

>

Your AI workspace that understands conversations,
finds priorities and turns emails into completed work.

</p>







<div className="
mt-10
flex
justify-center
gap-4
flex-wrap
">



<Button
  asChild
  size="lg"
  className="
  rounded-full
  px-9
  bg-foreground
  text-background
  hover:bg-foreground/90
  "
>
  <Link href="/signup">
    Connect Gmail
  </Link>
</Button>


<Button
  asChild
  size="lg"
  variant="outline"
  className="
  rounded-full
  px-9
  glass
  "
>
  <Link href="/login">
    View Demo
  </Link>
</Button>
</div>













{/* product */}

<motion.div

initial={{
opacity:0,
y:80
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.3
}}

className="
mt-24
max-w-6xl
mx-auto
relative
"

>


{/* orbit */}

<motion.div

animate={{
rotate:360
}}

transition={{
duration:30,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[650px]
h-[650px]

rounded-full

border

border-border

opacity-40

"

/>






<div

className="
relative

rounded-[40px]

border

bg-card/60

backdrop-blur-2xl

p-6
md:p-10

shadow-2xl

"

>





<div className="
grid
md:grid-cols-3
gap-5
">


<CardItem>

<Mail/>

<h3>
Incoming
</h3>


<p>
New email detected
</p>


<div className="
mt-4
text-sm
text-muted-foreground
">

Interview request

</div>


</CardItem>








<CardItem>

<Brain/>


<h3>
AI Thinking
</h3>


<div className="
mt-4
space-y-2
text-sm
text-muted-foreground
">


<p>
✓ Intent detected
</p>

<p>
✓ Priority analyzed
</p>

<p>
✓ Reply generated
</p>


</div>


</CardItem>









<CardItem>


<CheckCircle2/>


<h3>
Completed
</h3>


<div className="
mt-4
space-y-3
text-sm
text-muted-foreground
">


<div className="flex gap-2">

<Reply size={15}/>

Reply ready

</div>


<div className="flex gap-2">

<Calendar size={15}/>

Meeting added

</div>


</div>


</CardItem>





</div>







<div className="
mt-8

flex
justify-between

rounded-2xl

border

p-4

text-sm

text-muted-foreground

"


>


<span className="flex gap-2 items-center">

<Zap size={15}/>

AI processed 128 emails

</span>


<span>

99% faster workflow

</span>


</div>






</div>





</motion.div>







</div>


</section>

)

}







function CardItem({
children
}:{
children:React.ReactNode
}){


return (

<motion.div

whileHover={{
y:-8
}}

className="

rounded-3xl

border

bg-background/50

p-7

text-left

"

>


{children}


</motion.div>

)

}