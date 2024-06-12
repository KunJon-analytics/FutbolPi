/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { DESCRIPTION, TITLE } from "@/app/shared-metadata";
import {
  DEFAULT_URL,
  SIZE,
  calSemiBold,
  interLight,
  interMedium,
  interRegular,
} from "./utils";

export const runtime = "edge";

const LOGO_IMAGE = "assets/logos/logo.png";

export async function GET(req: Request) {
  const [interRegularData, interLightData, calSemiBoldData, interMediumData] =
    await Promise.all([interRegular, interLight, calSemiBold, interMedium]);

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
            src={new URL(LOGO_IMAGE, DEFAULT_URL).toString()}
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
      ...SIZE,
      fonts: [
        {
          name: "Inter",
          data: interMediumData,
          style: "normal",
          weight: 500,
        },
        {
          name: "Inter",
          data: interRegularData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: interLightData,
          style: "normal",
          weight: 300,
        },
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
