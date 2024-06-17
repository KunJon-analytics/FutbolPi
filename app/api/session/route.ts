import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { defaultSession } from "@/lib/utils";
import { getIronSession } from "iron-session";
import { SessionData } from "@/types";
import { sessionOptions } from "@/lib/session";

export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return Response.json(defaultSession);
  }
  try {
    return Response.json({
      username: session.username,
      isLoggedIn: session.isLoggedIn,
      id: session.id,
    });
  } catch (error) {
    console.log("GET_SESSION", error);
    return Response.json(defaultSession);
  }
}
