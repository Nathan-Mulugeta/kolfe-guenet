import { RxCross2 } from "react-icons/rx";

function Search({
  setSearchField,
  searchField,
  searchResultsCount,
  setSearchResultsCount,
}) {
  const handleSearch = () => {};

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="form-control">
      <div className="input-group px-2">
        <input
          value={searchField}
          onChange={handleChange}
          type="text"
          placeholder="Search…"
          className="input-bordered input w-full sm:w-1/2"
        />
        <button className="btn-secondary btn-square btn" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {searchField && (
        <>
          <button
            onClick={() => {
              setSearchField("");
              setSearchResultsCount(0);
            }}
            className="btn-secondary btn ml-2 mt-2 flex w-[100px] items-center gap-2 text-white"
          >
            Clear
            <RxCross2 />
          </button>
          <p className="m-4 flex justify-center gap-2 text-center text-lg font-bold">
            Total search results:{" "}
            <span class="text-blue-500">{searchResultsCount}</span>
          </p>
        </>
      )}
    </div>
  );
}

export default Search;
