import { createAgent } from "@/core/agent/corsair-agent";
import { run } from "@openai/agents";

import {
  detectAction
} from "@/core/agent/action-detector";
import { NextResponse } from "next/server";


export async function POST(
  req: Request
) {


  
if (!process.env.OPENAI_API_KEY) {

    return NextResponse.json(
      {
        success:false,
        message:
        "AI assistant is currently unavailable. Configure API key."
      },
      {
        status:503
      }
    );

  }
  
try {



const {
 message
} =
await req.json();



if(!message?.trim()){

return new Response(
"Message required",
{
status:400
}
);

}





const encoder =
new TextEncoder();




const stream =
new ReadableStream({

async start(controller){



function send(data:any){

controller.enqueue(
encoder.encode(
JSON.stringify(data)
+
"\n"
)
);

}





try{



// initial status

send({
type:"status",
event:"thinking"
});





const text =
message.toLowerCase();





// progress events

if(
text.includes("find") ||
text.includes("search")
){

send({

type:"status",

event:"searching_emails"

});

}




if(
text.includes("reply")
){

send({

type:"status",

event:"generating_reply"

});

}




if(
text.includes("schedule") ||
text.includes("meeting")
){

send({

type:"status",

event:"creating_calendar"

});

}







const agent =
await createAgent();





const result =
await run(
agent,
message
);






// ⭐ real action detection

const output =
  result.finalOutput ?? "Completed successfully";


const action =
  detectAction(
    message,
    output
  );








send({

type:"result",

data:{


output,

action


}

});









send({

type:"status",

event:"completed"

});





controller.close();





}catch(err){


console.error(err);



send({

type:"error",

message:
"Agent failed"

});



controller.close();


}


}

});







return new Response(
stream,
{

headers:{


"Content-Type":
"application/x-ndjson",


"Cache-Control":
"no-cache",


"Connection":
"keep-alive"


}

}

);





}catch(error){


console.error(error);


return new Response(
"Failed",
{
status:500
}
);


}


}