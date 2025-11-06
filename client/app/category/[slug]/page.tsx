import { getStrapiMedia, StrapiImage } from "@/components/strapi-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getCategoryBySlug } from "@/lib/utils";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { X } from "lucide-react";
import BackButton from "@/components/back-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).slug;
  const category = await getCategoryBySlug(slug);
  return (
    <div className="m-8 lg:m-16">
      <BackButton />
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.articles.length > 0 ? (
          category.articles.map((article) => (
            <Link
              key={article.id}
              href={`/blogpost/${article.slug}`}
              className="group"
            >
              <Card className="pt-0 h-full rounded-3xl hover:bg-muted hover:scale-[1.02] transition duration-200">
                <CardContent className="px-0">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-3xl">
                    <StrapiImage
                      src={getStrapiMedia(article.cover.url) as string}
                      alt={article.cover.alternativeText || "Cover Image"}
                      fill
                      className="h-full object-cover object-top w-full rounded-3xl"
                    />
                  </AspectRatio>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <h2 className="capitalize font-bold text-center w-full">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground">{article.description}</p>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <Empty className="border border-dashed col-span-3">
            <EmptyContent>
              <EmptyMedia variant="icon">
                <X />
              </EmptyMedia>
              <EmptyTitle>No Data Found</EmptyTitle>
              <EmptyDescription>
                Try searching something else.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}
