import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Logic to determine which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center border rounded transition ${
          currentPage === 1 ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
        }`}
      >
        <FaChevronLeft className="text-xs" />
      </button>

      <div className="hidden sm:flex gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`} className="px-1 text-gray-400 flex items-end pb-1 font-bold">...</span>;
          }
          return (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 flex items-center justify-center border rounded transition text-sm font-medium ${
                currentPage === page
                  ? "bg-[#72B76A] text-white border-[#72B76A]"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center border rounded transition ${
          currentPage === totalPages ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
        }`}
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
};

export default Pagination;
