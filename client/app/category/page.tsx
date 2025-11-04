import { getStrapiMedia, StrapiImage } from "@/components/strapi-image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getCategories } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function CategoryPage() {
  const categories = await getCategories();
  return (
    <div className="m-8 lg:m-16">
      <div className="flex justify-between items-center px-2 py-8">
        <Link href="/category" className="flex space-x-2 items-center">
          <IconArrowLeft className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Back</span>
        </Link>
      </div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="group">
            <Card className="pt-0 rounded-3xl hover:bg-muted hover:scale-[1.02] transition duration-200">
              <CardContent className="px-0">
                {category.articles.length > 0 ? (
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-3xl">
                    <StrapiImage
                      src={
                        getStrapiMedia(category.articles[0].cover.url) as string
                      }
                      alt={
                        category.articles[0].cover.alternativeText ||
                        "Cover Image"
                      }
                      fill
                      className="h-full object-cover object-top w-full rounded-3xl"
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-3xl">
                    No Image Found
                  </AspectRatio>
                )}
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
