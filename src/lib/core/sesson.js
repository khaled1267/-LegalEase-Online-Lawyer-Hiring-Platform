import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
// console.log(session);
    return session?.user || null;
}

export const roleall = async (userRole) => {
    const user = await getUserSession();

    if(!user){
         redirect("/signin");
    }
   if(user?.userRole !== userRole){
     redirect("/unauthorized");
   }
   return user;
}