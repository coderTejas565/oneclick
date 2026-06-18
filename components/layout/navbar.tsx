"use client";

import {
  Mail,
  Calendar,
  Command,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";


export function Navbar() {


return (

<header
className="
sticky
top-0
z-30
h-14
border-b
bg-background/80
backdrop-blur
"
>


<div
className="
h-full
flex
items-center
justify-between
px-6
"
>



{/* LEFT */}

<div className="
flex
items-center
gap-3
">


<div className="
h-8
w-8
rounded-lg
border
flex
items-center
justify-center
bg-muted
">


<Sparkles
className="h-4 w-4"
/>


</div>



<div>

<h1 className="
text-sm
font-semibold
">

OneClick

</h1>


<p className="
text-[11px]
text-muted-foreground
">

AI Assistant

</p>


</div>



</div>







{/* RIGHT */}


<div className="
flex
items-center
gap-2
">





{/* COMMAND */}

<div
className="
hidden
lg:flex
items-center
gap-2
rounded-lg
border
px-2.5
py-1.5
text-xs
text-muted-foreground
"
>


<Command
className="h-3.5 w-3.5"
/>


<span>
⌘ K
</span>


</div>








{/* Gmail */}


<Badge

variant="secondary"

className="
hidden
sm:flex
gap-1.5
text-xs
"

>


<Mail
className="h-3 w-3"
/>


Gmail


</Badge>







{/* Calendar */}


<Badge

variant="secondary"

className="
hidden
sm:flex
gap-1.5
text-xs
"

>


<Calendar
className="h-3 w-3"
/>


Calendar


</Badge>






{/* Theme */}


<ThemeToggle />






{/* User */}

<div
className="
h-8
w-8
rounded-full
border
flex
items-center
justify-center
text-xs
font-medium
"
>

T

</div>




</div>






</div>


</header>


)

}