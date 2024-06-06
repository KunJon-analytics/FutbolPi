"use server";

import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { AuthResult, SessionData } from "@/types";
import { sessionOptions } from "@/lib/session";
import { defaultSession } from "@/lib/utils";
import platformAPIClient from "@/lib/pi/platform-api-client";
import prisma from "@/lib/prisma";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
    session.id = defaultSession.id;
  }

  return session;
}

export async function logout() {
  // false => no db call for logout
  const session = await getSession();
  session.destroy();
  revalidatePath("/app");
  redirect(`/`);
}

export async function login(auth: AuthResult) {
  const session = await getSession();
  try {
    // Verify the user's access token with the /me endpoint:
    const me = await platformAPIClient.get(`/me`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
  } catch (err) {
    console.log("[LOGIN_SERVER]", err);
    throw new Error("Invalid access token");
  }

  session.username = auth.user.username;
  session.isLoggedIn = true;

  const user = await prisma.user.upsert({
    where: { userId: auth.user.uid },
    update: {
      accessToken: auth.accessToken,
    },
    create: {
      userId: auth.user.uid,
      username: auth.user.username,
      accessToken: auth.accessToken,
    },
  });

  session.id = user.id;
  await session.save();
  revalidatePath("/app");
}
