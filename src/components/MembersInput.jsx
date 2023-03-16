import { useState } from "react";

function MembersInput({ setLoading }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    // TODO: handle the file and add the members to the system
  };

  return (
    <>
      <div className="rounded-md bg-gray-100 p-4">
        <label
          htmlFor="excel-file-input"
          className="block text-xl font-semibold text-gray-700"
        >
          Add Members from an excel file
        </label>
        <div className="mt-1 flex items-center justify-center">
          <div className="relative w-full max-w-xs rounded-md border-2 border-dashed border-gray-400 p-4">
            <label htmlFor="excel-file-input">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.145 2.97a2.5 2.5 0 013.544 0l4.328 4.328a2.5 2.5 0 010 3.544l-2.17 2.17v3.95a2.5 2.5 0 01-2.5 2.5h-5.5a2.5 2.5 0 01-2.5-2.5v-11a2.5 2.5 0 012.5-2.5h2.95zm2.293 1.207a1.5 1.5 0 00-2.122 0l-4.328 4.328a1.5 1.5 0 000 2.122l2.17 2.17v3.683h3.683l2.17-2.17a1.5 1.5 0 000-2.122l-4.328-4.328z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-4 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    Select a file
                  </div>
                  <div className="text-xs text-gray-500">
                    or drag and drop here
                  </div>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="excel-file-input"
              accept=".xlsx, .xls"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </div>
          <div className="ml-3">{fileName}</div>
        </div>
      </div>
    </>
  );
}

export default MembersInput;
