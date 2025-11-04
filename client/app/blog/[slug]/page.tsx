import { getStrapiMedia, StrapiImage } from "@/components/strapi-image";
import BlockRenderer from "@/components/block-renderer";
import { getArticleBySlug, STRAPI_URL } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cache } from "react";
import { Metadata } from "next";
import BackButton from "@/components/back-button";

type Props = {
  params: Promise<{ slug: string }>;
};

const getArticle = cache(getArticleBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticle(slug);
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.cover
        ? [{ url: `${getStrapiMedia(article.cover.url)}` }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({ params }: Props) {
  const slug = (await params).slug;
  const article = await getArticle(slug);

  return (
    <div className="m-8 lg:m-16">
      <BackButton />
      <div className="w-full mx-auto">
        {article?.cover ? (
          <StrapiImage
            src={`${article.cover.url}`}
            height={800}
            width={800}
            className="h-40 md:h-96 w-full aspect-square object-cover rounded-3xl mask-[radial-gradient(circle,white,transparent)]"
            alt={article.cover.alternativeText || "Cover Image"}
          />
        ) : (
          <div className="h-40 md:h-96 w-full aspect-squace rounded-3xl shadow-derek bg-neutral-900 flex items-center justify-center">
            {/* <Logo /> */}
            <span className="text-muted-foreground">No Cover Image</span>
          </div>
        )}
      </div>
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article className="pb-8 pt-8">
            <div className="flex gap-4 flex-wrap ">
              {article?.category && (
                <p
                  key={article.category.id}
                  className="text-xs font-bold text-muted-foreground px-2 py-1 rounded-full bg-muted capitalize"
                >
                  {article.category.name}
                </p>
              )}
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl ">
              {article.title}
            </h1>
            <div className="mt-8">
              {article.blocks.map((block, index: number) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </div>
            <div className="flex space-x-2 items-center pt-12 border-t border-border mt-12">
              <div className="flex space-x-2 items-center ">
                <Avatar>
                  <AvatarImage
                    src={`${getStrapiMedia(article.author.avatar.url)}`}
                  />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-normal text-muted-foreground">
                  {article.author.name}
                </p>
              </div>
              <div className="h-5 rounded-lg w-0.5 bg-neutral-700" />
              <time
                dateTime={article.publishedAt}
                className="flex items-center text-base "
              >
                <span className="text-muted-foreground text-sm">
                  {formatDate(article.publishedAt)}
                </span>
              </time>
            </div>
          </article>
        </div>
      </div>
      {/* {article?.dynamic_zone && (
        <DynamicZoneManager
          dynamicZone={article?.dynamic_zone}
          locale={locale}
        />
      )} */}
    </div>
  );
}
