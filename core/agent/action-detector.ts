export function detectAction(
 message:string,
 output:string
){


const text =
message.toLowerCase();



if(
text.includes("find") ||
text.includes("search")
){

return {

type:"email",

data:{

subject:"Technical Interview",

from:"Google",

id:"email_123"

}

};

}




if(
text.includes("schedule") ||
text.includes("meeting")
){

return {

type:"calendar",

data:{

title:"Interview Meeting",

time:"Tomorrow 10:00 AM",

eventId:"event_123"

}

};

}



return null;


}