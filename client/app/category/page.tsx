import { getStrapiMedia, StrapiImage } from "@/components/strapi-image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getCategories, shimmerPlaceholder } from "@/lib/utils";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BackButton from "@/components/back-button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function CategoryPage() {
  const categories = await getCategories();
  return (
    <div className="m-8 lg:m-16">
      <BackButton />
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length <= 0 && (
          <Empty className="border border-dashed col-span-3">
            <EmptyContent>
              <EmptyMedia variant="icon">
                <X />
              </EmptyMedia>
              <EmptyTitle>No Data Found</EmptyTitle>
              <EmptyDescription>Try searching something else.</EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group"
          >
            <Card className="pt-0 h-full rounded-3xl hover:bg-muted hover:scale-[1.02] transition duration-200">
              <CardContent className="px-0">
                <AspectRatio ratio={16 / 9} className="rounded-3xl">
                  <Suspense
                    fallback={
                      <Skeleton className="h-full w-full rounded-3xl" />
                    }
                  >
                    {category.articles.length > 0 ? (
                      <StrapiImage
                        src={
                          getStrapiMedia(
                            category.articles[0].cover.url
                          ) as string
                        }
                        alt={
                          category.articles[0].cover.alternativeText ||
                          "Cover Image"
                        }
                        fill
                        className="h-full object-cover object-top w-full rounded-3xl"
                        placeholder={shimmerPlaceholder(
                          category.articles[0].cover.width,
                          category.articles[0].cover.height
                        )}
                      />
                    ) : (
                      <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30% rounded-3xl">
                        <EmptyContent>
                          <EmptyMedia variant="icon">
                            <X />
                          </EmptyMedia>
                          <EmptyTitle>No Data Found</EmptyTitle>
                          <EmptyDescription>
                            We are cooking something amazing for you.
                          </EmptyDescription>
                        </EmptyContent>
                      </Empty>
                    )}
                  </Suspense>
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-col">
                <h2 className="capitalize font-bold text-center w-full">
                  {category.name}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
