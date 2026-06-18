import { corsair } from "@/corsair";
import { processEmail } from "@/core/pipeline/processEmail";


export async function processInbox(
  userId:string
){

  const tenant =
    corsair.withTenant(userId);


  const result =
    await tenant.gmail.api.messages.list({
      maxResults:2
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
        "Failed:",
        message.id,
        error
      );

    }

  }


  return processedEmails;

}