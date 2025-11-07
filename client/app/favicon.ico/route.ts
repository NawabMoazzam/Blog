import { getStrapiMedia } from "@/components/strapi-image";
import { getGlobalData } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const global = await getGlobalData();
    const faviconUrl = global.favicon.url;

    if (!faviconUrl) {
      // Fallback to default favicon
      return new NextResponse(null, { status: 404 });
    }

    const faviconResponse = await fetch(
      `${getStrapiMedia(faviconUrl)}`
    );

    const faviconBuffer = await faviconResponse.arrayBuffer();

    return new NextResponse(faviconBuffer, {
      headers: {
        "Content-Type":
          faviconResponse.headers.get("Content-Type") || "image/x-icon",
        "Cache-Control": "public, max-age=86400, immutable", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error(`Error Fetching Global Data: ${error}`);
    return NextResponse.json(
      { error: "Failed to fetch global data" },
      { status: 500 }
    );
  }
}
