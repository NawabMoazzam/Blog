import { StrapiImage } from "@/components/strapi-image";
import { formatDate, getArticles, STRAPI_ASSET_URL } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Home() {
  const article = await getArticles().then((articles) => articles[0]);
  return (
    <div className="px-8 lg:px-16 space-y-20">
      {/* Hero Section */}
      <section className="my-10">
        <Link
          className="grid grid-cols-1 md:grid-cols-2 rounded-3xl group border border-transparent hover:border-border w-full hover:bg-muted overflow-hidden hover:scale-[1.02] transition duration-200 h-[calc(100vh-8rem)]"
          href={`/blog/${article.slug}`}
        >
          <div className="">
            {article.cover?.url ? (
              <img
                src={`${STRAPI_ASSET_URL}${article.cover.url}`}
                alt={article.cover.alternativeText || "Cover Image"}
                height="1200"
                width="1200"
                className="h-full object-cover object-top w-full rounded-3xl"
              />
            ) : (
              <div className="h-full flex items-center justify-center group-hover:bg-muted">
                {/* <Logo /> */}
              </div>
            )}
          </div>
          <div className="p-4 md:p-8 group-hover:bg-muted flex flex-col justify-between">
            <div>
              <div className="flex gap-4 flex-wrap mb-4">
                <Badge variant={"outline"} className="px-4 py-2 capitalize">
                  {article.category.name}
                </Badge>
              </div>
              <p className="text-lg md:text-4xl font-bold mb-4">
                {article.title}
              </p>
              <p className="text-left text-base md:text-xl mt-2 text-muted-foreground">
                {article.description}
              </p>
            </div>
            <div className="flex space-x-2 items-center  mt-6">
              {/* <img
                src={`${STRAPI_ASSET_URL}${article.author.avatar.url}`}
                alt={article.author.avatar.alternativeText || "Author Avatar"}
                width={20}
                height={20}
                className="rounded-full h-5 w-5"
              /> */}
              <Avatar>
                <AvatarImage src={`${STRAPI_ASSET_URL}${article.author.avatar.url}`} />
                <AvatarFallback>{article.author.avatar.alternativeText}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-normal text-muted-foreground">
                {article.author.name}
              </p>
              <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
              <p className="text-muted-foreground text-sm  max-w-xl group-hover:text-foreground transition duration-200">
                {formatDate(article.createdAt)}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
