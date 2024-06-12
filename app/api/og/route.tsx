/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { calSemiBold } from "./utils";

export const runtime = "edge";

const TITLE = "FutbolPi";
const DESCRIPTION = "Predict, compete, win! FutbolPi – powered by Pi Network";

export async function GET(req: Request) {
  const [calSemiBoldData] = await Promise.all([calSemiBold]);

  const { searchParams } = new URL(req.url);

  const title =
    (searchParams.has("title") && searchParams.get("title")) || TITLE;

  const description =
    (searchParams.has("description") && searchParams.get("description")) ||
    DESCRIPTION;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          fontFamily: "Cal",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="Brand Logo"
            src={"https://futbolpi.vercel.app/assets/logos/logo.png"}
            style={{
              width: 250,
              height: 250,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            width: "70%",
            alignItems: "center",
            fontFamily: "Cal",
            fontSize: "64px",
            fontWeight: "900",
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 50,
            color: "purple",
            fontSize: "24px",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Cal",
          data: calSemiBoldData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
