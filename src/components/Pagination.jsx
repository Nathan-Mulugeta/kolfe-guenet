import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ currentPage, totalPages }) {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <a
        href="#"
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      {pages.map((page) => (
        <a
          key={page}
          href="#"
          aria-current={page === currentPage ? "page" : undefined}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            page === currentPage
              ? "z-10 bg-indigo-600 text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }`}
        >
          {page}
        </a>
      ))}
      <a
        href="#"
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </a>
    </nav>
  );
}
