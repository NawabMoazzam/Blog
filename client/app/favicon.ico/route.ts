import { getStrapiMedia } from "@/components/strapi-image";
import { getGlobalData } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const global = await getGlobalData();
    const faviconUrl = global.favicon?.url; //https://jolly-flame-2138b8d190.media.strapiapp.com/favicon_f7f3301f9d.png

    if (!faviconUrl) {
      // Fallback to default favicon
      const defaultFaviconUrl = "/favicon.ico";
      return NextResponse.redirect(defaultFaviconUrl);
      // return new NextResponse(null, { status: 404 });
    }

    const faviconResponse = await fetch(`${faviconUrl}`);

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
