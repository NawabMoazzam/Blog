import { getGlobalData } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const global = await getGlobalData();
  const faviconUrl = global.favicon.url;

  if (!faviconUrl) {
    // Fallback to default favicon
    return new NextResponse(null, { status: 404 });
  }

  const faviconResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${faviconUrl}`
  );

  const faviconBuffer = await faviconResponse.arrayBuffer();

  return new NextResponse(faviconBuffer, {
    headers: {
      "Content-Type":
        faviconResponse.headers.get("Content-Type") || "image/x-icon",
      "Cache-Control": "public, max-age=86400, immutable", // Cache for 24 hours
    },
  });
}
