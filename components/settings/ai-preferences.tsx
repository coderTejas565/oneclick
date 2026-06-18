import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export function AIPreferences() {


return (

<Card>

<CardHeader>

<CardTitle>
AI Preferences
</CardTitle>

</CardHeader>



<CardContent className="space-y-6">





<div className="
flex
items-center
justify-between
">

<div>

<Label>
Email Summaries
</Label>

<p className="
text-sm
text-muted-foreground
">

Generate AI summaries for emails

</p>

</div>


<Switch
defaultChecked
/>

</div>







<div className="
flex
items-center
justify-between
">


<div>

<Label>
Priority Detection
</Label>

<p className="
text-sm
text-muted-foreground
">

Detect important emails automatically

</p>

</div>


<Switch
defaultChecked
/>

</div>







<div className="
flex
items-center
justify-between
">


<div>

<Label>
Action Suggestions
</Label>

<p className="
text-sm
text-muted-foreground
">

Suggest replies and next actions

</p>

</div>


<Switch
defaultChecked
/>

</div>





</CardContent>


</Card>

);

}