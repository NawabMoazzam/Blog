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

type Props = {
  params: Promise<{ page: number }>;
};

export async function generateStaticParams() {
  return [];
}

export default async function BlogsPage({ params }: Props) {
  const page = (await params).page;
  const { articles, meta } = await getArticles(page);
  return (
    <div className="m-8 lg:m-16">
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
            <Card className="pt-0 h-full rounded-3xl hover:bg-muted hover:scale-[1.02] transition duration-200">
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
