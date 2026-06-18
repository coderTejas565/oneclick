"use client";

import {
  Command,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";

import { useState } from "react"

export function Navbar() {

    const [openUser, setOpenUser] = useState(false)

return (

<header
className="
sticky
top-0
z-30
h-16
border-b
bg-background/90
backdrop-blur
"
>


<div
className="
h-full
flex
items-center
justify-between
px-8
"
>



{/* LEFT */}

<div
className="
flex
items-center
gap-4
"
>


<div
className="
h-9
w-9
rounded-xl
border
flex
items-center
justify-center
bg-muted
"
>

<Sparkles
className="h-4 w-4"
/>

</div>




<div>

<h1
className="
text-sm
font-semibold
"
>

OneClick

</h1>


<p
className="
text-xs
text-muted-foreground
"
>

AI Executive Assistant

</p>


</div>



</div>







{/* RIGHT */}


<div
className="
flex
items-center
gap-4
"
>





{/* Command */}

<div
className="
hidden
lg:flex
items-center
gap-2
rounded-lg
border
bg-muted/40
px-3
py-2
text-xs
text-muted-foreground
"
>


<Command
className="h-3.5 w-3.5"
/>


⌘ K


</div>





<ThemeToggle />







{/* USER CARD */}

<button
className="
relative
flex
items-center
gap-3
rounded-xl
border
px-3
py-2
hover:bg-muted
transition
"
onClick={() => setOpenUser(prev => !prev)}
>

<div
className="
h-8
w-8
rounded-full
bg-muted
flex
items-center
justify-center
text-xs
font-semibold
"
>
T
</div>


<div
className="
hidden
md:block
text-left
"
>

<p className="text-sm font-medium">
Tejas
</p>

<p className="text-xs text-muted-foreground">
Developer
</p>

</div>


<ChevronDown
className="h-4 w-4 text-muted-foreground"
/>





{openUser && (

<div
className="
absolute
right-0
top-14
w-64
rounded-xl
border
bg-background
shadow-lg
p-4
text-left
"
>


<div
className="
flex
items-center
gap-3
mb-4
"
>


<div
className="
h-10
w-10
rounded-full
bg-muted
flex
items-center
justify-center
font-semibold
"
>
T
</div>


<div>

<p className="font-medium">
Tejas
</p>

<p className="
text-xs
text-muted-foreground
">
tejas@email.com
</p>

</div>


</div>



<div className="
border-t
pt-3
space-y-2
">


<button
className="
w-full
text-left
text-sm
hover:bg-muted
rounded-lg
px-2
py-2
"
>
Profile
</button>


<button
className="
w-full
text-left
text-sm
hover:bg-muted
rounded-lg
px-2
py-2
"
>
Settings
</button>



<button
className="
w-full
text-left
text-sm
text-destructive
hover:bg-muted
rounded-lg
px-2
py-2
"
>
Logout
</button>


</div>


</div>

)}

</button>





</div>



</div>


</header>


)

}