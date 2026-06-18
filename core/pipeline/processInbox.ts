import { corsair } from "@/corsair";
import { processEmail } from "./processEmail";

import {
 getSyncState,updateSyncState
} from "@/db/repositories/sync.repository";

import { getConnection } from "@/db/repositories/integration.repository";

export async function syncGmailInbox(
 userId:string
){

 const tenant =
  corsair.withTenant(userId);


 const connection =
  await getConnection(
   userId,
   "gmail"
  );


 if(!connection?.connected){
   throw new Error(
    "Gmail not connected"
   );
 }


 const state =
  await getSyncState(userId);


 const result =
  await tenant.gmail.api.messages.list({
    maxResults:20,
    pageToken:
     state?.nextPageToken ?? undefined
  });


 const messages =
  result.messages ?? [];


 const processedEmails=[];


 for(const message of messages){

  if(!message.id) continue;


  try{

   const processed =
    await processEmail(
     userId,
     message.id
    );


   if(processed?.id){
    processedEmails.push(processed);
   }


  }catch(error){

   console.error(
    "Failed processing",
    message.id,
    error
   );

  }

 }


 await updateSyncState(
  userId,
  {
   nextPageToken:
    result.nextPageToken ?? null
  }
 );


 return processedEmails;

}