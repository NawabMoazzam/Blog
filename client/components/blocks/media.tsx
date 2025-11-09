import type { MediaBlock } from "@/lib/types";
import { StrapiImage } from "../strapi-image";

export default function Media({ data }: { data: MediaBlock }) {
  return (
      <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
        <StrapiImage
          image={data.file}
          fill
          className="object-cover"
        />
      </div>
  );
}
