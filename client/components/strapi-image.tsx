import Image from "next/image";
import { getStrapiMedia, shimmerPlaceholder } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface OptimizedStrapiImageProps {
  image: StrapiImage;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  alt?: string;
  decoding?: "auto" | "async" | "sync";
  showCaption?: boolean;
  placeholder?: PlaceholderValue;
}

export function StrapiImage({
  image,
  priority = false,
  fill = false,
  className = "",
  sizes = "(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  loading = priority ? "eager" : "lazy",
  alt,
  decoding = "async",
  showCaption = false,
  placeholder = shimmerPlaceholder(image.width, image.height)
}: OptimizedStrapiImageProps) {
  if (!image) {
    return null;
  }

  const imageSrc = getStrapiMedia(image.url) as string;
  const imageAlt =
    alt || image.alternativeText || image.name || "Article image";

  // Common image props
  const commonProps = {
    src: imageSrc,
    alt: imageAlt,
    className,
    sizes,
    quality,
    priority,
    loading,
    decoding,
    placeholder
  };

  const imageElement = fill ? (
    <Image {...commonProps} fill style={{ objectFit: "cover" }} />
  ) : (
    <Image
      {...commonProps}
      width={image.width}
      height={image.height}
      style={{
        maxWidth: "100%",
        height: "auto",
        }}
    />
  );

  return (
    <figure>
      {imageElement}
      {showCaption && image?.caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
