import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const CustomPagination = (props: {
  totalPages: number;
  pageNumber: number;
}) => {
  const { totalPages, pageNumber } = props;
  const leftMostPage = pageNumber - 2;
  const rightMostPage = Number(pageNumber) + 2;
  const leftEllipsis: boolean = leftMostPage > 1;
  const rightEllipsis: boolean = rightMostPage < totalPages;
  const leftNumber = leftMostPage > 1 ? leftMostPage : 1;
  const rightNumber = rightMostPage < totalPages ? rightMostPage : totalPages;
  const pageArray = Array.from(
    { length: rightNumber - leftNumber + 1 },
    (_, i) => leftNumber + i
  );
  return (
    <Pagination className="p-4">
      <PaginationContent>
        {pageNumber != 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${pageNumber - 1}`} />
          </PaginationItem>
        )}
        {leftEllipsis && <PaginationEllipsis />}
        {pageArray.map((index, i) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`?page=${index}`}
              isActive={index == pageNumber && true}
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        ))}
        {rightEllipsis && <PaginationEllipsis />}
        {/* <PaginationEllipsis /> */}
        {pageNumber != totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${Number(pageNumber) + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
