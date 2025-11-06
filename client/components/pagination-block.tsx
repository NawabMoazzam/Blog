import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export default function PaginationBlock({
  pagination,
}: {
  pagination: PaginationProps;
}) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {pagination.page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${pagination.page - 1}`} />
          </PaginationItem>
        )}
        {Array.from({ length: pagination.pageCount }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`/blogs/${i + 1}`}
              isActive={pagination.page == i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {pagination.page < pagination.pageCount && (
          <PaginationItem>
            <PaginationNext href={`${pagination.page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
