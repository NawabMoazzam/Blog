import { getArticles } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BackButton from "@/components/back-button";
import { X } from "lucide-react";
import { StrapiImage } from "@/components/strapi-image";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import PaginationBlock from "@/components/pagination-block";
import { Badge } from "@/components/ui/badge";
import { cache } from "react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ page: number }>;
};

const getAllArticles = cache(getArticles);

export async function generateStaticParams() {
  const { meta } = await getAllArticles(1);
  const totalPages = meta.pagination.pageCount;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return pages.map((page) => ({ page: page.toString() }));
}

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read the latest articles and updates.",
};

export default async function BlogsPage({ params }: Props) {
  const page = (await params).page;
  const { articles, meta } = await getAllArticles(page);
  return (
    <div className="mx-8 my-16 lg:mx-16">
      <BackButton />
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.length <= 0 && (
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
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blogpost/${article.slug}`}
            className="group"
          >
            <Card className="pt-0 h-full rounded-3xl hover:border-primary hover:bg-muted hover:scale-[1.02] transition duration-200">
              <CardContent className="px-0">
                <AspectRatio ratio={16 / 9} className="rounded-3xl">
                  {article?.cover ? (
                    <StrapiImage
                      image={article.cover}
                      fill
                      className="rounded-3xl"
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
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Badge
                  variant={"outline"}
                  className="self-start px-3 font-bold capitalize"
                >
                  {article.category.name}
                </Badge>
                <h2 className="capitalize font-bold text-center w-full">
                  {article.title}
                </h2>
                <p className="text-muted-foreground">{article.description}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <PaginationBlock pagination={meta.pagination} />
    </div>
  );
}
