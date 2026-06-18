import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { createCalendarEvent } from "@/core/calendar/createEvent";


export async function POST(
 req:Request
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



const {
 title,
 start,
 end
}=await req.json();



const event =
await createCalendarEvent(
 session.user.id,
 {
  title,
  start,
  end
 }
);



return NextResponse.json({
 success:true,
 event
});


}catch(error){

console.error(error);

return NextResponse.json(
 {
  success:false,
  error:String(error)
 },
 {
  status:500
 }
);

}

}