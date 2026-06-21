import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient(),
  ], // Express server URL
});

export const { signIn, signUp, useSession, signOut } = authClient;