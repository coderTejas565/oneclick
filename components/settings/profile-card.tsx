import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


interface ProfileCardProps {
  name: string;
  email: string;
}


export function ProfileCard({
  name,
  email,
}: ProfileCardProps) {


return (

<Card>

<CardHeader>

<CardTitle>
Profile
</CardTitle>

</CardHeader>



<CardContent className="space-y-5">


<div className="space-y-2">

<Label>
Name
</Label>

<Input
defaultValue={name}
/>

</div>



<div className="space-y-2">

<Label>
Email
</Label>

<Input
defaultValue={email}
disabled
/>

</div>




<Button>
Save Changes
</Button>



</CardContent>


</Card>

);

}