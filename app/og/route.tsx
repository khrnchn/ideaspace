import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "No title";
  const description = searchParams.get("description") || "";
  const authorName = searchParams.get("authorName") || "name";
  const authorImage = searchParams.get("authorImage");
  const authorEmail = searchParams.get("authorEmail") || "email";
  const tags = searchParams.get("tags") || "";
  if (!authorImage) {
    return new ImageResponse(<h1>Err!</h1>, {
      width: 1200,
      height: 630,
    });
  }

  const geistMonoRegular = fetch(
    new URL("../../public/fonts/GeistMono-Regular.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const geistRegular = fetch(
    new URL("../../public/fonts/Geist-Regular.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        textAlign: "left",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        backgroundColor: "black",
        backgroundImage: `url("../../public/bg.svg")`,
        backgroundSize: "1200px 630px",
      }}
    >
      <div
        style={{
          marginLeft: 80,
          marginRight: 190,
          display: "flex",
          fontSize: "6rem",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          color: "white",
          lineHeight: "120px",
          whiteSpace: "pre-wrap",
          flexWrap: "wrap",
        }}
      >
        IdeaSpace
      </div>
      <div
        style={{
          marginLeft: 80,
          marginRight: 190,
          display: "flex",
          fontSize: 50,
          letterSpacing: "-0.05em",
          color: "white",
          lineHeight: "80px",
          whiteSpace: "pre-wrap",
          flexWrap: "wrap",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginLeft: 80,
          marginRight: 190,
          display: "flex",
          fontSize: 20,
          letterSpacing: "-0.05em",
          color: "white",
          fontFamily: "Geist",
          whiteSpace: "pre-wrap",
          flexWrap: "wrap",
        }}
      >
        {description}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 80,
          marginRight: 190,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          tw="py-3"
        >
          <img alt="authorImage" width="50" height="50" src={authorImage} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <div style={{ color: "white" }}>{authorName}</div>
            <div style={{ color: "white" }}>{authorEmail}</div>
          </div>
        </div>
        <div tw="text-sm flex flex-row flex-wrap">
          {tags.split(",").map((tag, i) => (
            <div
              key={i}
              tw="px-2 py-1 text-sm bg-zinc-500/10 border border-zinc-500 rounded-full text-zinc-500 mr-2"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistMono",
          data: await geistMonoRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Geist",
          data: await geistRegular,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
