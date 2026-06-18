import { getEmailById } from "@/db/repositories/email.repository";


async function getEmail(
 userId:string,
 id:string
){

const email =
await getEmailById(
 userId,
 id
);


if(!email){
 throw new Error("Email not found");
}


return email;

}