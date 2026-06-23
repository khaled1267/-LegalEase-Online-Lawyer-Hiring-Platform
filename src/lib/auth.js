import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("legalease");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
user: {
    additionalFields: {
      userRole: {
       
      
        defaultValue: "user",
      },
    },
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
        }, 
    },
   plugins : [
    admin()
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy:"jwt",
     maxAge: 60 * 24 * 7,

    },
  },
  plugins: [
    jwt()
  ]
  ,

  database: mongodbAdapter(db, {
    client,
  }),
});
