import { STRAPI_URL } from "@/lib/utils";
import BlockRenderer from "@/components/block-renderer";
import { Block } from "@/lib/types";

type aboutData = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: Block[];
};

export default async function About() {
  const { data } = (await fetch(
    `${STRAPI_URL}/api/about?populate[blocks][populate]=*`
  ).then((res) => res.json())) as { data: aboutData };

  return (
    <div className="px-8 lg:px-16 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
      <div className="space-y-6">
        {data.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    </div>
  );
}
