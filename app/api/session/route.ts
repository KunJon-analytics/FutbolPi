import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { authResultSchema, defaultSession } from "@/lib/session/schema";
import platformAPIClient from "@/lib/pi/platform-api-client";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("token");
  // accessToken is "hello" for /api/search?token=hello

  if (!accessToken) {
    console.log("[GET_SESSION]", "Invalid authentication params");
    return Response.json(defaultSession);
  }

  try {
    // Verify the user's access token with the /me endpoint:
    const me = await platformAPIClient.get(`/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err) {
    console.log("[GET_SESSION]", err);
    return Response.json(defaultSession);
  }

  try {
    const user = await prisma.user.findFirst({
      where: { accessToken },
      select: { username: true, id: true },
    });

    if (!user) {
      return Response.json(defaultSession);
    }

    return Response.json({
      username: user.username,
      isLoggedIn: true,
      id: user.id,
    });
  } catch (error) {
    console.log("GET_SESSION", error);
    return Response.json(defaultSession);
  }
}

// login
export async function POST(request: NextRequest) {
  const authResult = (await request.json()) as unknown;

  const parsedParam = authResultSchema.safeParse(authResult);

  if (!parsedParam.success) {
    console.log("[LOGIN_API]", "Invalid authentication params");
    return new NextResponse("Invalid authentication params", { status: 400 });
  }

  const auth = parsedParam.data;

  try {
    // Verify the user's access token with the /me endpoint:
    const me = await platformAPIClient.get(`/me`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
  } catch (err) {
    console.log("[LOGIN_API]", err);
    return new NextResponse("Invalid access token", { status: 400 });
  }

  try {
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

    revalidatePath("/");

    return Response.json({
      username: user.username,
      isLoggedIn: true,
      id: user.id,
    });
  } catch (error) {
    console.log("[LOGIN_API]", error);
    return new NextResponse("Server Error", { status: 400 });
  }
}
