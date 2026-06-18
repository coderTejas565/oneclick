import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { corsair } from "@/corsair";
import { auth } from "@/lib/auth";

import {
  getConnection,
} from "@/db/repositories/integration.repository";



function generateSlots(
  busy: any[],
  date: string
) {

  const slots = [];

  const startHour = 9;
  const endHour = 18;


  for(
    let hour = startHour;
    hour < endHour;
    hour++
  ) {

    const slotStart =
      new Date(
        `${date}T${String(hour).padStart(2,"0")}:00:00`
      );


    const slotEnd =
      new Date(
        `${date}T${String(hour+1).padStart(2,"0")}:00:00`
      );


    const conflict =
      busy.some(item => {

        const busyStart =
          new Date(item.start);

        const busyEnd =
          new Date(item.end);


        return (
          slotStart < busyEnd &&
          slotEnd > busyStart
        );

      });



    if(!conflict){

      slots.push({

        start:
          `${String(hour).padStart(2,"0")}:00`,

        end:
          `${String(hour+1).padStart(2,"0")}:00`

      });

    }

  }


  return slots;

}





export async function POST(
 req: Request
){

try{


const session =
await auth.api.getSession({
 headers: await headers()
});



if(!session){

 return NextResponse.json(
  {
   error:"Unauthorized"
  },
  {
   status:401
  }
 );

}





// check calendar connection first

const calendar =
await getConnection(
 session.user.id,
 "googlecalendar"
);



if(!calendar?.connected){

 return NextResponse.json(
  {
   success:false,

   error:
    "CALENDAR_NOT_CONNECTED",

   message:
    "Connect Google Calendar before scheduling meetings."
  },
  {
   status:400
  }
 );

}




// tenant scoped Corsair

const tenant =
corsair.withTenant(
 session.user.id
);





const body =
await req.json();


const date =
body.date;



if(!date){

 return NextResponse.json(
  {
   error:"Date required"
  },
  {
   status:400
  }
 );

}





const availability =
await tenant.googlecalendar
.api.calendar.getAvailability({

 timeMin:
  new Date(
   `${date}T00:00:00`
  ).toISOString(),


 timeMax:
  new Date(
   `${date}T23:59:59`
  ).toISOString(),


 timeZone:
  "Asia/Kolkata"

});





const busy =
availability
.calendars
?.primary
?.busy ?? [];





return NextResponse.json({

 success:true,

 slots:
  generateSlots(
   busy,
   date
  )

});





}catch(error){


console.error(
 "availability failed",
 error
);



return NextResponse.json(
 {
  success:false,

  error:
   "Internal server error"
 },
 {
  status:500
 }
);


}

}