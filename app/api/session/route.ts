import { NextRequest } from "next/server";

import { defaultSession } from "@/lib/utils";
import { getSession } from "@/actions/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return Response.json(defaultSession);
    }

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
