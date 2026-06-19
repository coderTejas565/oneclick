"use client"

import { Button } from "@/components/ui/button"
import ThemeToggle from "../ThemeToggle"

import Features from "./Features"
import Workflow from "./Workflow"
import Security from "./Security"

import {
  motion,
  useMotionValueEvent,
  useScroll
} from "framer-motion"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"


export default function Navbar(){

const {scrollY}=useScroll()

const [scrolled,setScrolled]=useState(false)

function handleScroll(
  id: string
){
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior:"smooth"
    });
}


useMotionValueEvent(
scrollY,
"change",
(value)=>{
setScrolled(value > 50)
}
)


return (

<motion.nav


animate={{

width: scrolled ? "300px" : "92%",

y: scrolled ? 8 : 0,

}}


transition={{

type:"spring",

stiffness:170,

damping:22

}}



className={`

fixed

top-5

left-1/2

-translate-x-1/2


z-50


glass


border


shadow-[0_20px_60px_rgba(0,0,0,0.15)]


${

scrolled

?

"rounded-full px-4 py-2"

:

"rounded-2xl px-6 py-4"

}

`}

>


<div className="
flex
items-center
justify-between
gap-6
">





{/* logo */}



<motion.div

whileHover={{
scale:1.04
}}

className="
flex
items-center
gap-3
shrink-0
"

>


<div className="

relative

h-9

w-9


rounded-xl


border

bg-background/50


flex

items-center

justify-center

"


>


<motion.div

animate={{

rotate:360

}}

transition={{

duration:10,

repeat:Infinity,

ease:"linear"

}}

className="text-foreground"

>


<Sparkles size={16}/>


</motion.div>



<motion.div

animate={{
scale:[1,1.8,1],
opacity:[.4,0,.4]
}}

transition={{
duration:3,
repeat:Infinity
}}

className="
absolute
inset-0
rounded-xl
bg-foreground/10
"

/>


</div>





<span className="
font-semibold
tracking-tight
"

>

OneClick

</span>



</motion.div>







{/* nav links */}


{

!scrolled && (

<div className="
hidden
md:flex
items-center
gap-8
text-sm
text-muted-foreground
">


<button
onClick={()=>handleScroll("features")}
className="hover:text-foreground"
>
Features
</button>


<button
onClick={()=>handleScroll("workflow")}
className="hover:text-foreground"
>
Workflow
</button>


<button
onClick={()=>handleScroll("security")}
className="hover:text-foreground"
>
Security
</button>


</div>

)

}









{/* actions */}



<div className="
flex
items-center
gap-3
"

>


<ThemeToggle />



<Link href="/app/signup">

<Button

size="sm"

className="

rounded-full

h-9

px-5


bg-foreground

text-background


hover:bg-foreground/90


transition


shadow-lg


"


>


{
    
    scrolled
    
    ?
    
    "Start"
    
    :
    
    "Connect"
    
}


</Button>

    </Link>




</div>






</div>



</motion.nav>

)

}