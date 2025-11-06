import Image from "next/image";
import { STRAPI_ASSET_URL } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string | null;
  className?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt || "No alt text provided."}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={75}
      className={className}
      {...rest}
    />
  );
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return STRAPI_ASSET_URL + url;
}
