import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  currentPage,
  totalMembers,
  setCurrentPage,
}) {
  //   const pages = [...Array(totalMembers).keys()].map((page) => page + 1);
  // const pages = [...Array(10).keys()].map((page) => page + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalMembers / 10);
  let startPage, endPage;

  if (totalPages <= 5) {
    // if there are 5 or fewer pages, show all pages
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 3) {
    // if current page is less than or equal to 3, show first 5 pages
    startPage = 1;
    endPage = 5;
  } else if (currentPage >= totalPages - 2) {
    // if current page is greater than or equal to total pages minus 2, show last 5 pages
    startPage = totalPages - 4;
    endPage = totalPages;
  } else {
    // otherwise, show 5 pages with current page in the middle
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (page) => page + startPage
  );

  return (
    <>
      <div className="grid place-items-center gap-4">
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
        <div className="flex flex-col items-center justify-center text-gray-600 sm:flex-row">
          <span className="sm:mr-2">
            Showing page {currentPage} of {Math.ceil(totalMembers / 10)}
          </span>
          <div className="hidden h-6 w-px bg-gray-400 sm:mx-2 sm:block"></div>
          <div className="divider my-0 mx-auto mt-1 h-2 w-1/2 sm:hidden"></div>
          <span className="sm:ml-2">{totalMembers} members in total</span>
        </div>
      </div>
    </>
  );
}
