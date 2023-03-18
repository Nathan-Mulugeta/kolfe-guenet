import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  currentPage,
  totalMembers,
  setCurrentPage,
}) {
  //   const pages = [...Array(totalMembers).keys()].map((page) => page + 1);
  const pages = [...Array(10).keys()].map((page) => page + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="space-y-2">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>
          {pages.map((page) => (
            <button
              key={page}
              aria-current={page === currentPage ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === currentPage
                  ? "z-10 bg-secondary text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-secondary"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === Math.ceil(totalMembers / 10)}
            onClick={() => handlePageClick(currentPage + 1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
        <div className="flex items-center justify-center text-gray-600">
          <span className="mr-2">
            Showing page {currentPage} of {Math.ceil(totalMembers / 10)}
          </span>
          <div className="mx-2 h-6 w-px bg-gray-400"></div>
          <span className="ml-2">{totalMembers} members in total</span>
        </div>
      </div>
    </>
  );
}
