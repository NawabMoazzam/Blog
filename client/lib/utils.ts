import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article, Global } from "./types";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
export const STRAPI_ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL!;
export const navItems = [
  {
    name: "Home",
    link: "/",
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
    const res = await fetch(`${STRAPI_URL}/api/global?populate[favicon][populate]=*&populate[defaultSeo][populate]=*`);
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
      `${STRAPI_URL}/api/articles?&populate[0]=cover&populate[1]=category&populate[3]=author.avatar&sort=createdAt:desc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const { data } = await response.json();
    const articles: Article[] = data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      cover: {
        id: item.cover.id,
        documentId: item.cover.documentId,
        name: item.cover.name,
        alternativeText: item.cover.alternativeText,
        url: item.cover.url,
      },
      category: {
        id: item.category.id,
        documentId: item.category.documentId,
        name: item.category.name,
        slug: item.category.slug,
      },
      author: {
        id: item.author.id,
        documentId: item.author.documentId,
        name: item.author.name,
        email: item.author.email,
        createdAt: item.author.createdAt,
        updatedAt: item.author.updatedAt,
        publishedAt: item.author.publishedAt,
        avatar: {
          id: item.author.avatar.id,
          documentId: item.author.avatar.documentId,
          url: item.author.avatar.url,
          alternativeText: item.author.avatar.alternativeText,
          width: item.author.avatar.width,
          height: item.author.avatar.height,
        },
      },
    }));
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate[0]=cover&populate[1]=category&populate[3]=author.avatar&populate[4]=blocks&populate[5]=blocks.file&populate[6]=blocks.files`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }

    const { data } = await response.json();
    const article = {
      id: data[0].id,
      documentId: data[0].documentId,
      title: data[0].title,
      description: data[0].description,
      slug: data[0].slug,
      createdAt: data[0].createdAt,
      updatedAt: data[0].updatedAt,
      publishedAt: data[0].publishedAt,
      cover: {
        id: data[0].cover.id,
        documentId: data[0].cover.documentId,
        name: data[0].cover.name,
        alternativeText: data[0].cover.alternativeText,
        url: data[0].cover.url,
      },
      category: {
        id: data[0].category.id,
        documentId: data[0].category.documentId,
        name: data[0].category.name,
        slug: data[0].category.slug,
      },
      author: {
        id: data[0].author.id,
        documentId: data[0].author.documentId,
        name: data[0].author.name,
        email: data[0].author.email,
        createdAt: data[0].author.createdAt,
        updatedAt: data[0].author.updatedAt,
        publishedAt: data[0].author.publishedAt,
        avatar: {
          id: data[0].author.avatar.id,
          documentId: data[0].author.avatar.documentId,
          url: data[0].author.avatar.url,
          alternativeText: data[0].author.avatar.alternativeText,
          width: data[0].author.avatar.width,
          height: data[0].author.avatar.height,
        },
      },
      blocks: data[0].blocks,
    } as Article;
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}
