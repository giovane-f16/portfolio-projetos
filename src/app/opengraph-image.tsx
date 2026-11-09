import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Giovane Ferreira - Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logo, archivo, instrumentSans] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.svg"), "utf8"),
    readFile(join(process.cwd(), "assets/fonts/Archivo-ExtraBold-Expanded.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSans-Regular.ttf")),
  ]);
  const whiteLogo = `data:image/svg+xml;base64,${Buffer.from(
    logo.replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="#ffffff"'),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "#000000",
        }}
      >
        <img src={whiteLogo} width={190} height={191} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontFamily: "Archivo",
              fontSize: 84,
              letterSpacing: "-0.01em",
              color: "#fbf9f8",
              lineHeight: 1.1,
            }}
          >
            Giovane Ferreira
          </div>
          <div
            style={{
              fontFamily: "Instrument Sans",
              fontSize: 40,
              color: "#a39598",
            }}
          >
            Full Stack Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 800 },
        { name: "Instrument Sans", data: instrumentSans, style: "normal", weight: 400 },
      ],
    },
  );
}
