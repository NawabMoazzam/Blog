import { StrapiImage } from "@/components/strapi-image";
import BlockRenderer from "@/components/block-renderer";
import { getArticleBySlug, getStrapiMedia } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { cache } from "react";
import { Metadata } from "next";
import BackButton from "@/components/back-button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
      <AspectRatio ratio={3 / 1} className="relative w-full mx-auto">
        {article?.cover ? (
          <StrapiImage
            image={article.cover}
            fill
            priority
            className="rounded-3xl mask-[radial-gradient(circle,white,transparent)]"
          />
        ) : (
          <div className="h-40 md:h-96 w-full aspect-squace rounded-3xl shadow-derek bg-neutral-900 flex items-center justify-center">
            {/* <Logo /> */}
            <span className="text-muted-foreground">No Cover Image</span>
          </div>
        )}
      </AspectRatio>
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
              <div className="flex space-x-2 gap-2 items-center ">
                <div className="relative rounded-full mx-auto w-8 h-8">
                  <StrapiImage
                    image={article.author.avatar}
                    className="rounded-full"
                  />
                </div>
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
