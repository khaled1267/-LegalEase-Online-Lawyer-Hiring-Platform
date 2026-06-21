import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("legalease");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
