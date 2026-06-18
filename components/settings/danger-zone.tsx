import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";



export function DangerZone() {


return (

<Card className="border-destructive">


<CardHeader>

<CardTitle className="text-destructive">

Danger Zone

</CardTitle>


</CardHeader>





<CardContent className="space-y-4">



<div>

<p className="font-medium">

Delete Account

</p>


<p className="
text-sm
text-muted-foreground
">

This will permanently remove your account
and connected data.

</p>


</div>





<Button
variant="destructive"
>

Delete Account

</Button>





</CardContent>


</Card>


);

}