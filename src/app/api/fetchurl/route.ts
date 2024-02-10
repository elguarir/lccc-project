import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET(request: NextRequest) {
  let url = new URL(request.url);
  let link = url.searchParams.get("url");
  if (!link) {
    return NextResponse.json(
      {
        success: 0,
        message: "No link provided",
      },
      { status: 400 },
    );
  }
  console.log("link", link);
  let data = await axios
    .get(`https://opentags.io/.netlify/functions/meta-fetcher?url=${link}`)
    .then((res) => res.data);
  console.log("data", data);
  return NextResponse.json(
    {
      success: 1,
      link: decodeURIComponent(link),
      meta: {
        title: data.data.title,
        description: data.data.description,
        image: {
          url: data.data.image,
        },
      },
    },
    { status: 200 },
  );
}
