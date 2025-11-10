import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article, Category, Global, Meta } from "./types";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
export const STRAPI_ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL!;
export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blogs/1",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return STRAPI_ASSET_URL + url;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function getGlobalData(): Promise<Global> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/global?populate[favicon][populate]=*&populate[defaultSeo][populate]=*`,
      {
        cache: "force-cache",
        next: {
          tags: [`seo`],
          revalidate: false,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch global data");
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    throw error;
  }
}

export async function getArticles(page: number = 1): Promise<{
  articles: Article[];
  meta: Meta;
}> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?&populate[0]=cover&populate[1]=category&populate[3]=author.avatar&sort=createdAt:desc&pagination[pageSize]=1&pagination[page]=${page}`,
      {
        cache: "force-cache",
        next: {
          tags: ["articles"],
          revalidate: false,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const { data, meta } = await response.json();
    const articles: Article[] = data;
    return { articles, meta };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate[0]=cover&populate[1]=category&populate[3]=author.avatar&populate[4]=blocks&populate[5]=blocks.file&populate[6]=blocks.files`,
      {
        cache: "force-cache",
        next: {
          tags: [`article-${slug}`],
          revalidate: false,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }

    const { data } = await response.json();
    const article = data[0] as Article;
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?populate[articles][populate]=*`,
      {
        cache: "force-cache",
        next: {
          tags: ["categories"],
          revalidate: false,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const { data }: { data: Category[] } = await response.json();
    const categories = data.map((category) => ({
      ...category,
      articles: category.articles.reverse(),
    }));
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate[articles][populate]=*`,
      {
        cache: "force-cache",
        next: {
          tags: [`category-${slug}`],
          revalidate: false,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }
    const { data } = await response.json();
    const category = data[0] as Category;
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

export function shimmerPlaceholder(width: number, height: number): PlaceholderValue {
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}
