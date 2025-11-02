import type { MediaBlock } from "@/lib/types";
import { StrapiImage } from "../strapi-image";

export default function Media({ data }: { data: MediaBlock }) {
  return (
    <div className="my-8">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <StrapiImage
          src={data.file.url}
          alt={data.file.alternativeText || "Media"}
          fill
          className="object-cover"
        />
      </div>
      {data.file.alternativeText && (
        <p className="text-center text-sm text-muted-foreground mt-2">
          {data.file.alternativeText}
        </p>
      )}
    </div>
  );
}
