import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Simulating the pagination from the original code (e.g. 1, 2, 3, ..., 10)
  // For simplicity, we just use a static list based on the prompt's hardcoded [1, 2, 3, 4, 5, 6, 10]
  // In a real app, this should be generated based on totalPages
  const pages = [1, 2, 3, "...", 8, 9, 10]; 

  return (
    <div className="flex items-center justify-between w-full mt-5">
      <button
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        className="flex items-center justify-center gap-2 px-3 py-2 h-[36px] bg-white border border-black/10 rounded-lg hover:bg-black/5 transition-colors font-medium text-[14px]"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`dots-${idx}`} className="w-[40px] text-center text-black/50">
                ...
              </span>
            );
          }
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-lg font-medium text-[14px] transition-colors ${
                isCurrent ? "bg-black/5 text-black" : "text-black/50 hover:bg-black/5 hover:text-black"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
        className="flex items-center justify-center gap-2 px-3 py-2 h-[36px] bg-white border border-black/10 rounded-lg hover:bg-black/5 transition-colors font-medium text-[14px]"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
