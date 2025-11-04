import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article, Category, Global } from "./types";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
export const STRAPI_ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL!;
export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/category",
  },
  {
    name: "Blog",
    link: "/blog",
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

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?&populate[0]=cover&populate[1]=category&populate[3]=author.avatar&sort=createdAt:desc`,
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

    const { data } = await response.json();
    const articles: Article[] = data;
    return articles;
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
          tags: [`${slug}`],
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
