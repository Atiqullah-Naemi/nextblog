import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const authSession = async () => {
  try {
    const session = auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized: No valid session found");
    }
    return session;
  } catch (err) {
    console.error({ err });
    throw new Error("Authentication failed");
  }
};

export const requireAuth = async () => {
  const session = await authSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await authSession();

  if (session) {
    redirect("/");
  }
};
