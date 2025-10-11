import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ShopPagination = ({ currentPage = 2, totalResults = 128, resultsPerPage = 20 }) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Pagination>
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious href="#" className="gap-2">
              <span>السابق</span>
            </PaginationPrevious>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink href="#" className="w-10 h-10">
              1
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink 
              href="#" 
              isActive 
              className="w-10 h-10 bg-primary text-primary-foreground border-primary"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink href="#" className="w-10 h-10">
              3
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink href="#" className="w-10 h-10">
              10
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationNext href="#" className="gap-2">
              <span>التالي</span>
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
        <div className="text-sm text-muted-foreground w-full flex justify-center sm:justify-end">
            عرض {startResult} - {endResult} من {totalResults}
        </div>
    </div>
  );
};

export default ShopPagination;
