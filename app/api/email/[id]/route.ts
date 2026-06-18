import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getEmailById } from "@/db/repositories/email.repository";


export async function GET(
  req: Request,
  {
    params
  }: {
    params: Promise<{ id:string }>
  }
){

try {


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



const {id}=await params;



const email =
 await getEmailById(
   session.user.id,
   id
 );


if(!email){
 return NextResponse.json(
  {
   error:"Email not found"
  },
  {
   status:404
  }
 );
}



return NextResponse.json({
 success:true,
 email
});



}catch(error){

console.error(error);


return NextResponse.json(
 {
  error:"Failed email fetch"
 },
 {
  status:500
 }
);

}

}