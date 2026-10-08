
import "server-only";

import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

async function createAuth() {
  // Temporary DNS workaround for MongoDB Atlas
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  // Load MongoDB after configuring DNS
  const { default: clientPromise } = await import("./mongodb");

  const client = await clientPromise;

  const db = client.db(process.env.MONGODB_DB || "bazardor");

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    database: mongodbAdapter(db, {
      client,
    }),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },

      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
    },

    user: {
      changeEmail: {
        enabled: false,
      },
    },
  });
} 

let authPromise: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  if (!authPromise) {
    authPromise = createAuth().catch((error) => {
      authPromise = undefined;
      throw error;
    });
  }

  return authPromise;
}
