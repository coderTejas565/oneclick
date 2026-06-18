import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Mail,
  Calendar,
  CheckCircle,
} from "lucide-react";


interface IntegrationsCardProps {
  gmailConnected: boolean;
  calendarConnected: boolean;
}



export function IntegrationsCard({
  gmailConnected,
  calendarConnected,
}: IntegrationsCardProps) {


return (

<Card>

<CardHeader>

<CardTitle>
Connected Apps
</CardTitle>

</CardHeader>



<CardContent className="space-y-5">





{/* Gmail */}

<div className="
flex
items-center
justify-between
border
rounded-lg
p-4
">


<div className="
flex
items-center
gap-3
">


<Mail className="h-5 w-5"/>


<div>

<p className="font-medium">
Gmail
</p>


<p className="text-sm text-muted-foreground">

{
gmailConnected
? "Your inbox is connected"
: "Connect your Gmail account"
}

</p>


</div>


</div>




{
gmailConnected ? (

<CheckCircle className="h-5 w-5"/>

) : (

<Button
size="sm"
asChild
>

<a href="/api/connect/gmail">

Connect

</a>

</Button>

)

}



</div>







{/* Calendar */}


<div className="
flex
items-center
justify-between
border
rounded-lg
p-4
">


<div className="
flex
items-center
gap-3
">


<Calendar className="h-5 w-5"/>


<div>

<p className="font-medium">
Calendar
</p>


<p className="text-sm text-muted-foreground">

{
calendarConnected
? "Your calendar is connected"
: "Connect your calendar"
}

</p>


</div>


</div>





{
calendarConnected ? (

<CheckCircle className="h-5 w-5"/>

) : (

<Button
size="sm"
asChild
>

<a href="/api/connect/calendar">

Connect

</a>

</Button>

)

}



</div>





</CardContent>


</Card>


);

}