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
  const { page, pageCount } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum page numbers to show

    if (pageCount <= maxVisible) {
      // Show all pages if total is 5 or less
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (page > 3) {
      // Show ellipsis after first page if current page is far from start
      pages.push("ellipsis-start");
    }

    // Calculate the range of pages to show around current page
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(pageCount - 1, page + 1);

    // Adjust range to always show 3 pages in the middle (if possible)
    if (page <= 3) {
      endPage = Math.min(4, pageCount - 1);
    } else if (page >= pageCount - 2) {
      startPage = Math.max(pageCount - 3, 2);
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (page < pageCount - 2) {
      // Show ellipsis before last page if current page is far from end
      pages.push("ellipsis-end");
    }

    // Always show last page
    if (pageCount > 1) {
      pages.push(pageCount);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* Previous Button */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/blogs/${page - 1}`} />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, idx) => {
          if (typeof pageNum === "string") {
            // Render ellipsis
            return (
              <PaginationItem
                key={`${pageNum}-${idx}`}
                className="hidden sm:block"
              >
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Hide certain page numbers on mobile for better UX
          const isCurrentOrAdjacent = Math.abs(pageNum - page) <= 1;
          const isFirstOrLast = pageNum === 1 || pageNum === pageCount;
          const showOnMobile = isCurrentOrAdjacent || isFirstOrLast;

          return (
            <PaginationItem
              key={pageNum}
              className={showOnMobile ? "" : "hidden sm:block"}
            >
              <PaginationLink
                href={`/blogs/${pageNum}`}
                isActive={page === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext href={`/blogs/${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
