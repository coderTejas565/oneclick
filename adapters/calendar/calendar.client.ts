import { corsair } from "@/corsair";


export const calendarClient = {

 async createEvent(
 {
   userId,
   title,
   start,
   end,
 }:{
   userId:string;
   title:string;
   start:string;
   end:string;
 }
 ){

 const tenant =
   corsair.withTenant(userId);


 return tenant.googlecalendar.api.events.create({

   event:{

    summary:title,

    start:{
      dateTime:start,
    },

    end:{
      dateTime:end,
    }

   }

 });


 }

}