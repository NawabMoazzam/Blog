import { RichTextBlock } from "@/lib/types";
import ReactMarkdown from 'react-markdown';

export default function RichText({ data }: { data: RichTextBlock }) {
  return (
    <div className="my-8 prose dark:prose-invert">
      <ReactMarkdown>{data.body}</ReactMarkdown>
    </div>
  );
}
