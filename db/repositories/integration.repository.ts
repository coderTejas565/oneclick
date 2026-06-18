import { db } from "@/db/db";
import { integrations } from "@/db/integration-schema";
import { and, eq } from "drizzle-orm";


export async function markConnected(
 userId:string,
 provider:string
){

 await db
 .insert(integrations)
 .values({

   id:crypto.randomUUID(),

   userId,

   provider,

   connected:true,

 })
 .onConflictDoUpdate({

   target:[
    integrations.userId,
    integrations.provider
   ],

   set:{
    connected:true,
    updatedAt:new Date()
   }

 });

}



export async function getConnection(
 userId:string,
 provider:string
){

 const result =
 await db
 .select()
 .from(integrations)
 .where(
   and(
    eq(integrations.userId,userId),
    eq(integrations.provider,provider)
   )
 );


 return result[0] ?? null;

}