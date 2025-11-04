import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    console.log("Revalidation triggered for:", model);

    if (model === "global") {
      revalidatePath(`/`);
      revalidateTag(`seo`, "max");
    }

    if (model === "article") {
      if (entry?.slug) {
        revalidatePath(`/blog/${entry.slug}`);
        revalidateTag(`${entry.slug}`, "max");
        revalidateTag(`articles`, "max");
      }
    }

    if (model === "category") {
      if (entry?.slug) {
        revalidatePath(`/category/${entry.slug}`);
        revalidateTag(`${entry.slug}`, "max");
        revalidateTag(`categories`, "max");
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model,
      slug: entry?.slug,
    });
  } catch (err) {
    console.error("Error revalidating:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    );
  }
}
