import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Autotech Spajic — Auto dijagnostika, kodiranje i elektronika | Grude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-nav.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(232,35,47,0.18), transparent 60%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={640} height={427} />
        <div
          style={{
            marginTop: -40,
            fontSize: 34,
            fontWeight: 600,
            color: "#f5f3ef",
            letterSpacing: -0.5,
          }}
        >
          Dijagnostika · Kodiranje · Elektrika · Ključevi · Chiptuning
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            color: "#a6a199",
          }}
        >
          Grude · Hercegovina · 063 509 999
        </div>
      </div>
    ),
    { ...size }
  );
}
