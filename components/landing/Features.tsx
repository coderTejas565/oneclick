"use client"

import FeatureCard from "./FeatureCard"

import {
Brain,
MessageCircle,
Calendar,
ShieldCheck,
Zap,
Sparkles
} from "lucide-react"

import { motion } from "framer-motion"



export default function Features(){


return (

<section  id="features"

className="
relative

py-36

px-6

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

>


<p className="
text-xs

uppercase

tracking-[0.3em]

text-muted-foreground

">

Capabilities

</p>



<h2 className="
mt-6

text-5xl

md:text-7xl

font-bold

tracking-[-0.08em]

leading-[0.9]

">


Your inbox.


<br/>


<span className="text-gradient">

becomes intelligent.

</span>


</h2>




<p className="
mt-6

max-w-xl

text-lg

text-muted-foreground

">

AI understands emails, finds intent,
and turns conversations into completed actions.

</p>



</motion.div>







<div className="
mt-20

grid

md:grid-cols-3

gap-6

">





<FeatureCard

icon={Brain}

title="Deep Understanding"

className="md:col-span-2"

>

OneClick reads context, detects urgency,
and understands what each email actually means.

</FeatureCard>






<FeatureCard

icon={Sparkles}

title="AI Decisions"

>

Not just summaries.
Real decisions and next steps.

</FeatureCard>






<FeatureCard

icon={MessageCircle}

title="Smart Replies"

>

Create responses that sound natural
and match your communication style.

</FeatureCard>






<FeatureCard

icon={Calendar}

title="Automatic Scheduling"

className="md:col-span-2"

>

Convert meeting conversations into
calendar events instantly.

</FeatureCard>







<FeatureCard

icon={Zap}

title="Fast Execution"

>

Reduce repetitive work
and finish tasks faster.

</FeatureCard>







<FeatureCard

icon={ShieldCheck}

title="Privacy First"

className="md:col-span-3"

>

Your emails stay private.
Your data is used only to help you work.

</FeatureCard>







</div>





</div>


</section>


)

}